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
// import  "./ace-src-noconflict/worker-json.js"

let code;
const {
  // code,
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
async function rerender() {
  let imageData;
  try {
    let jxltree = ejs.render(code.value);
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

async function compile() {
  run.disabled = true;
  log.innerHTML = "";
  try {
    await rerender();
  } catch (e) {
    showLog(e.message);
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
  if (code.value === ejs.render(code.value)) {
    code.value = await api.prettier(code.value);
    storeCode();
  }
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
  // if (!(ev.code === "Enter" && ev.ctrlKey && ev.altKey)) {
  //   return;
  // }
  compile();
}

let editor_counter = 0;
let editors = new WeakMap();
function make_editor_elements(mode) {
  let wrap = document.createElement("div");
  wrap.classList.add("editor-container");
  let pre = document.createElement("pre");
  pre.classList.add("editor");
  wrap.appendChild(pre);
  return [wrap, pre];
}
function make_editor(editor_el, mode = "json") {
  if (!editor_el.id) editor_el.id = "editor" + editor_counter;
  let editor = ace.edit(editor_el.id);
  editors.set(editor_el, editor);
  editor.setOptions({
    fontSize: "13pt",
    wrap: false,
    fixedWidthGutter: true,
  });
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode(`ace/mode/${mode}`);
  editor.session.setTabSize(2);
  ++editor_counter;
  return editor;
}

const IDBKey = "source";
async function main() {
  for (let editor_el of document.querySelectorAll(".editor")) {
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
  // code.addEventListener("keydown", onCompileShortcut);
  editor.commands.addCommand({
    name: "run",
    bindKey: {
      win: "Ctrl-Enter",
      mac: "Command-Enter",
    },
    exec: onCompileShortcut,
    readOnly: true, // false if this command should not apply in readOnly mode
  });

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
