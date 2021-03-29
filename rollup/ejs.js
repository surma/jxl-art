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

import { promises as fsp } from "fs";
import { readFileSync } from "fs";
import { basename } from "path";

import * as ejs from "ejs";

export default function({ files }) {
  files = files.slice(); // Copy
  const assets = new Map();
  const chunks = new Map();
  const templates = [];
  return {
    name: "ejs",
    async buildStart() {
      const rollupContext = this;
      for (let file of files) {
        const source = await fsp.readFile(file, "utf-8");
        ejs.render(source, {
          bundle: {},
          emitAsset(path) {
            const source = readFileSync(path);
            const name = basename(path);
            const referenceId = rollupContext.emitFile({
              type: "asset",
              name,
              source
            });
            assets.set(path, referenceId);
          },
          emitChunk(id) {
            const referenceId = rollupContext.emitFile({
              type: "chunk",
              id
            });
            chunks.set(id, referenceId);
          },
          emitEjs(file) {
            files.push(file);
          }
        });
        const fileName = basename(file).replace(/\.ejs$/, "");
        const referenceId = this.emitFile({
          type: "asset",
          fileName
        });
        templates.push({ referenceId, source });
      }
    },
    async generateBundle(options, bundle) {
      const rollupContext = this;
      for (const { referenceId, source } of templates) {
        const result = ejs.render(source, {
          bundle: {},
          emitAsset(name) {
            if (!assets.has(name)) {
              throw Error(`Unknown asset "${name}"`);
            }
            return rollupContext.getFileName(assets.get(name));
          },
          emitChunk(id) {
            if (!chunks.has(id)) {
              throw Error(`Unknown chunk "${id}"`);
            }
            return rollupContext.getFileName(chunks.get(id));
          },
          emitEjs(file) {
            return basename(file).replace(/\.ejs$/, "");
          }
        });
        this.setAssetSource(referenceId, result);
      }
    }
  };
}
