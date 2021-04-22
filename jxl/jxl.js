var jxl = (function () {
  var _scriptDir = import.meta.url;

  return function (jxl) {
    jxl = jxl || {};

    var e;
    e || (e = typeof jxl !== "undefined" ? jxl : {});
    var aa, ba;
    e.ready = new Promise(function (a, b) {
      aa = a;
      ba = b;
    });
    var r = {},
      v;
    for (v in e) e.hasOwnProperty(v) && (r[v] = e[v]);
    var ca = [],
      da = "./this.program";
    function ea(a, b) {
      throw b;
    }
    var x = "",
      fa;
    x = self.location.href;
    _scriptDir && (x = _scriptDir);
    0 !== x.indexOf("blob:")
      ? (x = x.substr(0, x.lastIndexOf("/") + 1))
      : (x = "");
    fa = function (a) {
      var b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.responseType = "arraybuffer";
      b.send(null);
      return new Uint8Array(b.response);
    };
    var ha = e.print || console.log.bind(console),
      y = e.printErr || console.warn.bind(console);
    for (v in r) r.hasOwnProperty(v) && (e[v] = r[v]);
    r = null;
    e.arguments && (ca = e.arguments);
    e.thisProgram && (da = e.thisProgram);
    e.quit && (ea = e.quit);
    var A;
    e.wasmBinary && (A = e.wasmBinary);
    var noExitRuntime;
    e.noExitRuntime && (noExitRuntime = e.noExitRuntime);
    "object" !== typeof WebAssembly && B("no native wasm support detected");
    var C,
      ia = !1,
      ja = new TextDecoder("utf8");
    function ka(a, b) {
      if (!a) return "";
      b = a + b;
      for (var c = a; !(c >= b) && D[c]; ) ++c;
      return ja.decode(D.subarray(a, c));
    }
    function la(a, b, c, d) {
      if (0 < d) {
        d = c + d - 1;
        for (var h = 0; h < a.length; ++h) {
          var g = a.charCodeAt(h);
          if (55296 <= g && 57343 >= g) {
            var m = a.charCodeAt(++h);
            g = (65536 + ((g & 1023) << 10)) | (m & 1023);
          }
          if (127 >= g) {
            if (c >= d) break;
            b[c++] = g;
          } else {
            if (2047 >= g) {
              if (c + 1 >= d) break;
              b[c++] = 192 | (g >> 6);
            } else {
              if (65535 >= g) {
                if (c + 2 >= d) break;
                b[c++] = 224 | (g >> 12);
              } else {
                if (c + 3 >= d) break;
                b[c++] = 240 | (g >> 18);
                b[c++] = 128 | ((g >> 12) & 63);
              }
              b[c++] = 128 | ((g >> 6) & 63);
            }
            b[c++] = 128 | (g & 63);
          }
        }
        b[c] = 0;
      }
    }
    function ma(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d &&
          57343 >= d &&
          (d = (65536 + ((d & 1023) << 10)) | (a.charCodeAt(++c) & 1023));
        127 >= d ? ++b : (b = 2047 >= d ? b + 2 : 65535 >= d ? b + 3 : b + 4);
      }
      return b;
    }
    var na = new TextDecoder("utf-16le");
    function oa(a, b) {
      var c = a >> 1;
      for (b = c + b / 2; !(c >= b) && E[c]; ) ++c;
      return na.decode(D.subarray(a, c << 1));
    }
    function pa(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;
      for (var h = 0; h < c; ++h) (F[b >> 1] = a.charCodeAt(h)), (b += 2);
      F[b >> 1] = 0;
      return b - d;
    }
    function qa(a) {
      return 2 * a.length;
    }
    function ra(a, b) {
      for (var c = 0, d = ""; !(c >= b / 4); ) {
        var h = H[(a + 4 * c) >> 2];
        if (0 == h) break;
        ++c;
        65536 <= h
          ? ((h -= 65536),
            (d += String.fromCharCode(55296 | (h >> 10), 56320 | (h & 1023))))
          : (d += String.fromCharCode(h));
      }
      return d;
    }
    function sa(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (4 > c) return 0;
      var d = b;
      c = d + c - 4;
      for (var h = 0; h < a.length; ++h) {
        var g = a.charCodeAt(h);
        if (55296 <= g && 57343 >= g) {
          var m = a.charCodeAt(++h);
          g = (65536 + ((g & 1023) << 10)) | (m & 1023);
        }
        H[b >> 2] = g;
        b += 4;
        if (b + 4 > c) break;
      }
      H[b >> 2] = 0;
      return b - d;
    }
    function ta(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }
      return b;
    }
    function ua(a) {
      var b = ma(a) + 1,
        c = va(b);
      la(a, I, c, b);
      return c;
    }
    var J, I, D, F, E, H, K, wa, xa;
    function ya(a) {
      J = a;
      e.HEAP8 = I = new Int8Array(a);
      e.HEAP16 = F = new Int16Array(a);
      e.HEAP32 = H = new Int32Array(a);
      e.HEAPU8 = D = new Uint8Array(a);
      e.HEAPU16 = E = new Uint16Array(a);
      e.HEAPU32 = K = new Uint32Array(a);
      e.HEAPF32 = wa = new Float32Array(a);
      e.HEAPF64 = xa = new Float64Array(a);
    }
    var za = e.INITIAL_MEMORY || 16777216;
    e.wasmMemory
      ? (C = e.wasmMemory)
      : (C = new WebAssembly.Memory({ initial: za / 65536, maximum: 32768 }));
    C && (J = C.buffer);
    za = J.byteLength;
    ya(J);
    var L,
      Aa = [],
      Ba = [],
      Ca = [],
      Da = [];
    function Ea() {
      var a = e.preRun.shift();
      Aa.unshift(a);
    }
    var M = 0,
      Fa = null,
      N = null;
    e.preloadedImages = {};
    e.preloadedAudios = {};
    function B(a) {
      if (e.onAbort) e.onAbort(a);
      y(a);
      ia = !0;
      a = new WebAssembly.RuntimeError(
        "abort(" + a + "). Build with -s ASSERTIONS=1 for more info."
      );
      ba(a);
      throw a;
    }
    function Ga() {
      var a = O;
      return String.prototype.startsWith
        ? a.startsWith("data:application/octet-stream;base64,")
        : 0 === a.indexOf("data:application/octet-stream;base64,");
    }
    var O = "jxl.wasm";
    if (!Ga()) {
      var Ha = O;
      O = e.locateFile ? e.locateFile(Ha, x) : x + Ha;
    }
    function Ia() {
      try {
        if (A) return new Uint8Array(A);
        if (fa) return fa(O);
        throw "both async and sync fetching of the wasm failed";
      } catch (a) {
        B(a);
      }
    }
    function Ja() {
      return A || "function" !== typeof fetch
        ? Promise.resolve().then(Ia)
        : fetch(O, { credentials: "same-origin" })
            .then(function (a) {
              if (!a.ok) throw "failed to load wasm binary file at '" + O + "'";
              return a.arrayBuffer();
            })
            .catch(function () {
              return Ia();
            });
    }
    function P(a) {
      for (; 0 < a.length; ) {
        var b = a.shift();
        if ("function" == typeof b) b(e);
        else {
          var c = b.ha;
          "number" === typeof c
            ? void 0 === b.da
              ? L.get(c)()
              : L.get(c)(b.da)
            : c(void 0 === b.da ? null : b.da);
        }
      }
    }
    function Ka(a) {
      this.Z = a - 16;
      this.oa = function (b) {
        H[(this.Z + 8) >> 2] = b;
      };
      this.la = function (b) {
        H[(this.Z + 0) >> 2] = b;
      };
      this.ma = function () {
        H[(this.Z + 4) >> 2] = 0;
      };
      this.ka = function () {
        I[(this.Z + 12) >> 0] = 0;
      };
      this.na = function () {
        I[(this.Z + 13) >> 0] = 0;
      };
      this.ja = function (b, c) {
        this.oa(b);
        this.la(c);
        this.ma();
        this.ka();
        this.na();
      };
    }
    function Q() {
      return 0 < Q.fa;
    }
    var La = [null, [], []],
      Ma = {};
    function Na(a) {
      switch (a) {
        case 1:
          return 0;
        case 2:
          return 1;
        case 4:
          return 2;
        case 8:
          return 3;
        default:
          throw new TypeError("Unknown type size: " + a);
      }
    }
    var Oa = void 0;
    function R(a) {
      for (var b = ""; D[a]; ) b += Oa[D[a++]];
      return b;
    }
    var S = {},
      T = {},
      U = {};
    function Pa(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? "_" + a : a;
    }
    function Qa(a, b) {
      a = Pa(a);
      return new Function(
        "body",
        "return function " +
          a +
          '() {\n    "use strict";    return body.apply(this, arguments);\n};\n'
      )(b);
    }
    function Ra(a) {
      var b = Error,
        c = Qa(a, function (d) {
          this.name = a;
          this.message = d;
          d = Error(d).stack;
          void 0 !== d &&
            (this.stack =
              this.toString() + "\n" + d.replace(/^Error(:[^\n]*)?\n/, ""));
        });
      c.prototype = Object.create(b.prototype);
      c.prototype.constructor = c;
      c.prototype.toString = function () {
        return void 0 === this.message
          ? this.name
          : this.name + ": " + this.message;
      };
      return c;
    }
    var Sa = void 0;
    function V(a) {
      throw new Sa(a);
    }
    var Ta = void 0;
    function Ua(a, b) {
      function c(k) {
        k = b(k);
        if (k.length !== d.length)
          throw new Ta("Mismatched type converter count");
        for (var n = 0; n < d.length; ++n) W(d[n], k[n]);
      }
      var d = [];
      d.forEach(function (k) {
        U[k] = a;
      });
      var h = Array(a.length),
        g = [],
        m = 0;
      a.forEach(function (k, n) {
        T.hasOwnProperty(k)
          ? (h[n] = T[k])
          : (g.push(k),
            S.hasOwnProperty(k) || (S[k] = []),
            S[k].push(function () {
              h[n] = T[k];
              ++m;
              m === g.length && c(h);
            }));
      });
      0 === g.length && c(h);
    }
    function W(a, b, c) {
      c = c || {};
      if (!("argPackAdvance" in b))
        throw new TypeError(
          "registerType registeredInstance requires argPackAdvance"
        );
      var d = b.name;
      a || V('type "' + d + '" must have a positive integer typeid pointer');
      if (T.hasOwnProperty(a)) {
        if (c.ia) return;
        V("Cannot register type '" + d + "' twice");
      }
      T[a] = b;
      delete U[a];
      S.hasOwnProperty(a) &&
        ((b = S[a]),
        delete S[a],
        b.forEach(function (h) {
          h();
        }));
    }
    var Va = [],
      X = [
        {},
        { value: void 0 },
        { value: null },
        { value: !0 },
        { value: !1 },
      ];
    function Wa(a) {
      4 < a && 0 === --X[a].ea && ((X[a] = void 0), Va.push(a));
    }
    function Y(a) {
      switch (a) {
        case void 0:
          return 1;
        case null:
          return 2;
        case !0:
          return 3;
        case !1:
          return 4;
        default:
          var b = Va.length ? Va.pop() : X.length;
          X[b] = { ea: 1, value: a };
          return b;
      }
    }
    function Xa(a) {
      return this.fromWireType(K[a >> 2]);
    }
    function Ya(a) {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b
        ? a.toString()
        : "" + a;
    }
    function Za(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(wa[c >> 2]);
          };
        case 3:
          return function (c) {
            return this.fromWireType(xa[c >> 3]);
          };
        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }
    function $a(a) {
      var b = Function;
      if (!(b instanceof Function))
        throw new TypeError(
          "new_ called with constructor type " +
            typeof b +
            " which is not a function"
        );
      var c = Qa(b.name || "unknownFunctionName", function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }
    function ab(a) {
      for (; a.length; ) {
        var b = a.pop();
        a.pop()(b);
      }
    }
    function bb(a, b) {
      var c = e;
      if (void 0 === c[a].W) {
        var d = c[a];
        c[a] = function () {
          c[a].W.hasOwnProperty(arguments.length) ||
            V(
              "Function '" +
                b +
                "' called with an invalid number of arguments (" +
                arguments.length +
                ") - expects one of (" +
                c[a].W +
                ")!"
            );
          return c[a].W[arguments.length].apply(this, arguments);
        };
        c[a].W = [];
        c[a].W[d.ga] = d;
      }
    }
    function cb(a, b, c) {
      e.hasOwnProperty(a)
        ? ((void 0 === c || (void 0 !== e[a].W && void 0 !== e[a].W[c])) &&
            V("Cannot register public name '" + a + "' twice"),
          bb(a, a),
          e.hasOwnProperty(c) &&
            V(
              "Cannot register multiple overloads of a function with the same number of arguments (" +
                c +
                ")!"
            ),
          (e[a].W[c] = b))
        : ((e[a] = b), void 0 !== c && (e[a].wa = c));
    }
    function eb(a, b) {
      for (var c = [], d = 0; d < a; d++) c.push(H[(b >> 2) + d]);
      return c;
    }
    function fb(a, b) {
      0 <= a.indexOf("j") ||
        B("Assertion failed: getDynCaller should only be called with i64 sigs");
      var c = [];
      return function () {
        c.length = arguments.length;
        for (var d = 0; d < arguments.length; d++) c[d] = arguments[d];
        var h;
        -1 != a.indexOf("j")
          ? (h =
              c && c.length
                ? e["dynCall_" + a].apply(null, [b].concat(c))
                : e["dynCall_" + a].call(null, b))
          : (h = L.get(b).apply(null, c));
        return h;
      };
    }
    function gb(a, b) {
      a = R(a);
      var c = -1 != a.indexOf("j") ? fb(a, b) : L.get(b);
      "function" !== typeof c &&
        V("unknown function pointer with signature " + a + ": " + b);
      return c;
    }
    var hb = void 0;
    function ib(a) {
      a = jb(a);
      var b = R(a);
      Z(a);
      return b;
    }
    function kb(a, b) {
      function c(g) {
        h[g] || T[g] || (U[g] ? U[g].forEach(c) : (d.push(g), (h[g] = !0)));
      }
      var d = [],
        h = {};
      b.forEach(c);
      throw new hb(a + ": " + d.map(ib).join([", "]));
    }
    function lb(a, b, c) {
      switch (b) {
        case 0:
          return c
            ? function (d) {
                return I[d];
              }
            : function (d) {
                return D[d];
              };
        case 1:
          return c
            ? function (d) {
                return F[d >> 1];
              }
            : function (d) {
                return E[d >> 1];
              };
        case 2:
          return c
            ? function (d) {
                return H[d >> 2];
              }
            : function (d) {
                return K[d >> 2];
              };
        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }
    var mb = {};
    function nb() {
      return "object" === typeof globalThis
        ? globalThis
        : Function("return this")();
    }
    function ob(a, b) {
      var c = T[a];
      void 0 === c && V(b + " has unknown type " + ib(a));
      return c;
    }
    var pb = {},
      qb = {};
    function rb() {
      if (!sb) {
        var a = {
            USER: "web_user",
            LOGNAME: "web_user",
            PATH: "/",
            PWD: "/",
            HOME: "/home/web_user",
            LANG:
              (
                ("object" === typeof navigator &&
                  navigator.languages &&
                  navigator.languages[0]) ||
                "C"
              ).replace("-", "_") + ".UTF-8",
            _: da || "./this.program",
          },
          b;
        for (b in qb) a[b] = qb[b];
        var c = [];
        for (b in a) c.push(b + "=" + a[b]);
        sb = c;
      }
      return sb;
    }
    var sb;
    function tb(a) {
      return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400);
    }
    function ub(a, b) {
      for (var c = 0, d = 0; d <= b; c += a[d++]);
      return c;
    }
    var vb = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      wb = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function xb(a, b) {
      for (a = new Date(a.getTime()); 0 < b; ) {
        var c = a.getMonth(),
          d = (tb(a.getFullYear()) ? vb : wb)[c];
        if (b > d - a.getDate())
          (b -= d - a.getDate() + 1),
            a.setDate(1),
            11 > c
              ? a.setMonth(c + 1)
              : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1));
        else {
          a.setDate(a.getDate() + b);
          break;
        }
      }
      return a;
    }
    function yb(a, b, c, d) {
      function h(f, l, t) {
        for (f = "number" === typeof f ? f.toString() : f || ""; f.length < l; )
          f = t[0] + f;
        return f;
      }
      function g(f, l) {
        return h(f, l, "0");
      }
      function m(f, l) {
        function t(G) {
          return 0 > G ? -1 : 0 < G ? 1 : 0;
        }
        var w;
        0 === (w = t(f.getFullYear() - l.getFullYear())) &&
          0 === (w = t(f.getMonth() - l.getMonth())) &&
          (w = t(f.getDate() - l.getDate()));
        return w;
      }
      function k(f) {
        switch (f.getDay()) {
          case 0:
            return new Date(f.getFullYear() - 1, 11, 29);
          case 1:
            return f;
          case 2:
            return new Date(f.getFullYear(), 0, 3);
          case 3:
            return new Date(f.getFullYear(), 0, 2);
          case 4:
            return new Date(f.getFullYear(), 0, 1);
          case 5:
            return new Date(f.getFullYear() - 1, 11, 31);
          case 6:
            return new Date(f.getFullYear() - 1, 11, 30);
        }
      }
      function n(f) {
        f = xb(new Date(f.V + 1900, 0, 1), f.ca);
        var l = new Date(f.getFullYear() + 1, 0, 4),
          t = k(new Date(f.getFullYear(), 0, 4));
        l = k(l);
        return 0 >= m(t, f)
          ? 0 >= m(l, f)
            ? f.getFullYear() + 1
            : f.getFullYear()
          : f.getFullYear() - 1;
      }
      var p = H[(d + 40) >> 2];
      d = {
        ra: H[d >> 2],
        qa: H[(d + 4) >> 2],
        aa: H[(d + 8) >> 2],
        $: H[(d + 12) >> 2],
        Y: H[(d + 16) >> 2],
        V: H[(d + 20) >> 2],
        ba: H[(d + 24) >> 2],
        ca: H[(d + 28) >> 2],
        xa: H[(d + 32) >> 2],
        pa: H[(d + 36) >> 2],
        sa: p ? ka(p) : "",
      };
      c = ka(c);
      p = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S",
        "%Ec": "%c",
        "%EC": "%C",
        "%Ex": "%m/%d/%y",
        "%EX": "%H:%M:%S",
        "%Ey": "%y",
        "%EY": "%Y",
        "%Od": "%d",
        "%Oe": "%e",
        "%OH": "%H",
        "%OI": "%I",
        "%Om": "%m",
        "%OM": "%M",
        "%OS": "%S",
        "%Ou": "%u",
        "%OU": "%U",
        "%OV": "%V",
        "%Ow": "%w",
        "%OW": "%W",
        "%Oy": "%y",
      };
      for (var q in p) c = c.replace(new RegExp(q, "g"), p[q]);
      var u = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
          " "
        ),
        z = "January February March April May June July August September October November December".split(
          " "
        );
      p = {
        "%a": function (f) {
          return u[f.ba].substring(0, 3);
        },
        "%A": function (f) {
          return u[f.ba];
        },
        "%b": function (f) {
          return z[f.Y].substring(0, 3);
        },
        "%B": function (f) {
          return z[f.Y];
        },
        "%C": function (f) {
          return g(((f.V + 1900) / 100) | 0, 2);
        },
        "%d": function (f) {
          return g(f.$, 2);
        },
        "%e": function (f) {
          return h(f.$, 2, " ");
        },
        "%g": function (f) {
          return n(f).toString().substring(2);
        },
        "%G": function (f) {
          return n(f);
        },
        "%H": function (f) {
          return g(f.aa, 2);
        },
        "%I": function (f) {
          f = f.aa;
          0 == f ? (f = 12) : 12 < f && (f -= 12);
          return g(f, 2);
        },
        "%j": function (f) {
          return g(f.$ + ub(tb(f.V + 1900) ? vb : wb, f.Y - 1), 3);
        },
        "%m": function (f) {
          return g(f.Y + 1, 2);
        },
        "%M": function (f) {
          return g(f.qa, 2);
        },
        "%n": function () {
          return "\n";
        },
        "%p": function (f) {
          return 0 <= f.aa && 12 > f.aa ? "AM" : "PM";
        },
        "%S": function (f) {
          return g(f.ra, 2);
        },
        "%t": function () {
          return "\t";
        },
        "%u": function (f) {
          return f.ba || 7;
        },
        "%U": function (f) {
          var l = new Date(f.V + 1900, 0, 1),
            t = 0 === l.getDay() ? l : xb(l, 7 - l.getDay());
          f = new Date(f.V + 1900, f.Y, f.$);
          return 0 > m(t, f)
            ? g(
                Math.ceil(
                  (31 -
                    t.getDate() +
                    (ub(tb(f.getFullYear()) ? vb : wb, f.getMonth() - 1) - 31) +
                    f.getDate()) /
                    7
                ),
                2
              )
            : 0 === m(t, l)
            ? "01"
            : "00";
        },
        "%V": function (f) {
          var l = new Date(f.V + 1901, 0, 4),
            t = k(new Date(f.V + 1900, 0, 4));
          l = k(l);
          var w = xb(new Date(f.V + 1900, 0, 1), f.ca);
          return 0 > m(w, t)
            ? "53"
            : 0 >= m(l, w)
            ? "01"
            : g(
                Math.ceil(
                  (t.getFullYear() < f.V + 1900
                    ? f.ca + 32 - t.getDate()
                    : f.ca + 1 - t.getDate()) / 7
                ),
                2
              );
        },
        "%w": function (f) {
          return f.ba;
        },
        "%W": function (f) {
          var l = new Date(f.V, 0, 1),
            t =
              1 === l.getDay()
                ? l
                : xb(l, 0 === l.getDay() ? 1 : 7 - l.getDay() + 1);
          f = new Date(f.V + 1900, f.Y, f.$);
          return 0 > m(t, f)
            ? g(
                Math.ceil(
                  (31 -
                    t.getDate() +
                    (ub(tb(f.getFullYear()) ? vb : wb, f.getMonth() - 1) - 31) +
                    f.getDate()) /
                    7
                ),
                2
              )
            : 0 === m(t, l)
            ? "01"
            : "00";
        },
        "%y": function (f) {
          return (f.V + 1900).toString().substring(2);
        },
        "%Y": function (f) {
          return f.V + 1900;
        },
        "%z": function (f) {
          f = f.pa;
          var l = 0 <= f;
          f = Math.abs(f) / 60;
          return (
            (l ? "+" : "-") +
            String("0000" + ((f / 60) * 100 + (f % 60))).slice(-4)
          );
        },
        "%Z": function (f) {
          return f.sa;
        },
        "%%": function () {
          return "%";
        },
      };
      for (q in p)
        0 <= c.indexOf(q) && (c = c.replace(new RegExp(q, "g"), p[q](d)));
      q = zb(c);
      if (q.length > b) return 0;
      I.set(q, a);
      return q.length - 1;
    }
    for (var Ab = Array(256), Bb = 0; 256 > Bb; ++Bb)
      Ab[Bb] = String.fromCharCode(Bb);
    Oa = Ab;
    Sa = e.BindingError = Ra("BindingError");
    Ta = e.InternalError = Ra("InternalError");
    e.count_emval_handles = function () {
      for (var a = 0, b = 5; b < X.length; ++b) void 0 !== X[b] && ++a;
      return a;
    };
    e.get_first_emval = function () {
      for (var a = 5; a < X.length; ++a) if (void 0 !== X[a]) return X[a];
      return null;
    };
    hb = e.UnboundTypeError = Ra("UnboundTypeError");
    function zb(a) {
      var b = Array(ma(a) + 1);
      la(a, b, 0, b.length);
      return b;
    }
    Ba.push({
      ha: function () {
        Cb();
      },
    });
    var Fb = {
      k: function (a) {
        return Db(a + 16) + 16;
      },
      f: function () {},
      j: function (a, b, c) {
        new Ka(a).ja(b, c);
        "uncaught_exception" in Q ? Q.fa++ : (Q.fa = 1);
        throw a;
      },
      q: function () {
        return 0;
      },
      B: function () {
        return 0;
      },
      C: function () {},
      E: function (a, b, c, d, h) {
        var g = Na(c);
        b = R(b);
        W(a, {
          name: b,
          fromWireType: function (m) {
            return !!m;
          },
          toWireType: function (m, k) {
            return k ? d : h;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (m) {
            if (1 === c) var k = I;
            else if (2 === c) k = F;
            else if (4 === c) k = H;
            else throw new TypeError("Unknown boolean type size: " + b);
            return this.fromWireType(k[m >> g]);
          },
          X: null,
        });
      },
      D: function (a, b) {
        b = R(b);
        W(a, {
          name: b,
          fromWireType: function (c) {
            var d = X[c].value;
            Wa(c);
            return d;
          },
          toWireType: function (c, d) {
            return Y(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: Xa,
          X: null,
        });
      },
      r: function (a, b, c) {
        c = Na(c);
        b = R(b);
        W(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, h) {
            if ("number" !== typeof h && "boolean" !== typeof h)
              throw new TypeError(
                'Cannot convert "' + Ya(h) + '" to ' + this.name
              );
            return h;
          },
          argPackAdvance: 8,
          readValueFromPointer: Za(b, c),
          X: null,
        });
      },
      m: function (a, b, c, d, h, g) {
        var m = eb(b, c);
        a = R(a);
        h = gb(d, h);
        cb(
          a,
          function () {
            kb("Cannot call " + a + " due to unbound types", m);
          },
          b - 1
        );
        Ua(m, function (k) {
          var n = a,
            p = a;
          k = [k[0], null].concat(k.slice(1));
          var q = h,
            u = k.length;
          2 > u &&
            V(
              "argTypes array size mismatch! Must at least get return value and 'this' types!"
            );
          for (var z = null !== k[1] && !1, f = !1, l = 1; l < k.length; ++l)
            if (null !== k[l] && void 0 === k[l].X) {
              f = !0;
              break;
            }
          var t = "void" !== k[0].name,
            w = "",
            G = "";
          for (l = 0; l < u - 2; ++l)
            (w += (0 !== l ? ", " : "") + "arg" + l),
              (G += (0 !== l ? ", " : "") + "arg" + l + "Wired");
          p =
            "return function " +
            Pa(p) +
            "(" +
            w +
            ") {\nif (arguments.length !== " +
            (u - 2) +
            ") {\nthrowBindingError('function " +
            p +
            " called with ' + arguments.length + ' arguments, expected " +
            (u - 2) +
            " args!');\n}\n";
          f && (p += "var destructors = [];\n");
          var db = f ? "destructors" : "null";
          w = "throwBindingError invoker fn runDestructors retType classParam".split(
            " "
          );
          q = [V, q, g, ab, k[0], k[1]];
          z &&
            (p += "var thisWired = classParam.toWireType(" + db + ", this);\n");
          for (l = 0; l < u - 2; ++l)
            (p +=
              "var arg" +
              l +
              "Wired = argType" +
              l +
              ".toWireType(" +
              db +
              ", arg" +
              l +
              "); // " +
              k[l + 2].name +
              "\n"),
              w.push("argType" + l),
              q.push(k[l + 2]);
          z && (G = "thisWired" + (0 < G.length ? ", " : "") + G);
          p +=
            (t ? "var rv = " : "") +
            "invoker(fn" +
            (0 < G.length ? ", " : "") +
            G +
            ");\n";
          if (f) p += "runDestructors(destructors);\n";
          else
            for (l = z ? 1 : 2; l < k.length; ++l)
              (u = 1 === l ? "thisWired" : "arg" + (l - 2) + "Wired"),
                null !== k[l].X &&
                  ((p += u + "_dtor(" + u + "); // " + k[l].name + "\n"),
                  w.push(u + "_dtor"),
                  q.push(k[l].X));
          t && (p += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
          w.push(p + "}\n");
          k = $a(w).apply(null, q);
          l = b - 1;
          if (!e.hasOwnProperty(n))
            throw new Ta("Replacing nonexistant public symbol");
          void 0 !== e[n].W && void 0 !== l
            ? (e[n].W[l] = k)
            : ((e[n] = k), (e[n].ga = l));
          return [];
        });
      },
      d: function (a, b, c, d, h) {
        function g(p) {
          return p;
        }
        b = R(b);
        -1 === h && (h = 4294967295);
        var m = Na(c);
        if (0 === d) {
          var k = 32 - 8 * c;
          g = function (p) {
            return (p << k) >>> k;
          };
        }
        var n = -1 != b.indexOf("unsigned");
        W(a, {
          name: b,
          fromWireType: g,
          toWireType: function (p, q) {
            if ("number" !== typeof q && "boolean" !== typeof q)
              throw new TypeError(
                'Cannot convert "' + Ya(q) + '" to ' + this.name
              );
            if (q < d || q > h)
              throw new TypeError(
                'Passing a number "' +
                  Ya(q) +
                  '" from JS side to C/C++ side to an argument of type "' +
                  b +
                  '", which is outside the valid range [' +
                  d +
                  ", " +
                  h +
                  "]!"
              );
            return n ? q >>> 0 : q | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: lb(b, m, 0 !== d),
          X: null,
        });
      },
      c: function (a, b, c) {
        function d(g) {
          g >>= 2;
          var m = K;
          return new h(J, m[g + 1], m[g]);
        }
        var h = [
          Int8Array,
          Uint8Array,
          Int16Array,
          Uint16Array,
          Int32Array,
          Uint32Array,
          Float32Array,
          Float64Array,
        ][b];
        c = R(c);
        W(
          a,
          {
            name: c,
            fromWireType: d,
            argPackAdvance: 8,
            readValueFromPointer: d,
          },
          { ia: !0 }
        );
      },
      s: function (a, b) {
        b = R(b);
        var c = "std::string" === b;
        W(a, {
          name: b,
          fromWireType: function (d) {
            var h = K[d >> 2];
            if (c)
              for (var g = d + 4, m = 0; m <= h; ++m) {
                var k = d + 4 + m;
                if (m == h || 0 == D[k]) {
                  g = ka(g, k - g);
                  if (void 0 === n) var n = g;
                  else (n += String.fromCharCode(0)), (n += g);
                  g = k + 1;
                }
              }
            else {
              n = Array(h);
              for (m = 0; m < h; ++m) n[m] = String.fromCharCode(D[d + 4 + m]);
              n = n.join("");
            }
            Z(d);
            return n;
          },
          toWireType: function (d, h) {
            h instanceof ArrayBuffer && (h = new Uint8Array(h));
            var g = "string" === typeof h;
            g ||
              h instanceof Uint8Array ||
              h instanceof Uint8ClampedArray ||
              h instanceof Int8Array ||
              V("Cannot pass non-string to std::string");
            var m = (c && g
                ? function () {
                    return ma(h);
                  }
                : function () {
                    return h.length;
                  })(),
              k = Db(4 + m + 1);
            K[k >> 2] = m;
            if (c && g) la(h, D, k + 4, m + 1);
            else if (g)
              for (g = 0; g < m; ++g) {
                var n = h.charCodeAt(g);
                255 < n &&
                  (Z(k),
                  V("String has UTF-16 code units that do not fit in 8 bits"));
                D[k + 4 + g] = n;
              }
            else for (g = 0; g < m; ++g) D[k + 4 + g] = h[g];
            null !== d && d.push(Z, k);
            return k;
          },
          argPackAdvance: 8,
          readValueFromPointer: Xa,
          X: function (d) {
            Z(d);
          },
        });
      },
      l: function (a, b, c) {
        c = R(c);
        if (2 === b) {
          var d = oa;
          var h = pa;
          var g = qa;
          var m = function () {
            return E;
          };
          var k = 1;
        } else
          4 === b &&
            ((d = ra),
            (h = sa),
            (g = ta),
            (m = function () {
              return K;
            }),
            (k = 2));
        W(a, {
          name: c,
          fromWireType: function (n) {
            for (var p = K[n >> 2], q = m(), u, z = n + 4, f = 0; f <= p; ++f) {
              var l = n + 4 + f * b;
              if (f == p || 0 == q[l >> k])
                (z = d(z, l - z)),
                  void 0 === u
                    ? (u = z)
                    : ((u += String.fromCharCode(0)), (u += z)),
                  (z = l + b);
            }
            Z(n);
            return u;
          },
          toWireType: function (n, p) {
            "string" !== typeof p &&
              V("Cannot pass non-string to C++ string type " + c);
            var q = g(p),
              u = Db(4 + q + b);
            K[u >> 2] = q >> k;
            h(p, u + 4, q + b);
            null !== n && n.push(Z, u);
            return u;
          },
          argPackAdvance: 8,
          readValueFromPointer: Xa,
          X: function (n) {
            Z(n);
          },
        });
      },
      F: function (a, b) {
        b = R(b);
        W(a, {
          va: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {},
        });
      },
      h: Wa,
      e: function (a) {
        if (0 === a) return Y(nb());
        var b = mb[a];
        a = void 0 === b ? R(a) : b;
        return Y(nb()[a]);
      },
      n: function (a) {
        4 < a && (X[a].ea += 1);
      },
      i: function (a, b, c, d) {
        a || V("Cannot use deleted val. handle = " + a);
        a = X[a].value;
        var h = pb[b];
        if (!h) {
          h = "";
          for (var g = 0; g < b; ++g) h += (0 !== g ? ", " : "") + "arg" + g;
          var m =
            "return function emval_allocator_" +
            b +
            "(constructor, argTypes, args) {\n";
          for (g = 0; g < b; ++g)
            m +=
              "var argType" +
              g +
              " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " +
              g +
              '], "parameter ' +
              g +
              '");\nvar arg' +
              g +
              " = argType" +
              g +
              ".readValueFromPointer(args);\nargs += argType" +
              g +
              "['argPackAdvance'];\n";
          h = new Function(
            "requireRegisteredType",
            "Module",
            "__emval_register",
            m +
              ("var obj = new constructor(" +
                h +
                ");\nreturn __emval_register(obj);\n}\n")
          )(ob, e, Y);
          pb[b] = h;
        }
        return h(a, c, d);
      },
      b: function () {
        B();
      },
      w: function (a, b, c) {
        D.copyWithin(a, b, b + c);
      },
      g: function (a) {
        a >>>= 0;
        var b = D.length;
        if (2147483648 < a) return !1;
        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + 0.2 / c);
          d = Math.min(d, a + 100663296);
          d = Math.max(16777216, a, d);
          0 < d % 65536 && (d += 65536 - (d % 65536));
          a: {
            try {
              C.grow((Math.min(2147483648, d) - J.byteLength + 65535) >>> 16);
              ya(C.buffer);
              var h = 1;
              break a;
            } catch (g) {}
            h = void 0;
          }
          if (h) return !0;
        }
        return !1;
      },
      y: function (a, b) {
        var c = 0;
        rb().forEach(function (d, h) {
          var g = b + c;
          h = H[(a + 4 * h) >> 2] = g;
          for (g = 0; g < d.length; ++g) I[h++ >> 0] = d.charCodeAt(g);
          I[h >> 0] = 0;
          c += d.length + 1;
        });
        return 0;
      },
      z: function (a, b) {
        var c = rb();
        H[a >> 2] = c.length;
        var d = 0;
        c.forEach(function (h) {
          d += h.length + 1;
        });
        H[b >> 2] = d;
        return 0;
      },
      o: function () {
        return 0;
      },
      A: function (a, b, c, d) {
        a = Ma.ua(a);
        b = Ma.ta(a, b, c);
        H[d >> 2] = b;
        return 0;
      },
      u: function () {},
      p: function (a, b, c, d) {
        for (var h = 0, g = 0; g < c; g++) {
          for (
            var m = H[(b + 8 * g) >> 2], k = H[(b + (8 * g + 4)) >> 2], n = 0;
            n < k;
            n++
          ) {
            var p = D[m + n],
              q = La[a];
            if (0 === p || 10 === p) {
              for (p = 0; q[p] && !(NaN <= p); ) ++p;
              p = ja.decode(
                q.subarray ? q.subarray(0, p) : new Uint8Array(q.slice(0, p))
              );
              (1 === a ? ha : y)(p);
              q.length = 0;
            } else q.push(p);
          }
          h += k;
        }
        H[d >> 2] = h;
        return 0;
      },
      a: C,
      v: function () {},
      x: function (a, b, c, d) {
        return yb(a, b, c, d);
      },
      t: function (a) {
        if (!a) return 0;
        H[Eb() >> 2] = 6;
        return -1;
      },
    };
    (function () {
      function a(h) {
        e.asm = h.exports;
        L = e.asm.G;
        M--;
        e.monitorRunDependencies && e.monitorRunDependencies(M);
        0 == M &&
          (null !== Fa && (clearInterval(Fa), (Fa = null)),
          N && ((h = N), (N = null), h()));
      }
      function b(h) {
        a(h.instance);
      }
      function c(h) {
        return Ja()
          .then(function (g) {
            return WebAssembly.instantiate(g, d);
          })
          .then(h, function (g) {
            y("failed to asynchronously prepare wasm: " + g);
            B(g);
          });
      }
      var d = { a: Fb };
      M++;
      e.monitorRunDependencies && e.monitorRunDependencies(M);
      if (e.instantiateWasm)
        try {
          return e.instantiateWasm(d, a);
        } catch (h) {
          return (
            y("Module.instantiateWasm callback failed with error: " + h), !1
          );
        }
      (function () {
        return A ||
          "function" !== typeof WebAssembly.instantiateStreaming ||
          Ga() ||
          "function" !== typeof fetch
          ? c(b)
          : fetch(O, { credentials: "same-origin" }).then(function (h) {
              return WebAssembly.instantiateStreaming(h, d).then(
                b,
                function (g) {
                  y("wasm streaming compile failed: " + g);
                  y("falling back to ArrayBuffer instantiation");
                  return c(b);
                }
              );
            });
      })().catch(ba);
      return {};
    })();
    var Cb = (e.___wasm_call_ctors = function () {
        return (Cb = e.___wasm_call_ctors = e.asm.H).apply(null, arguments);
      }),
      Db = (e._malloc = function () {
        return (Db = e._malloc = e.asm.I).apply(null, arguments);
      }),
      Z = (e._free = function () {
        return (Z = e._free = e.asm.J).apply(null, arguments);
      }),
      Eb = (e.___errno_location = function () {
        return (Eb = e.___errno_location = e.asm.K).apply(null, arguments);
      });
    e._main = function () {
      return (e._main = e.asm.L).apply(null, arguments);
    };
    var jb = (e.___getTypeName = function () {
      return (jb = e.___getTypeName = e.asm.M).apply(null, arguments);
    });
    e.___embind_register_native_and_builtin_types = function () {
      return (e.___embind_register_native_and_builtin_types = e.asm.N).apply(
        null,
        arguments
      );
    };
    var va = (e.stackAlloc = function () {
      return (va = e.stackAlloc = e.asm.O).apply(null, arguments);
    });
    e.dynCall_jiji = function () {
      return (e.dynCall_jiji = e.asm.P).apply(null, arguments);
    };
    e.dynCall_viijii = function () {
      return (e.dynCall_viijii = e.asm.Q).apply(null, arguments);
    };
    e.dynCall_iiji = function () {
      return (e.dynCall_iiji = e.asm.R).apply(null, arguments);
    };
    e.dynCall_iiiiiijj = function () {
      return (e.dynCall_iiiiiijj = e.asm.S).apply(null, arguments);
    };
    e.dynCall_iiiiij = function () {
      return (e.dynCall_iiiiij = e.asm.T).apply(null, arguments);
    };
    e.dynCall_iiiiijj = function () {
      return (e.dynCall_iiiiijj = e.asm.U).apply(null, arguments);
    };
    var Gb;
    function Hb(a) {
      this.name = "ExitStatus";
      this.message = "Program terminated with exit(" + a + ")";
      this.status = a;
    }
    N = function Ib() {
      Gb || Jb();
      Gb || (N = Ib);
    };
    function Jb(a) {
      function b() {
        if (!Gb && ((Gb = !0), (e.calledRun = !0), !ia)) {
          P(Ba);
          P(Ca);
          aa(e);
          if (e.onRuntimeInitialized) e.onRuntimeInitialized();
          if (Kb) {
            var c = a,
              d = e._main;
            c = c || [];
            var h = c.length + 1,
              g = va(4 * (h + 1));
            H[g >> 2] = ua(da);
            for (var m = 1; m < h; m++) H[(g >> 2) + m] = ua(c[m - 1]);
            H[(g >> 2) + h] = 0;
            try {
              var k = d(h, g);
              if (!noExitRuntime || 0 !== k) {
                if (!noExitRuntime) {
                  if (e.onExit) e.onExit(k);
                  ia = !0;
                }
                ea(k, new Hb(k));
              }
            } catch (n) {
              n instanceof Hb ||
                ("unwind" == n
                  ? (noExitRuntime = !0)
                  : ((c = n) &&
                      "object" === typeof n &&
                      n.stack &&
                      (c = [n, n.stack]),
                    y("exception thrown: " + c),
                    ea(1, n)));
            } finally {
            }
          }
          if (e.postRun)
            for (
              "function" == typeof e.postRun && (e.postRun = [e.postRun]);
              e.postRun.length;

            )
              (c = e.postRun.shift()), Da.unshift(c);
          P(Da);
        }
      }
      a = a || ca;
      if (!(0 < M)) {
        if (e.preRun)
          for (
            "function" == typeof e.preRun && (e.preRun = [e.preRun]);
            e.preRun.length;

          )
            Ea();
        P(Aa);
        0 < M ||
          (e.setStatus
            ? (e.setStatus("Running..."),
              setTimeout(function () {
                setTimeout(function () {
                  e.setStatus("");
                }, 1);
                b();
              }, 1))
            : b());
      }
    }
    e.run = Jb;
    if (e.preInit)
      for (
        "function" == typeof e.preInit && (e.preInit = [e.preInit]);
        0 < e.preInit.length;

      )
        e.preInit.pop()();
    var Kb = !0;
    e.noInitialRun && (Kb = !1);
    noExitRuntime = !0;
    Jb();

    return jxl.ready;
  };
})();
export default jxl;
