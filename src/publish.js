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

import { wrap } from "comlink";
import inflate from "./inflate.js";

import { idle } from "./utils.js";
import hookURL from "env:HOOK_URL";

import workerURL from "omt:./worker.js";

const worker = new Worker(workerURL);
const api = wrap(worker);

const { title, artist, publishbtn, img } = document.all;
let blob;
let code;
let jxlData;
async function main() {
  const p = new URLSearchParams(location.search);
  if (!p.has("payload")) {
    location.href = "/";
    return;
  }
  code = inflate(atob(p.get("payload")));
  jxlData = await api.encodeJxl(code);
  if (typeof jxlData === "string") {
    return;
  }
  const imageData = await api.decodeJxl(jxlData);
  const cvs = document.createElement("canvas");
  cvs.width = imageData.width;
  cvs.height = imageData.height;
  const ctx = cvs.getContext("2d");
  ctx.putImageData(imageData, 0, 0);
  blob = await new Promise((resolve) => cvs.toBlob(resolve, "image/png"));
  const url = URL.createObjectURL(blob);
  img.src = url;
  publishbtn.disabled = false;
}

function unindent(str) {
  const lines = str.split("\n");
  if (lines[0] === "") {
    lines.shift();
  }
  const numLeadingSpaces = lines[0].search(/\S/);
  return lines.map((line) => line.slice(numLeadingSpaces)).join("\n");
}

publishbtn.onclick = async () => {
  const formData = new FormData();

  const content = unindent(`
    _“${title.value}”_ by **${artist.value}**, ${jxlData.byteLength} bytes

    \`\`\`
    ${code}
    \`\`\`
  `);
  formData.append("payload_json", JSON.stringify({ content }));
  formData.append("file", new File([blob], "art.png", { type: "image/png" }));

  await fetch(hookURL, {
    method: "POST",
    body: formData,
  });
  location.href = "/";
};
main();
