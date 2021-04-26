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

import { expose } from "comlink";

import glue from "../jxl/jxl.js";
import wasmURL from "asset-url:../jxl/jxl.wasm";

const instanceP = glue({
  locateFile() {
    return wasmURL;
  },
});

expose({
  async encodeJxl(code) {
    const instance = await instanceP;
    const data = instance.jxl_from_tree(code);
    return data;
  },
  async decodeJxl(data) {
    const instance = await instanceP;
    const imageData = instance.decode(data);
    return imageData;
  },
  prettier,
});

function mustNext(it) {
  const { value, done } = it.next();
  if (done) {
    throw Error("Unexpected end of file");
  }
  return value;
}

const zeroArgsHeader = ["squeeze", "xyb", "cbycr", "alpha"];
function getNumHeaderArgs(name) {
  if (zeroArgsHeader.includes(name)) {
    return 0;
  }
  return 1;
}

function prettier(it, depth = 0) {
  let result = "";
  if (typeof it === "string") {
    it = it
      .split(/\s/)
      .filter((v) => v)
      [Symbol.iterator]();
  }
  let token,
    done,
    foundConfig = false;
  while (true) {
    ({ value: token, done } = it.next());
    if (done) {
      return result;
    }
    if (token.toLowerCase() === "if" || token.toLowerCase() === "-") {
      if (foundConfig) {
        result += "\n";
      }
      break;
    }
    if (token.startsWith("/*")) {
      let endFound = token.endsWith("*/");
      result += `${"  ".repeat(depth)}${token}`;
      while (!endFound) {
        const next = mustNext(it);
        endFound = next.endsWith("*/");
        result += ` ${next}`;
      }
      result += "\n";
      continue;
    }
    result += token;
    let numArgs = getNumHeaderArgs(token.toLowerCase());
    while (numArgs > 0) {
      result += ` ${mustNext(it)}`;
      numArgs--;
    }
    result += "\n";
    foundConfig = true;
  }

  if (token.toLowerCase() === "if") {
    result += `${"  ".repeat(depth)}if ${mustNext(it)} ${
      (mustNext(it), ">")
    } ${mustNext(it)}\n${prettier(it, depth + 1)}\n${prettier(it, depth + 1)}`;
  } else if (token === "-") {
    result += `${"  ".repeat(depth)}- ${mustNext(it)}`;
    const next = mustNext(it);
    if (next === "+" || next === "-") {
      result += ` ${next} ${mustNext(it)}`;
    } else {
      result += ` ${next}`;
    }
  }
  if (depth == 0) {
    result += [...it].join(" ");
  }
  return result;
}
