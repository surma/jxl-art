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
import { process } from "./api.js";
import {
  imageDataToCanvas,
  canvasToPNGBlobk as canvasToPNGBlob,
  unindent,
} from "./utils.js";
import {
  generateInsecureKeyFromString,
  decryptStringWithKey,
} from "./crypto.js";

import * as hookData from "env:discord:HOOK_URL";

async function lol() {}
lol();

const { title, artist, publishbtn, img, bottest } = document.all;
let blob;
let code;
let jxlData;
let zcode;
async function main() {
  const p = new URLSearchParams(location.search);
  if (!p.has("payload")) {
    location.href = "/";
    return;
  }
  zcode = p.get("payload");
  code = inflate(atob(zcode));

  const prevTitle = await get("previous-title");
  if (prevTitle) {
    title.value = prevTitle;
  }

  const prevArtist = await get("previous-artist");
  if (prevArtist) {
    artist.value = prevArtist;
  }

  let imageData;
  try {
    ({ jxlData, imageData } = await process(code));
  } catch (e) {
    location.href = "/";
    return;
  }

  const cvs = imageDataToCanvas(imageData);
  blob = await canvasToPNGBlob(cvs, { name: "art.png" });
  img.src = URL.createObjectURL(blob);
  publishbtn.disabled = false;
}

publishbtn.onclick = async () => {
  let hookURL;
  try {
    const keyphrase = bottest.value.toLowerCase();
    const key = await generateInsecureKeyFromString(crypto, keyphrase);
    hookURL = JSON.parse(
      await decryptStringWithKey(crypto, hookData.data, hookData.iv, key)
    );
  } catch (e) {
    bottest.style.borderColor = "red";
    return;
  }
  publishbtn.disabled = true;

  const formData = new FormData();

  const content = unindent(`
    _“${title.value}”_ by **${artist.value}**, ${jxlData.byteLength} bytes

    \`\`\`
    ${code}
    \`\`\`

    https://jxl-art.surma.technology/?${new URLSearchParams({
      zcode,
    }).toString()}
  `);
  formData.append("payload_json", JSON.stringify({ content }));
  formData.append("file", blob);

  await fetch(hookURL, {
    method: "POST",
    body: formData,
  });
  await set("previous-artist", artist.value);
  await set("previous-title", title.value);
  location.href = "/";
};
main();
