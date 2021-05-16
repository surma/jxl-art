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

export function idle() {
  return new Promise((resolve) => {
    if ("requestIdleCallback" in self) {
      requestIdleCallback(resolve);
    } else {
      // ¯\_(ツ)_/¯
      setTimeout(resolve, 5000);
    }
  });
}

export function imageDataToCanvas(imageData) {
  const cvs = document.createElement("canvas");
  cvs.width = imageData.width;
  cvs.height = imageData.height;
  const ctx = cvs.getContext("2d");
  ctx.putImageData(imageData, 0, 0);
  return cvs;
}

export async function canvasToPNGBlobk(canvas, { name = "image.png" }) {
  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png")
  );
  return new File([blob], name, { type: "image/png" });
}

export function unindent(str) {
  const lines = str.split("\n");
  if (lines[0] === "") {
    lines.shift();
  }
  const numLeadingSpaces = lines[0].search(/\S/);
  return lines.map((line) => line.slice(numLeadingSpaces)).join("\n");
}
