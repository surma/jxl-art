var jxl_dec = (function () {
  var _scriptDir = import.meta.url;

  return function (jxl_dec) {
    jxl_dec = jxl_dec || {};

    var f;
    f || (f = typeof jxl_dec !== "undefined" ? jxl_dec : {});
    var aa, ba;
    f.ready = new Promise(function (a, b) {
      aa = a;
      ba = b;
    });
    var r = {},
      v;
    for (v in f) f.hasOwnProperty(v) && (r[v] = f[v]);
    var ca = "./this.program",
      x = "",
      da;
    x = self.location.href;
    _scriptDir && (x = _scriptDir);
    0 !== x.indexOf("blob:")
      ? (x = x.substr(0, x.lastIndexOf("/") + 1))
      : (x = "");
    da = function (a) {
      var b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.responseType = "arraybuffer";
      b.send(null);
      return new Uint8Array(b.response);
    };
    var ea = f.print || console.log.bind(console),
      y = f.printErr || console.warn.bind(console);
    for (v in r) r.hasOwnProperty(v) && (f[v] = r[v]);
    r = null;
    f.thisProgram && (ca = f.thisProgram);
    var A;
    f.wasmBinary && (A = f.wasmBinary);
    var noExitRuntime;
    f.noExitRuntime && (noExitRuntime = f.noExitRuntime);
    "object" !== typeof WebAssembly && B("no native wasm support detected");
    var C,
      fa = !1,
      ha = new TextDecoder("utf8");
    function ia(a, b) {
      if (!a) return "";
      b = a + b;
      for (var c = a; !(c >= b) && D[c]; ) ++c;
      return ha.decode(D.subarray(a, c));
    }
    function ja(a, b, c, d) {
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
    function ka(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d &&
          57343 >= d &&
          (d = (65536 + ((d & 1023) << 10)) | (a.charCodeAt(++c) & 1023));
        127 >= d ? ++b : (b = 2047 >= d ? b + 2 : 65535 >= d ? b + 3 : b + 4);
      }
      return b;
    }
    var la = new TextDecoder("utf-16le");
    function ma(a, b) {
      var c = a >> 1;
      for (b = c + b / 2; !(c >= b) && E[c]; ) ++c;
      return la.decode(D.subarray(a, c << 1));
    }
    function na(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;
      for (var h = 0; h < c; ++h) (G[b >> 1] = a.charCodeAt(h)), (b += 2);
      G[b >> 1] = 0;
      return b - d;
    }
    function oa(a) {
      return 2 * a.length;
    }
    function pa(a, b) {
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
    function qa(a, b, c) {
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
    function ra(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }
      return b;
    }
    var I, J, D, G, E, H, K, sa, ta;
    function ua(a) {
      I = a;
      f.HEAP8 = J = new Int8Array(a);
      f.HEAP16 = G = new Int16Array(a);
      f.HEAP32 = H = new Int32Array(a);
      f.HEAPU8 = D = new Uint8Array(a);
      f.HEAPU16 = E = new Uint16Array(a);
      f.HEAPU32 = K = new Uint32Array(a);
      f.HEAPF32 = sa = new Float32Array(a);
      f.HEAPF64 = ta = new Float64Array(a);
    }
    var va = f.INITIAL_MEMORY || 16777216;
    f.wasmMemory
      ? (C = f.wasmMemory)
      : (C = new WebAssembly.Memory({ initial: va / 65536, maximum: 32768 }));
    C && (I = C.buffer);
    va = I.byteLength;
    ua(I);
    var L,
      wa = [],
      xa = [],
      ya = [],
      za = [];
    function Aa() {
      var a = f.preRun.shift();
      wa.unshift(a);
    }
    var M = 0,
      Ba = null,
      N = null;
    f.preloadedImages = {};
    f.preloadedAudios = {};
    function B(a) {
      if (f.onAbort) f.onAbort(a);
      y(a);
      fa = !0;
      a = new WebAssembly.RuntimeError(
        "abort(" + a + "). Build with -s ASSERTIONS=1 for more info."
      );
      ba(a);
      throw a;
    }
    function Ca() {
      var a = O;
      return String.prototype.startsWith
        ? a.startsWith("data:application/octet-stream;base64,")
        : 0 === a.indexOf("data:application/octet-stream;base64,");
    }
    var O = "jxl_dec.wasm";
    if (!Ca()) {
      var Da = O;
      O = f.locateFile ? f.locateFile(Da, x) : x + Da;
    }
    function Ea() {
      try {
        if (A) return new Uint8Array(A);
        if (da) return da(O);
        throw "both async and sync fetching of the wasm failed";
      } catch (a) {
        B(a);
      }
    }
    function Fa() {
      return A || "function" !== typeof fetch
        ? Promise.resolve().then(Ea)
        : fetch(O, { credentials: "same-origin" })
            .then(function (a) {
              if (!a.ok) throw "failed to load wasm binary file at '" + O + "'";
              return a.arrayBuffer();
            })
            .catch(function () {
              return Ea();
            });
    }
    function P(a) {
      for (; 0 < a.length; ) {
        var b = a.shift();
        if ("function" == typeof b) b(f);
        else {
          var c = b.ca;
          "number" === typeof c
            ? void 0 === b.Z
              ? L.get(c)()
              : L.get(c)(b.Z)
            : c(void 0 === b.Z ? null : b.Z);
        }
      }
    }
    function Ga(a) {
      this.U = a - 16;
      this.ja = function (b) {
        H[(this.U + 8) >> 2] = b;
      };
      this.ga = function (b) {
        H[(this.U + 0) >> 2] = b;
      };
      this.ha = function () {
        H[(this.U + 4) >> 2] = 0;
      };
      this.fa = function () {
        J[(this.U + 12) >> 0] = 0;
      };
      this.ia = function () {
        J[(this.U + 13) >> 0] = 0;
      };
      this.ea = function (b, c) {
        this.ja(b);
        this.ga(c);
        this.ha();
        this.fa();
        this.ia();
      };
    }
    function Q() {
      return 0 < Q.aa;
    }
    function Ha(a) {
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
    var Ia = void 0;
    function R(a) {
      for (var b = ""; D[a]; ) b += Ia[D[a++]];
      return b;
    }
    var S = {},
      T = {},
      U = {};
    function Ja(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? "_" + a : a;
    }
    function Ka(a, b) {
      a = Ja(a);
      return new Function(
        "body",
        "return function " +
          a +
          '() {\n    "use strict";    return body.apply(this, arguments);\n};\n'
      )(b);
    }
    function La(a) {
      var b = Error,
        c = Ka(a, function (d) {
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
    var Ma = void 0;
    function V(a) {
      throw new Ma(a);
    }
    var Na = void 0;
    function Oa(a, b) {
      function c(k) {
        k = b(k);
        if (k.length !== d.length)
          throw new Na("Mismatched type converter count");
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
        if (c.da) return;
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
    var Pa = [],
      X = [
        {},
        { value: void 0 },
        { value: null },
        { value: !0 },
        { value: !1 },
      ];
    function Qa(a) {
      4 < a && 0 === --X[a].$ && ((X[a] = void 0), Pa.push(a));
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
          var b = Pa.length ? Pa.pop() : X.length;
          X[b] = { $: 1, value: a };
          return b;
      }
    }
    function Ra(a) {
      return this.fromWireType(K[a >> 2]);
    }
    function Sa(a) {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b
        ? a.toString()
        : "" + a;
    }
    function Ta(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(sa[c >> 2]);
          };
        case 3:
          return function (c) {
            return this.fromWireType(ta[c >> 3]);
          };
        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }
    function Ua(a) {
      var b = Function;
      if (!(b instanceof Function))
        throw new TypeError(
          "new_ called with constructor type " +
            typeof b +
            " which is not a function"
        );
      var c = Ka(b.name || "unknownFunctionName", function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }
    function Va(a) {
      for (; a.length; ) {
        var b = a.pop();
        a.pop()(b);
      }
    }
    function Wa(a, b) {
      var c = f;
      if (void 0 === c[a].R) {
        var d = c[a];
        c[a] = function () {
          c[a].R.hasOwnProperty(arguments.length) ||
            V(
              "Function '" +
                b +
                "' called with an invalid number of arguments (" +
                arguments.length +
                ") - expects one of (" +
                c[a].R +
                ")!"
            );
          return c[a].R[arguments.length].apply(this, arguments);
        };
        c[a].R = [];
        c[a].R[d.ba] = d;
      }
    }
    function Xa(a, b, c) {
      f.hasOwnProperty(a)
        ? ((void 0 === c || (void 0 !== f[a].R && void 0 !== f[a].R[c])) &&
            V("Cannot register public name '" + a + "' twice"),
          Wa(a, a),
          f.hasOwnProperty(c) &&
            V(
              "Cannot register multiple overloads of a function with the same number of arguments (" +
                c +
                ")!"
            ),
          (f[a].R[c] = b))
        : ((f[a] = b), void 0 !== c && (f[a].pa = c));
    }
    function Ya(a, b) {
      for (var c = [], d = 0; d < a; d++) c.push(H[(b >> 2) + d]);
      return c;
    }
    function Za(a, b) {
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
                ? f["dynCall_" + a].apply(null, [b].concat(c))
                : f["dynCall_" + a].call(null, b))
          : (h = L.get(b).apply(null, c));
        return h;
      };
    }
    function $a(a, b) {
      a = R(a);
      var c = -1 != a.indexOf("j") ? Za(a, b) : L.get(b);
      "function" !== typeof c &&
        V("unknown function pointer with signature " + a + ": " + b);
      return c;
    }
    var bb = void 0;
    function cb(a) {
      a = db(a);
      var b = R(a);
      Z(a);
      return b;
    }
    function eb(a, b) {
      function c(g) {
        h[g] || T[g] || (U[g] ? U[g].forEach(c) : (d.push(g), (h[g] = !0)));
      }
      var d = [],
        h = {};
      b.forEach(c);
      throw new bb(a + ": " + d.map(cb).join([", "]));
    }
    function fb(a, b, c) {
      switch (b) {
        case 0:
          return c
            ? function (d) {
                return J[d];
              }
            : function (d) {
                return D[d];
              };
        case 1:
          return c
            ? function (d) {
                return G[d >> 1];
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
    var gb = {};
    function hb(a) {
      var b = gb[a];
      return void 0 === b ? R(a) : b;
    }
    function ib() {
      return "object" === typeof globalThis
        ? globalThis
        : Function("return this")();
    }
    function jb(a, b) {
      var c = T[a];
      void 0 === c && V(b + " has unknown type " + cb(a));
      return c;
    }
    var kb = {},
      lb = {};
    function mb() {
      if (!nb) {
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
            _: ca || "./this.program",
          },
          b;
        for (b in lb) a[b] = lb[b];
        var c = [];
        for (b in a) c.push(b + "=" + a[b]);
        nb = c;
      }
      return nb;
    }
    var nb,
      ob = [null, [], []];
    function pb(a) {
      return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400);
    }
    function qb(a, b) {
      for (var c = 0, d = 0; d <= b; c += a[d++]);
      return c;
    }
    var rb = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      sb = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function tb(a, b) {
      for (a = new Date(a.getTime()); 0 < b; ) {
        var c = a.getMonth(),
          d = (pb(a.getFullYear()) ? rb : sb)[c];
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
    function ub(a, b, c, d) {
      function h(e, l, t) {
        for (e = "number" === typeof e ? e.toString() : e || ""; e.length < l; )
          e = t[0] + e;
        return e;
      }
      function g(e, l) {
        return h(e, l, "0");
      }
      function m(e, l) {
        function t(F) {
          return 0 > F ? -1 : 0 < F ? 1 : 0;
        }
        var w;
        0 === (w = t(e.getFullYear() - l.getFullYear())) &&
          0 === (w = t(e.getMonth() - l.getMonth())) &&
          (w = t(e.getDate() - l.getDate()));
        return w;
      }
      function k(e) {
        switch (e.getDay()) {
          case 0:
            return new Date(e.getFullYear() - 1, 11, 29);
          case 1:
            return e;
          case 2:
            return new Date(e.getFullYear(), 0, 3);
          case 3:
            return new Date(e.getFullYear(), 0, 2);
          case 4:
            return new Date(e.getFullYear(), 0, 1);
          case 5:
            return new Date(e.getFullYear() - 1, 11, 31);
          case 6:
            return new Date(e.getFullYear() - 1, 11, 30);
        }
      }
      function n(e) {
        e = tb(new Date(e.P + 1900, 0, 1), e.Y);
        var l = new Date(e.getFullYear() + 1, 0, 4),
          t = k(new Date(e.getFullYear(), 0, 4));
        l = k(l);
        return 0 >= m(t, e)
          ? 0 >= m(l, e)
            ? e.getFullYear() + 1
            : e.getFullYear()
          : e.getFullYear() - 1;
      }
      var p = H[(d + 40) >> 2];
      d = {
        ma: H[d >> 2],
        la: H[(d + 4) >> 2],
        W: H[(d + 8) >> 2],
        V: H[(d + 12) >> 2],
        T: H[(d + 16) >> 2],
        P: H[(d + 20) >> 2],
        X: H[(d + 24) >> 2],
        Y: H[(d + 28) >> 2],
        qa: H[(d + 32) >> 2],
        ka: H[(d + 36) >> 2],
        na: p ? ia(p) : "",
      };
      c = ia(c);
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
        "%a": function (e) {
          return u[e.X].substring(0, 3);
        },
        "%A": function (e) {
          return u[e.X];
        },
        "%b": function (e) {
          return z[e.T].substring(0, 3);
        },
        "%B": function (e) {
          return z[e.T];
        },
        "%C": function (e) {
          return g(((e.P + 1900) / 100) | 0, 2);
        },
        "%d": function (e) {
          return g(e.V, 2);
        },
        "%e": function (e) {
          return h(e.V, 2, " ");
        },
        "%g": function (e) {
          return n(e).toString().substring(2);
        },
        "%G": function (e) {
          return n(e);
        },
        "%H": function (e) {
          return g(e.W, 2);
        },
        "%I": function (e) {
          e = e.W;
          0 == e ? (e = 12) : 12 < e && (e -= 12);
          return g(e, 2);
        },
        "%j": function (e) {
          return g(e.V + qb(pb(e.P + 1900) ? rb : sb, e.T - 1), 3);
        },
        "%m": function (e) {
          return g(e.T + 1, 2);
        },
        "%M": function (e) {
          return g(e.la, 2);
        },
        "%n": function () {
          return "\n";
        },
        "%p": function (e) {
          return 0 <= e.W && 12 > e.W ? "AM" : "PM";
        },
        "%S": function (e) {
          return g(e.ma, 2);
        },
        "%t": function () {
          return "\t";
        },
        "%u": function (e) {
          return e.X || 7;
        },
        "%U": function (e) {
          var l = new Date(e.P + 1900, 0, 1),
            t = 0 === l.getDay() ? l : tb(l, 7 - l.getDay());
          e = new Date(e.P + 1900, e.T, e.V);
          return 0 > m(t, e)
            ? g(
                Math.ceil(
                  (31 -
                    t.getDate() +
                    (qb(pb(e.getFullYear()) ? rb : sb, e.getMonth() - 1) - 31) +
                    e.getDate()) /
                    7
                ),
                2
              )
            : 0 === m(t, l)
            ? "01"
            : "00";
        },
        "%V": function (e) {
          var l = new Date(e.P + 1901, 0, 4),
            t = k(new Date(e.P + 1900, 0, 4));
          l = k(l);
          var w = tb(new Date(e.P + 1900, 0, 1), e.Y);
          return 0 > m(w, t)
            ? "53"
            : 0 >= m(l, w)
            ? "01"
            : g(
                Math.ceil(
                  (t.getFullYear() < e.P + 1900
                    ? e.Y + 32 - t.getDate()
                    : e.Y + 1 - t.getDate()) / 7
                ),
                2
              );
        },
        "%w": function (e) {
          return e.X;
        },
        "%W": function (e) {
          var l = new Date(e.P, 0, 1),
            t =
              1 === l.getDay()
                ? l
                : tb(l, 0 === l.getDay() ? 1 : 7 - l.getDay() + 1);
          e = new Date(e.P + 1900, e.T, e.V);
          return 0 > m(t, e)
            ? g(
                Math.ceil(
                  (31 -
                    t.getDate() +
                    (qb(pb(e.getFullYear()) ? rb : sb, e.getMonth() - 1) - 31) +
                    e.getDate()) /
                    7
                ),
                2
              )
            : 0 === m(t, l)
            ? "01"
            : "00";
        },
        "%y": function (e) {
          return (e.P + 1900).toString().substring(2);
        },
        "%Y": function (e) {
          return e.P + 1900;
        },
        "%z": function (e) {
          e = e.ka;
          var l = 0 <= e;
          e = Math.abs(e) / 60;
          return (
            (l ? "+" : "-") +
            String("0000" + ((e / 60) * 100 + (e % 60))).slice(-4)
          );
        },
        "%Z": function (e) {
          return e.na;
        },
        "%%": function () {
          return "%";
        },
      };
      for (q in p)
        0 <= c.indexOf(q) && (c = c.replace(new RegExp(q, "g"), p[q](d)));
      q = vb(c);
      if (q.length > b) return 0;
      J.set(q, a);
      return q.length - 1;
    }
    for (var wb = Array(256), xb = 0; 256 > xb; ++xb)
      wb[xb] = String.fromCharCode(xb);
    Ia = wb;
    Ma = f.BindingError = La("BindingError");
    Na = f.InternalError = La("InternalError");
    f.count_emval_handles = function () {
      for (var a = 0, b = 5; b < X.length; ++b) void 0 !== X[b] && ++a;
      return a;
    };
    f.get_first_emval = function () {
      for (var a = 5; a < X.length; ++a) if (void 0 !== X[a]) return X[a];
      return null;
    };
    bb = f.UnboundTypeError = La("UnboundTypeError");
    function vb(a) {
      var b = Array(ka(a) + 1);
      ja(a, b, 0, b.length);
      return b;
    }
    xa.push({
      ca: function () {
        yb();
      },
    });
    var Ab = {
      s: function (a) {
        return zb(a + 16) + 16;
      },
      f: function () {},
      r: function (a, b, c) {
        new Ga(a).ea(b, c);
        "uncaught_exception" in Q ? Q.aa++ : (Q.aa = 1);
        throw a;
      },
      B: function (a, b, c, d, h) {
        var g = Ha(c);
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
            if (1 === c) var k = J;
            else if (2 === c) k = G;
            else if (4 === c) k = H;
            else throw new TypeError("Unknown boolean type size: " + b);
            return this.fromWireType(k[m >> g]);
          },
          S: null,
        });
      },
      A: function (a, b) {
        b = R(b);
        W(a, {
          name: b,
          fromWireType: function (c) {
            var d = X[c].value;
            Qa(c);
            return d;
          },
          toWireType: function (c, d) {
            return Y(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: Ra,
          S: null,
        });
      },
      o: function (a, b, c) {
        c = Ha(c);
        b = R(b);
        W(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, h) {
            if ("number" !== typeof h && "boolean" !== typeof h)
              throw new TypeError(
                'Cannot convert "' + Sa(h) + '" to ' + this.name
              );
            return h;
          },
          argPackAdvance: 8,
          readValueFromPointer: Ta(b, c),
          S: null,
        });
      },
      k: function (a, b, c, d, h, g) {
        var m = Ya(b, c);
        a = R(a);
        h = $a(d, h);
        Xa(
          a,
          function () {
            eb("Cannot call " + a + " due to unbound types", m);
          },
          b - 1
        );
        Oa(m, function (k) {
          var n = a,
            p = a;
          k = [k[0], null].concat(k.slice(1));
          var q = h,
            u = k.length;
          2 > u &&
            V(
              "argTypes array size mismatch! Must at least get return value and 'this' types!"
            );
          for (var z = null !== k[1] && !1, e = !1, l = 1; l < k.length; ++l)
            if (null !== k[l] && void 0 === k[l].S) {
              e = !0;
              break;
            }
          var t = "void" !== k[0].name,
            w = "",
            F = "";
          for (l = 0; l < u - 2; ++l)
            (w += (0 !== l ? ", " : "") + "arg" + l),
              (F += (0 !== l ? ", " : "") + "arg" + l + "Wired");
          p =
            "return function " +
            Ja(p) +
            "(" +
            w +
            ") {\nif (arguments.length !== " +
            (u - 2) +
            ") {\nthrowBindingError('function " +
            p +
            " called with ' + arguments.length + ' arguments, expected " +
            (u - 2) +
            " args!');\n}\n";
          e && (p += "var destructors = [];\n");
          var ab = e ? "destructors" : "null";
          w = "throwBindingError invoker fn runDestructors retType classParam".split(
            " "
          );
          q = [V, q, g, Va, k[0], k[1]];
          z &&
            (p += "var thisWired = classParam.toWireType(" + ab + ", this);\n");
          for (l = 0; l < u - 2; ++l)
            (p +=
              "var arg" +
              l +
              "Wired = argType" +
              l +
              ".toWireType(" +
              ab +
              ", arg" +
              l +
              "); // " +
              k[l + 2].name +
              "\n"),
              w.push("argType" + l),
              q.push(k[l + 2]);
          z && (F = "thisWired" + (0 < F.length ? ", " : "") + F);
          p +=
            (t ? "var rv = " : "") +
            "invoker(fn" +
            (0 < F.length ? ", " : "") +
            F +
            ");\n";
          if (e) p += "runDestructors(destructors);\n";
          else
            for (l = z ? 1 : 2; l < k.length; ++l)
              (u = 1 === l ? "thisWired" : "arg" + (l - 2) + "Wired"),
                null !== k[l].S &&
                  ((p += u + "_dtor(" + u + "); // " + k[l].name + "\n"),
                  w.push(u + "_dtor"),
                  q.push(k[l].S));
          t && (p += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
          w.push(p + "}\n");
          k = Ua(w).apply(null, q);
          l = b - 1;
          if (!f.hasOwnProperty(n))
            throw new Na("Replacing nonexistant public symbol");
          void 0 !== f[n].R && void 0 !== l
            ? (f[n].R[l] = k)
            : ((f[n] = k), (f[n].ba = l));
          return [];
        });
      },
      d: function (a, b, c, d, h) {
        function g(p) {
          return p;
        }
        b = R(b);
        -1 === h && (h = 4294967295);
        var m = Ha(c);
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
                'Cannot convert "' + Sa(q) + '" to ' + this.name
              );
            if (q < d || q > h)
              throw new TypeError(
                'Passing a number "' +
                  Sa(q) +
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
          readValueFromPointer: fb(b, m, 0 !== d),
          S: null,
        });
      },
      c: function (a, b, c) {
        function d(g) {
          g >>= 2;
          var m = K;
          return new h(I, m[g + 1], m[g]);
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
          { da: !0 }
        );
      },
      p: function (a, b) {
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
                  g = ia(g, k - g);
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
                    return ka(h);
                  }
                : function () {
                    return h.length;
                  })(),
              k = zb(4 + m + 1);
            K[k >> 2] = m;
            if (c && g) ja(h, D, k + 4, m + 1);
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
          readValueFromPointer: Ra,
          S: function (d) {
            Z(d);
          },
        });
      },
      j: function (a, b, c) {
        c = R(c);
        if (2 === b) {
          var d = ma;
          var h = na;
          var g = oa;
          var m = function () {
            return E;
          };
          var k = 1;
        } else
          4 === b &&
            ((d = pa),
            (h = qa),
            (g = ra),
            (m = function () {
              return K;
            }),
            (k = 2));
        W(a, {
          name: c,
          fromWireType: function (n) {
            for (var p = K[n >> 2], q = m(), u, z = n + 4, e = 0; e <= p; ++e) {
              var l = n + 4 + e * b;
              if (e == p || 0 == q[l >> k])
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
              u = zb(4 + q + b);
            K[u >> 2] = q >> k;
            h(p, u + 4, q + b);
            null !== n && n.push(Z, u);
            return u;
          },
          argPackAdvance: 8,
          readValueFromPointer: Ra,
          S: function (n) {
            Z(n);
          },
        });
      },
      C: function (a, b) {
        b = R(b);
        W(a, {
          oa: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {},
        });
      },
      h: Qa,
      e: function (a) {
        if (0 === a) return Y(ib());
        a = hb(a);
        return Y(ib()[a]);
      },
      l: function (a) {
        4 < a && (X[a].$ += 1);
      },
      i: function (a, b, c, d) {
        a || V("Cannot use deleted val. handle = " + a);
        a = X[a].value;
        var h = kb[b];
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
          )(jb, f, Y);
          kb[b] = h;
        }
        return h(a, c, d);
      },
      m: function (a) {
        return Y(hb(a));
      },
      q: function (a, b) {
        a = jb(a, "_emval_take_value");
        a = a.readValueFromPointer(b);
        return Y(a);
      },
      b: function () {
        B();
      },
      v: function (a, b, c) {
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
              C.grow((Math.min(2147483648, d) - I.byteLength + 65535) >>> 16);
              ua(C.buffer);
              var h = 1;
              break a;
            } catch (g) {}
            h = void 0;
          }
          if (h) return !0;
        }
        return !1;
      },
      x: function (a, b) {
        var c = 0;
        mb().forEach(function (d, h) {
          var g = b + c;
          h = H[(a + 4 * h) >> 2] = g;
          for (g = 0; g < d.length; ++g) J[h++ >> 0] = d.charCodeAt(g);
          J[h >> 0] = 0;
          c += d.length + 1;
        });
        return 0;
      },
      y: function (a, b) {
        var c = mb();
        H[a >> 2] = c.length;
        var d = 0;
        c.forEach(function (h) {
          d += h.length + 1;
        });
        H[b >> 2] = d;
        return 0;
      },
      z: function () {
        return 0;
      },
      t: function () {},
      n: function (a, b, c, d) {
        for (var h = 0, g = 0; g < c; g++) {
          for (
            var m = H[(b + 8 * g) >> 2], k = H[(b + (8 * g + 4)) >> 2], n = 0;
            n < k;
            n++
          ) {
            var p = D[m + n],
              q = ob[a];
            if (0 === p || 10 === p) {
              for (p = 0; q[p] && !(NaN <= p); ) ++p;
              p = ha.decode(
                q.subarray ? q.subarray(0, p) : new Uint8Array(q.slice(0, p))
              );
              (1 === a ? ea : y)(p);
              q.length = 0;
            } else q.push(p);
          }
          h += k;
        }
        H[d >> 2] = h;
        return 0;
      },
      a: C,
      u: function () {},
      w: function (a, b, c, d) {
        return ub(a, b, c, d);
      },
    };
    (function () {
      function a(h) {
        f.asm = h.exports;
        L = f.asm.D;
        M--;
        f.monitorRunDependencies && f.monitorRunDependencies(M);
        0 == M &&
          (null !== Ba && (clearInterval(Ba), (Ba = null)),
          N && ((h = N), (N = null), h()));
      }
      function b(h) {
        a(h.instance);
      }
      function c(h) {
        return Fa()
          .then(function (g) {
            return WebAssembly.instantiate(g, d);
          })
          .then(h, function (g) {
            y("failed to asynchronously prepare wasm: " + g);
            B(g);
          });
      }
      var d = { a: Ab };
      M++;
      f.monitorRunDependencies && f.monitorRunDependencies(M);
      if (f.instantiateWasm)
        try {
          return f.instantiateWasm(d, a);
        } catch (h) {
          return (
            y("Module.instantiateWasm callback failed with error: " + h), !1
          );
        }
      (function () {
        return A ||
          "function" !== typeof WebAssembly.instantiateStreaming ||
          Ca() ||
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
    var yb = (f.___wasm_call_ctors = function () {
        return (yb = f.___wasm_call_ctors = f.asm.E).apply(null, arguments);
      }),
      zb = (f._malloc = function () {
        return (zb = f._malloc = f.asm.F).apply(null, arguments);
      }),
      Z = (f._free = function () {
        return (Z = f._free = f.asm.G).apply(null, arguments);
      }),
      db = (f.___getTypeName = function () {
        return (db = f.___getTypeName = f.asm.H).apply(null, arguments);
      });
    f.___embind_register_native_and_builtin_types = function () {
      return (f.___embind_register_native_and_builtin_types = f.asm.I).apply(
        null,
        arguments
      );
    };
    f.dynCall_viijii = function () {
      return (f.dynCall_viijii = f.asm.J).apply(null, arguments);
    };
    f.dynCall_iiji = function () {
      return (f.dynCall_iiji = f.asm.K).apply(null, arguments);
    };
    f.dynCall_jiji = function () {
      return (f.dynCall_jiji = f.asm.L).apply(null, arguments);
    };
    f.dynCall_iiiiiijj = function () {
      return (f.dynCall_iiiiiijj = f.asm.M).apply(null, arguments);
    };
    f.dynCall_iiiiij = function () {
      return (f.dynCall_iiiiij = f.asm.N).apply(null, arguments);
    };
    f.dynCall_iiiiijj = function () {
      return (f.dynCall_iiiiijj = f.asm.O).apply(null, arguments);
    };
    var Bb;
    N = function Cb() {
      Bb || Db();
      Bb || (N = Cb);
    };
    function Db() {
      function a() {
        if (!Bb && ((Bb = !0), (f.calledRun = !0), !fa)) {
          P(xa);
          P(ya);
          aa(f);
          if (f.onRuntimeInitialized) f.onRuntimeInitialized();
          if (f.postRun)
            for (
              "function" == typeof f.postRun && (f.postRun = [f.postRun]);
              f.postRun.length;

            ) {
              var b = f.postRun.shift();
              za.unshift(b);
            }
          P(za);
        }
      }
      if (!(0 < M)) {
        if (f.preRun)
          for (
            "function" == typeof f.preRun && (f.preRun = [f.preRun]);
            f.preRun.length;

          )
            Aa();
        P(wa);
        0 < M ||
          (f.setStatus
            ? (f.setStatus("Running..."),
              setTimeout(function () {
                setTimeout(function () {
                  f.setStatus("");
                }, 1);
                a();
              }, 1))
            : a());
      }
    }
    f.run = Db;
    if (f.preInit)
      for (
        "function" == typeof f.preInit && (f.preInit = [f.preInit]);
        0 < f.preInit.length;

      )
        f.preInit.pop()();
    noExitRuntime = !0;
    Db();

    return jxl_dec.ready;
  };
})();
export default jxl_dec;
