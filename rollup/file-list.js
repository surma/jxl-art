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

import { createHash } from "crypto";

const placeholder = "___REPLACE_THIS_WITH_FILE_LIST_LATER";
const importMarker = "file-list:";

export default function() {
  return {
    name: "file-list",
    resolveId(id) {
      if (id !== importMarker) {
        return;
      }
      return id;
    },
    load(id) {
      if (id !== importMarker) {
        return;
      }
      return `export default ${placeholder};`;
    },
    generateBundle(_outputOptions, bundle) {
      const fileList = JSON.stringify(
        Object.values(bundle).map(item => {
          const name = item.fileName;
          let source;
          if (item.type === "asset") {
            source = item.source;
          } else {
            source = item.code;
          }
          const digest = createHash("SHA256")
            .update(source)
            .digest("hex");
          return { name, digest };
        }),
        null,
        "  "
      );

      Object.values(bundle)
        .filter(item => item.code)
        .forEach(item => {
          item.code = item.code.replace(placeholder, fileList);
        });
    }
  };
}
