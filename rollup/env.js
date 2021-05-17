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

import { webcrypto as crypto } from "crypto";
import {
  generateInsecureKeyFromString,
  encryptStringWithKey,
} from "../src/crypto.js";

const PREFIX = "env:";

export default function () {
  return {
    name: "Env",
    async resolveId(prefixedId) {
      if (!prefixedId.startsWith(PREFIX)) {
        return;
      }
      return prefixedId;
    },
    async load(prefixedId) {
      if (!prefixedId.startsWith(PREFIX)) {
        return;
      }
      const [, keyphrase, envName] = prefixedId.split(":");
      const iv = new Uint8Array(16).map((v) => Math.floor(Math.random() * 256));
      const key = await generateInsecureKeyFromString(crypto, keyphrase);
      const data = await encryptStringWithKey(
        crypto,
        JSON.stringify(process.env[envName]),
        iv,
        key
      );
      return `
        export const iv = new Uint8Array(${JSON.stringify([...iv])}); 
        export const data = new Uint8Array(${JSON.stringify([
          ...new Uint8Array(data),
        ])});
      `;
    },
  };
}
