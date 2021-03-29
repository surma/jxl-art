import { expose } from "comlink";

import decoder from "../jxl/dec/jxl_dec.js";
import decoderWasmUrl from "asset-url:../jxl/dec/jxl_dec.wasm";

expose({
  async decodeJxl(data) {
    const instance = await decoder({
      locateFile() {
        return decoderWasmUrl;
      },
    });
    const imageData = instance.decode(data);
    return imageData;
  },
});
