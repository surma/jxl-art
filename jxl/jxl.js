
var jxl = (() => {
  var _scriptDir = import.meta.url;
  
  return (
function(moduleArg = {}) {

var h = moduleArg, aa, ba;
h.ready = new Promise((a, b) => {
  aa = a;
  ba = b;
});
["_main", "_memory", "___indirect_function_table", "_fflush", "onRuntimeInitialized"].forEach(a => {
  Object.getOwnPropertyDescriptor(h.ready, a) || Object.defineProperty(h.ready, a, {get:() => n("You are getting " + a + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"), set:() => n("You are setting " + a + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js")});
});
var ca = Object.assign({}, h), da = [], ea = "./this.program", fa = (a, b) => {
  throw b;
};
if (h.ENVIRONMENT) {
  throw Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
}
var p = "", ha;
p = self.location.href;
_scriptDir && (p = _scriptDir);
0 !== p.indexOf("blob:") ? p = p.substr(0, p.replace(/[?#].*/, "").lastIndexOf("/") + 1) : p = "";
if ("object" != typeof window && "function" != typeof importScripts) {
  throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
}
ha = a => {
  var b = new XMLHttpRequest();
  b.open("GET", a, !1);
  b.responseType = "arraybuffer";
  b.send(null);
  return new Uint8Array(b.response);
};
var ia = h.print || console.log.bind(console), u = h.printErr || console.error.bind(console);
Object.assign(h, ca);
ca = null;
Object.getOwnPropertyDescriptor(h, "fetchSettings") && n("`Module.fetchSettings` was supplied but `fetchSettings` not included in INCOMING_MODULE_JS_API");
h.arguments && (da = h.arguments);
w("arguments", "arguments_");
h.thisProgram && (ea = h.thisProgram);
w("thisProgram", "thisProgram");
h.quit && (fa = h.quit);
w("quit", "quit_");
x("undefined" == typeof h.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
x("undefined" == typeof h.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
x("undefined" == typeof h.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
x("undefined" == typeof h.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
x("undefined" == typeof h.read, "Module.read option was removed (modify read_ in JS)");
x("undefined" == typeof h.readAsync, "Module.readAsync option was removed (modify readAsync in JS)");
x("undefined" == typeof h.readBinary, "Module.readBinary option was removed (modify readBinary in JS)");
x("undefined" == typeof h.setWindowTitle, "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");
x("undefined" == typeof h.TOTAL_MEMORY, "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
w("asm", "wasmExports");
w("read", "read_");
w("readAsync", "readAsync");
w("readBinary", "readBinary");
w("setWindowTitle", "setWindowTitle");
x(!0, "web environment detected but not enabled at build time.  Add 'web' to `-sENVIRONMENT` to enable.");
x(!0, "node environment detected but not enabled at build time.  Add 'node' to `-sENVIRONMENT` to enable.");
x(!0, "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable.");
var ja;
h.wasmBinary && (ja = h.wasmBinary);
w("wasmBinary", "wasmBinary");
"object" != typeof WebAssembly && n("no native wasm support detected");
var ka, la = !1;
function x(a, b) {
  a || n("Assertion failed" + (b ? ": " + b : ""));
}
var y, D, ma, na, E, F, oa, pa;
function qa() {
  var a = ka.buffer;
  h.HEAP8 = y = new Int8Array(a);
  h.HEAP16 = ma = new Int16Array(a);
  h.HEAPU8 = D = new Uint8Array(a);
  h.HEAPU16 = na = new Uint16Array(a);
  h.HEAP32 = E = new Int32Array(a);
  h.HEAPU32 = F = new Uint32Array(a);
  h.HEAPF32 = oa = new Float32Array(a);
  h.HEAPF64 = pa = new Float64Array(a);
}
x(!h.STACK_SIZE, "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");
x("undefined" != typeof Int32Array && "undefined" !== typeof Float64Array && void 0 != Int32Array.prototype.subarray && void 0 != Int32Array.prototype.set, "JS engine does not provide full typed array support");
x(!h.wasmMemory, "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");
x(!h.INITIAL_MEMORY, "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
function ra() {
  var a = sa();
  x(0 == (a & 3));
  0 == a && (a += 4);
  F[a >> 2] = 34821223;
  F[a + 4 >> 2] = 2310721022;
  F[0] = 1668509029;
}
function ua() {
  if (!la) {
    var a = sa();
    0 == a && (a += 4);
    var b = F[a >> 2], c = F[a + 4 >> 2];
    34821223 == b && 2310721022 == c || n(`Stack overflow! Stack cookie has been overwritten at ${va(a)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${va(c)} ${va(b)}`);
    1668509029 != F[0] && n("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}
var wa = new Int16Array(1), xa = new Int8Array(wa.buffer);
wa[0] = 25459;
if (115 !== xa[0] || 99 !== xa[1]) {
  throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
}
var ya = [], za = [], Aa = [], Ba = [], Ca = !1;
function Da() {
  var a = h.preRun.shift();
  ya.unshift(a);
}
x(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
x(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
x(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
x(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
var G = 0, Ea = null, Fa = null, Ga = {};
function Ha() {
  G++;
  h.monitorRunDependencies?.(G);
  x(!Ga["wasm-instantiate"]);
  Ga["wasm-instantiate"] = 1;
  null === Ea && "undefined" != typeof setInterval && (Ea = setInterval(() => {
    if (la) {
      clearInterval(Ea), Ea = null;
    } else {
      var a = !1, b;
      for (b in Ga) {
        a || (a = !0, u("still waiting on run dependencies:")), u(`dependency: ${b}`);
      }
      a && u("(end of list)");
    }
  }, 10000));
}
function n(a) {
  h.onAbort?.(a);
  a = "Aborted(" + a + ")";
  u(a);
  la = !0;
  a = new WebAssembly.RuntimeError(a);
  ba(a);
  throw a;
}
var Ia = a => a.startsWith("data:application/octet-stream;base64,"), Ja = a => a.startsWith("file://");
function I(a) {
  return function() {
    x(Ca, `native function \`${a}\` called before runtime initialization`);
    var b = J[a];
    x(b, `exported native function \`${a}\` not found`);
    return b.apply(null, arguments);
  };
}
var K;
if (h.locateFile) {
  if (K = "jxl.wasm", !Ia(K)) {
    var Ka = K;
    K = h.locateFile ? h.locateFile(Ka, p) : p + Ka;
  }
} else {
  K = (new URL("jxl.wasm", import.meta.url)).href;
}
function La(a) {
  if (a == K && ja) {
    return new Uint8Array(ja);
  }
  if (ha) {
    return ha(a);
  }
  throw "both async and sync fetching of the wasm failed";
}
function Ma(a) {
  return ja || "function" != typeof fetch ? Promise.resolve().then(() => La(a)) : fetch(a, {credentials:"same-origin"}).then(b => {
    if (!b.ok) {
      throw "failed to load wasm binary file at '" + a + "'";
    }
    return b.arrayBuffer();
  }).catch(() => La(a));
}
function Na(a, b, c) {
  return Ma(a).then(d => WebAssembly.instantiate(d, b)).then(d => d).then(c, d => {
    u(`failed to asynchronously prepare wasm: ${d}`);
    Ja(K) && u(`warning: Loading from a file URI (${K}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    n(d);
  });
}
function Oa(a, b) {
  var c = K;
  return ja || "function" != typeof WebAssembly.instantiateStreaming || Ia(c) || "function" != typeof fetch ? Na(c, a, b) : fetch(c, {credentials:"same-origin"}).then(d => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
    u(`wasm streaming compile failed: ${e}`);
    u("falling back to ArrayBuffer instantiation");
    return Na(c, a, b);
  }));
}
var L, M;
function w(a, b) {
  Object.getOwnPropertyDescriptor(h, a) || Object.defineProperty(h, a, {configurable:!0, get() {
    n(`\`Module.${a}\` has been replaced by \`${b}\`` + " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
  }});
}
function Pa(a) {
  return "FS_createPath" === a || "FS_createDataFile" === a || "FS_createPreloadedFile" === a || "FS_unlink" === a || "addRunDependency" === a || "FS_createLazyFile" === a || "FS_createDevice" === a || "removeRunDependency" === a;
}
function Qa(a, b) {
  "undefined" !== typeof globalThis && Object.defineProperty(globalThis, a, {configurable:!0, get() {
    N(`\`${a}\` is not longer defined by emscripten. ${b}`);
  }});
}
Qa("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");
Qa("asm", "Please use wasmExports instead");
function Ra(a) {
  Object.getOwnPropertyDescriptor(h, a) || Object.defineProperty(h, a, {configurable:!0, get() {
    var b = `'${a}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
    Pa(a) && (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    n(b);
  }});
}
function Sa(a) {
  this.name = "ExitStatus";
  this.message = `Program terminated with exit(${a})`;
  this.status = a;
}
var Ta = a => {
  for (; 0 < a.length;) {
    a.shift()(h);
  }
}, Ua = h.noExitRuntime || !0, va = a => {
  x("number" === typeof a);
  return "0x" + (a >>> 0).toString(16).padStart(8, "0");
}, N = a => {
  N.ca || (N.ca = {});
  N.ca[a] || (N.ca[a] = 1, u(a));
};
function Va(a) {
  this.V = a - 24;
  this.Ha = function(b) {
    F[this.V + 4 >> 2] = b;
  };
  this.za = function(b) {
    F[this.V + 8 >> 2] = b;
  };
  this.G = function(b, c) {
    this.$();
    this.Ha(b);
    this.za(c);
  };
  this.$ = function() {
    F[this.V + 16 >> 2] = 0;
  };
}
var Wa = 0, Xa = (a, b) => {
  for (var c = 0, d = a.length - 1; 0 <= d; d--) {
    var e = a[d];
    "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
  }
  if (b) {
    for (; c; c--) {
      a.unshift("..");
    }
  }
  return a;
}, Ya = a => {
  var b = "/" === a.charAt(0), c = "/" === a.substr(-1);
  (a = Xa(a.split("/").filter(d => !!d), !b).join("/")) || b || (a = ".");
  a && c && (a += "/");
  return (b ? "/" : "") + a;
}, Za = a => {
  var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
  a = b[0];
  b = b[1];
  if (!a && !b) {
    return ".";
  }
  b &&= b.substr(0, b.length - 1);
  return a + b;
}, $a = a => {
  if ("/" === a) {
    return "/";
  }
  a = Ya(a);
  a = a.replace(/\/$/, "");
  var b = a.lastIndexOf("/");
  return -1 === b ? a : a.substr(b + 1);
}, ab = () => {
  if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
    return a => crypto.getRandomValues(a);
  }
  n("no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: (array) => { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
}, bb = a => (bb = ab())(a);
function cb() {
  for (var a = "", b = !1, c = arguments.length - 1; -1 <= c && !b; c--) {
    b = 0 <= c ? arguments[c] : "/";
    if ("string" != typeof b) {
      throw new TypeError("Arguments to path.resolve must be strings");
    }
    if (!b) {
      return "";
    }
    a = b + "/" + a;
    b = "/" === b.charAt(0);
  }
  a = Xa(a.split("/").filter(d => !!d), !b).join("/");
  return (b ? "/" : "") + a || ".";
}
var db = new TextDecoder("utf8"), eb = a => {
  for (var b = 0; a[b] && !(NaN <= b);) {
    ++b;
  }
  return db.decode(a.buffer ? a.subarray(0, b) : new Uint8Array(a.slice(0, b)));
}, fb = [], gb = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
  }
  return b;
}, hb = (a, b, c, d) => {
  x("string" === typeof a, `stringToUTF8Array expects a string (got ${typeof a})`);
  if (!(0 < d)) {
    return 0;
  }
  var e = c;
  d = c + d - 1;
  for (var f = 0; f < a.length; ++f) {
    var l = a.charCodeAt(f);
    if (55296 <= l && 57343 >= l) {
      var q = a.charCodeAt(++f);
      l = 65536 + ((l & 1023) << 10) | q & 1023;
    }
    if (127 >= l) {
      if (c >= d) {
        break;
      }
      b[c++] = l;
    } else {
      if (2047 >= l) {
        if (c + 1 >= d) {
          break;
        }
        b[c++] = 192 | l >> 6;
      } else {
        if (65535 >= l) {
          if (c + 2 >= d) {
            break;
          }
          b[c++] = 224 | l >> 12;
        } else {
          if (c + 3 >= d) {
            break;
          }
          1114111 < l && N("Invalid Unicode code point " + va(l) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
          b[c++] = 240 | l >> 18;
          b[c++] = 128 | l >> 12 & 63;
        }
        b[c++] = 128 | l >> 6 & 63;
      }
      b[c++] = 128 | l & 63;
    }
  }
  b[c] = 0;
  return c - e;
};
function ib(a, b) {
  var c = Array(gb(a) + 1);
  a = hb(a, c, 0, c.length);
  b && (c.length = a);
  return c;
}
var jb = [];
function kb(a, b) {
  jb[a] = {input:[], m:[], I:b};
  lb(a, mb);
}
var mb = {open(a) {
  var b = jb[a.node.M];
  if (!b) {
    throw new O(43);
  }
  a.j = b;
  a.seekable = !1;
}, close(a) {
  a.j.I.S(a.j);
}, S(a) {
  a.j.I.S(a.j);
}, read(a, b, c, d) {
  if (!a.j || !a.j.I.ha) {
    throw new O(60);
  }
  for (var e = 0, f = 0; f < d; f++) {
    try {
      var l = a.j.I.ha(a.j);
    } catch (q) {
      throw new O(29);
    }
    if (void 0 === l && 0 === e) {
      throw new O(6);
    }
    if (null === l || void 0 === l) {
      break;
    }
    e++;
    b[c + f] = l;
  }
  e && (a.node.timestamp = Date.now());
  return e;
}, write(a, b, c, d) {
  if (!a.j || !a.j.I.aa) {
    throw new O(60);
  }
  try {
    for (var e = 0; e < d; e++) {
      a.j.I.aa(a.j, b[c + e]);
    }
  } catch (f) {
    throw new O(29);
  }
  d && (a.node.timestamp = Date.now());
  return e;
}}, nb = {ha() {
  a: {
    if (!fb.length) {
      var a = null;
      "undefined" != typeof window && "function" == typeof window.prompt ? (a = window.prompt("Input: "), null !== a && (a += "\n")) : "function" == typeof readline && (a = readline(), null !== a && (a += "\n"));
      if (!a) {
        a = null;
        break a;
      }
      fb = ib(a, !0);
    }
    a = fb.shift();
  }
  return a;
}, aa(a, b) {
  null === b || 10 === b ? (ia(eb(a.m)), a.m = []) : 0 != b && a.m.push(b);
}, S(a) {
  a.m && 0 < a.m.length && (ia(eb(a.m)), a.m = []);
}, Ca() {
  return {Xa:25856, Za:5, Wa:191, Ya:35387, Va:[3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]};
}, Da() {
  return 0;
}, Ea() {
  return [24, 80];
}}, ob = {aa(a, b) {
  null === b || 10 === b ? (u(eb(a.m)), a.m = []) : 0 != b && a.m.push(b);
}, S(a) {
  a.m && 0 < a.m.length && (u(eb(a.m)), a.m = []);
}};
function pb(a, b) {
  var c = a.h ? a.h.length : 0;
  c >= b || (b = Math.max(b, c * (1048576 > c ? 2.0 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.h, a.h = new Uint8Array(b), 0 < a.l && a.h.set(c.subarray(0, a.l), 0));
}
var P = {A:null, H() {
  return P.createNode(null, "/", 16895, 0);
}, createNode(a, b, c, d) {
  if (24576 === (c & 61440) || 4096 === (c & 61440)) {
    throw new O(63);
  }
  P.A || (P.A = {dir:{node:{v:P.g.v, C:P.g.C, O:P.g.O, T:P.g.T, oa:P.g.oa, qa:P.g.qa, pa:P.g.pa, ma:P.g.ma, W:P.g.W}, stream:{J:P.i.J}}, file:{node:{v:P.g.v, C:P.g.C}, stream:{J:P.i.J, read:P.i.read, write:P.i.write, R:P.i.R, ja:P.i.ja, la:P.i.la}}, link:{node:{v:P.g.v, C:P.g.C, P:P.g.P}, stream:{}}, ea:{node:{v:P.g.v, C:P.g.C}, stream:qb}});
  c = rb(a, b, c, d);
  16384 === (c.mode & 61440) ? (c.g = P.A.dir.node, c.i = P.A.dir.stream, c.h = {}) : 32768 === (c.mode & 61440) ? (c.g = P.A.file.node, c.i = P.A.file.stream, c.l = 0, c.h = null) : 40960 === (c.mode & 61440) ? (c.g = P.A.link.node, c.i = P.A.link.stream) : 8192 === (c.mode & 61440) && (c.g = P.A.ea.node, c.i = P.A.ea.stream);
  c.timestamp = Date.now();
  a && (a.h[b] = c, a.timestamp = c.timestamp);
  return c;
}, $a(a) {
  return a.h ? a.h.subarray ? a.h.subarray(0, a.l) : new Uint8Array(a.h) : new Uint8Array(0);
}, g:{v(a) {
  var b = {};
  b.wa = 8192 === (a.mode & 61440) ? a.id : 1;
  b.ia = a.id;
  b.mode = a.mode;
  b.La = 1;
  b.uid = 0;
  b.ya = 0;
  b.M = a.M;
  16384 === (a.mode & 61440) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.l : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
  b.sa = new Date(a.timestamp);
  b.Ja = new Date(a.timestamp);
  b.va = new Date(a.timestamp);
  b.ta = 4096;
  b.ua = Math.ceil(b.size / b.ta);
  return b;
}, C(a, b) {
  void 0 !== b.mode && (a.mode = b.mode);
  void 0 !== b.timestamp && (a.timestamp = b.timestamp);
  if (void 0 !== b.size && (b = b.size, a.l != b)) {
    if (0 == b) {
      a.h = null, a.l = 0;
    } else {
      var c = a.h;
      a.h = new Uint8Array(b);
      c && a.h.set(c.subarray(0, Math.min(b, a.l)));
      a.l = b;
    }
  }
}, O() {
  throw sb[44];
}, T(a, b, c, d) {
  return P.createNode(a, b, c, d);
}, oa(a, b, c) {
  if (16384 === (a.mode & 61440)) {
    try {
      var d = tb(b, c);
    } catch (f) {
    }
    if (d) {
      for (var e in d.h) {
        throw new O(55);
      }
    }
  }
  delete a.parent.h[a.name];
  a.parent.timestamp = Date.now();
  a.name = c;
  b.h[c] = a;
  b.timestamp = a.parent.timestamp;
  a.parent = b;
}, qa(a, b) {
  delete a.h[b];
  a.timestamp = Date.now();
}, pa(a, b) {
  var c = tb(a, b), d;
  for (d in c.h) {
    throw new O(55);
  }
  delete a.h[b];
  a.timestamp = Date.now();
}, ma(a) {
  var b = [".", ".."], c;
  for (c of Object.keys(a.h)) {
    b.push(c);
  }
  return b;
}, W(a, b, c) {
  a = P.createNode(a, b, 41471, 0);
  a.link = c;
  return a;
}, P(a) {
  if (40960 !== (a.mode & 61440)) {
    throw new O(28);
  }
  return a.link;
}}, i:{read(a, b, c, d, e) {
  var f = a.node.h;
  if (e >= a.node.l) {
    return 0;
  }
  a = Math.min(a.node.l - e, d);
  x(0 <= a);
  if (8 < a && f.subarray) {
    b.set(f.subarray(e, e + a), c);
  } else {
    for (d = 0; d < a; d++) {
      b[c + d] = f[e + d];
    }
  }
  return a;
}, write(a, b, c, d, e, f) {
  x(!(b instanceof ArrayBuffer));
  b.buffer === y.buffer && (f = !1);
  if (!d) {
    return 0;
  }
  a = a.node;
  a.timestamp = Date.now();
  if (b.subarray && (!a.h || a.h.subarray)) {
    if (f) {
      return x(0 === e, "canOwn must imply no weird position inside the file"), a.h = b.subarray(c, c + d), a.l = d;
    }
    if (0 === a.l && 0 === e) {
      return a.h = b.slice(c, c + d), a.l = d;
    }
    if (e + d <= a.l) {
      return a.h.set(b.subarray(c, c + d), e), d;
    }
  }
  pb(a, e + d);
  if (a.h.subarray && b.subarray) {
    a.h.set(b.subarray(c, c + d), e);
  } else {
    for (f = 0; f < d; f++) {
      a.h[e + f] = b[c + f];
    }
  }
  a.l = Math.max(a.l, e + d);
  return d;
}, J(a, b, c) {
  1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.l);
  if (0 > b) {
    throw new O(28);
  }
  return b;
}, R(a, b, c) {
  pb(a.node, b + c);
  a.node.l = Math.max(a.node.l, b + c);
}, ja(a, b, c, d, e) {
  if (32768 !== (a.node.mode & 61440)) {
    throw new O(43);
  }
  a = a.node.h;
  if (e & 2 || a.buffer !== y.buffer) {
    if (0 < c || c + b < a.length) {
      a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
    }
    c = !0;
    n("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported");
    b = void 0;
    if (!b) {
      throw new O(48);
    }
    y.set(a, b);
  } else {
    c = !1, b = a.byteOffset;
  }
  return {V:b, s:c};
}, la(a, b, c, d) {
  P.i.write(a, b, 0, d, c, !1);
  return 0;
}}}, ub = (a, b) => {
  var c = 0;
  a && (c |= 365);
  b && (c |= 146);
  return c;
}, vb = {0:"Success", 1:"Arg list too long", 2:"Permission denied", 3:"Address already in use", 4:"Address not available", 5:"Address family not supported by protocol family", 6:"No more processes", 7:"Socket already connected", 8:"Bad file number", 9:"Trying to read unreadable message", 10:"Mount device busy", 11:"Operation canceled", 12:"No children", 13:"Connection aborted", 14:"Connection refused", 15:"Connection reset by peer", 16:"File locking deadlock error", 17:"Destination address required", 
18:"Math arg out of domain of func", 19:"Quota exceeded", 20:"File exists", 21:"Bad address", 22:"File too large", 23:"Host is unreachable", 24:"Identifier removed", 25:"Illegal byte sequence", 26:"Connection already in progress", 27:"Interrupted system call", 28:"Invalid argument", 29:"I/O error", 30:"Socket is already connected", 31:"Is a directory", 32:"Too many symbolic links", 33:"Too many open files", 34:"Too many links", 35:"Message too long", 36:"Multihop attempted", 37:"File or path name too long", 
38:"Network interface is not configured", 39:"Connection reset by network", 40:"Network is unreachable", 41:"Too many open files in system", 42:"No buffer space available", 43:"No such device", 44:"No such file or directory", 45:"Exec format error", 46:"No record locks available", 47:"The link has been severed", 48:"Not enough core", 49:"No message of desired type", 50:"Protocol not available", 51:"No space left on device", 52:"Function not implemented", 53:"Socket is not connected", 54:"Not a directory", 
55:"Directory not empty", 56:"State not recoverable", 57:"Socket operation on non-socket", 59:"Not a typewriter", 60:"No such device or address", 61:"Value too large for defined data type", 62:"Previous owner died", 63:"Not super-user", 64:"Broken pipe", 65:"Protocol error", 66:"Unknown protocol", 67:"Protocol wrong type for socket", 68:"Math result not representable", 69:"Read only file system", 70:"Illegal seek", 71:"No such process", 72:"Stale file handle", 73:"Connection timed out", 74:"Text file busy", 
75:"Cross-device link", 100:"Device not a stream", 101:"Bad font file fmt", 102:"Invalid slot", 103:"Invalid request code", 104:"No anode", 105:"Block device required", 106:"Channel number out of range", 107:"Level 3 halted", 108:"Level 3 reset", 109:"Link number out of range", 110:"Protocol driver not attached", 111:"No CSI structure available", 112:"Level 2 halted", 113:"Invalid exchange", 114:"Invalid request descriptor", 115:"Exchange full", 116:"No data (for no delay io)", 117:"Timer expired", 
118:"Out of streams resources", 119:"Machine is not on the network", 120:"Package not installed", 121:"The object is remote", 122:"Advertise error", 123:"Srmount error", 124:"Communication error on send", 125:"Cross mount point (not really error)", 126:"Given log. name not unique", 127:"f.d. invalid for this operation", 128:"Remote address changed", 129:"Can   access a needed shared lib", 130:"Accessing a corrupted shared lib", 131:".lib section in a.out corrupted", 132:"Attempting to link in too many libs", 
133:"Attempting to exec a shared library", 135:"Streams pipe error", 136:"Too many users", 137:"Socket type not supported", 138:"Not supported", 139:"Protocol family not supported", 140:"Can't send after socket shutdown", 141:"Too many references", 142:"Host is down", 148:"No medium (in tape drive)", 156:"Level 2 not synchronized"}, wb = {EPERM:63, ENOENT:44, ESRCH:71, EINTR:27, EIO:29, ENXIO:60, E2BIG:1, ENOEXEC:45, EBADF:8, ECHILD:12, EAGAIN:6, EWOULDBLOCK:6, ENOMEM:48, EACCES:2, EFAULT:21, ENOTBLK:105, 
EBUSY:10, EEXIST:20, EXDEV:75, ENODEV:43, ENOTDIR:54, EISDIR:31, EINVAL:28, ENFILE:41, EMFILE:33, ENOTTY:59, ETXTBSY:74, EFBIG:22, ENOSPC:51, ESPIPE:70, EROFS:69, EMLINK:34, EPIPE:64, EDOM:18, ERANGE:68, ENOMSG:49, EIDRM:24, ECHRNG:106, EL2NSYNC:156, EL3HLT:107, EL3RST:108, ELNRNG:109, EUNATCH:110, ENOCSI:111, EL2HLT:112, EDEADLK:16, ENOLCK:46, EBADE:113, EBADR:114, EXFULL:115, ENOANO:104, EBADRQC:103, EBADSLT:102, EDEADLOCK:16, EBFONT:101, ENOSTR:100, ENODATA:116, ETIME:117, ENOSR:118, ENONET:119, 
ENOPKG:120, EREMOTE:121, ENOLINK:47, EADV:122, ESRMNT:123, ECOMM:124, EPROTO:65, EMULTIHOP:36, EDOTDOT:125, EBADMSG:9, ENOTUNIQ:126, EBADFD:127, EREMCHG:128, ELIBACC:129, ELIBBAD:130, ELIBSCN:131, ELIBMAX:132, ELIBEXEC:133, ENOSYS:52, ENOTEMPTY:55, ENAMETOOLONG:37, ELOOP:32, EOPNOTSUPP:138, EPFNOSUPPORT:139, ECONNRESET:15, ENOBUFS:42, EAFNOSUPPORT:5, EPROTOTYPE:67, ENOTSOCK:57, ENOPROTOOPT:50, ESHUTDOWN:140, ECONNREFUSED:14, EADDRINUSE:3, ECONNABORTED:13, ENETUNREACH:40, ENETDOWN:38, ETIMEDOUT:73, 
EHOSTDOWN:142, EHOSTUNREACH:23, EINPROGRESS:26, EALREADY:7, EDESTADDRREQ:17, EMSGSIZE:35, EPROTONOSUPPORT:66, ESOCKTNOSUPPORT:137, EADDRNOTAVAIL:4, ENETRESET:39, EISCONN:30, ENOTCONN:53, ETOOMANYREFS:141, EUSERS:136, EDQUOT:19, ESTALE:72, ENOTSUP:138, ENOMEDIUM:148, EILSEQ:25, EOVERFLOW:61, ECANCELED:11, ENOTRECOVERABLE:56, EOWNERDEAD:62, ESTRPIPE:135}, xb = a => a.replace(/\b_Z[\w\d_]+/g, function(b) {
  N("warning: build with -sDEMANGLE_SUPPORT to link in libcxxabi demangling");
  return b === b ? b : b + " [" + b + "]";
}), yb = null, zb = {}, Ab = [], Bb = 1, Cb = null, Db = !0, O = null, sb = {};
function Q(a, b = {}) {
  a = cb(a);
  if (!a) {
    return {path:"", node:null};
  }
  b = Object.assign({fa:!0, ba:0}, b);
  if (8 < b.ba) {
    throw new O(32);
  }
  a = a.split("/").filter(l => !!l);
  for (var c = yb, d = "/", e = 0; e < a.length; e++) {
    var f = e === a.length - 1;
    if (f && b.parent) {
      break;
    }
    c = tb(c, a[e]);
    d = Ya(d + "/" + a[e]);
    c.U && (!f || f && b.fa) && (c = c.U.root);
    if (!f || b.N) {
      for (f = 0; 40960 === (c.mode & 61440);) {
        if (c = Eb(d), d = cb(Za(d), c), c = Q(d, {ba:b.ba + 1}).node, 40 < f++) {
          throw new O(32);
        }
      }
    }
  }
  return {path:d, node:c};
}
function Fb(a) {
  for (var b;;) {
    if (a === a.parent) {
      return a = a.H.ka, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
    }
    b = b ? `${a.name}/${b}` : a.name;
    a = a.parent;
  }
}
function Gb(a, b) {
  for (var c = 0, d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d) | 0;
  }
  return (a + c >>> 0) % Cb.length;
}
function tb(a, b) {
  var c;
  if (c = (c = Hb(a, "x")) ? c : a.g.O ? 0 : 2) {
    throw new O(c, a);
  }
  for (c = Cb[Gb(a.id, b)]; c; c = c.Ka) {
    var d = c.name;
    if (c.parent.id === a.id && d === b) {
      return c;
    }
  }
  return a.g.O(a, b);
}
function rb(a, b, c, d) {
  x("object" == typeof a);
  a = new Ib(a, b, c, d);
  b = Gb(a.parent.id, a.name);
  a.Ka = Cb[b];
  return Cb[b] = a;
}
function Jb(a) {
  var b = ["r", "w", "rw"][a & 3];
  a & 512 && (b += "w");
  return b;
}
function Hb(a, b) {
  if (Db) {
    return 0;
  }
  if (!b.includes("r") || a.mode & 292) {
    if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73)) {
      return 2;
    }
  } else {
    return 2;
  }
  return 0;
}
function Kb(a, b) {
  try {
    return tb(a, b), 20;
  } catch (c) {
  }
  return Hb(a, "wx");
}
function Lb() {
  for (var a = 0; 4096 >= a; a++) {
    if (!Ab[a]) {
      return a;
    }
  }
  throw new O(33);
}
function R(a) {
  a = Ab[a];
  if (!a) {
    throw new O(8);
  }
  return a;
}
function Mb(a, b = -1) {
  Nb || (Nb = function() {
    this.G = {};
  }, Nb.prototype = {}, Object.defineProperties(Nb.prototype, {object:{get() {
    return this.node;
  }, set(c) {
    this.node = c;
  }}, flags:{get() {
    return this.G.flags;
  }, set(c) {
    this.G.flags = c;
  }}, position:{get() {
    return this.G.position;
  }, set(c) {
    this.G.position = c;
  }}}));
  a = Object.assign(new Nb(), a);
  -1 == b && (b = Lb());
  a.o = b;
  return Ab[b] = a;
}
var qb = {open(a) {
  a.i = zb[a.node.M].i;
  a.i.open?.(a);
}, J() {
  throw new O(70);
}};
function lb(a, b) {
  zb[a] = {i:b};
}
function Ob(a, b) {
  if ("string" == typeof a) {
    throw a;
  }
  var c = "/" === b, d = !b;
  if (c && yb) {
    throw new O(10);
  }
  if (!c && !d) {
    var e = Q(b, {fa:!1});
    b = e.path;
    e = e.node;
    if (e.U) {
      throw new O(10);
    }
    if (16384 !== (e.mode & 61440)) {
      throw new O(54);
    }
  }
  b = {type:a, bb:{}, ka:b, Ia:[]};
  a = a.H(b);
  a.H = b;
  b.root = a;
  c ? yb = a : e && (e.U = b, e.H && e.H.Ia.push(b));
}
function Pb(a, b, c) {
  var d = Q(a, {parent:!0}).node;
  a = $a(a);
  if (!a || "." === a || ".." === a) {
    throw new O(28);
  }
  var e = Kb(d, a);
  if (e) {
    throw new O(e);
  }
  if (!d.g.T) {
    throw new O(63);
  }
  return d.g.T(d, a, b, c);
}
function S(a) {
  return Pb(a, 16895, 0);
}
function Qb(a, b, c) {
  "undefined" == typeof c && (c = b, b = 438);
  Pb(a, b | 8192, c);
}
function Rb(a, b) {
  if (!cb(a)) {
    throw new O(44);
  }
  var c = Q(b, {parent:!0}).node;
  if (!c) {
    throw new O(44);
  }
  b = $a(b);
  var d = Kb(c, b);
  if (d) {
    throw new O(d);
  }
  if (!c.g.W) {
    throw new O(63);
  }
  c.g.W(c, b, a);
}
function Eb(a) {
  a = Q(a).node;
  if (!a) {
    throw new O(44);
  }
  if (!a.g.P) {
    throw new O(28);
  }
  return cb(Fb(a.parent), a.g.P(a));
}
function Sb(a, b) {
  a = Q(a, {N:!b}).node;
  if (!a) {
    throw new O(44);
  }
  if (!a.g.v) {
    throw new O(63);
  }
  return a.g.v(a);
}
function Tb(a) {
  return Sb(a, !0);
}
function Ub(a, b, c) {
  if ("" === a) {
    throw new O(44);
  }
  if ("string" == typeof b) {
    var d = {r:0, "r+":2, w:577, "w+":578, a:1089, "a+":1090}[b];
    if ("undefined" == typeof d) {
      throw Error(`Unknown file open mode: ${b}`);
    }
    b = d;
  }
  c = b & 64 ? ("undefined" == typeof c ? 438 : c) & 4095 | 32768 : 0;
  if ("object" == typeof a) {
    var e = a;
  } else {
    a = Ya(a);
    try {
      e = Q(a, {N:!(b & 131072)}).node;
    } catch (f) {
    }
  }
  d = !1;
  if (b & 64) {
    if (e) {
      if (b & 128) {
        throw new O(20);
      }
    } else {
      e = Pb(a, c, 0), d = !0;
    }
  }
  if (!e) {
    throw new O(44);
  }
  8192 === (e.mode & 61440) && (b &= -513);
  if (b & 65536 && 16384 !== (e.mode & 61440)) {
    throw new O(54);
  }
  if (!d && (c = e ? 40960 === (e.mode & 61440) ? 32 : 16384 === (e.mode & 61440) && ("r" !== Jb(b) || b & 512) ? 31 : Hb(e, Jb(b)) : 44)) {
    throw new O(c);
  }
  if (b & 512 && !d) {
    c = e;
    c = "string" == typeof c ? Q(c, {N:!0}).node : c;
    if (!c.g.C) {
      throw new O(63);
    }
    if (16384 === (c.mode & 61440)) {
      throw new O(31);
    }
    if (32768 !== (c.mode & 61440)) {
      throw new O(28);
    }
    if (d = Hb(c, "w")) {
      throw new O(d);
    }
    c.g.C(c, {size:0, timestamp:Date.now()});
  }
  b &= -131713;
  e = Mb({node:e, path:Fb(e), flags:b, seekable:!0, position:0, i:e.i, Ua:[], error:!1});
  e.i.open && e.i.open(e);
  !h.logReadFiles || b & 1 || (Vb ||= {}, a in Vb || (Vb[a] = 1));
  return e;
}
function Wb(a, b, c) {
  if (null === a.o) {
    throw new O(8);
  }
  if (!a.seekable || !a.i.J) {
    throw new O(70);
  }
  if (0 != c && 1 != c && 2 != c) {
    throw new O(28);
  }
  a.position = a.i.J(a, b, c);
  a.Ua = [];
}
function Xb() {
  O || (O = function(a, b) {
    this.name = "ErrnoError";
    this.node = b;
    this.Pa = function(c) {
      this.u = c;
      for (var d in wb) {
        if (wb[d] === c) {
          this.code = d;
          break;
        }
      }
    };
    this.Pa(a);
    this.message = vb[a];
    this.stack && (Object.defineProperty(this, "stack", {value:Error().stack, writable:!0}), this.stack = xb(this.stack));
  }, O.prototype = Error(), O.prototype.constructor = O, [44].forEach(a => {
    sb[a] = new O(a);
    sb[a].stack = "<generic error, no stack>";
  }));
}
var Yb;
function Zb(a, b, c) {
  a = Ya("/dev/" + a);
  var d = ub(!!b, !!c);
  $b ||= 64;
  var e = $b++ << 8 | 0;
  lb(e, {open(f) {
    f.seekable = !1;
  }, close() {
    c?.buffer?.length && c(10);
  }, read(f, l, q, m) {
    for (var k = 0, t = 0; t < m; t++) {
      try {
        var A = b();
      } catch (r) {
        throw new O(29);
      }
      if (void 0 === A && 0 === k) {
        throw new O(6);
      }
      if (null === A || void 0 === A) {
        break;
      }
      k++;
      l[q + t] = A;
    }
    k && (f.node.timestamp = Date.now());
    return k;
  }, write(f, l, q, m) {
    for (var k = 0; k < m; k++) {
      try {
        c(l[q + k]);
      } catch (t) {
        throw new O(29);
      }
    }
    m && (f.node.timestamp = Date.now());
    return k;
  }});
  Qb(a, d, e);
}
var $b, T = {}, Nb, Vb, ac = (a, b) => {
  x("number" == typeof a, `UTF8ToString expects a number (got ${typeof a})`);
  if (!a) {
    return "";
  }
  b = a + b;
  for (var c = a; !(c >= b) && D[c];) {
    ++c;
  }
  return db.decode(D.subarray(a, c));
};
function bc(a, b, c) {
  if ("/" === b.charAt(0)) {
    return b;
  }
  a = -100 === a ? "/" : R(a).path;
  if (0 == b.length) {
    if (!c) {
      throw new O(44);
    }
    return a;
  }
  return Ya(a + "/" + b);
}
function cc(a, b, c) {
  try {
    var d = a(b);
  } catch (f) {
    if (f && f.node && Ya(b) !== Ya(Fb(f.node))) {
      return -54;
    }
    throw f;
  }
  E[c >> 2] = d.wa;
  E[c + 4 >> 2] = d.mode;
  F[c + 8 >> 2] = d.La;
  E[c + 12 >> 2] = d.uid;
  E[c + 16 >> 2] = d.ya;
  E[c + 20 >> 2] = d.M;
  M = [d.size >>> 0, (L = d.size, 1.0 <= +Math.abs(L) ? 0.0 < L ? +Math.floor(L / 4294967296.0) >>> 0 : ~~+Math.ceil((L - +(~~L >>> 0)) / 4294967296.0) >>> 0 : 0)];
  E[c + 24 >> 2] = M[0];
  E[c + 28 >> 2] = M[1];
  E[c + 32 >> 2] = 4096;
  E[c + 36 >> 2] = d.ua;
  a = d.sa.getTime();
  b = d.Ja.getTime();
  var e = d.va.getTime();
  M = [Math.floor(a / 1000) >>> 0, (L = Math.floor(a / 1000), 1.0 <= +Math.abs(L) ? 0.0 < L ? +Math.floor(L / 4294967296.0) >>> 0 : ~~+Math.ceil((L - +(~~L >>> 0)) / 4294967296.0) >>> 0 : 0)];
  E[c + 40 >> 2] = M[0];
  E[c + 44 >> 2] = M[1];
  F[c + 48 >> 2] = a % 1000 * 1000;
  M = [Math.floor(b / 1000) >>> 0, (L = Math.floor(b / 1000), 1.0 <= +Math.abs(L) ? 0.0 < L ? +Math.floor(L / 4294967296.0) >>> 0 : ~~+Math.ceil((L - +(~~L >>> 0)) / 4294967296.0) >>> 0 : 0)];
  E[c + 56 >> 2] = M[0];
  E[c + 60 >> 2] = M[1];
  F[c + 64 >> 2] = b % 1000 * 1000;
  M = [Math.floor(e / 1000) >>> 0, (L = Math.floor(e / 1000), 1.0 <= +Math.abs(L) ? 0.0 < L ? +Math.floor(L / 4294967296.0) >>> 0 : ~~+Math.ceil((L - +(~~L >>> 0)) / 4294967296.0) >>> 0 : 0)];
  E[c + 72 >> 2] = M[0];
  E[c + 76 >> 2] = M[1];
  F[c + 80 >> 2] = e % 1000 * 1000;
  M = [d.ia >>> 0, (L = d.ia, 1.0 <= +Math.abs(L) ? 0.0 < L ? +Math.floor(L / 4294967296.0) >>> 0 : ~~+Math.ceil((L - +(~~L >>> 0)) / 4294967296.0) >>> 0 : 0)];
  E[c + 88 >> 2] = M[0];
  E[c + 92 >> 2] = M[1];
  return 0;
}
var dc = void 0;
function U() {
  x(void 0 != dc);
  var a = E[+dc >> 2];
  dc += 4;
  return a;
}
var ec, V = a => {
  for (var b = ""; D[a];) {
    b += ec[D[a++]];
  }
  return b;
}, fc = {}, gc = {}, hc = {}, W, ic = a => {
  throw new W(a);
}, jc, kc = (a, b) => {
  function c(q) {
    q = b(q);
    if (q.length !== d.length) {
      throw new jc("Mismatched type converter count");
    }
    for (var m = 0; m < d.length; ++m) {
      X(d[m], q[m]);
    }
  }
  var d = [];
  d.forEach(function(q) {
    hc[q] = a;
  });
  var e = Array(a.length), f = [], l = 0;
  a.forEach((q, m) => {
    gc.hasOwnProperty(q) ? e[m] = gc[q] : (f.push(q), fc.hasOwnProperty(q) || (fc[q] = []), fc[q].push(() => {
      e[m] = gc[q];
      ++l;
      l === f.length && c(e);
    }));
  });
  0 === f.length && c(e);
};
function lc(a, b, c = {}) {
  var d = b.name;
  if (!a) {
    throw new W(`type "${d}" must have a positive integer typeid pointer`);
  }
  if (gc.hasOwnProperty(a)) {
    if (c.Aa) {
      return;
    }
    throw new W(`Cannot register type '${d}' twice`);
  }
  gc[a] = b;
  delete hc[a];
  fc.hasOwnProperty(a) && (b = fc[a], delete fc[a], b.forEach(e => e()));
}
function X(a, b, c = {}) {
  if (!("argPackAdvance" in b)) {
    throw new TypeError("registerType registeredInstance requires argPackAdvance");
  }
  lc(a, b, c);
}
function mc() {
  this.s = [void 0];
  this.ga = [];
}
var Y = new mc(), nc = a => {
  a >= Y.G && 0 === --Y.get(a).na && Y.$(a);
}, oc = a => {
  if (!a) {
    throw new W("Cannot use deleted val. handle = " + a);
  }
  return Y.get(a).value;
}, pc = a => {
  switch(a) {
    case void 0:
      return 1;
    case null:
      return 2;
    case !0:
      return 3;
    case !1:
      return 4;
    default:
      return Y.R({na:1, value:a});
  }
};
function sc(a) {
  return this.fromWireType(E[a >> 2]);
}
var tc = a => {
  if (null === a) {
    return "null";
  }
  var b = typeof a;
  return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
}, uc = (a, b) => {
  switch(b) {
    case 4:
      return function(c) {
        return this.fromWireType(oa[c >> 2]);
      };
    case 8:
      return function(c) {
        return this.fromWireType(pa[c >> 3]);
      };
    default:
      throw new TypeError(`invalid float width (${b}): ${a}`);
  }
}, vc = (a, b) => Object.defineProperty(b, "name", {value:a}), wc = a => {
  for (; a.length;) {
    var b = a.pop();
    a.pop()(b);
  }
};
function xc(a) {
  for (var b = 1; b < a.length; ++b) {
    if (null !== a[b] && void 0 === a[b].F) {
      return !0;
    }
  }
  return !1;
}
function yc(a) {
  var b = Function;
  if (!(b instanceof Function)) {
    throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);
  }
  var c = vc(b.name || "unknownFunctionName", function() {
  });
  c.prototype = b.prototype;
  c = new c();
  a = b.apply(c, a);
  return a instanceof Object ? a : c;
}
var zc = (a, b) => {
  if (void 0 === h[a].B) {
    var c = h[a];
    h[a] = function() {
      if (!h[a].B.hasOwnProperty(arguments.length)) {
        throw new W(`Function '${b}' called with an invalid number of arguments (${arguments.length}) - expects one of (${h[a].B})!`);
      }
      return h[a].B[arguments.length].apply(this, arguments);
    };
    h[a].B = [];
    h[a].B[c.ra] = c;
  }
}, Ac = (a, b, c) => {
  if (h.hasOwnProperty(a)) {
    if (void 0 === c || void 0 !== h[a].B && void 0 !== h[a].B[c]) {
      throw new W(`Cannot register public name '${a}' twice`);
    }
    zc(a, a);
    if (h.hasOwnProperty(c)) {
      throw new W(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`);
    }
    h[a].B[c] = b;
  } else {
    h[a] = b, void 0 !== c && (h[a].ab = c);
  }
}, Bc = (a, b) => {
  for (var c = [], d = 0; d < a; d++) {
    c.push(F[b + 4 * d >> 2]);
  }
  return c;
}, Cc = [], Dc, Ec = a => {
  var b = Cc[a];
  b || (a >= Cc.length && (Cc.length = a + 1), Cc[a] = b = Dc.get(a));
  x(Dc.get(a) == b, "JavaScript-side Wasm function table mirror is out of date!");
  return b;
}, Fc = (a, b) => {
  x(a.includes("j") || a.includes("p"), "getDynCaller should only be called with i64 sigs");
  var c = [];
  return function() {
    c.length = 0;
    Object.assign(c, arguments);
    if (a.includes("j")) {
      x("dynCall_" + a in h, `bad function pointer type - dynCall function not found for sig '${a}'`);
      c?.length ? x(c.length === a.substring(1).replace(/j/g, "--").length) : x(1 == a.length);
      var d = h["dynCall_" + a];
      d = c && c.length ? d.apply(null, [b].concat(c)) : d.call(null, b);
    } else {
      x(Ec(b), `missing table entry in dynCall: ${b}`), d = Ec(b).apply(null, c);
    }
    return d;
  };
}, Gc = (a, b) => {
  a = V(a);
  var c = a.includes("j") ? Fc(a, b) : Ec(b);
  if ("function" != typeof c) {
    throw new W(`unknown function pointer with signature ${a}: ${b}`);
  }
  return c;
}, Hc, Jc = a => {
  a = Ic(a);
  var b = V(a);
  Z(a);
  return b;
}, Kc = (a, b) => {
  function c(f) {
    e[f] || gc[f] || (hc[f] ? hc[f].forEach(c) : (d.push(f), e[f] = !0));
  }
  var d = [], e = {};
  b.forEach(c);
  throw new Hc(`${a}: ` + d.map(Jc).join([", "]));
}, Lc = a => {
  a = a.trim();
  const b = a.indexOf("(");
  return -1 !== b ? (x(")" == a[a.length - 1], "Parentheses for argument names should match."), a.substr(0, b)) : a;
}, Mc = (a, b, c) => {
  switch(b) {
    case 1:
      return c ? d => y[d >> 0] : d => D[d >> 0];
    case 2:
      return c ? d => ma[d >> 1] : d => na[d >> 1];
    case 4:
      return c ? d => E[d >> 2] : d => F[d >> 2];
    default:
      throw new TypeError(`invalid integer width (${b}): ${a}`);
  }
};
function Nc(a) {
  return this.fromWireType(F[a >> 2]);
}
var Oc = (a, b, c) => {
  x("number" == typeof c, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  hb(a, D, b, c);
}, Pc = new TextDecoder("utf-16le"), Qc = (a, b) => {
  x(0 == a % 2, "Pointer passed to UTF16ToString must be aligned to two bytes!");
  var c = a >> 1;
  for (b = c + b / 2; !(c >= b) && na[c];) {
    ++c;
  }
  return Pc.decode(D.subarray(a, c << 1));
}, Rc = (a, b, c) => {
  x(0 == b % 2, "Pointer passed to stringToUTF16 must be aligned to two bytes!");
  x("number" == typeof c, "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  c ??= 2147483647;
  if (2 > c) {
    return 0;
  }
  c -= 2;
  var d = b;
  c = c < 2 * a.length ? c / 2 : a.length;
  for (var e = 0; e < c; ++e) {
    ma[b >> 1] = a.charCodeAt(e), b += 2;
  }
  ma[b >> 1] = 0;
  return b - d;
}, Sc = a => 2 * a.length, Tc = (a, b) => {
  x(0 == a % 4, "Pointer passed to UTF32ToString must be aligned to four bytes!");
  for (var c = 0, d = ""; !(c >= b / 4);) {
    var e = E[a + 4 * c >> 2];
    if (0 == e) {
      break;
    }
    ++c;
    65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
  }
  return d;
}, Uc = (a, b, c) => {
  x(0 == b % 4, "Pointer passed to stringToUTF32 must be aligned to four bytes!");
  x("number" == typeof c, "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  c ??= 2147483647;
  if (4 > c) {
    return 0;
  }
  var d = b;
  c = d + c - 4;
  for (var e = 0; e < a.length; ++e) {
    var f = a.charCodeAt(e);
    if (55296 <= f && 57343 >= f) {
      var l = a.charCodeAt(++e);
      f = 65536 + ((f & 1023) << 10) | l & 1023;
    }
    E[b >> 2] = f;
    b += 4;
    if (b + 4 > c) {
      break;
    }
  }
  E[b >> 2] = 0;
  return b - d;
}, Vc = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    55296 <= d && 57343 >= d && ++c;
    b += 4;
  }
  return b;
}, Wc = [], Xc = {}, Yc = () => "object" == typeof globalThis ? globalThis : Function("return this")(), Zc = a => {
  var b = Wc.length;
  Wc.push(a);
  return b;
}, $c = (a, b) => {
  for (var c = Array(a), d = 0; d < a; ++d) {
    var e = d, f = F[b + 4 * d >> 2], l = gc[f];
    if (void 0 === l) {
      throw a = "parameter " + d + " has unknown type " + Jc(f), new W(a);
    }
    c[e] = l;
  }
  return c;
}, ad = (a, b, c) => {
  var d = [];
  a = a.toWireType(d, c);
  d.length && (F[b >> 2] = pc(d));
  return a;
}, bd = {}, dd = () => {
  if (!cd) {
    var a = {USER:"web_user", LOGNAME:"web_user", PATH:"/", PWD:"/", HOME:"/home/web_user", LANG:("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _:ea || "./this.program"}, b;
    for (b in bd) {
      void 0 === bd[b] ? delete a[b] : a[b] = bd[b];
    }
    var c = [];
    for (b in a) {
      c.push(`${b}=${a[b]}`);
    }
    cd = c;
  }
  return cd;
}, cd, ed = a => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400), fd = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], gd = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], hd = (a, b) => {
  x(0 <= a.length, "writeArrayToMemory array must have a length (should be an array or typed array)");
  y.set(a, b);
}, jd = (a, b, c, d) => {
  function e(g, v, z) {
    for (g = "number" == typeof g ? g.toString() : g || ""; g.length < v;) {
      g = z[0] + g;
    }
    return g;
  }
  function f(g, v) {
    return e(g, v, "0");
  }
  function l(g, v) {
    function z(C) {
      return 0 > C ? -1 : 0 < C ? 1 : 0;
    }
    var B;
    0 === (B = z(g.getFullYear() - v.getFullYear())) && 0 === (B = z(g.getMonth() - v.getMonth())) && (B = z(g.getDate() - v.getDate()));
    return B;
  }
  function q(g) {
    switch(g.getDay()) {
      case 0:
        return new Date(g.getFullYear() - 1, 11, 29);
      case 1:
        return g;
      case 2:
        return new Date(g.getFullYear(), 0, 3);
      case 3:
        return new Date(g.getFullYear(), 0, 2);
      case 4:
        return new Date(g.getFullYear(), 0, 1);
      case 5:
        return new Date(g.getFullYear() - 1, 11, 31);
      case 6:
        return new Date(g.getFullYear() - 1, 11, 30);
    }
  }
  function m(g) {
    var v = g.K;
    for (g = new Date((new Date(g.L + 1900, 0, 1)).getTime()); 0 < v;) {
      var z = g.getMonth(), B = (ed(g.getFullYear()) ? fd : gd)[z];
      if (v > B - g.getDate()) {
        v -= B - g.getDate() + 1, g.setDate(1), 11 > z ? g.setMonth(z + 1) : (g.setMonth(0), g.setFullYear(g.getFullYear() + 1));
      } else {
        g.setDate(g.getDate() + v);
        break;
      }
    }
    z = new Date(g.getFullYear() + 1, 0, 4);
    v = q(new Date(g.getFullYear(), 0, 4));
    z = q(z);
    return 0 >= l(v, g) ? 0 >= l(z, g) ? g.getFullYear() + 1 : g.getFullYear() : g.getFullYear() - 1;
  }
  var k = F[d + 40 >> 2];
  d = {Sa:E[d >> 2], Ra:E[d + 4 >> 2], X:E[d + 8 >> 2], da:E[d + 12 >> 2], Y:E[d + 16 >> 2], L:E[d + 20 >> 2], D:E[d + 24 >> 2], K:E[d + 28 >> 2], cb:E[d + 32 >> 2], Qa:E[d + 36 >> 2], Ta:k ? ac(k) : ""};
  c = ac(c);
  k = {"%c":"%a %b %d %H:%M:%S %Y", "%D":"%m/%d/%y", "%F":"%Y-%m-%d", "%h":"%b", "%r":"%I:%M:%S %p", "%R":"%H:%M", "%T":"%H:%M:%S", "%x":"%m/%d/%y", "%X":"%H:%M:%S", "%Ec":"%c", "%EC":"%C", "%Ex":"%m/%d/%y", "%EX":"%H:%M:%S", "%Ey":"%y", "%EY":"%Y", "%Od":"%d", "%Oe":"%e", "%OH":"%H", "%OI":"%I", "%Om":"%m", "%OM":"%M", "%OS":"%S", "%Ou":"%u", "%OU":"%U", "%OV":"%V", "%Ow":"%w", "%OW":"%W", "%Oy":"%y"};
  for (var t in k) {
    c = c.replace(new RegExp(t, "g"), k[t]);
  }
  var A = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), r = "January February March April May June July August September October November December".split(" ");
  k = {"%a":g => A[g.D].substring(0, 3), "%A":g => A[g.D], "%b":g => r[g.Y].substring(0, 3), "%B":g => r[g.Y], "%C":g => f((g.L + 1900) / 100 | 0, 2), "%d":g => f(g.da, 2), "%e":g => e(g.da, 2, " "), "%g":g => m(g).toString().substring(2), "%G":g => m(g), "%H":g => f(g.X, 2), "%I":g => {
    g = g.X;
    0 == g ? g = 12 : 12 < g && (g -= 12);
    return f(g, 2);
  }, "%j":g => {
    for (var v = 0, z = 0; z <= g.Y - 1; v += (ed(g.L + 1900) ? fd : gd)[z++]) {
    }
    return f(g.da + v, 3);
  }, "%m":g => f(g.Y + 1, 2), "%M":g => f(g.Ra, 2), "%n":() => "\n", "%p":g => 0 <= g.X && 12 > g.X ? "AM" : "PM", "%S":g => f(g.Sa, 2), "%t":() => "\t", "%u":g => g.D || 7, "%U":g => f(Math.floor((g.K + 7 - g.D) / 7), 2), "%V":g => {
    var v = Math.floor((g.K + 7 - (g.D + 6) % 7) / 7);
    2 >= (g.D + 371 - g.K - 2) % 7 && v++;
    if (v) {
      53 == v && (z = (g.D + 371 - g.K) % 7, 4 == z || 3 == z && ed(g.L) || (v = 1));
    } else {
      v = 52;
      var z = (g.D + 7 - g.K - 1) % 7;
      (4 == z || 5 == z && ed(g.L % 400 - 1)) && v++;
    }
    return f(v, 2);
  }, "%w":g => g.D, "%W":g => f(Math.floor((g.K + 7 - (g.D + 6) % 7) / 7), 2), "%y":g => (g.L + 1900).toString().substring(2), "%Y":g => g.L + 1900, "%z":g => {
    g = g.Qa;
    var v = 0 <= g;
    g = Math.abs(g) / 60;
    return (v ? "+" : "-") + String("0000" + (g / 60 * 100 + g % 60)).slice(-4);
  }, "%Z":g => g.Ta, "%%":() => "%"};
  c = c.replace(/%%/g, "\x00\x00");
  for (t in k) {
    c.includes(t) && (c = c.replace(new RegExp(t, "g"), k[t](d)));
  }
  c = c.replace(/\0\0/g, "%");
  t = ib(c, !1);
  if (t.length > b) {
    return 0;
  }
  hd(t, a);
  return t.length - 1;
}, ld = a => {
  kd();
  Ua || (h.onExit?.(a), la = !0);
  fa(a, new Sa(a));
}, nd = a => {
  a instanceof Sa || "unwind" == a || (ua(), a instanceof WebAssembly.RuntimeError && 0 >= md() && u("Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)"), fa(1, a));
};
function Ib(a, b, c, d) {
  a ||= this;
  this.parent = a;
  this.H = a.H;
  this.U = null;
  this.id = Bb++;
  this.name = b;
  this.mode = c;
  this.g = {};
  this.i = {};
  this.M = d;
}
Object.defineProperties(Ib.prototype, {read:{get:function() {
  return 365 === (this.mode & 365);
}, set:function(a) {
  a ? this.mode |= 365 : this.mode &= -366;
}}, write:{get:function() {
  return 146 === (this.mode & 146);
}, set:function(a) {
  a ? this.mode |= 146 : this.mode &= -147;
}}});
Xb();
Cb = Array(4096);
Ob(P, "/");
S("/tmp");
S("/home");
S("/home/web_user");
(function() {
  S("/dev");
  lb(259, {read:() => 0, write:(d, e, f, l) => l});
  Qb("/dev/null", 259);
  kb(1280, nb);
  kb(1536, ob);
  Qb("/dev/tty", 1280);
  Qb("/dev/tty1", 1536);
  var a = new Uint8Array(1024), b = 0, c = () => {
    0 === b && (b = bb(a).byteLength);
    return a[--b];
  };
  Zb("random", c);
  Zb("urandom", c);
  S("/dev/shm");
  S("/dev/shm/tmp");
})();
(function() {
  S("/proc");
  var a = S("/proc/self");
  S("/proc/self/fd");
  Ob({H() {
    var b = rb(a, "fd", 16895, 73);
    b.g = {O(c, d) {
      var e = R(+d);
      c = {parent:null, H:{ka:"fake"}, g:{P:() => e.path}};
      return c.parent = c;
    }};
    return b;
  }}, "/proc/self/fd");
})();
for (var od = Array(256), pd = 0; 256 > pd; ++pd) {
  od[pd] = String.fromCharCode(pd);
}
ec = od;
W = h.BindingError = class extends Error {
  constructor(a) {
    super(a);
    this.name = "BindingError";
  }
};
jc = h.InternalError = class extends Error {
  constructor(a) {
    super(a);
    this.name = "InternalError";
  }
};
Object.assign(mc.prototype, {get(a) {
  x(void 0 !== this.s[a], `invalid handle: ${a}`);
  return this.s[a];
}, has(a) {
  return void 0 !== this.s[a];
}, R(a) {
  var b = this.ga.pop() || this.s.length;
  this.s[b] = a;
  return b;
}, $(a) {
  x(void 0 !== this.s[a]);
  this.s[a] = void 0;
  this.ga.push(a);
}});
Y.s.push({value:void 0}, {value:null}, {value:!0}, {value:!1});
Y.G = Y.s.length;
h.count_emval_handles = () => {
  for (var a = 0, b = Y.G; b < Y.s.length; ++b) {
    void 0 !== Y.s[b] && ++a;
  }
  return a;
};
Hc = h.UnboundTypeError = ((a, b) => {
  var c = vc(b, function(d) {
    this.name = b;
    this.message = d;
    d = Error(d).stack;
    void 0 !== d && (this.stack = this.toString() + "\n" + d.replace(/^Error(:[^\n]*)?\n/, ""));
  });
  c.prototype = Object.create(a.prototype);
  c.prototype.constructor = c;
  c.prototype.toString = function() {
    return void 0 === this.message ? this.name : `${this.name}: ${this.message}`;
  };
  return c;
})(Error, "UnboundTypeError");
var sd = {__cxa_throw:(a, b, c) => {
  (new Va(a)).G(b, c);
  Wa++;
  x(!1, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
}, __syscall_fcntl64:function(a, b, c) {
  dc = c;
  try {
    var d = R(a);
    switch(b) {
      case 0:
        var e = U();
        if (0 > e) {
          return -28;
        }
        for (; Ab[e];) {
          e++;
        }
        return Mb(d, e).o;
      case 1:
      case 2:
        return 0;
      case 3:
        return d.flags;
      case 4:
        return e = U(), d.flags |= e, 0;
      case 5:
        return e = U(), ma[e + 0 >> 1] = 2, 0;
      case 6:
      case 7:
        return 0;
      case 16:
      case 8:
        return -28;
      case 9:
        return E[qd() >> 2] = 28, -1;
      default:
        return -28;
    }
  } catch (f) {
    if ("undefined" == typeof T || "ErrnoError" !== f.name) {
      throw f;
    }
    return -f.u;
  }
}, __syscall_fstat64:function(a, b) {
  try {
    var c = R(a);
    return cc(Sb, c.path, b);
  } catch (d) {
    if ("undefined" == typeof T || "ErrnoError" !== d.name) {
      throw d;
    }
    return -d.u;
  }
}, __syscall_ioctl:function(a, b, c) {
  dc = c;
  try {
    var d = R(a);
    switch(b) {
      case 21509:
        return d.j ? 0 : -59;
      case 21505:
        if (!d.j) {
          return -59;
        }
        if (d.j.I.Ca) {
          b = [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          var e = U();
          E[e >> 2] = 25856;
          E[e + 4 >> 2] = 5;
          E[e + 8 >> 2] = 191;
          E[e + 12 >> 2] = 35387;
          for (var f = 0; 32 > f; f++) {
            y[e + f + 17 >> 0] = b[f] || 0;
          }
        }
        return 0;
      case 21510:
      case 21511:
      case 21512:
        return d.j ? 0 : -59;
      case 21506:
      case 21507:
      case 21508:
        if (!d.j) {
          return -59;
        }
        if (d.j.I.Da) {
          for (e = U(), b = [], f = 0; 32 > f; f++) {
            b.push(y[e + f + 17 >> 0]);
          }
        }
        return 0;
      case 21519:
        if (!d.j) {
          return -59;
        }
        e = U();
        return E[e >> 2] = 0;
      case 21520:
        return d.j ? -28 : -59;
      case 21531:
        e = U();
        if (!d.i.Ba) {
          throw new O(59);
        }
        return d.i.Ba(d, b, e);
      case 21523:
        if (!d.j) {
          return -59;
        }
        d.j.I.Ea && (f = [24, 80], e = U(), ma[e >> 1] = f[0], ma[e + 2 >> 1] = f[1]);
        return 0;
      case 21524:
        return d.j ? 0 : -59;
      case 21515:
        return d.j ? 0 : -59;
      default:
        return -28;
    }
  } catch (l) {
    if ("undefined" == typeof T || "ErrnoError" !== l.name) {
      throw l;
    }
    return -l.u;
  }
}, __syscall_lstat64:function(a, b) {
  try {
    return a = ac(a), cc(Tb, a, b);
  } catch (c) {
    if ("undefined" == typeof T || "ErrnoError" !== c.name) {
      throw c;
    }
    return -c.u;
  }
}, __syscall_newfstatat:function(a, b, c, d) {
  try {
    b = ac(b);
    var e = d & 256, f = d & 4096;
    d &= -6401;
    x(!d, `unknown flags in __syscall_newfstatat: ${d}`);
    b = bc(a, b, f);
    return cc(e ? Tb : Sb, b, c);
  } catch (l) {
    if ("undefined" == typeof T || "ErrnoError" !== l.name) {
      throw l;
    }
    return -l.u;
  }
}, __syscall_openat:function(a, b, c, d) {
  dc = d;
  try {
    b = ac(b);
    b = bc(a, b);
    var e = d ? U() : 0;
    return Ub(b, c, e).o;
  } catch (f) {
    if ("undefined" == typeof T || "ErrnoError" !== f.name) {
      throw f;
    }
    return -f.u;
  }
}, __syscall_stat64:function(a, b) {
  try {
    return a = ac(a), cc(Sb, a, b);
  } catch (c) {
    if ("undefined" == typeof T || "ErrnoError" !== c.name) {
      throw c;
    }
    return -c.u;
  }
}, _embind_register_bigint:() => {
}, _embind_register_bool:(a, b, c, d) => {
  b = V(b);
  X(a, {name:b, fromWireType:function(e) {
    return !!e;
  }, toWireType:function(e, f) {
    return f ? c : d;
  }, argPackAdvance:8, readValueFromPointer:function(e) {
    return this.fromWireType(D[e]);
  }, F:null});
}, _embind_register_emval:(a, b) => {
  b = V(b);
  X(a, {name:b, fromWireType:c => {
    var d = oc(c);
    nc(c);
    return d;
  }, toWireType:(c, d) => pc(d), argPackAdvance:8, readValueFromPointer:sc, F:null});
}, _embind_register_float:(a, b, c) => {
  b = V(b);
  X(a, {name:b, fromWireType:d => d, toWireType:(d, e) => {
    if ("number" != typeof e && "boolean" != typeof e) {
      throw new TypeError(`Cannot convert ${tc(e)} to ${this.name}`);
    }
    return e;
  }, argPackAdvance:8, readValueFromPointer:uc(b, c), F:null});
}, _embind_register_function:(a, b, c, d, e, f, l) => {
  var q = Bc(b, c);
  a = V(a);
  a = Lc(a);
  e = Gc(d, e);
  Ac(a, function() {
    Kc(`Cannot call ${a} due to unbound types`, q);
  }, b - 1);
  kc(q, function(m) {
    var k = a;
    var t = a;
    m = [m[0], null].concat(m.slice(1));
    var A = e, r = m.length;
    if (2 > r) {
      throw new W("argTypes array size mismatch! Must at least get return value and 'this' types!");
    }
    x(!l, "Async bindings are only supported with JSPI.");
    var g = null !== m[1] && !1, v = xc(m), z = "void" !== m[0].name;
    A = [ic, A, f, wc, m[0], m[1]];
    for (var B = 0; B < r - 2; ++B) {
      A.push(m[B + 2]);
    }
    if (!v) {
      for (B = g ? 1 : 2; B < m.length; ++B) {
        null !== m[B].F && A.push(m[B].F);
      }
    }
    v = xc(m);
    B = m.length;
    var C = "", H = "";
    for (r = 0; r < B - 2; ++r) {
      C += (0 !== r ? ", " : "") + "arg" + r, H += (0 !== r ? ", " : "") + "arg" + r + "Wired";
    }
    C = `
        return function (${C}) {
        if (arguments.length !== ${B - 2}) {
          throwBindingError('function ${t} called with ' + arguments.length + ' arguments, expected ${B - 2}');
        }`;
    v && (C += "var destructors = [];\n");
    var qc = v ? "destructors" : "null", ta = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
    g && (C += "var thisWired = classParam['toWireType'](" + qc + ", this);\n");
    for (r = 0; r < B - 2; ++r) {
      C += "var arg" + r + "Wired = argType" + r + "['toWireType'](" + qc + ", arg" + r + "); // " + m[r + 2].name + "\n", ta.push("argType" + r);
    }
    g && (H = "thisWired" + (0 < H.length ? ", " : "") + H);
    C += (z || l ? "var rv = " : "") + "invoker(fn" + (0 < H.length ? ", " : "") + H + ");\n";
    if (v) {
      C += "runDestructors(destructors);\n";
    } else {
      for (r = g ? 1 : 2; r < m.length; ++r) {
        g = 1 === r ? "thisWired" : "arg" + (r - 2) + "Wired", null !== m[r].F && (C += g + "_dtor(" + g + "); // " + m[r].name + "\n", ta.push(g + "_dtor"));
      }
    }
    z && (C += "var ret = retType['fromWireType'](rv);\nreturn ret;\n");
    C = `if (arguments.length !== ${ta.length}){ throw new Error("${t} Expected ${ta.length} closure arguments " + arguments.length + " given."); }\n${C + "}\n"}`;
    let [rc, yd] = [ta, C];
    rc.push(yd);
    m = yc(rc).apply(null, A);
    t = vc(t, m);
    m = b - 1;
    if (!h.hasOwnProperty(k)) {
      throw new jc("Replacing nonexistant public symbol");
    }
    void 0 !== h[k].B && void 0 !== m ? h[k].B[m] = t : (h[k] = t, h[k].ra = m);
    return [];
  });
}, _embind_register_integer:(a, b, c, d, e) => {
  b = V(b);
  -1 === e && (e = 4294967295);
  var f = k => k;
  if (0 === d) {
    var l = 32 - 8 * c;
    f = k => k << l >>> l;
  }
  var q = (k, t) => {
    if ("number" != typeof k && "boolean" != typeof k) {
      throw new TypeError(`Cannot convert "${tc(k)}" to ${t}`);
    }
    if (k < d || k > e) {
      throw new TypeError(`Passing a number "${tc(k)}" from JS side to C/C++ side to an argument of type "${b}", which is outside the valid range [${d}, ${e}]!`);
    }
  };
  var m = b.includes("unsigned") ? function(k, t) {
    q(t, this.name);
    return t >>> 0;
  } : function(k, t) {
    q(t, this.name);
    return t;
  };
  X(a, {name:b, fromWireType:f, toWireType:m, argPackAdvance:8, readValueFromPointer:Mc(b, c, 0 !== d), F:null});
}, _embind_register_memory_view:(a, b, c) => {
  function d(f) {
    return new e(y.buffer, F[f + 4 >> 2], F[f >> 2]);
  }
  var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
  c = V(c);
  X(a, {name:c, fromWireType:d, argPackAdvance:8, readValueFromPointer:d}, {Aa:!0});
}, _embind_register_std_string:(a, b) => {
  b = V(b);
  var c = "std::string" === b;
  X(a, {name:b, fromWireType:function(d) {
    var e = F[d >> 2], f = d + 4;
    if (c) {
      for (var l = f, q = 0; q <= e; ++q) {
        var m = f + q;
        if (q == e || 0 == D[m]) {
          l = ac(l, m - l);
          if (void 0 === k) {
            var k = l;
          } else {
            k += String.fromCharCode(0), k += l;
          }
          l = m + 1;
        }
      }
    } else {
      k = Array(e);
      for (q = 0; q < e; ++q) {
        k[q] = String.fromCharCode(D[f + q]);
      }
      k = k.join("");
    }
    Z(d);
    return k;
  }, toWireType:function(d, e) {
    e instanceof ArrayBuffer && (e = new Uint8Array(e));
    var f = "string" == typeof e;
    if (!(f || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array)) {
      throw new W("Cannot pass non-string to std::string");
    }
    var l = c && f ? gb(e) : e.length;
    var q = rd(4 + l + 1), m = q + 4;
    F[q >> 2] = l;
    if (c && f) {
      Oc(e, m, l + 1);
    } else {
      if (f) {
        for (f = 0; f < l; ++f) {
          var k = e.charCodeAt(f);
          if (255 < k) {
            throw Z(m), new W("String has UTF-16 code units that do not fit in 8 bits");
          }
          D[m + f] = k;
        }
      } else {
        for (f = 0; f < l; ++f) {
          D[m + f] = e[f];
        }
      }
    }
    null !== d && d.push(Z, q);
    return q;
  }, argPackAdvance:8, readValueFromPointer:Nc, F(d) {
    Z(d);
  }});
}, _embind_register_std_wstring:(a, b, c) => {
  c = V(c);
  if (2 === b) {
    var d = Qc;
    var e = Rc;
    var f = Sc;
    var l = () => na;
    var q = 1;
  } else {
    4 === b && (d = Tc, e = Uc, f = Vc, l = () => F, q = 2);
  }
  X(a, {name:c, fromWireType:m => {
    for (var k = F[m >> 2], t = l(), A, r = m + 4, g = 0; g <= k; ++g) {
      var v = m + 4 + g * b;
      if (g == k || 0 == t[v >> q]) {
        r = d(r, v - r), void 0 === A ? A = r : (A += String.fromCharCode(0), A += r), r = v + b;
      }
    }
    Z(m);
    return A;
  }, toWireType:(m, k) => {
    if ("string" != typeof k) {
      throw new W(`Cannot pass non-string to C++ string type ${c}`);
    }
    var t = f(k), A = rd(4 + t + b);
    F[A >> 2] = t >> q;
    e(k, A + 4, t + b);
    null !== m && m.push(Z, A);
    return A;
  }, argPackAdvance:8, readValueFromPointer:sc, F(m) {
    Z(m);
  }});
}, _embind_register_void:(a, b) => {
  b = V(b);
  X(a, {Ga:!0, name:b, argPackAdvance:0, fromWireType:() => {
  }, toWireType:() => {
  }});
}, _emval_call:(a, b, c, d) => {
  a = Wc[a];
  b = oc(b);
  return a(null, b, c, d);
}, _emval_decref:nc, _emval_get_global:a => {
  if (0 === a) {
    return pc(Yc());
  }
  var b = Xc[a];
  a = void 0 === b ? V(a) : b;
  return pc(Yc()[a]);
}, _emval_get_method_caller:(a, b, c) => {
  b = $c(a, b);
  var d = b.shift();
  a--;
  var e = "return function (obj, func, destructorsRef, args) {\n", f = 0, l = [];
  0 === c && l.push("obj");
  for (var q = ["retType"], m = [d], k = 0; k < a; ++k) {
    l.push("arg" + k), q.push("argType" + k), m.push(b[k]), e += `  var arg${k} = argType${k}.readValueFromPointer(args${f ? "+" + f : ""});\n`, f += b[k].argPackAdvance;
  }
  e += `  var rv = ${1 === c ? "new func" : "func.call"}(${l.join(", ")});\n`;
  for (k = 0; k < a; ++k) {
    b[k].deleteObject && (e += `  argType${k}.deleteObject(arg${k});\n`);
  }
  d.Ga || (q.push("emval_returnValue"), m.push(ad), e += "  return emval_returnValue(retType, destructorsRef, rv);\n");
  q.push(e + "};\n");
  a = yc(q).apply(null, m);
  c = `methodCaller<(${b.map(t => t.name).join(", ")}) => ${d.name}>`;
  return Zc(vc(c, a));
}, _emval_incref:a => {
  4 < a && (Y.get(a).na += 1);
}, _emval_run_destructors:a => {
  var b = oc(a);
  wc(b);
  nc(a);
}, abort:() => {
  n("native code called abort()");
}, emscripten_memcpy_js:(a, b, c) => D.copyWithin(a, b, b + c), emscripten_resize_heap:a => {
  var b = D.length;
  a >>>= 0;
  x(a > b);
  if (2147483648 < a) {
    return u(`Cannot enlarge memory, requested ${a} bytes, but the limit is ${2147483648} bytes!`), !1;
  }
  for (var c = 1; 4 >= c; c *= 2) {
    var d = b * (1 + 0.2 / c);
    d = Math.min(d, a + 100663296);
    var e = Math;
    d = Math.max(a, d);
    e = e.min.call(e, 2147483648, d + (65536 - d % 65536) % 65536);
    a: {
      d = e;
      var f = ka.buffer, l = (d - f.byteLength + 65535) / 65536;
      try {
        ka.grow(l);
        qa();
        var q = 1;
        break a;
      } catch (m) {
        u(`growMemory: Attempted to grow heap from ${f.byteLength} bytes to ${d} bytes, but got error: ${m}`);
      }
      q = void 0;
    }
    if (q) {
      return !0;
    }
  }
  u(`Failed to grow the heap from ${b} bytes to ${e} bytes, not enough memory!`);
  return !1;
}, environ_get:(a, b) => {
  var c = 0;
  dd().forEach((d, e) => {
    var f = b + c;
    e = F[a + 4 * e >> 2] = f;
    for (f = 0; f < d.length; ++f) {
      x(d.charCodeAt(f) === (d.charCodeAt(f) & 255)), y[e++ >> 0] = d.charCodeAt(f);
    }
    y[e >> 0] = 0;
    c += d.length + 1;
  });
  return 0;
}, environ_sizes_get:(a, b) => {
  var c = dd();
  F[a >> 2] = c.length;
  var d = 0;
  c.forEach(e => d += e.length + 1);
  F[b >> 2] = d;
  return 0;
}, fd_close:function(a) {
  try {
    var b = R(a);
    if (null === b.o) {
      throw new O(8);
    }
    b.Z && (b.Z = null);
    try {
      b.i.close && b.i.close(b);
    } catch (c) {
      throw c;
    } finally {
      Ab[b.o] = null;
    }
    b.o = null;
    return 0;
  } catch (c) {
    if ("undefined" == typeof T || "ErrnoError" !== c.name) {
      throw c;
    }
    return c.u;
  }
}, fd_read:function(a, b, c, d) {
  try {
    a: {
      var e = R(a);
      a = b;
      for (var f, l = b = 0; l < c; l++) {
        var q = F[a >> 2], m = F[a + 4 >> 2];
        a += 8;
        var k = e, t = q, A = m, r = f, g = y;
        x(0 <= t);
        if (0 > A || 0 > r) {
          throw new O(28);
        }
        if (null === k.o) {
          throw new O(8);
        }
        if (1 === (k.flags & 2097155)) {
          throw new O(8);
        }
        if (16384 === (k.node.mode & 61440)) {
          throw new O(31);
        }
        if (!k.i.read) {
          throw new O(28);
        }
        var v = "undefined" != typeof r;
        if (!v) {
          r = k.position;
        } else if (!k.seekable) {
          throw new O(70);
        }
        var z = k.i.read(k, g, t, A, r);
        v || (k.position += z);
        var B = z;
        if (0 > B) {
          var C = -1;
          break a;
        }
        b += B;
        if (B < m) {
          break;
        }
        "undefined" !== typeof f && (f += B);
      }
      C = b;
    }
    F[d >> 2] = C;
    return 0;
  } catch (H) {
    if ("undefined" == typeof T || "ErrnoError" !== H.name) {
      throw H;
    }
    return H.u;
  }
}, fd_seek:function(a, b, c, d, e) {
  x(b == b >>> 0 || b == (b | 0));
  x(c === (c | 0));
  b = c + 2097152 >>> 0 < 4194305 - !!b ? (b >>> 0) + 4294967296 * c : NaN;
  try {
    if (isNaN(b)) {
      return 61;
    }
    var f = R(a);
    Wb(f, b, d);
    M = [f.position >>> 0, (L = f.position, 1.0 <= +Math.abs(L) ? 0.0 < L ? +Math.floor(L / 4294967296.0) >>> 0 : ~~+Math.ceil((L - +(~~L >>> 0)) / 4294967296.0) >>> 0 : 0)];
    E[e >> 2] = M[0];
    E[e + 4 >> 2] = M[1];
    f.Z && 0 === b && 0 === d && (f.Z = null);
    return 0;
  } catch (l) {
    if ("undefined" == typeof T || "ErrnoError" !== l.name) {
      throw l;
    }
    return l.u;
  }
}, fd_write:function(a, b, c, d) {
  try {
    a: {
      var e = R(a);
      a = b;
      for (var f, l = b = 0; l < c; l++) {
        var q = F[a >> 2], m = F[a + 4 >> 2];
        a += 8;
        var k = e, t = q, A = m, r = f, g = y;
        x(0 <= t);
        if (0 > A || 0 > r) {
          throw new O(28);
        }
        if (null === k.o) {
          throw new O(8);
        }
        if (0 === (k.flags & 2097155)) {
          throw new O(8);
        }
        if (16384 === (k.node.mode & 61440)) {
          throw new O(31);
        }
        if (!k.i.write) {
          throw new O(28);
        }
        k.seekable && k.flags & 1024 && Wb(k, 0, 2);
        var v = "undefined" != typeof r;
        if (!v) {
          r = k.position;
        } else if (!k.seekable) {
          throw new O(70);
        }
        var z = k.i.write(k, g, t, A, r, void 0);
        v || (k.position += z);
        var B = z;
        if (0 > B) {
          var C = -1;
          break a;
        }
        b += B;
        "undefined" !== typeof f && (f += B);
      }
      C = b;
    }
    F[d >> 2] = C;
    return 0;
  } catch (H) {
    if ("undefined" == typeof T || "ErrnoError" !== H.name) {
      throw H;
    }
    return H.u;
  }
}, strftime_l:(a, b, c, d) => jd(a, b, c, d), system:a => {
  if (!a) {
    return 0;
  }
  E[qd() >> 2] = 52;
  return -1;
}}, J = function() {
  function a(d) {
    J = d.exports;
    ka = J.memory;
    x(ka, "memory not found in wasm exports");
    qa();
    Dc = J.__indirect_function_table;
    x(Dc, "table not found in wasm exports");
    za.unshift(J.__wasm_call_ctors);
    G--;
    h.monitorRunDependencies?.(G);
    x(Ga["wasm-instantiate"]);
    delete Ga["wasm-instantiate"];
    0 == G && (null !== Ea && (clearInterval(Ea), Ea = null), Fa && (d = Fa, Fa = null, d()));
    return J;
  }
  var b = {env:sd, wasi_snapshot_preview1:sd};
  Ha();
  var c = h;
  if (h.instantiateWasm) {
    try {
      return h.instantiateWasm(b, a);
    } catch (d) {
      u(`Module.instantiateWasm callback failed with error: ${d}`), ba(d);
    }
  }
  Oa(b, function(d) {
    x(h === c, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    c = null;
    a(d.instance);
  }).catch(ba);
  return {};
}(), rd = I("malloc"), Z = I("free"), qd = I("__errno_location"), td = h._main = I("__main_argc_argv"), ud = h._fflush = I("fflush"), Ic = I("__getTypeName"), vd = () => (vd = J.emscripten_stack_init)(), sa = () => (sa = J.emscripten_stack_get_end)(), wd = I("stackAlloc"), md = () => (md = J.emscripten_stack_get_current)();
h.dynCall_iiji = I("dynCall_iiji");
h.dynCall_jiji = I("dynCall_jiji");
h.dynCall_viijii = I("dynCall_viijii");
h.dynCall_iiiiij = I("dynCall_iiiiij");
h.dynCall_iiiiijj = I("dynCall_iiiiijj");
h.dynCall_iiiiiijj = I("dynCall_iiiiiijj");
"writeI53ToI64 writeI53ToI64Clamped writeI53ToI64Signaling writeI53ToU64Clamped writeI53ToU64Signaling readI53FromI64 readI53FromU64 convertI32PairToI53 convertU32PairToI53 ydayFromDate inetPton4 inetNtop4 inetPton6 inetNtop6 readSockaddr writeSockaddr getHostByName getCallstack emscriptenLog convertPCtoSourceLocation readEmAsmArgs jstoi_q jstoi_s listenOnce autoResumeAudioContext runtimeKeepalivePush runtimeKeepalivePop callUserCallback maybeExit asmjsMangle getNativeTypeSize STACK_SIZE STACK_ALIGN POINTER_SIZE ASSERTIONS getCFunc ccall cwrap uleb128Encode sigToWasmTypes generateFuncType convertJsFunctionToWasm getEmptyTableSlot updateTableMap getFunctionAddress addFunction removeFunction reallyNegative unSign strLen reSign formatString intArrayToString AsciiToString stringToNewUTF8 registerKeyEventCallback maybeCStringToJsString findEventTarget findCanvasEventTarget getBoundingClientRect fillMouseEventData registerMouseEventCallback registerWheelEventCallback registerUiEventCallback registerFocusEventCallback fillDeviceOrientationEventData registerDeviceOrientationEventCallback fillDeviceMotionEventData registerDeviceMotionEventCallback screenOrientation fillOrientationChangeEventData registerOrientationChangeEventCallback fillFullscreenChangeEventData registerFullscreenChangeEventCallback JSEvents_requestFullscreen JSEvents_resizeCanvasForFullscreen registerRestoreOldStyle hideEverythingExceptGivenElement restoreHiddenElements setLetterbox softFullscreenResizeWebGLRenderTarget doRequestFullscreen fillPointerlockChangeEventData registerPointerlockChangeEventCallback registerPointerlockErrorEventCallback requestPointerLock fillVisibilityChangeEventData registerVisibilityChangeEventCallback registerTouchEventCallback fillGamepadEventData registerGamepadEventCallback disableGamepadApiIfItThrows registerBeforeUnloadEventCallback fillBatteryEventData battery registerBatteryEventCallback setCanvasElementSize getCanvasElementSize jsStackTrace stackTrace checkWasiClock wasiRightsToMuslOFlags wasiOFlagsToMuslOFlags createDyncallWrapper safeSetTimeout setImmediateWrapped clearImmediateWrapped polyfillSetImmediate getPromise makePromise idsToPromises makePromiseCallback findMatchingCatch Browser_asyncPrepareDataCounter setMainLoop getSocketFromFD getSocketAddress FS_unlink FS_mkdirTree _setNetworkCallback heapObjectForWebGLType heapAccessShiftForWebGLHeap webgl_enable_ANGLE_instanced_arrays webgl_enable_OES_vertex_array_object webgl_enable_WEBGL_draw_buffers webgl_enable_WEBGL_multi_draw emscriptenWebGLGet computeUnpackAlignedImageSize colorChannelsInGlTextureFormat emscriptenWebGLGetTexPixelData __glGenObject emscriptenWebGLGetUniform webglGetUniformLocation webglPrepareUniformLocationsBeforeFirstUse webglGetLeftBracePos emscriptenWebGLGetVertexAttrib __glGetActiveAttribOrUniform writeGLArray registerWebGlEventCallback runAndAbortIfError SDL_unicode SDL_ttfContext SDL_audio ALLOC_NORMAL ALLOC_STACK allocate writeStringToMemory writeAsciiToMemory getFunctionArgsName init_embind getBasestPointer registerInheritedInstance unregisterInheritedInstance getInheritedInstance getInheritedInstanceCount getLiveInheritedInstances enumReadValueFromPointer genericPointerToWireType constNoSmartPtrRawPointerToWireType nonConstNoSmartPtrRawPointerToWireType init_RegisteredPointer RegisteredPointer RegisteredPointer_fromWireType runDestructor releaseClassHandle detachFinalizer attachFinalizer makeClassHandle init_ClassHandle ClassHandle throwInstanceAlreadyDeleted flushPendingDeletes setDelayFunction RegisteredClass shallowCopyInternalPointer downcastPointer upcastPointer validateThis char_0 char_9 makeLegalFunctionName".split(" ").forEach(function(a) {
  "undefined" === typeof globalThis || Object.getOwnPropertyDescriptor(globalThis, a) || Object.defineProperty(globalThis, a, {configurable:!0, get() {
    var b = `\`${a}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`, c = a;
    c.startsWith("_") || (c = "$" + a);
    b += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${c}')`;
    Pa(a) && (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    N(b);
  }});
  Ra(a);
});
"run addOnPreRun addOnInit addOnPreMain addOnExit addOnPostRun addRunDependency removeRunDependency FS_createFolder FS_createPath FS_createLazyFile FS_createLink FS_createDevice FS_readFile out err callMain abort wasmMemory wasmExports stackAlloc stackSave stackRestore getTempRet0 setTempRet0 writeStackCookie checkStackCookie convertI32PairToI53Checked ptrToString zeroMemory exitJS getHeapMax growMemory ENV MONTH_DAYS_REGULAR MONTH_DAYS_LEAP MONTH_DAYS_REGULAR_CUMULATIVE MONTH_DAYS_LEAP_CUMULATIVE isLeapYear arraySum addDays ERRNO_CODES ERRNO_MESSAGES setErrNo DNS Protocols Sockets initRandomFill randomFill timers warnOnce UNWIND_CACHE readEmAsmArgsArray getExecutableName dynCallLegacy getDynCaller dynCall handleException keepRuntimeAlive asyncLoad alignMemory mmapAlloc handleAllocatorInit HandleAllocator wasmTable noExitRuntime freeTableIndexes functionsInTableMap setValue getValue PATH PATH_FS UTF8Decoder UTF8ArrayToString UTF8ToString stringToUTF8Array stringToUTF8 lengthBytesUTF8 intArrayFromString stringToAscii UTF16Decoder UTF16ToString stringToUTF16 lengthBytesUTF16 UTF32ToString stringToUTF32 lengthBytesUTF32 stringToUTF8OnStack writeArrayToMemory JSEvents specialHTMLTargets currentFullscreenStrategy restoreOldWindowedStyle demangle demangleAll ExitStatus getEnvStrings doReadv doWritev promiseMap uncaughtExceptionCount exceptionLast exceptionCaught ExceptionInfo Browser wget SYSCALLS preloadPlugins FS_createPreloadedFile FS_modeStringToFlags FS_getMode FS_stdin_getChar_buffer FS_stdin_getChar FS FS_createDataFile MEMFS TTY PIPEFS SOCKFS tempFixedLengthArray miniTempWebGLFloatBuffers miniTempWebGLIntBuffers GL emscripten_webgl_power_preferences AL GLUT EGL GLEW IDBStore SDL SDL_gfx allocateUTF8 allocateUTF8OnStack InternalError BindingError throwInternalError throwBindingError registeredTypes awaitingDependencies typeDependencies tupleRegistrations structRegistrations sharedRegisterType whenDependentTypesAreResolved embind_charCodes embind_init_charCodes readLatin1String getTypeName getFunctionName heap32VectorToArray requireRegisteredType usesDestructorStack createJsInvoker UnboundTypeError PureVirtualError GenericWireTypeSize throwUnboundTypeError ensureOverloadTable exposePublicSymbol replacePublicSymbol extendError createNamedFunction embindRepr registeredInstances registeredPointers registerType integerReadValueFromPointer floatReadValueFromPointer simpleReadValueFromPointer readPointer runDestructors newFunc craftInvokerFunction embind__requireFunction finalizationRegistry detachFinalizer_deps deletionQueue delayFunction emval_handles emval_symbols init_emval count_emval_handles getStringOrSymbol Emval emval_get_global emval_returnValue emval_lookupTypes emval_methodCallers emval_addMethodCaller reflectConstruct".split(" ").forEach(Ra);
var xd;
Fa = function zd() {
  xd || Ad();
  xd || (Fa = zd);
};
function Bd(a = []) {
  x(0 == G, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  x(0 == ya.length, "cannot call main when preRun functions remain to be called");
  a.unshift(ea);
  var b = a.length, c = wd(4 * (b + 1)), d = c;
  a.forEach(f => {
    var l = F, q = d >> 2, m = gb(f) + 1, k = wd(m);
    Oc(f, k, m);
    l[q] = k;
    d += 4;
  });
  F[d >> 2] = 0;
  try {
    var e = td(b, c);
    ld(e);
  } catch (f) {
    nd(f);
  }
}
function Ad() {
  var a = da;
  function b() {
    if (!xd && (xd = !0, h.calledRun = !0, !la)) {
      x(!Ca);
      Ca = !0;
      ua();
      if (!h.noFSInit && !Yb) {
        x(!Yb, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
        Yb = !0;
        Xb();
        h.stdin = h.stdin;
        h.stdout = h.stdout;
        h.stderr = h.stderr;
        h.stdin ? Zb("stdin", h.stdin) : Rb("/dev/tty", "/dev/stdin");
        h.stdout ? Zb("stdout", null, h.stdout) : Rb("/dev/tty", "/dev/stdout");
        h.stderr ? Zb("stderr", null, h.stderr) : Rb("/dev/tty1", "/dev/stderr");
        var c = Ub("/dev/stdin", 0), d = Ub("/dev/stdout", 1), e = Ub("/dev/stderr", 1);
        x(0 === c.o, `invalid handle for stdin (${c.o})`);
        x(1 === d.o, `invalid handle for stdout (${d.o})`);
        x(2 === e.o, `invalid handle for stderr (${e.o})`);
      }
      Db = !1;
      Ta(za);
      ua();
      Ta(Aa);
      aa(h);
      if (h.onRuntimeInitialized) {
        h.onRuntimeInitialized();
      }
      Cd && Bd(a);
      ua();
      if (h.postRun) {
        for ("function" == typeof h.postRun && (h.postRun = [h.postRun]); h.postRun.length;) {
          c = h.postRun.shift(), Ba.unshift(c);
        }
      }
      Ta(Ba);
    }
  }
  if (!(0 < G)) {
    vd();
    ra();
    if (h.preRun) {
      for ("function" == typeof h.preRun && (h.preRun = [h.preRun]); h.preRun.length;) {
        Da();
      }
    }
    Ta(ya);
    0 < G || (h.setStatus ? (h.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        h.setStatus("");
      }, 1);
      b();
    }, 1)) : b(), ua());
  }
}
function kd() {
  var a = ia, b = u, c = !1;
  ia = u = () => {
    c = !0;
  };
  try {
    ud(0), ["stdout", "stderr"].forEach(function(d) {
      d = "/dev/" + d;
      try {
        var e = Q(d, {N:!0});
        d = e.path;
      } catch (l) {
      }
      var f = {Fa:!1, xa:!1, error:0, name:null, path:null, object:null, Ma:!1, Oa:null, Na:null};
      try {
        e = Q(d, {parent:!0}), f.Ma = !0, f.Oa = e.path, f.Na = e.node, f.name = $a(d), e = Q(d, {N:!0}), f.xa = !0, f.path = e.path, f.object = e.node, f.name = e.node.name, f.Fa = "/" === e.path;
      } catch (l) {
        f.error = l.u;
      }
      f && jb[f.object.M]?.m?.length && (c = !0);
    });
  } catch (d) {
  }
  ia = a;
  u = b;
  c && N("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.");
}
if (h.preInit) {
  for ("function" == typeof h.preInit && (h.preInit = [h.preInit]); 0 < h.preInit.length;) {
    h.preInit.pop()();
  }
}
var Cd = !1;
h.noInitialRun && (Cd = !1);
Ad();



  return moduleArg.ready
}
);
})();
;
export default jxl;