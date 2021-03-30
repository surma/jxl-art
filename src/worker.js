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
});
