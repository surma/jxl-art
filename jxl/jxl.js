var jxl = (function () {
  var _scriptDir = import.meta.url;

  return function (jxl) {
    jxl = jxl || {};

    var g;
    g || (g = typeof jxl !== "undefined" ? jxl : {});
    var aa, ba;
    g.ready = new Promise(function (a, b) {
      aa = a;
      ba = b;
    });
    var m = {},
      t;
    for (t in g) g.hasOwnProperty(t) && (m[t] = g[t]);
    var ca = [],
      da = "./this.program";
    function ea(a, b) {
      throw b;
    }
    var u = "",
      fa;
    u = self.location.href;
    _scriptDir && (u = _scriptDir);
    0 !== u.indexOf("blob:")
      ? (u = u.substr(0, u.lastIndexOf("/") + 1))
      : (u = "");
    fa = function (a) {
      var b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.responseType = "arraybuffer";
      b.send(null);
      return new Uint8Array(b.response);
    };
    var ha = g.print || console.log.bind(console),
      z = g.printErr || console.warn.bind(console);
    for (t in m) m.hasOwnProperty(t) && (g[t] = m[t]);
    m = null;
    g.arguments && (ca = g.arguments);
    g.thisProgram && (da = g.thisProgram);
    g.quit && (ea = g.quit);
    var ia;
    g.wasmBinary && (ia = g.wasmBinary);
    var noExitRuntime;
    g.noExitRuntime && (noExitRuntime = g.noExitRuntime);
    "object" !== typeof WebAssembly && A("no native wasm support detected");
    var B,
      ja = !1,
      ka = new TextDecoder("utf8");
    function la(a) {
      for (var b = 0; a[b] && !(NaN <= b); ) ++b;
      return ka.decode(
        a.subarray ? a.subarray(0, b) : new Uint8Array(a.slice(0, b))
      );
    }
    function ma(a, b) {
      if (!a) return "";
      b = a + b;
      for (var c = a; !(c >= b) && C[c]; ) ++c;
      return ka.decode(C.subarray(a, c));
    }
    function na(a, b, c, d) {
      if (!(0 < d)) return 0;
      var e = c;
      d = c + d - 1;
      for (var f = 0; f < a.length; ++f) {
        var k = a.charCodeAt(f);
        if (55296 <= k && 57343 >= k) {
          var l = a.charCodeAt(++f);
          k = (65536 + ((k & 1023) << 10)) | (l & 1023);
        }
        if (127 >= k) {
          if (c >= d) break;
          b[c++] = k;
        } else {
          if (2047 >= k) {
            if (c + 1 >= d) break;
            b[c++] = 192 | (k >> 6);
          } else {
            if (65535 >= k) {
              if (c + 2 >= d) break;
              b[c++] = 224 | (k >> 12);
            } else {
              if (c + 3 >= d) break;
              b[c++] = 240 | (k >> 18);
              b[c++] = 128 | ((k >> 12) & 63);
            }
            b[c++] = 128 | ((k >> 6) & 63);
          }
          b[c++] = 128 | (k & 63);
        }
      }
      b[c] = 0;
      return c - e;
    }
    function oa(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d &&
          57343 >= d &&
          (d = (65536 + ((d & 1023) << 10)) | (a.charCodeAt(++c) & 1023));
        127 >= d ? ++b : (b = 2047 >= d ? b + 2 : 65535 >= d ? b + 3 : b + 4);
      }
      return b;
    }
    var pa = new TextDecoder("utf-16le");
    function qa(a, b) {
      var c = a >> 1;
      for (b = c + b / 2; !(c >= b) && ra[c]; ) ++c;
      return pa.decode(C.subarray(a, c << 1));
    }
    function sa(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;
      for (var e = 0; e < c; ++e) (D[b >> 1] = a.charCodeAt(e)), (b += 2);
      D[b >> 1] = 0;
      return b - d;
    }
    function ta(a) {
      return 2 * a.length;
    }
    function ua(a, b) {
      for (var c = 0, d = ""; !(c >= b / 4); ) {
        var e = E[(a + 4 * c) >> 2];
        if (0 == e) break;
        ++c;
        65536 <= e
          ? ((e -= 65536),
            (d += String.fromCharCode(55296 | (e >> 10), 56320 | (e & 1023))))
          : (d += String.fromCharCode(e));
      }
      return d;
    }
    function va(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (4 > c) return 0;
      var d = b;
      c = d + c - 4;
      for (var e = 0; e < a.length; ++e) {
        var f = a.charCodeAt(e);
        if (55296 <= f && 57343 >= f) {
          var k = a.charCodeAt(++e);
          f = (65536 + ((f & 1023) << 10)) | (k & 1023);
        }
        E[b >> 2] = f;
        b += 4;
        if (b + 4 > c) break;
      }
      E[b >> 2] = 0;
      return b - d;
    }
    function wa(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }
      return b;
    }
    function xa(a) {
      var b = oa(a) + 1,
        c = ya(b);
      na(a, F, c, b);
      return c;
    }
    var G, F, C, D, ra, E, H, za, Aa;
    function Ba(a) {
      G = a;
      g.HEAP8 = F = new Int8Array(a);
      g.HEAP16 = D = new Int16Array(a);
      g.HEAP32 = E = new Int32Array(a);
      g.HEAPU8 = C = new Uint8Array(a);
      g.HEAPU16 = ra = new Uint16Array(a);
      g.HEAPU32 = H = new Uint32Array(a);
      g.HEAPF32 = za = new Float32Array(a);
      g.HEAPF64 = Aa = new Float64Array(a);
    }
    var Ca = g.INITIAL_MEMORY || 16777216;
    g.wasmMemory
      ? (B = g.wasmMemory)
      : (B = new WebAssembly.Memory({ initial: Ca / 65536, maximum: 32768 }));
    B && (G = B.buffer);
    Ca = G.byteLength;
    Ba(G);
    var Da,
      Ea = [],
      Fa = [],
      Ga = [],
      Ha = [];
    function Ia() {
      var a = g.preRun.shift();
      Ea.unshift(a);
    }
    var I = 0,
      Ja = null,
      Ka = null;
    g.preloadedImages = {};
    g.preloadedAudios = {};
    function A(a) {
      if (g.onAbort) g.onAbort(a);
      z(a);
      ja = !0;
      a = new WebAssembly.RuntimeError(
        "abort(" + a + "). Build with -s ASSERTIONS=1 for more info."
      );
      ba(a);
      throw a;
    }
    function La() {
      var a = J;
      return String.prototype.startsWith
        ? a.startsWith("data:application/octet-stream;base64,")
        : 0 === a.indexOf("data:application/octet-stream;base64,");
    }
    var J = "jxl.wasm";
    if (!La()) {
      var Ma = J;
      J = g.locateFile ? g.locateFile(Ma, u) : u + Ma;
    }
    function Na() {
      try {
        if (ia) return new Uint8Array(ia);
        if (fa) return fa(J);
        throw "both async and sync fetching of the wasm failed";
      } catch (a) {
        A(a);
      }
    }
    function Oa() {
      return ia || "function" !== typeof fetch
        ? Promise.resolve().then(Na)
        : fetch(J, { credentials: "same-origin" })
            .then(function (a) {
              if (!a.ok) throw "failed to load wasm binary file at '" + J + "'";
              return a.arrayBuffer();
            })
            .catch(function () {
              return Na();
            });
    }
    var K, Pa;
    function Qa(a) {
      for (; 0 < a.length; ) {
        var b = a.shift();
        if ("function" == typeof b) b(g);
        else {
          var c = b.Ta;
          "number" === typeof c
            ? void 0 === b.ya
              ? Da.get(c)()
              : Da.get(c)(b.ya)
            : c(void 0 === b.ya ? null : b.ya);
        }
      }
    }
    function Ra(a) {
      this.la = a - 16;
      this.fb = function (b) {
        E[(this.la + 8) >> 2] = b;
      };
      this.bb = function (b) {
        E[(this.la + 0) >> 2] = b;
      };
      this.cb = function () {
        E[(this.la + 4) >> 2] = 0;
      };
      this.ab = function () {
        F[(this.la + 12) >> 0] = 0;
      };
      this.eb = function () {
        F[(this.la + 13) >> 0] = 0;
      };
      this.Va = function (b, c) {
        this.fb(b);
        this.bb(c);
        this.cb();
        this.ab();
        this.eb();
      };
    }
    function Sa() {
      return 0 < Sa.Pa;
    }
    function Ta(a, b) {
      for (var c = 0, d = a.length - 1; 0 <= d; d--) {
        var e = a[d];
        "." === e
          ? a.splice(d, 1)
          : ".." === e
          ? (a.splice(d, 1), c++)
          : c && (a.splice(d, 1), c--);
      }
      if (b) for (; c; c--) a.unshift("..");
      return a;
    }
    function Ua(a) {
      var b = "/" === a.charAt(0),
        c = "/" === a.substr(-1);
      (a = Ta(
        a.split("/").filter(function (d) {
          return !!d;
        }),
        !b
      ).join("/")) ||
        b ||
        (a = ".");
      a && c && (a += "/");
      return (b ? "/" : "") + a;
    }
    function Va(a) {
      var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
        .exec(a)
        .slice(1);
      a = b[0];
      b = b[1];
      if (!a && !b) return ".";
      b && (b = b.substr(0, b.length - 1));
      return a + b;
    }
    function Wa(a) {
      if ("/" === a) return "/";
      a = Ua(a);
      a = a.replace(/\/$/, "");
      var b = a.lastIndexOf("/");
      return -1 === b ? a : a.substr(b + 1);
    }
    function Xa() {
      if (
        "object" === typeof crypto &&
        "function" === typeof crypto.getRandomValues
      ) {
        var a = new Uint8Array(1);
        return function () {
          crypto.getRandomValues(a);
          return a[0];
        };
      }
      return function () {
        A("randomDevice");
      };
    }
    function Ya() {
      for (var a = "", b = !1, c = arguments.length - 1; -1 <= c && !b; c--) {
        b = 0 <= c ? arguments[c] : "/";
        if ("string" !== typeof b)
          throw new TypeError("Arguments to path.resolve must be strings");
        if (!b) return "";
        a = b + "/" + a;
        b = "/" === b.charAt(0);
      }
      a = Ta(
        a.split("/").filter(function (d) {
          return !!d;
        }),
        !b
      ).join("/");
      return (b ? "/" : "") + a || ".";
    }
    var Za = [];
    function $a(a, b) {
      Za[a] = { input: [], $: [], ka: b };
      ab(a, bb);
    }
    var bb = {
        open: function (a) {
          var b = Za[a.node.sa];
          if (!b) throw new M(43);
          a.Z = b;
          a.seekable = !1;
        },
        close: function (a) {
          a.Z.ka.flush(a.Z);
        },
        flush: function (a) {
          a.Z.ka.flush(a.Z);
        },
        read: function (a, b, c, d) {
          if (!a.Z || !a.Z.ka.Ia) throw new M(60);
          for (var e = 0, f = 0; f < d; f++) {
            try {
              var k = a.Z.ka.Ia(a.Z);
            } catch (l) {
              throw new M(29);
            }
            if (void 0 === k && 0 === e) throw new M(6);
            if (null === k || void 0 === k) break;
            e++;
            b[c + f] = k;
          }
          e && (a.node.timestamp = Date.now());
          return e;
        },
        write: function (a, b, c, d) {
          if (!a.Z || !a.Z.ka.Aa) throw new M(60);
          try {
            for (var e = 0; e < d; e++) a.Z.ka.Aa(a.Z, b[c + e]);
          } catch (f) {
            throw new M(29);
          }
          d && (a.node.timestamp = Date.now());
          return e;
        },
      },
      db = {
        Ia: function (a) {
          if (!a.input.length) {
            var b = null;
            "undefined" != typeof window && "function" == typeof window.prompt
              ? ((b = window.prompt("Input: ")), null !== b && (b += "\n"))
              : "function" == typeof readline &&
                ((b = readline()), null !== b && (b += "\n"));
            if (!b) return null;
            a.input = cb(b, !0);
          }
          return a.input.shift();
        },
        Aa: function (a, b) {
          null === b || 10 === b
            ? (ha(la(a.$)), (a.$ = []))
            : 0 != b && a.$.push(b);
        },
        flush: function (a) {
          a.$ && 0 < a.$.length && (ha(la(a.$)), (a.$ = []));
        },
      },
      eb = {
        Aa: function (a, b) {
          null === b || 10 === b
            ? (z(la(a.$)), (a.$ = []))
            : 0 != b && a.$.push(b);
        },
        flush: function (a) {
          a.$ && 0 < a.$.length && (z(la(a.$)), (a.$ = []));
        },
      },
      N = {
        ba: null,
        ea: function () {
          return N.createNode(null, "/", 16895, 0);
        },
        createNode: function (a, b, c, d) {
          if (24576 === (c & 61440) || 4096 === (c & 61440)) throw new M(63);
          N.ba ||
            (N.ba = {
              dir: {
                node: {
                  ha: N.W.ha,
                  da: N.W.da,
                  na: N.W.na,
                  qa: N.W.qa,
                  Na: N.W.Na,
                  Qa: N.W.Qa,
                  Oa: N.W.Oa,
                  Ma: N.W.Ma,
                  ta: N.W.ta,
                },
                stream: { ja: N.X.ja },
              },
              file: {
                node: { ha: N.W.ha, da: N.W.da },
                stream: {
                  ja: N.X.ja,
                  read: N.X.read,
                  write: N.X.write,
                  Da: N.X.Da,
                  Ja: N.X.Ja,
                  La: N.X.La,
                },
              },
              link: {
                node: { ha: N.W.ha, da: N.W.da, oa: N.W.oa },
                stream: {},
              },
              Ea: { node: { ha: N.W.ha, da: N.W.da }, stream: fb },
            });
          c = gb(a, b, c, d);
          16384 === (c.mode & 61440)
            ? ((c.W = N.ba.dir.node), (c.X = N.ba.dir.stream), (c.V = {}))
            : 32768 === (c.mode & 61440)
            ? ((c.W = N.ba.file.node),
              (c.X = N.ba.file.stream),
              (c.Y = 0),
              (c.V = null))
            : 40960 === (c.mode & 61440)
            ? ((c.W = N.ba.link.node), (c.X = N.ba.link.stream))
            : 8192 === (c.mode & 61440) &&
              ((c.W = N.ba.Ea.node), (c.X = N.ba.Ea.stream));
          c.timestamp = Date.now();
          a && (a.V[b] = c);
          return c;
        },
        qb: function (a) {
          if (a.V && a.V.subarray) {
            for (var b = [], c = 0; c < a.Y; ++c) b.push(a.V[c]);
            return b;
          }
          return a.V;
        },
        rb: function (a) {
          return a.V
            ? a.V.subarray
              ? a.V.subarray(0, a.Y)
              : new Uint8Array(a.V)
            : new Uint8Array(0);
        },
        Fa: function (a, b) {
          var c = a.V ? a.V.length : 0;
          c >= b ||
            ((b = Math.max(b, (c * (1048576 > c ? 2 : 1.125)) >>> 0)),
            0 != c && (b = Math.max(b, 256)),
            (c = a.V),
            (a.V = new Uint8Array(b)),
            0 < a.Y && a.V.set(c.subarray(0, a.Y), 0));
        },
        Za: function (a, b) {
          if (a.Y != b)
            if (0 == b) (a.V = null), (a.Y = 0);
            else {
              if (!a.V || a.V.subarray) {
                var c = a.V;
                a.V = new Uint8Array(b);
                c && a.V.set(c.subarray(0, Math.min(b, a.Y)));
              } else if ((a.V || (a.V = []), a.V.length > b)) a.V.length = b;
              else for (; a.V.length < b; ) a.V.push(0);
              a.Y = b;
            }
        },
        W: {
          ha: function (a) {
            var b = {};
            b.pb = 8192 === (a.mode & 61440) ? a.id : 1;
            b.tb = a.id;
            b.mode = a.mode;
            b.wb = 1;
            b.uid = 0;
            b.sb = 0;
            b.sa = a.sa;
            16384 === (a.mode & 61440)
              ? (b.size = 4096)
              : 32768 === (a.mode & 61440)
              ? (b.size = a.Y)
              : 40960 === (a.mode & 61440)
              ? (b.size = a.link.length)
              : (b.size = 0);
            b.mb = new Date(a.timestamp);
            b.vb = new Date(a.timestamp);
            b.ob = new Date(a.timestamp);
            b.Sa = 4096;
            b.nb = Math.ceil(b.size / b.Sa);
            return b;
          },
          da: function (a, b) {
            void 0 !== b.mode && (a.mode = b.mode);
            void 0 !== b.timestamp && (a.timestamp = b.timestamp);
            void 0 !== b.size && N.Za(a, b.size);
          },
          na: function () {
            throw hb[44];
          },
          qa: function (a, b, c, d) {
            return N.createNode(a, b, c, d);
          },
          Na: function (a, b, c) {
            if (16384 === (a.mode & 61440)) {
              try {
                var d = ib(b, c);
              } catch (f) {}
              if (d) for (var e in d.V) throw new M(55);
            }
            delete a.parent.V[a.name];
            a.name = c;
            b.V[c] = a;
            a.parent = b;
          },
          Qa: function (a, b) {
            delete a.V[b];
          },
          Oa: function (a, b) {
            var c = ib(a, b),
              d;
            for (d in c.V) throw new M(55);
            delete a.V[b];
          },
          Ma: function (a) {
            var b = [".", ".."],
              c;
            for (c in a.V) a.V.hasOwnProperty(c) && b.push(c);
            return b;
          },
          ta: function (a, b, c) {
            a = N.createNode(a, b, 41471, 0);
            a.link = c;
            return a;
          },
          oa: function (a) {
            if (40960 !== (a.mode & 61440)) throw new M(28);
            return a.link;
          },
        },
        X: {
          read: function (a, b, c, d, e) {
            var f = a.node.V;
            if (e >= a.node.Y) return 0;
            a = Math.min(a.node.Y - e, d);
            if (8 < a && f.subarray) b.set(f.subarray(e, e + a), c);
            else for (d = 0; d < a; d++) b[c + d] = f[e + d];
            return a;
          },
          write: function (a, b, c, d, e, f) {
            b.buffer === F.buffer && (f = !1);
            if (!d) return 0;
            a = a.node;
            a.timestamp = Date.now();
            if (b.subarray && (!a.V || a.V.subarray)) {
              if (f) return (a.V = b.subarray(c, c + d)), (a.Y = d);
              if (0 === a.Y && 0 === e)
                return (a.V = b.slice(c, c + d)), (a.Y = d);
              if (e + d <= a.Y) return a.V.set(b.subarray(c, c + d), e), d;
            }
            N.Fa(a, e + d);
            if (a.V.subarray && b.subarray) a.V.set(b.subarray(c, c + d), e);
            else for (f = 0; f < d; f++) a.V[e + f] = b[c + f];
            a.Y = Math.max(a.Y, e + d);
            return d;
          },
          ja: function (a, b, c) {
            1 === c
              ? (b += a.position)
              : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.Y);
            if (0 > b) throw new M(28);
            return b;
          },
          Da: function (a, b, c) {
            N.Fa(a.node, b + c);
            a.node.Y = Math.max(a.node.Y, b + c);
          },
          Ja: function (a, b, c, d, e, f) {
            0 === b || A("Assertion failed: undefined");
            if (32768 !== (a.node.mode & 61440)) throw new M(43);
            a = a.node.V;
            if (f & 2 || a.buffer !== G) {
              if (0 < d || d + c < a.length)
                a.subarray
                  ? (a = a.subarray(d, d + c))
                  : (a = Array.prototype.slice.call(a, d, d + c));
              d = !0;
              f = 16384 * Math.ceil(c / 16384);
              for (b = jb(f); c < f; ) F[b + c++] = 0;
              c = b;
              if (!c) throw new M(48);
              F.set(a, c);
            } else (d = !1), (c = a.byteOffset);
            return { la: c, lb: d };
          },
          La: function (a, b, c, d, e) {
            if (32768 !== (a.node.mode & 61440)) throw new M(43);
            if (e & 2) return 0;
            N.X.write(a, b, 0, d, c, !1);
            return 0;
          },
        },
      },
      kb = null,
      lb = {},
      mb = [],
      nb = 1,
      ob = null,
      pb = !0,
      qb = {},
      M = null,
      hb = {};
    function O(a, b) {
      a = Ya("/", a);
      b = b || {};
      if (!a) return { path: "", node: null };
      var c = { Ha: !0, Ba: 0 },
        d;
      for (d in c) void 0 === b[d] && (b[d] = c[d]);
      if (8 < b.Ba) throw new M(32);
      a = Ta(
        a.split("/").filter(function (k) {
          return !!k;
        }),
        !1
      );
      var e = kb;
      c = "/";
      for (d = 0; d < a.length; d++) {
        var f = d === a.length - 1;
        if (f && b.parent) break;
        e = ib(e, a[d]);
        c = Ua(c + "/" + a[d]);
        e.ra && (!f || (f && b.Ha)) && (e = e.ra.root);
        if (!f || b.Ga)
          for (f = 0; 40960 === (e.mode & 61440); )
            if (
              ((e = rb(c)),
              (c = Ya(Va(c), e)),
              (e = O(c, { Ba: b.Ba }).node),
              40 < f++)
            )
              throw new M(32);
      }
      return { path: c, node: e };
    }
    function sb(a) {
      for (var b; ; ) {
        if (a === a.parent)
          return (
            (a = a.ea.Ka),
            b ? ("/" !== a[a.length - 1] ? a + "/" + b : a + b) : a
          );
        b = b ? a.name + "/" + b : a.name;
        a = a.parent;
      }
    }
    function tb(a, b) {
      for (var c = 0, d = 0; d < b.length; d++)
        c = ((c << 5) - c + b.charCodeAt(d)) | 0;
      return ((a + c) >>> 0) % ob.length;
    }
    function ib(a, b) {
      var c;
      if ((c = (c = ub(a, "x")) ? c : a.W.na ? 0 : 2)) throw new M(c, a);
      for (c = ob[tb(a.id, b)]; c; c = c.Ya) {
        var d = c.name;
        if (c.parent.id === a.id && d === b) return c;
      }
      return a.W.na(a, b);
    }
    function gb(a, b, c, d) {
      a = new vb(a, b, c, d);
      b = tb(a.parent.id, a.name);
      a.Ya = ob[b];
      return (ob[b] = a);
    }
    var wb = {
      r: 0,
      rs: 1052672,
      "r+": 2,
      w: 577,
      wx: 705,
      xw: 705,
      "w+": 578,
      "wx+": 706,
      "xw+": 706,
      a: 1089,
      ax: 1217,
      xa: 1217,
      "a+": 1090,
      "ax+": 1218,
      "xa+": 1218,
    };
    function xb(a) {
      var b = ["r", "w", "rw"][a & 3];
      a & 512 && (b += "w");
      return b;
    }
    function ub(a, b) {
      if (pb) return 0;
      if (-1 === b.indexOf("r") || a.mode & 292) {
        if (
          (-1 !== b.indexOf("w") && !(a.mode & 146)) ||
          (-1 !== b.indexOf("x") && !(a.mode & 73))
        )
          return 2;
      } else return 2;
      return 0;
    }
    function yb(a, b) {
      try {
        return ib(a, b), 20;
      } catch (c) {}
      return ub(a, "wx");
    }
    function zb(a) {
      var b = 4096;
      for (a = a || 0; a <= b; a++) if (!mb[a]) return a;
      throw new M(33);
    }
    function Ab(a, b) {
      Bb || ((Bb = function () {}), (Bb.prototype = {}));
      var c = new Bb(),
        d;
      for (d in a) c[d] = a[d];
      a = c;
      b = zb(b);
      a.ga = b;
      return (mb[b] = a);
    }
    var fb = {
      open: function (a) {
        a.X = lb[a.node.sa].X;
        a.X.open && a.X.open(a);
      },
      ja: function () {
        throw new M(70);
      },
    };
    function ab(a, b) {
      lb[a] = { X: b };
    }
    function Cb(a, b) {
      var c = "/" === b,
        d = !b;
      if (c && kb) throw new M(10);
      if (!c && !d) {
        var e = O(b, { Ha: !1 });
        b = e.path;
        e = e.node;
        if (e.ra) throw new M(10);
        if (16384 !== (e.mode & 61440)) throw new M(54);
      }
      b = { type: a, yb: {}, Ka: b, Xa: [] };
      a = a.ea(b);
      a.ea = b;
      b.root = a;
      c ? (kb = a) : e && ((e.ra = b), e.ea && e.ea.Xa.push(b));
    }
    function Db(a, b, c) {
      var d = O(a, { parent: !0 }).node;
      a = Wa(a);
      if (!a || "." === a || ".." === a) throw new M(28);
      var e = yb(d, a);
      if (e) throw new M(e);
      if (!d.W.qa) throw new M(63);
      return d.W.qa(d, a, b, c);
    }
    function P(a) {
      Db(a, 16895, 0);
    }
    function Eb(a, b, c) {
      "undefined" === typeof c && ((c = b), (b = 438));
      Db(a, b | 8192, c);
    }
    function Fb(a, b) {
      if (!Ya(a)) throw new M(44);
      var c = O(b, { parent: !0 }).node;
      if (!c) throw new M(44);
      b = Wa(b);
      var d = yb(c, b);
      if (d) throw new M(d);
      if (!c.W.ta) throw new M(63);
      c.W.ta(c, b, a);
    }
    function rb(a) {
      a = O(a).node;
      if (!a) throw new M(44);
      if (!a.W.oa) throw new M(28);
      return Ya(sb(a.parent), a.W.oa(a));
    }
    function Gb(a, b, c, d) {
      if ("" === a) throw new M(44);
      if ("string" === typeof b) {
        var e = wb[b];
        if ("undefined" === typeof e)
          throw Error("Unknown file open mode: " + b);
        b = e;
      }
      c = b & 64 ? (("undefined" === typeof c ? 438 : c) & 4095) | 32768 : 0;
      if ("object" === typeof a) var f = a;
      else {
        a = Ua(a);
        try {
          f = O(a, { Ga: !(b & 131072) }).node;
        } catch (l) {}
      }
      e = !1;
      if (b & 64)
        if (f) {
          if (b & 128) throw new M(20);
        } else (f = Db(a, c, 0)), (e = !0);
      if (!f) throw new M(44);
      8192 === (f.mode & 61440) && (b &= -513);
      if (b & 65536 && 16384 !== (f.mode & 61440)) throw new M(54);
      if (
        !e &&
        (c = f
          ? 40960 === (f.mode & 61440)
            ? 32
            : 16384 === (f.mode & 61440) && ("r" !== xb(b) || b & 512)
            ? 31
            : ub(f, xb(b))
          : 44)
      )
        throw new M(c);
      if (b & 512) {
        c = f;
        var k;
        "string" === typeof c ? (k = O(c, { Ga: !0 }).node) : (k = c);
        if (!k.W.da) throw new M(63);
        if (16384 === (k.mode & 61440)) throw new M(31);
        if (32768 !== (k.mode & 61440)) throw new M(28);
        if ((c = ub(k, "w"))) throw new M(c);
        k.W.da(k, { size: 0, timestamp: Date.now() });
      }
      b &= -131713;
      d = Ab(
        {
          node: f,
          path: sb(f),
          flags: b,
          seekable: !0,
          position: 0,
          X: f.X,
          kb: [],
          error: !1,
        },
        d
      );
      d.X.open && d.X.open(d);
      !g.logReadFiles ||
        b & 1 ||
        (Hb || (Hb = {}),
        a in Hb ||
          ((Hb[a] = 1), z("FS.trackingDelegate error on read file: " + a)));
      try {
        qb.onOpenFile &&
          ((f = 0),
          1 !== (b & 2097155) && (f |= 1),
          0 !== (b & 2097155) && (f |= 2),
          qb.onOpenFile(a, f));
      } catch (l) {
        z(
          "FS.trackingDelegate['onOpenFile']('" +
            a +
            "', flags) threw an exception: " +
            l.message
        );
      }
      return d;
    }
    function Ib(a, b, c) {
      if (null === a.ga) throw new M(8);
      if (!a.seekable || !a.X.ja) throw new M(70);
      if (0 != c && 1 != c && 2 != c) throw new M(28);
      a.position = a.X.ja(a, b, c);
      a.kb = [];
    }
    function Jb() {
      M ||
        ((M = function (a, b) {
          this.node = b;
          this.$a = function (c) {
            this.ia = c;
          };
          this.$a(a);
          this.message = "FS error";
        }),
        (M.prototype = Error()),
        (M.prototype.constructor = M),
        [44].forEach(function (a) {
          hb[a] = new M(a);
          hb[a].stack = "<generic error, no stack>";
        }));
    }
    var Kb;
    function Lb(a, b) {
      var c = 0;
      a && (c |= 365);
      b && (c |= 146);
      return c;
    }
    function Mb(a, b, c) {
      a = Ua("/dev/" + a);
      var d = Lb(!!b, !!c);
      Nb || (Nb = 64);
      var e = (Nb++ << 8) | 0;
      ab(e, {
        open: function (f) {
          f.seekable = !1;
        },
        close: function () {
          c && c.buffer && c.buffer.length && c(10);
        },
        read: function (f, k, l, p) {
          for (var q = 0, r = 0; r < p; r++) {
            try {
              var v = b();
            } catch (x) {
              throw new M(29);
            }
            if (void 0 === v && 0 === q) throw new M(6);
            if (null === v || void 0 === v) break;
            q++;
            k[l + r] = v;
          }
          q && (f.node.timestamp = Date.now());
          return q;
        },
        write: function (f, k, l, p) {
          for (var q = 0; q < p; q++)
            try {
              c(k[l + q]);
            } catch (r) {
              throw new M(29);
            }
          p && (f.node.timestamp = Date.now());
          return q;
        },
      });
      Eb(a, d, e);
    }
    var Nb,
      Q = {},
      Bb,
      Hb,
      Ob = void 0;
    function R() {
      Ob += 4;
      return E[(Ob - 4) >> 2];
    }
    function S(a) {
      a = mb[a];
      if (!a) throw new M(8);
      return a;
    }
    function Pb(a) {
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
    var Qb = void 0;
    function T(a) {
      for (var b = ""; C[a]; ) b += Qb[C[a++]];
      return b;
    }
    var U = {},
      V = {},
      Rb = {};
    function Sb(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? "_" + a : a;
    }
    function Tb(a, b) {
      a = Sb(a);
      return new Function(
        "body",
        "return function " +
          a +
          '() {\n    "use strict";    return body.apply(this, arguments);\n};\n'
      )(b);
    }
    function Ub(a) {
      var b = Error,
        c = Tb(a, function (d) {
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
    var Vb = void 0;
    function W(a) {
      throw new Vb(a);
    }
    var Wb = void 0;
    function Xb(a, b) {
      function c(l) {
        l = b(l);
        if (l.length !== d.length)
          throw new Wb("Mismatched type converter count");
        for (var p = 0; p < d.length; ++p) X(d[p], l[p]);
      }
      var d = [];
      d.forEach(function (l) {
        Rb[l] = a;
      });
      var e = Array(a.length),
        f = [],
        k = 0;
      a.forEach(function (l, p) {
        V.hasOwnProperty(l)
          ? (e[p] = V[l])
          : (f.push(l),
            U.hasOwnProperty(l) || (U[l] = []),
            U[l].push(function () {
              e[p] = V[l];
              ++k;
              k === f.length && c(e);
            }));
      });
      0 === f.length && c(e);
    }
    function X(a, b, c) {
      c = c || {};
      if (!("argPackAdvance" in b))
        throw new TypeError(
          "registerType registeredInstance requires argPackAdvance"
        );
      var d = b.name;
      a || W('type "' + d + '" must have a positive integer typeid pointer');
      if (V.hasOwnProperty(a)) {
        if (c.Ua) return;
        W("Cannot register type '" + d + "' twice");
      }
      V[a] = b;
      delete Rb[a];
      U.hasOwnProperty(a) &&
        ((b = U[a]),
        delete U[a],
        b.forEach(function (e) {
          e();
        }));
    }
    var Zb = [],
      Y = [
        {},
        { value: void 0 },
        { value: null },
        { value: !0 },
        { value: !1 },
      ];
    function $b(a) {
      4 < a && 0 === --Y[a].Ca && ((Y[a] = void 0), Zb.push(a));
    }
    function ac(a) {
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
          var b = Zb.length ? Zb.pop() : Y.length;
          Y[b] = { Ca: 1, value: a };
          return b;
      }
    }
    function bc(a) {
      return this.fromWireType(H[a >> 2]);
    }
    function cc(a) {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b
        ? a.toString()
        : "" + a;
    }
    function dc(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(za[c >> 2]);
          };
        case 3:
          return function (c) {
            return this.fromWireType(Aa[c >> 3]);
          };
        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }
    function ec(a) {
      var b = Function;
      if (!(b instanceof Function))
        throw new TypeError(
          "new_ called with constructor type " +
            typeof b +
            " which is not a function"
        );
      var c = Tb(b.name || "unknownFunctionName", function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }
    function fc(a) {
      for (; a.length; ) {
        var b = a.pop();
        a.pop()(b);
      }
    }
    function gc(a, b) {
      var c = g;
      if (void 0 === c[a].ca) {
        var d = c[a];
        c[a] = function () {
          c[a].ca.hasOwnProperty(arguments.length) ||
            W(
              "Function '" +
                b +
                "' called with an invalid number of arguments (" +
                arguments.length +
                ") - expects one of (" +
                c[a].ca +
                ")!"
            );
          return c[a].ca[arguments.length].apply(this, arguments);
        };
        c[a].ca = [];
        c[a].ca[d.Ra] = d;
      }
    }
    function hc(a, b, c) {
      g.hasOwnProperty(a)
        ? ((void 0 === c || (void 0 !== g[a].ca && void 0 !== g[a].ca[c])) &&
            W("Cannot register public name '" + a + "' twice"),
          gc(a, a),
          g.hasOwnProperty(c) &&
            W(
              "Cannot register multiple overloads of a function with the same number of arguments (" +
                c +
                ")!"
            ),
          (g[a].ca[c] = b))
        : ((g[a] = b), void 0 !== c && (g[a].xb = c));
    }
    function ic(a, b) {
      for (var c = [], d = 0; d < a; d++) c.push(E[(b >> 2) + d]);
      return c;
    }
    function jc(a, b) {
      0 <= a.indexOf("j") ||
        A("Assertion failed: getDynCaller should only be called with i64 sigs");
      var c = [];
      return function () {
        c.length = arguments.length;
        for (var d = 0; d < arguments.length; d++) c[d] = arguments[d];
        var e;
        -1 != a.indexOf("j")
          ? (e =
              c && c.length
                ? g["dynCall_" + a].apply(null, [b].concat(c))
                : g["dynCall_" + a].call(null, b))
          : (e = Da.get(b).apply(null, c));
        return e;
      };
    }
    function kc(a, b) {
      a = T(a);
      var c = -1 != a.indexOf("j") ? jc(a, b) : Da.get(b);
      "function" !== typeof c &&
        W("unknown function pointer with signature " + a + ": " + b);
      return c;
    }
    var lc = void 0;
    function mc(a) {
      a = nc(a);
      var b = T(a);
      Z(a);
      return b;
    }
    function oc(a, b) {
      function c(f) {
        e[f] || V[f] || (Rb[f] ? Rb[f].forEach(c) : (d.push(f), (e[f] = !0)));
      }
      var d = [],
        e = {};
      b.forEach(c);
      throw new lc(a + ": " + d.map(mc).join([", "]));
    }
    function pc(a, b, c) {
      switch (b) {
        case 0:
          return c
            ? function (d) {
                return F[d];
              }
            : function (d) {
                return C[d];
              };
        case 1:
          return c
            ? function (d) {
                return D[d >> 1];
              }
            : function (d) {
                return ra[d >> 1];
              };
        case 2:
          return c
            ? function (d) {
                return E[d >> 2];
              }
            : function (d) {
                return H[d >> 2];
              };
        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }
    var qc = {};
    function rc() {
      return "object" === typeof globalThis
        ? globalThis
        : Function("return this")();
    }
    function sc(a, b) {
      var c = V[a];
      void 0 === c && W(b + " has unknown type " + mc(a));
      return c;
    }
    var tc = {},
      uc = {};
    function vc() {
      if (!wc) {
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
        for (b in uc) a[b] = uc[b];
        var c = [];
        for (b in a) c.push(b + "=" + a[b]);
        wc = c;
      }
      return wc;
    }
    var wc;
    function xc(a) {
      return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400);
    }
    function yc(a, b) {
      for (var c = 0, d = 0; d <= b; c += a[d++]);
      return c;
    }
    var zc = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      Ac = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function Bc(a, b) {
      for (a = new Date(a.getTime()); 0 < b; ) {
        var c = a.getMonth(),
          d = (xc(a.getFullYear()) ? zc : Ac)[c];
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
    function Cc(a, b, c, d) {
      function e(h, n, w) {
        for (h = "number" === typeof h ? h.toString() : h || ""; h.length < n; )
          h = w[0] + h;
        return h;
      }
      function f(h, n) {
        return e(h, n, "0");
      }
      function k(h, n) {
        function w(L) {
          return 0 > L ? -1 : 0 < L ? 1 : 0;
        }
        var y;
        0 === (y = w(h.getFullYear() - n.getFullYear())) &&
          0 === (y = w(h.getMonth() - n.getMonth())) &&
          (y = w(h.getDate() - n.getDate()));
        return y;
      }
      function l(h) {
        switch (h.getDay()) {
          case 0:
            return new Date(h.getFullYear() - 1, 11, 29);
          case 1:
            return h;
          case 2:
            return new Date(h.getFullYear(), 0, 3);
          case 3:
            return new Date(h.getFullYear(), 0, 2);
          case 4:
            return new Date(h.getFullYear(), 0, 1);
          case 5:
            return new Date(h.getFullYear() - 1, 11, 31);
          case 6:
            return new Date(h.getFullYear() - 1, 11, 30);
        }
      }
      function p(h) {
        h = Bc(new Date(h.aa + 1900, 0, 1), h.wa);
        var n = new Date(h.getFullYear() + 1, 0, 4),
          w = l(new Date(h.getFullYear(), 0, 4));
        n = l(n);
        return 0 >= k(w, h)
          ? 0 >= k(n, h)
            ? h.getFullYear() + 1
            : h.getFullYear()
          : h.getFullYear() - 1;
      }
      var q = E[(d + 40) >> 2];
      d = {
        ib: E[d >> 2],
        hb: E[(d + 4) >> 2],
        ua: E[(d + 8) >> 2],
        pa: E[(d + 12) >> 2],
        ma: E[(d + 16) >> 2],
        aa: E[(d + 20) >> 2],
        va: E[(d + 24) >> 2],
        wa: E[(d + 28) >> 2],
        zb: E[(d + 32) >> 2],
        gb: E[(d + 36) >> 2],
        jb: q ? ma(q) : "",
      };
      c = ma(c);
      q = {
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
      for (var r in q) c = c.replace(new RegExp(r, "g"), q[r]);
      var v = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
          " "
        ),
        x = "January February March April May June July August September October November December".split(
          " "
        );
      q = {
        "%a": function (h) {
          return v[h.va].substring(0, 3);
        },
        "%A": function (h) {
          return v[h.va];
        },
        "%b": function (h) {
          return x[h.ma].substring(0, 3);
        },
        "%B": function (h) {
          return x[h.ma];
        },
        "%C": function (h) {
          return f(((h.aa + 1900) / 100) | 0, 2);
        },
        "%d": function (h) {
          return f(h.pa, 2);
        },
        "%e": function (h) {
          return e(h.pa, 2, " ");
        },
        "%g": function (h) {
          return p(h).toString().substring(2);
        },
        "%G": function (h) {
          return p(h);
        },
        "%H": function (h) {
          return f(h.ua, 2);
        },
        "%I": function (h) {
          h = h.ua;
          0 == h ? (h = 12) : 12 < h && (h -= 12);
          return f(h, 2);
        },
        "%j": function (h) {
          return f(h.pa + yc(xc(h.aa + 1900) ? zc : Ac, h.ma - 1), 3);
        },
        "%m": function (h) {
          return f(h.ma + 1, 2);
        },
        "%M": function (h) {
          return f(h.hb, 2);
        },
        "%n": function () {
          return "\n";
        },
        "%p": function (h) {
          return 0 <= h.ua && 12 > h.ua ? "AM" : "PM";
        },
        "%S": function (h) {
          return f(h.ib, 2);
        },
        "%t": function () {
          return "\t";
        },
        "%u": function (h) {
          return h.va || 7;
        },
        "%U": function (h) {
          var n = new Date(h.aa + 1900, 0, 1),
            w = 0 === n.getDay() ? n : Bc(n, 7 - n.getDay());
          h = new Date(h.aa + 1900, h.ma, h.pa);
          return 0 > k(w, h)
            ? f(
                Math.ceil(
                  (31 -
                    w.getDate() +
                    (yc(xc(h.getFullYear()) ? zc : Ac, h.getMonth() - 1) - 31) +
                    h.getDate()) /
                    7
                ),
                2
              )
            : 0 === k(w, n)
            ? "01"
            : "00";
        },
        "%V": function (h) {
          var n = new Date(h.aa + 1901, 0, 4),
            w = l(new Date(h.aa + 1900, 0, 4));
          n = l(n);
          var y = Bc(new Date(h.aa + 1900, 0, 1), h.wa);
          return 0 > k(y, w)
            ? "53"
            : 0 >= k(n, y)
            ? "01"
            : f(
                Math.ceil(
                  (w.getFullYear() < h.aa + 1900
                    ? h.wa + 32 - w.getDate()
                    : h.wa + 1 - w.getDate()) / 7
                ),
                2
              );
        },
        "%w": function (h) {
          return h.va;
        },
        "%W": function (h) {
          var n = new Date(h.aa, 0, 1),
            w =
              1 === n.getDay()
                ? n
                : Bc(n, 0 === n.getDay() ? 1 : 7 - n.getDay() + 1);
          h = new Date(h.aa + 1900, h.ma, h.pa);
          return 0 > k(w, h)
            ? f(
                Math.ceil(
                  (31 -
                    w.getDate() +
                    (yc(xc(h.getFullYear()) ? zc : Ac, h.getMonth() - 1) - 31) +
                    h.getDate()) /
                    7
                ),
                2
              )
            : 0 === k(w, n)
            ? "01"
            : "00";
        },
        "%y": function (h) {
          return (h.aa + 1900).toString().substring(2);
        },
        "%Y": function (h) {
          return h.aa + 1900;
        },
        "%z": function (h) {
          h = h.gb;
          var n = 0 <= h;
          h = Math.abs(h) / 60;
          return (
            (n ? "+" : "-") +
            String("0000" + ((h / 60) * 100 + (h % 60))).slice(-4)
          );
        },
        "%Z": function (h) {
          return h.jb;
        },
        "%%": function () {
          return "%";
        },
      };
      for (r in q)
        0 <= c.indexOf(r) && (c = c.replace(new RegExp(r, "g"), q[r](d)));
      r = cb(c, !1);
      if (r.length > b) return 0;
      F.set(r, a);
      return r.length - 1;
    }
    function vb(a, b, c, d) {
      a || (a = this);
      this.parent = a;
      this.ea = a.ea;
      this.ra = null;
      this.id = nb++;
      this.name = b;
      this.mode = c;
      this.W = {};
      this.X = {};
      this.sa = d;
    }
    Object.defineProperties(vb.prototype, {
      read: {
        get: function () {
          return 365 === (this.mode & 365);
        },
        set: function (a) {
          a ? (this.mode |= 365) : (this.mode &= -366);
        },
      },
      write: {
        get: function () {
          return 146 === (this.mode & 146);
        },
        set: function (a) {
          a ? (this.mode |= 146) : (this.mode &= -147);
        },
      },
    });
    Jb();
    ob = Array(4096);
    Cb(N, "/");
    P("/tmp");
    P("/home");
    P("/home/web_user");
    (function () {
      P("/dev");
      ab(259, {
        read: function () {
          return 0;
        },
        write: function (b, c, d, e) {
          return e;
        },
      });
      Eb("/dev/null", 259);
      $a(1280, db);
      $a(1536, eb);
      Eb("/dev/tty", 1280);
      Eb("/dev/tty1", 1536);
      var a = Xa();
      Mb("random", a);
      Mb("urandom", a);
      P("/dev/shm");
      P("/dev/shm/tmp");
    })();
    P("/proc");
    P("/proc/self");
    P("/proc/self/fd");
    Cb(
      {
        ea: function () {
          var a = gb("/proc/self", "fd", 16895, 73);
          a.W = {
            na: function (b, c) {
              var d = mb[+c];
              if (!d) throw new M(8);
              b = {
                parent: null,
                ea: { Ka: "fake" },
                W: {
                  oa: function () {
                    return d.path;
                  },
                },
              };
              return (b.parent = b);
            },
          };
          return a;
        },
      },
      "/proc/self/fd"
    );
    for (var Dc = Array(256), Ec = 0; 256 > Ec; ++Ec)
      Dc[Ec] = String.fromCharCode(Ec);
    Qb = Dc;
    Vb = g.BindingError = Ub("BindingError");
    Wb = g.InternalError = Ub("InternalError");
    g.count_emval_handles = function () {
      for (var a = 0, b = 5; b < Y.length; ++b) void 0 !== Y[b] && ++a;
      return a;
    };
    g.get_first_emval = function () {
      for (var a = 5; a < Y.length; ++a) if (void 0 !== Y[a]) return Y[a];
      return null;
    };
    lc = g.UnboundTypeError = Ub("UnboundTypeError");
    function cb(a, b) {
      var c = Array(oa(a) + 1);
      a = na(a, c, 0, c.length);
      b && (c.length = a);
      return c;
    }
    Fa.push({
      Ta: function () {
        Fc();
      },
    });
    var Hc = {
      k: function (a) {
        return jb(a + 16) + 16;
      },
      f: function () {},
      j: function (a, b, c) {
        new Ra(a).Va(b, c);
        "uncaught_exception" in Sa ? Sa.Pa++ : (Sa.Pa = 1);
        throw a;
      },
      o: function (a, b, c) {
        Ob = c;
        try {
          var d = S(a);
          switch (b) {
            case 0:
              var e = R();
              return 0 > e ? -28 : Gb(d.path, d.flags, 0, e).ga;
            case 1:
            case 2:
              return 0;
            case 3:
              return d.flags;
            case 4:
              return (e = R()), (d.flags |= e), 0;
            case 12:
              return (e = R()), (D[(e + 0) >> 1] = 2), 0;
            case 13:
            case 14:
              return 0;
            case 16:
            case 8:
              return -28;
            case 9:
              return (E[Gc() >> 2] = 28), -1;
            default:
              return -28;
          }
        } catch (f) {
          return ("undefined" !== typeof Q && f instanceof M) || A(f), -f.ia;
        }
      },
      B: function (a, b, c) {
        Ob = c;
        try {
          var d = S(a);
          switch (b) {
            case 21509:
            case 21505:
              return d.Z ? 0 : -59;
            case 21510:
            case 21511:
            case 21512:
            case 21506:
            case 21507:
            case 21508:
              return d.Z ? 0 : -59;
            case 21519:
              if (!d.Z) return -59;
              var e = R();
              return (E[e >> 2] = 0);
            case 21520:
              return d.Z ? -28 : -59;
            case 21531:
              a = e = R();
              if (!d.X.Wa) throw new M(59);
              return d.X.Wa(d, b, a);
            case 21523:
              return d.Z ? 0 : -59;
            case 21524:
              return d.Z ? 0 : -59;
            default:
              A("bad ioctl syscall " + b);
          }
        } catch (f) {
          return ("undefined" !== typeof Q && f instanceof M) || A(f), -f.ia;
        }
      },
      C: function (a, b, c) {
        Ob = c;
        try {
          var d = ma(a),
            e = R();
          return Gb(d, b, e).ga;
        } catch (f) {
          return ("undefined" !== typeof Q && f instanceof M) || A(f), -f.ia;
        }
      },
      E: function (a, b, c, d, e) {
        var f = Pb(c);
        b = T(b);
        X(a, {
          name: b,
          fromWireType: function (k) {
            return !!k;
          },
          toWireType: function (k, l) {
            return l ? d : e;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (k) {
            if (1 === c) var l = F;
            else if (2 === c) l = D;
            else if (4 === c) l = E;
            else throw new TypeError("Unknown boolean type size: " + b);
            return this.fromWireType(l[k >> f]);
          },
          fa: null,
        });
      },
      D: function (a, b) {
        b = T(b);
        X(a, {
          name: b,
          fromWireType: function (c) {
            var d = Y[c].value;
            $b(c);
            return d;
          },
          toWireType: function (c, d) {
            return ac(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: bc,
          fa: null,
        });
      },
      r: function (a, b, c) {
        c = Pb(c);
        b = T(b);
        X(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, e) {
            if ("number" !== typeof e && "boolean" !== typeof e)
              throw new TypeError(
                'Cannot convert "' + cc(e) + '" to ' + this.name
              );
            return e;
          },
          argPackAdvance: 8,
          readValueFromPointer: dc(b, c),
          fa: null,
        });
      },
      m: function (a, b, c, d, e, f) {
        var k = ic(b, c);
        a = T(a);
        e = kc(d, e);
        hc(
          a,
          function () {
            oc("Cannot call " + a + " due to unbound types", k);
          },
          b - 1
        );
        Xb(k, function (l) {
          var p = a,
            q = a;
          l = [l[0], null].concat(l.slice(1));
          var r = e,
            v = l.length;
          2 > v &&
            W(
              "argTypes array size mismatch! Must at least get return value and 'this' types!"
            );
          for (var x = null !== l[1] && !1, h = !1, n = 1; n < l.length; ++n)
            if (null !== l[n] && void 0 === l[n].fa) {
              h = !0;
              break;
            }
          var w = "void" !== l[0].name,
            y = "",
            L = "";
          for (n = 0; n < v - 2; ++n)
            (y += (0 !== n ? ", " : "") + "arg" + n),
              (L += (0 !== n ? ", " : "") + "arg" + n + "Wired");
          q =
            "return function " +
            Sb(q) +
            "(" +
            y +
            ") {\nif (arguments.length !== " +
            (v - 2) +
            ") {\nthrowBindingError('function " +
            q +
            " called with ' + arguments.length + ' arguments, expected " +
            (v - 2) +
            " args!');\n}\n";
          h && (q += "var destructors = [];\n");
          var Yb = h ? "destructors" : "null";
          y = "throwBindingError invoker fn runDestructors retType classParam".split(
            " "
          );
          r = [W, r, f, fc, l[0], l[1]];
          x &&
            (q += "var thisWired = classParam.toWireType(" + Yb + ", this);\n");
          for (n = 0; n < v - 2; ++n)
            (q +=
              "var arg" +
              n +
              "Wired = argType" +
              n +
              ".toWireType(" +
              Yb +
              ", arg" +
              n +
              "); // " +
              l[n + 2].name +
              "\n"),
              y.push("argType" + n),
              r.push(l[n + 2]);
          x && (L = "thisWired" + (0 < L.length ? ", " : "") + L);
          q +=
            (w ? "var rv = " : "") +
            "invoker(fn" +
            (0 < L.length ? ", " : "") +
            L +
            ");\n";
          if (h) q += "runDestructors(destructors);\n";
          else
            for (n = x ? 1 : 2; n < l.length; ++n)
              (v = 1 === n ? "thisWired" : "arg" + (n - 2) + "Wired"),
                null !== l[n].fa &&
                  ((q += v + "_dtor(" + v + "); // " + l[n].name + "\n"),
                  y.push(v + "_dtor"),
                  r.push(l[n].fa));
          w && (q += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
          y.push(q + "}\n");
          l = ec(y).apply(null, r);
          n = b - 1;
          if (!g.hasOwnProperty(p))
            throw new Wb("Replacing nonexistant public symbol");
          void 0 !== g[p].ca && void 0 !== n
            ? (g[p].ca[n] = l)
            : ((g[p] = l), (g[p].Ra = n));
          return [];
        });
      },
      d: function (a, b, c, d, e) {
        function f(q) {
          return q;
        }
        b = T(b);
        -1 === e && (e = 4294967295);
        var k = Pb(c);
        if (0 === d) {
          var l = 32 - 8 * c;
          f = function (q) {
            return (q << l) >>> l;
          };
        }
        var p = -1 != b.indexOf("unsigned");
        X(a, {
          name: b,
          fromWireType: f,
          toWireType: function (q, r) {
            if ("number" !== typeof r && "boolean" !== typeof r)
              throw new TypeError(
                'Cannot convert "' + cc(r) + '" to ' + this.name
              );
            if (r < d || r > e)
              throw new TypeError(
                'Passing a number "' +
                  cc(r) +
                  '" from JS side to C/C++ side to an argument of type "' +
                  b +
                  '", which is outside the valid range [' +
                  d +
                  ", " +
                  e +
                  "]!"
              );
            return p ? r >>> 0 : r | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: pc(b, k, 0 !== d),
          fa: null,
        });
      },
      c: function (a, b, c) {
        function d(f) {
          f >>= 2;
          var k = H;
          return new e(G, k[f + 1], k[f]);
        }
        var e = [
          Int8Array,
          Uint8Array,
          Int16Array,
          Uint16Array,
          Int32Array,
          Uint32Array,
          Float32Array,
          Float64Array,
        ][b];
        c = T(c);
        X(
          a,
          {
            name: c,
            fromWireType: d,
            argPackAdvance: 8,
            readValueFromPointer: d,
          },
          { Ua: !0 }
        );
      },
      s: function (a, b) {
        b = T(b);
        var c = "std::string" === b;
        X(a, {
          name: b,
          fromWireType: function (d) {
            var e = H[d >> 2];
            if (c)
              for (var f = d + 4, k = 0; k <= e; ++k) {
                var l = d + 4 + k;
                if (k == e || 0 == C[l]) {
                  f = ma(f, l - f);
                  if (void 0 === p) var p = f;
                  else (p += String.fromCharCode(0)), (p += f);
                  f = l + 1;
                }
              }
            else {
              p = Array(e);
              for (k = 0; k < e; ++k) p[k] = String.fromCharCode(C[d + 4 + k]);
              p = p.join("");
            }
            Z(d);
            return p;
          },
          toWireType: function (d, e) {
            e instanceof ArrayBuffer && (e = new Uint8Array(e));
            var f = "string" === typeof e;
            f ||
              e instanceof Uint8Array ||
              e instanceof Uint8ClampedArray ||
              e instanceof Int8Array ||
              W("Cannot pass non-string to std::string");
            var k = (c && f
                ? function () {
                    return oa(e);
                  }
                : function () {
                    return e.length;
                  })(),
              l = jb(4 + k + 1);
            H[l >> 2] = k;
            if (c && f) na(e, C, l + 4, k + 1);
            else if (f)
              for (f = 0; f < k; ++f) {
                var p = e.charCodeAt(f);
                255 < p &&
                  (Z(l),
                  W("String has UTF-16 code units that do not fit in 8 bits"));
                C[l + 4 + f] = p;
              }
            else for (f = 0; f < k; ++f) C[l + 4 + f] = e[f];
            null !== d && d.push(Z, l);
            return l;
          },
          argPackAdvance: 8,
          readValueFromPointer: bc,
          fa: function (d) {
            Z(d);
          },
        });
      },
      l: function (a, b, c) {
        c = T(c);
        if (2 === b) {
          var d = qa;
          var e = sa;
          var f = ta;
          var k = function () {
            return ra;
          };
          var l = 1;
        } else
          4 === b &&
            ((d = ua),
            (e = va),
            (f = wa),
            (k = function () {
              return H;
            }),
            (l = 2));
        X(a, {
          name: c,
          fromWireType: function (p) {
            for (var q = H[p >> 2], r = k(), v, x = p + 4, h = 0; h <= q; ++h) {
              var n = p + 4 + h * b;
              if (h == q || 0 == r[n >> l])
                (x = d(x, n - x)),
                  void 0 === v
                    ? (v = x)
                    : ((v += String.fromCharCode(0)), (v += x)),
                  (x = n + b);
            }
            Z(p);
            return v;
          },
          toWireType: function (p, q) {
            "string" !== typeof q &&
              W("Cannot pass non-string to C++ string type " + c);
            var r = f(q),
              v = jb(4 + r + b);
            H[v >> 2] = r >> l;
            e(q, v + 4, r + b);
            null !== p && p.push(Z, v);
            return v;
          },
          argPackAdvance: 8,
          readValueFromPointer: bc,
          fa: function (p) {
            Z(p);
          },
        });
      },
      F: function (a, b) {
        b = T(b);
        X(a, {
          ub: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {},
        });
      },
      h: $b,
      e: function (a) {
        if (0 === a) return ac(rc());
        var b = qc[a];
        a = void 0 === b ? T(a) : b;
        return ac(rc()[a]);
      },
      n: function (a) {
        4 < a && (Y[a].Ca += 1);
      },
      i: function (a, b, c, d) {
        a || W("Cannot use deleted val. handle = " + a);
        a = Y[a].value;
        var e = tc[b];
        if (!e) {
          e = "";
          for (var f = 0; f < b; ++f) e += (0 !== f ? ", " : "") + "arg" + f;
          var k =
            "return function emval_allocator_" +
            b +
            "(constructor, argTypes, args) {\n";
          for (f = 0; f < b; ++f)
            k +=
              "var argType" +
              f +
              " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " +
              f +
              '], "parameter ' +
              f +
              '");\nvar arg' +
              f +
              " = argType" +
              f +
              ".readValueFromPointer(args);\nargs += argType" +
              f +
              "['argPackAdvance'];\n";
          e = new Function(
            "requireRegisteredType",
            "Module",
            "__emval_register",
            k +
              ("var obj = new constructor(" +
                e +
                ");\nreturn __emval_register(obj);\n}\n")
          )(sc, g, ac);
          tc[b] = e;
        }
        return e(a, c, d);
      },
      b: function () {
        A();
      },
      w: function (a, b, c) {
        C.copyWithin(a, b, b + c);
      },
      g: function (a) {
        a >>>= 0;
        var b = C.length;
        if (2147483648 < a) return !1;
        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + 0.2 / c);
          d = Math.min(d, a + 100663296);
          d = Math.max(16777216, a, d);
          0 < d % 65536 && (d += 65536 - (d % 65536));
          a: {
            try {
              B.grow((Math.min(2147483648, d) - G.byteLength + 65535) >>> 16);
              Ba(B.buffer);
              var e = 1;
              break a;
            } catch (f) {}
            e = void 0;
          }
          if (e) return !0;
        }
        return !1;
      },
      y: function (a, b) {
        var c = 0;
        vc().forEach(function (d, e) {
          var f = b + c;
          e = E[(a + 4 * e) >> 2] = f;
          for (f = 0; f < d.length; ++f) F[e++ >> 0] = d.charCodeAt(f);
          F[e >> 0] = 0;
          c += d.length + 1;
        });
        return 0;
      },
      z: function (a, b) {
        var c = vc();
        E[a >> 2] = c.length;
        var d = 0;
        c.forEach(function (e) {
          d += e.length + 1;
        });
        E[b >> 2] = d;
        return 0;
      },
      q: function (a) {
        try {
          var b = S(a);
          if (null === b.ga) throw new M(8);
          b.za && (b.za = null);
          try {
            b.X.close && b.X.close(b);
          } catch (c) {
            throw c;
          } finally {
            mb[b.ga] = null;
          }
          b.ga = null;
          return 0;
        } catch (c) {
          return ("undefined" !== typeof Q && c instanceof M) || A(c), c.ia;
        }
      },
      A: function (a, b, c, d) {
        try {
          a: {
            for (var e = S(a), f = (a = 0); f < c; f++) {
              var k = E[(b + (8 * f + 4)) >> 2],
                l = e,
                p = E[(b + 8 * f) >> 2],
                q = k,
                r = void 0,
                v = F;
              if (0 > q || 0 > r) throw new M(28);
              if (null === l.ga) throw new M(8);
              if (1 === (l.flags & 2097155)) throw new M(8);
              if (16384 === (l.node.mode & 61440)) throw new M(31);
              if (!l.X.read) throw new M(28);
              var x = "undefined" !== typeof r;
              if (!x) r = l.position;
              else if (!l.seekable) throw new M(70);
              var h = l.X.read(l, v, p, q, r);
              x || (l.position += h);
              var n = h;
              if (0 > n) {
                var w = -1;
                break a;
              }
              a += n;
              if (n < k) break;
            }
            w = a;
          }
          E[d >> 2] = w;
          return 0;
        } catch (y) {
          return ("undefined" !== typeof Q && y instanceof M) || A(y), y.ia;
        }
      },
      u: function (a, b, c, d, e) {
        try {
          var f = S(a);
          a = 4294967296 * c + (b >>> 0);
          if (-9007199254740992 >= a || 9007199254740992 <= a) return -61;
          Ib(f, a, d);
          Pa = [
            f.position >>> 0,
            ((K = f.position),
            1 <= +Math.abs(K)
              ? 0 < K
                ? (Math.min(+Math.floor(K / 4294967296), 4294967295) | 0) >>> 0
                : ~~+Math.ceil((K - +(~~K >>> 0)) / 4294967296) >>> 0
              : 0),
          ];
          E[e >> 2] = Pa[0];
          E[(e + 4) >> 2] = Pa[1];
          f.za && 0 === a && 0 === d && (f.za = null);
          return 0;
        } catch (k) {
          return ("undefined" !== typeof Q && k instanceof M) || A(k), k.ia;
        }
      },
      p: function (a, b, c, d) {
        try {
          a: {
            for (var e = S(a), f = (a = 0); f < c; f++) {
              var k = e,
                l = E[(b + 8 * f) >> 2],
                p = E[(b + (8 * f + 4)) >> 2],
                q = void 0,
                r = F;
              if (0 > p || 0 > q) throw new M(28);
              if (null === k.ga) throw new M(8);
              if (0 === (k.flags & 2097155)) throw new M(8);
              if (16384 === (k.node.mode & 61440)) throw new M(31);
              if (!k.X.write) throw new M(28);
              k.seekable && k.flags & 1024 && Ib(k, 0, 2);
              var v = "undefined" !== typeof q;
              if (!v) q = k.position;
              else if (!k.seekable) throw new M(70);
              var x = k.X.write(k, r, l, p, q, void 0);
              v || (k.position += x);
              try {
                if (k.path && qb.onWriteToFile) qb.onWriteToFile(k.path);
              } catch (w) {
                z(
                  "FS.trackingDelegate['onWriteToFile']('" +
                    k.path +
                    "') threw an exception: " +
                    w.message
                );
              }
              var h = x;
              if (0 > h) {
                var n = -1;
                break a;
              }
              a += h;
            }
            n = a;
          }
          E[d >> 2] = n;
          return 0;
        } catch (w) {
          return ("undefined" !== typeof Q && w instanceof M) || A(w), w.ia;
        }
      },
      a: B,
      v: function () {},
      x: function (a, b, c, d) {
        return Cc(a, b, c, d);
      },
      t: function (a) {
        if (!a) return 0;
        E[Gc() >> 2] = 6;
        return -1;
      },
    };
    (function () {
      function a(e) {
        g.asm = e.exports;
        Da = g.asm.G;
        I--;
        g.monitorRunDependencies && g.monitorRunDependencies(I);
        0 == I &&
          (null !== Ja && (clearInterval(Ja), (Ja = null)),
          Ka && ((e = Ka), (Ka = null), e()));
      }
      function b(e) {
        a(e.instance);
      }
      function c(e) {
        return Oa()
          .then(function (f) {
            return WebAssembly.instantiate(f, d);
          })
          .then(e, function (f) {
            z("failed to asynchronously prepare wasm: " + f);
            A(f);
          });
      }
      var d = { a: Hc };
      I++;
      g.monitorRunDependencies && g.monitorRunDependencies(I);
      if (g.instantiateWasm)
        try {
          return g.instantiateWasm(d, a);
        } catch (e) {
          return (
            z("Module.instantiateWasm callback failed with error: " + e), !1
          );
        }
      (function () {
        return ia ||
          "function" !== typeof WebAssembly.instantiateStreaming ||
          La() ||
          "function" !== typeof fetch
          ? c(b)
          : fetch(J, { credentials: "same-origin" }).then(function (e) {
              return WebAssembly.instantiateStreaming(e, d).then(
                b,
                function (f) {
                  z("wasm streaming compile failed: " + f);
                  z("falling back to ArrayBuffer instantiation");
                  return c(b);
                }
              );
            });
      })().catch(ba);
      return {};
    })();
    var Fc = (g.___wasm_call_ctors = function () {
        return (Fc = g.___wasm_call_ctors = g.asm.H).apply(null, arguments);
      }),
      jb = (g._malloc = function () {
        return (jb = g._malloc = g.asm.I).apply(null, arguments);
      }),
      Z = (g._free = function () {
        return (Z = g._free = g.asm.J).apply(null, arguments);
      }),
      Gc = (g.___errno_location = function () {
        return (Gc = g.___errno_location = g.asm.K).apply(null, arguments);
      });
    g._main = function () {
      return (g._main = g.asm.L).apply(null, arguments);
    };
    var nc = (g.___getTypeName = function () {
      return (nc = g.___getTypeName = g.asm.M).apply(null, arguments);
    });
    g.___embind_register_native_and_builtin_types = function () {
      return (g.___embind_register_native_and_builtin_types = g.asm.N).apply(
        null,
        arguments
      );
    };
    var ya = (g.stackAlloc = function () {
      return (ya = g.stackAlloc = g.asm.O).apply(null, arguments);
    });
    g.dynCall_jiji = function () {
      return (g.dynCall_jiji = g.asm.P).apply(null, arguments);
    };
    g.dynCall_viijii = function () {
      return (g.dynCall_viijii = g.asm.Q).apply(null, arguments);
    };
    g.dynCall_iiji = function () {
      return (g.dynCall_iiji = g.asm.R).apply(null, arguments);
    };
    g.dynCall_iiiiiijj = function () {
      return (g.dynCall_iiiiiijj = g.asm.S).apply(null, arguments);
    };
    g.dynCall_iiiiij = function () {
      return (g.dynCall_iiiiij = g.asm.T).apply(null, arguments);
    };
    g.dynCall_iiiiijj = function () {
      return (g.dynCall_iiiiijj = g.asm.U).apply(null, arguments);
    };
    var Ic;
    function Jc(a) {
      this.name = "ExitStatus";
      this.message = "Program terminated with exit(" + a + ")";
      this.status = a;
    }
    Ka = function Kc() {
      Ic || Lc();
      Ic || (Ka = Kc);
    };
    function Lc(a) {
      function b() {
        if (!Ic && ((Ic = !0), (g.calledRun = !0), !ja)) {
          g.noFSInit ||
            Kb ||
            ((Kb = !0),
            Jb(),
            (g.stdin = g.stdin),
            (g.stdout = g.stdout),
            (g.stderr = g.stderr),
            g.stdin ? Mb("stdin", g.stdin) : Fb("/dev/tty", "/dev/stdin"),
            g.stdout
              ? Mb("stdout", null, g.stdout)
              : Fb("/dev/tty", "/dev/stdout"),
            g.stderr
              ? Mb("stderr", null, g.stderr)
              : Fb("/dev/tty1", "/dev/stderr"),
            Gb("/dev/stdin", "r"),
            Gb("/dev/stdout", "w"),
            Gb("/dev/stderr", "w"));
          Qa(Fa);
          pb = !1;
          Qa(Ga);
          aa(g);
          if (g.onRuntimeInitialized) g.onRuntimeInitialized();
          if (Mc) {
            var c = a,
              d = g._main;
            c = c || [];
            var e = c.length + 1,
              f = ya(4 * (e + 1));
            E[f >> 2] = xa(da);
            for (var k = 1; k < e; k++) E[(f >> 2) + k] = xa(c[k - 1]);
            E[(f >> 2) + e] = 0;
            try {
              var l = d(e, f);
              if (!noExitRuntime || 0 !== l) {
                if (!noExitRuntime) {
                  if (g.onExit) g.onExit(l);
                  ja = !0;
                }
                ea(l, new Jc(l));
              }
            } catch (p) {
              p instanceof Jc ||
                ("unwind" == p
                  ? (noExitRuntime = !0)
                  : ((c = p) &&
                      "object" === typeof p &&
                      p.stack &&
                      (c = [p, p.stack]),
                    z("exception thrown: " + c),
                    ea(1, p)));
            } finally {
            }
          }
          if (g.postRun)
            for (
              "function" == typeof g.postRun && (g.postRun = [g.postRun]);
              g.postRun.length;

            )
              (c = g.postRun.shift()), Ha.unshift(c);
          Qa(Ha);
        }
      }
      a = a || ca;
      if (!(0 < I)) {
        if (g.preRun)
          for (
            "function" == typeof g.preRun && (g.preRun = [g.preRun]);
            g.preRun.length;

          )
            Ia();
        Qa(Ea);
        0 < I ||
          (g.setStatus
            ? (g.setStatus("Running..."),
              setTimeout(function () {
                setTimeout(function () {
                  g.setStatus("");
                }, 1);
                b();
              }, 1))
            : b());
      }
    }
    g.run = Lc;
    if (g.preInit)
      for (
        "function" == typeof g.preInit && (g.preInit = [g.preInit]);
        0 < g.preInit.length;

      )
        g.preInit.pop()();
    var Mc = !1;
    g.noInitialRun && (Mc = !1);
    noExitRuntime = !0;
    Lc();

    return jxl.ready;
  };
})();
export default jxl;
