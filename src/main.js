/**
 * Copyright 2020 Google Inc. All Rights Reserved.
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

import { wrap } from "comlink";
import { get, set } from "idb-keyval";
import { inflate, deflate } from "./deflate.js";

import { idle } from "./utils.js";
import "./pinch-zoom.js";

import workerURL from "omt:./worker.js";

const { code, run, share, log, cvs, jxl, png, zoom, prettier } = document.all;
const ctx = cvs.getContext("2d");

const worker = new Worker(workerURL);
const api = wrap(worker);

function showLog(error) {
  log.innerHTML = error;
}

let jxlData;
async function rerender() {
  jxlData = await api.encodeJxl(code.value);
  if (typeof jxlData === "string") {
    return showLog(jxlData);
  }
  jxl.textContent = jxl.textContent.replace(
    /(\([^)]+\))?$/,
    `(${jxlData.byteLength} bytes)`
  );
  const imageData = await api.decodeJxl(jxlData);
  ctx.canvas.width = imageData.width;
  ctx.canvas.height = imageData.height;
  ctx.putImageData(imageData, 0, 0);
}

run.onclick = async () => {
  run.disabled = true;
  log.innerHTML = "";
  try {
    await rerender();
  } catch (e) {
    showLog(e.message);
  }
  [run, jxl, png].forEach((btn) => (btn.disabled = false));
};

share.onclick = () => {
  const u = new URL(location);
  const p = new URLSearchParams(u.search);
  const payload = btoa(deflate(code.value, 9));
  p.set("zcode", payload);
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
  code.value = await api.prettier(code.value);
};

png.onclick = async () => {
  const blob = await new Promise((resolve) => cvs.toBlob(resolve, "image/png"));
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "art.png";
  a.click();
};

const IDBKey = "source";
async function main() {
  const p = new URLSearchParams(location.search);
  let lastSource = "";
  if (p.has("zcode")) {
    lastSource = inflate(atob(p.get("zcode")));
  } else if (p.has("code")) {
    lastSource = atob(p.get("code"));
  } else {
    lastSource = await get(IDBKey);
  }
  if (lastSource) {
    code.value = lastSource;
  }
  code.addEventListener("input", () => {
    set(IDBKey, code.value);
  });
  run.disabled = false;
  const rect = zoom.getBoundingClientRect();
  const scale = Math.min(rect.width, rect.height) / 1024;
  zoom.scaleTo(scale.toFixed(2));
}
main();

idle().then(() => import("./sw-installer.js"));
