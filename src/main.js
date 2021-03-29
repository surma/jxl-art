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

import { idle } from "./utils.js";

import workerURL from "emit-chunk:./worker.js";

const code = document.querySelector("#code");
const btn = document.querySelector("#go");
const log = document.querySelector("#log");
const cvs = document.querySelector("#jxl");
const ctx = cvs.getContext("2d");

const worker = new Worker(workerURL);
const api = wrap(worker);

async function rerender() {
  const jxlData = await api.encodeJxl(code.value);
  if (typeof jxlData === "string") {
    log.innerHTML = jxlData;
    return;
  }
  const imageData = await api.decodeJxl(jxlData);
  ctx.canvas.width = imageData.width;
  ctx.canvas.height = imageData.height;
  ctx.putImageData(imageData, 0, 0);
}

const IDBKey = "source";
async function main() {
  const lastSource = await get(IDBKey);
  if (lastSource) {
    code.value = lastSource;
  }
  code.addEventListener("change", () => {
    set(IDBKey, code.value);
  });
  btn.disabled = false;
  btn.onclick = async () => {
    btn.disabled = true;
    log.innerHTML = "";
    await rerender();
    btn.disabled = false;
  };
}
main();

idle().then(() => import("./sw-installer.js"));
