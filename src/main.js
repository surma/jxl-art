/**
 * Copyright 2021 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { get, set } from "idb-keyval";
import inflate from "./inflate.js";
import { process, api } from "./api.js";

import { idle } from "./utils.js";
import "pinch-zoom-element";

import "./ace-src-noconflict/ace.js";
import "./ace-src-noconflict/theme-monokai.js";
// import "./ace-src-noconflict/mode-json.js";
import "./ace-src-noconflict/mode-javascript.js";
import "./ace-src-noconflict/keybinding-sublime.js";
// import  "./ace-src-noconflict/worker-json.js"

let code;
const {
  // code,
  editortabpane,
  run,
  share,
  publish,
  log,
  cvs,
  jxl,
  png,
  zoom,
  prettier,
} = document.all;
const ctx = cvs.getContext("2d");

function showLog(error) {
  log.textContent = error;
}

async function storeCode() {
  set(IDBKey, code.value);
}

publish.onclick = async (ev) => {
  ev.preventDefault();
  const { default: deflate } = await import("./deflate.js");
  const payload = btoa(deflate(code.value, 9));
  const searchParams = new URLSearchParams({ payload });
  location.href = `/publish.html?${searchParams.toString()}`;
};

let jxlData;
async function rerender(jxltree) {
  let imageData;
  try {
    ({ jxlData, imageData } = await process(jxltree));
    jxl.textContent = jxl.textContent.replace(
      /(\([^)]+\))?$/,
      `(${jxlData.byteLength} bytes)`,
    );
    ctx.canvas.width = imageData.width;
    ctx.canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);
  } catch (e) {
    showLog(
      `${e}\n\nStack:\n    ${e.stack.split("\n").join("\n    ")}\n${e.cause != null ? JSON.stringify(e.cause, null, 4) : ""}`,
    );
  }
}
function ejs_multipass() {
  remove_tabs();
  let prev = code.value;
  let jxltree, last_added_tab;
  let i = 0;
  for (; prev != (jxltree = ejs.render(prev)); ++i, prev = jxltree) {
    last_added_tab = add_tab(editortabpane, `jxl_${i + 1}.ejs`, jxltree, {
      type: "editor",
      readonly: false,
    });
  }
  if (last_added_tab) {
    last_added_tab.button.textContent =
      last_added_tab.button.textContent.replace(/\.ejs$/, "");
  }
  return {
    jxltree,
    tab: last_added_tab ?? {
      button: document.querySelector("#tab-btn-source"),
      content: document.querySelector("#tab-content-source"),
    },
  };
}

async function compile() {
  run.disabled = true;
  log.innerHTML = "";
  try {
    let jxltree = ejs_multipass().jxltree;
    await rerender(jxltree);
  } catch (e) {
    showLog(
      `${e}\n\nStack:\n    ${e.stack.split("\n").join("\n    ")}\n${e.cause != null ? JSON.stringify(e.cause, null, 4) : ""}`,
    );
  }
  [run, jxl, png].forEach((btn) => (btn.disabled = false));
}
run.onclick = compile;

share.onclick = async () => {
  const u = new URL(location);
  const p = new URLSearchParams(u.search);
  const { default: deflate } = await import("./deflate.js");
  const payload = btoa(deflate(code.value, 9));
  // change letters around so payload can be put in a url
  // padding is not needed
  const safePayload = payload
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
  p.set("zcode", safePayload);
  p.delete("code");
  u.search = "?" + p.toString();
  history.replaceState({}, "", u);
  navigator.clipboard.writeText(u.toString());
  showLog("URL copied to clipboard.");
};

jxl.onclick = () => {
  if (!jxlData) {
    return;
  }
  const blob = new Blob([jxlData], { type: "image/jxl" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "art.jxl";
  a.click();
};

prettier.onclick = async () => {
  let rendered = ejs_multipass();
  let editor = editors.get(rendered.tab.content.querySelector("pre.editor"));
  editor.setValue(await api.prettier(rendered.jxltree), -1);
  select_tab(rendered.tab.button);
  // storeCode();
};

png.onclick = async () => {
  const blob = await new Promise((resolve) => cvs.toBlob(resolve, "image/png"));
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "art.png";
  a.click();
};

zoom.onchange = () => {
  cvs.classList.toggle("pixelated", zoom.scale > 1);
};

function onCodeChange() {
  storeCode();
  const u = new URL(location);
  const p = new URLSearchParams(u.search);
  p.delete("code");
  p.delete("zcode");
  u.search = "?" + p.toString();
  history.replaceState({}, "", u);
}

function onCompileShortcut(ev) {
  if (!(ev.code === "Enter" && ev.ctrlKey)) {
    return;
  }
  compile();
}

let editor_counter = 0;
let editors = new WeakMap();
function make_editor_elements() {
  let pre = document.createElement("pre");
  pre.classList.add("editor");
  return pre;
}
function make_editor(editor_el, mode = "javascript") {
  if (!editor_el.id) editor_el.id = "editor" + editor_counter;
  let editor = ace.edit(editor_el.id);
  editors.set(editor_el, editor);
  editor.setOptions({
    fontSize: "13pt",
    wrap: false,
    fixedWidthGutter: true,
  });
  editor.setKeyboardHandler("ace/keyboard/sublime");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode(`ace/mode/${mode}`);
  editor.session.setTabSize(2);
  ++editor_counter;
  return editor;
}

function select_tab(tab) {
  let tabbed_interface = tab.closest(".tabbed-interface");
  for (let tab_btn of tabbed_interface.querySelectorAll(".tab-btn")) {
    tab_btn.classList.remove("selected");
  }
  for (let tab_content_el of tabbed_interface.querySelectorAll(
    ".tab-content",
  )) {
    tab_content_el.classList.add("hidden");
  }
  tab.classList.add("selected");
  let content_id_selector = "#tab-content-" + tab.id.slice(8);
  tabbed_interface
    .querySelector(content_id_selector)
    ?.classList.remove("hidden");
}
function add_tab_button(tabbed_interface, id_postfix, name) {
  let tab_btn;
  tab_btn = document.createElement("div");
  tab_btn.classList.add("tab-btn", "output");
  tab_btn.id = `tab-btn-${id_postfix}`;
  tab_btn.textContent = name;
  tab_btn.addEventListener("click", (ev) => select_tab(ev.target));
  let tab_bar = tabbed_interface.querySelector(".tab-bar");
  tab_bar.insertBefore(tab_btn, tab_bar.querySelector(".tab-bar-separator"));
  return tab_btn;
}
function add_tab_content(tabbed_interface, id_postfix, content, options) {
  let tab_content_id = `tab-content-${id_postfix}`;
  let tab_content = document.querySelector("#" + tab_content_id);
  if (!tab_content) {
    tab_content = document.createElement("div");
    tab_content.classList.add("tab-content", "output", "hidden");
    tab_content.id = tab_content_id;
    tabbed_interface.appendChild(tab_content);
  }
  if (options.type == "editor") {
    let editor_el = make_editor_elements();
    tab_content.appendChild(editor_el);
    let editor = make_editor(editor_el, "javascript");
    editor.setValue(content, -1);
  }
  return tab_content;
}
function add_tab(tabbed_interface, name, content, options = {}) {
  let id_postfix = name.replaceAll(/[^-_a-zA-Z0-9]/g, "");
  return {
    button: add_tab_button(tabbed_interface, id_postfix, name),
    content: add_tab_content(tabbed_interface, id_postfix, content, options),
  };
}
function remove_tabs() {
  Array.from(document.querySelectorAll(".output")).forEach((q) => q.remove());
  for (let tabbed_interface of document.querySelectorAll(".tabbed-interface")) {
    if (!tabbed_interface.querySelector(".selected")) {
      select_tab(tabbed_interface.querySelector(".tab-btn"));
    }
  }
}

const IDBKey = "source";
async function main() {
  for (let tab_btn of document.querySelectorAll(".tab-btn")) {
    tab_btn.addEventListener("click", (ev) => {
      select_tab(ev.target);
    });
  }

  for (let editor_el of document.querySelectorAll("pre.editor")) {
    make_editor(editor_el, "javascript");
  }
  let element = document.querySelector(".editor");
  let editor = editors.get(element);
  code = {
    element,
    editor,
    get value() {
      return this.editor.getValue();
    },
    set value(value) {
      this.editor.setValue(value, -1);
    },
  };

  const p = new URLSearchParams(location.search);
  let lastSource = "";
  let fromURL = false;
  if (p.has("zcode")) {
    // restore - and _ to + and /
    const b64 = p.get("zcode").replaceAll("-", "+").replaceAll("_", "/");
    lastSource = inflate(atob(b64));
    fromURL = true;
  } else if (p.has("code")) {
    lastSource = atob(p.get("code").replaceAll("-", "+").replaceAll("_", "/"));
    fromURL = true;
  } else {
    lastSource = await get(IDBKey);
  }
  if (lastSource) {
    code.value = lastSource;
  }
  // code.addEventListener("input", onCodeChange);
  editor.on("change", onCodeChange);
  window.addEventListener("keydown", onCompileShortcut);
  // editor.commands.removeCommand('addLineAfter')
  editor.commands.addCommand({
    name: "run",
    bindKey: {
      win: "Ctrl-B",
      mac: "Command-B",
    },
    exec: compile,
    readOnly: true, // false if this command should not apply in readOnly mode
  });
  editor.focus();

  run.disabled = false;
  if (fromURL) {
    await compile();
  }
  const rect = zoom.getBoundingClientRect();
  const scale = Math.min(rect.width, rect.height) / 1024;
  zoom.scaleTo(scale.toFixed(2));
}
main();

idle().then(() => import("./sw-installer.js"));
