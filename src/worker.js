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

function prettier(it, depth = 0) {
  let result = "";
  if (typeof it === "string") {
    it = it
      .split(/\s/)
      .filter((v) => v)
      [Symbol.iterator]();
  }
  const { value: token, done } = it.next();
  if (done) {
    return result;
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
