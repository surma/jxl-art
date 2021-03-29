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

import resolve from "@rollup/plugin-node-resolve";
import omt from "@surma/rollup-plugin-off-main-thread";
import { terser } from "rollup-plugin-terser";
import swc from "rollup-plugin-swc";
import postcss from "rollup-plugin-postcss";

import ejs from "./rollup/ejs.js";
import fileList from "./rollup/file-list.js";
import emitChunk from "./rollup/emit-chunk.js";
import asset from "./rollup/asset.js";

require("rimraf").sync("build");

export default {
  output: {
    dir: "build",
    format: "amd",
    entryFileNames: "[name]-[hash].js",
  },
  plugins: [
    asset(),
    ejs({
      files: ["src/_headers", "src/index.html.ejs", "src/wtf.html.ejs"],
    }),
    emitChunk(),
    resolve(),
    omt(),
    fileList(),
    postcss({
      minimize: true,
      modules: true,
      namedExports(name) {
        return name.replace(/-\w/g, (val) => val.slice(1).toUpperCase());
      },
    }),
    swc({
      jsc: {
        parser: {
          syntax: "ecmascript",
          jsx: true,
          dynamicImport: true,
          importMeta: true,
        },
        transform: {
          react: {
            pragma: "h",
            pragmaFrag: "Fragment",
          },
        },
      },
      env: {
        targets: "last 2 Chrome versions, last 2 Safari versions",
      },
    }),
    terser({
      compress: true,
      mangle: true,
    }),
  ],
};
