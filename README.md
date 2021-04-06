# JXL Art

[JXL Art] is the practice of using [JPEG XL]’s prediction tree to generate art.

If you have questions, you can join the `#jxl-art` channel on the [JPEG XL Discord][discord].

## Frontend Development

```
$ npm install
$ npm run dev
```

## Wasm Development

The Wasm is located in the `jxl` folder and can be built using Docker with

```
$ npm run build
```

If you have the [Emsdk] installed, you can also run `make` directly, but this is neither tested nor supported.

---

License Apache-2.0

[jpeg xl]: https://jpeg.org/jpegxl/
[discord]: https://discord.gg/DqkQgDRTFu
[emsdk]: https://github.com/emscripten-core/emsdk
[jxl art]: https://jxl-art.surma.technology
