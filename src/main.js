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

import { idle } from "./utils.js";

import workerURL from "emit-chunk:./worker.js";
import testImageURL from "asset-url:./images/out.jxl";

const t = `
if N > 0
  - Set 0
  - Set 255
`;

const cvs = document.querySelector("#cvs");
const ctx = cvs.getContext("2d");

async function main() {
  const worker = new Worker(workerURL);
  const api = wrap(worker);

  const data = await fetch(testImageURL).then((r) => r.arrayBuffer());
  const imageData = await api.decodeJxl(data);
  ctx.canvas.width = imageData.width;
  ctx.canvas.height = imageData.height;
  ctx.putImageData(imageData, 0, 0);
}

main();
idle().then(() => import("./sw-installer.js"));
