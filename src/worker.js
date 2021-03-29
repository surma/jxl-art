import { expose } from "comlink";

import decoder from "../jxl/dec/jxl_dec.js";
import decoderWasmURL from "asset-url:../jxl/dec/jxl_dec.wasm";

import encoder from "../jxl/enc/jxl_enc.js";
import encoderWasmURL from "asset-url:../jxl/enc/jxl_enc.wasm";

expose({
  async encodeJxl(code) {
    const instance = await encoder({
      locateFile() {
        return encoderWasmURL;
      },
    });

    const data = instance.jxl_from_tree(code);
    return data;
  },
  async decodeJxl(data) {
    const instance = await decoder({
      locateFile() {
        return decoderWasmURL;
      },
    });
    const imageData = instance.decode(data);
    return imageData;
  },
});
