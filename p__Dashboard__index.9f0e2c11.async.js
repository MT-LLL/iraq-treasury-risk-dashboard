"use strict";
(self.webpackChunkiraq_treasury_risk_dashboard =
  self.webpackChunkiraq_treasury_risk_dashboard || []).push([
  [997],
  {
    67925: function (lr, xe, u) {
      (u.r(xe),
        u.d(xe, {
          default: function () {
            return Ku;
          },
        }));
      var Ge = u(57704),
        w = u.n(Ge),
        We = u(65788),
        V = u.n(We),
        Ue = u(55472),
        g = u.n(Ue),
        Ze = u(64637),
        Ke = u(60032),
        Fe = u(39192),
        ne = u(23822),
        Je = u(37921),
        Ve = u(45741),
        Ye = u(21284),
        Xe = u(59911),
        Ee = u(43680),
        qe = u(75258),
        te = u(37115),
        Be = u(70626),
        _e = u(54512),
        eu = u(52092),
        uu = u(65367),
        fe = u(81926),
        ru = u(35188),
        au = u(63682),
        su = u(95314),
        ee = u(13852),
        nu = u(58015),
        tu = u(30027),
        M = u(94261),
        Q = u(26146),
        P = u(28676),
        o = u(520),
        p = u(88479),
        Ce = u(38763),
        y = u(39017),
        x = u(46247),
        A = u(3336),
        Z = u(2864),
        ve = u(85453),
        me = u(66667),
        K = u(4334),
        Y = u(1923),
        I = u(61347),
        iu = u(89147),
        lu = u(83062),
        cu = u(77249),
        ou = u(7468),
        du = u(90881),
        hu = u(4604),
        D = u(71763),
        Au = u(50100),
        xu = u.n(Au),
        Fu = u(37810),
        ue = u.n(Fu),
        Eu = u(76979),
        Bu = u.n(Eu),
        fu = u(48700),
        je = u.n(fu),
        Cu = u(52706),
        vu = u(94355),
        mu = u(51316),
        ju = u(24422),
        gu = u(7158),
        pu = u(63892),
        re = u(46261),
        Du = u(499),
        yu = u(34064),
        bu = u(14516),
        ge = u(6948),
        e = u(91987),
        wu = [
          { value: "tasc_q2_2026", label: "Asiacell \xB7 H1 2026 \xB7 IQD mn" },
          {
            value: "tzni_q2_2026",
            label: "Zain Iraq \xB7 H1 2026 \xB7 IQD mn",
          },
        ],
        pe = [
          ["cfo_consecutive_negative", "CFO \u8FDE\u7EED\u4E3A\u8D1F"],
          ["fcf_consecutive_negative", "FCF \u8FDE\u7EED\u4E3A\u8D1F"],
          ["dso_rising", "DSO \u6301\u7EED\u4E0A\u5347"],
          [
            "large_debt_due_soon",
            "\u5927\u989D\u503A\u52A1\u8FD1\u671F\u5230\u671F",
          ],
          ["going_concern", "\u6301\u7EED\u7ECF\u8425\u98CE\u9669"],
        ];
      function Iu() {
        var n = window.location.pathname,
          i = n.endsWith("/") ? n : n.slice(0, n.lastIndexOf("/") + 1);
        return "".concat(i, "tools/browser_ocr.js");
      }
      function Ou(n) {
        var i = new Blob([JSON.stringify(n, null, 2)], {
            type: "application/json",
          }),
          r = URL.createObjectURL(i),
          s = document.createElement("a");
        ((s.href = r),
          (s.download = "ocr-audit-".concat(
            new Date().toISOString().slice(0, 10),
            ".json",
          )),
          s.click(),
          URL.revokeObjectURL(r));
      }
      function Su() {
        var n,
          i,
          r,
          s,
          F,
          $,
          S,
          k,
          R,
          G,
          J,
          q,
          T,
          b,
          L,
          be = (0, D.useState)("loading"),
          W = g()(be, 2),
          j = W[0],
          ie = W[1],
          Ju = (0, D.useState)("tasc_q2_2026"),
          we = g()(Ju, 2),
          ae = we[0],
          Ie = we[1],
          Vu = (0, D.useState)([]),
          Oe = g()(Vu, 2),
          Se = Oe[0],
          ke = Oe[1],
          Yu = (0, D.useState)(!1),
          Re = g()(Yu, 2),
          _ = Re[0],
          se = Re[1],
          Xu = (0, D.useState)(0),
          Te = g()(Xu, 2),
          qu = Te[0],
          le = Te[1],
          _u = (0, D.useState)(
            "\u6B63\u5728\u68C0\u67E5\u672C\u5730 OCR \u670D\u52A1\u4E0E\u6D4F\u89C8\u5668\u5F15\u64CE\u2026",
          ),
          Ne = g()(_u, 2),
          er = Ne[0],
          N = Ne[1],
          ur = (0, D.useState)(null),
          ze = g()(ur, 2),
          v = ze[0],
          ce = ze[1],
          rr = (0, D.useState)({}),
          Pe = g()(rr, 2),
          oe = Pe[0],
          de = Pe[1],
          ar = (0, D.useState)([]),
          $e = g()(ar, 2),
          Le = $e[0],
          he = $e[1];
        (0, D.useEffect)(function () {
          var l = !1,
            a = (function () {
              var E = V()(
                w()().mark(function C() {
                  var B, m;
                  return w()().wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (t.prev = 0),
                              (t.next = 3),
                              fetch("api/health", { cache: "no-store" })
                            );
                          case 3:
                            if (((B = t.sent), B.ok)) {
                              t.next = 6;
                              break;
                            }
                            throw new Error("local API unavailable");
                          case 6:
                            return ((t.next = 8), B.json());
                          case 8:
                            return (
                              l ||
                                (ie("api"),
                                N(
                                  "\u672C\u5730\u9AD8\u6027\u80FD\u6A21\u5F0F\u5C31\u7EEA\uFF1A\u4E0A\u4F20\u540E\u7531\u672C\u673A Tesseract \u5904\u7406\uFF0C\u6E90 PDF \u4E34\u65F6\u6587\u4EF6\u968F\u540E\u5220\u9664\u3002",
                                )),
                              t.abrupt("return")
                            );
                          case 12:
                            ((t.prev = 12), (t.t0 = t.catch(0)));
                          case 14:
                            if (((t.prev = 14), window.BrowserOCR)) {
                              t.next = 18;
                              break;
                            }
                            return (
                              (t.next = 18),
                              new Promise(function (U, c) {
                                var d = document.querySelector(
                                  "script[data-browser-ocr]",
                                );
                                if (d) {
                                  (d.addEventListener(
                                    "load",
                                    function () {
                                      return U();
                                    },
                                    { once: !0 },
                                  ),
                                    d.addEventListener(
                                      "error",
                                      function () {
                                        return c(
                                          new Error("OCR script load failed"),
                                        );
                                      },
                                      { once: !0 },
                                    ));
                                  return;
                                }
                                var z = document.createElement("script");
                                ((z.src = Iu()),
                                  (z.async = !0),
                                  (z.dataset.browserOcr = "true"),
                                  (z.onload = function () {
                                    return U();
                                  }),
                                  (z.onerror = function () {
                                    return c(
                                      new Error("OCR script load failed"),
                                    );
                                  }),
                                  document.head.appendChild(z));
                              })
                            );
                          case 18:
                            return (
                              (t.next = 20),
                              (m = window.BrowserOCR) === null || m === void 0
                                ? void 0
                                : m.loadProfiles()
                            );
                          case 20:
                            (l ||
                              (ie("browser"),
                              N(
                                "\u6D4F\u89C8\u5668\u9690\u79C1\u6A21\u5F0F\u5C31\u7EEA\uFF1APDF \u4E0E\u9875\u9762\u56FE\u50CF\u4EC5\u5728\u5F53\u524D\u6D4F\u89C8\u5668\u5185\u5B58\u4E2D\u5904\u7406\uFF0C\u4E0D\u4E0A\u4F20\u670D\u52A1\u5668\u3002",
                              )),
                              (t.next = 26));
                            break;
                          case 23:
                            ((t.prev = 23),
                              (t.t1 = t.catch(14)),
                              l ||
                                (ie("unavailable"),
                                N(
                                  (t.t1 === null || t.t1 === void 0
                                    ? void 0
                                    : t.t1.message) ||
                                    "OCR \u7EC4\u4EF6\u52A0\u8F7D\u5931\u8D25",
                                )));
                          case 26:
                          case "end":
                            return t.stop();
                        }
                    },
                    C,
                    null,
                    [
                      [0, 12],
                      [14, 23],
                    ],
                  );
                }),
              );
              return function () {
                return E.apply(this, arguments);
              };
            })();
          return (
            a(),
            function () {
              l = !0;
            }
          );
        }, []);
        var Ae =
            (v == null || (n = v.score) === null || n === void 0
              ? void 0
              : n.metrics) || [],
          Me = (0, D.useMemo)(
            function () {
              var l = new Set(),
                a = je()(Ae),
                E;
              try {
                for (a.s(); !(E = a.n()).done;) {
                  var C = E.value,
                    B = je()(C.missing_fields || []),
                    m;
                  try {
                    for (B.s(); !(m = B.n()).done;) {
                      var h = m.value;
                      l.add(h);
                    }
                  } catch (t) {
                    B.e(t);
                  } finally {
                    B.f();
                  }
                }
              } catch (t) {
                a.e(t);
              } finally {
                a.f();
              }
              return Bu()(l);
            },
            [Ae],
          ),
          Qe = (function () {
            var l = V()(
              w()().mark(function a() {
                var E,
                  C,
                  B = arguments;
                return w()().wrap(
                  function (h) {
                    for (;;)
                      switch ((h.prev = h.next)) {
                        case 0:
                          if (
                            ((E = B.length > 0 && B[0] !== void 0 ? B[0] : ae),
                            window.BrowserOCR)
                          ) {
                            h.next = 3;
                            break;
                          }
                          return h.abrupt("return");
                        case 3:
                          return (
                            se(!0),
                            N(
                              "\u6B63\u5728\u8F7D\u5165\u5DF2\u590D\u6838\u8D22\u62A5\u5FEB\u7167\u2026",
                            ),
                            (h.prev = 5),
                            (h.next = 8),
                            window.BrowserOCR.loadReviewedProfile(E)
                          );
                        case 8:
                          ((C = h.sent),
                            ce(C),
                            Ie(E),
                            de({}),
                            he([]),
                            N(
                              "\u5DF2\u8F7D\u5165 SHA-256 \u9501\u5B9A\u7684\u590D\u6838\u6863\u6848\uFF1B\u672A\u6838\u9A8C\u5B57\u6BB5\u4ECD\u4FDD\u6301\u201C\u5F85\u8865\u201D\u3002",
                            ),
                            (h.next = 19));
                          break;
                        case 16:
                          ((h.prev = 16),
                            (h.t0 = h.catch(5)),
                            re.Ay.error(
                              (h.t0 === null || h.t0 === void 0
                                ? void 0
                                : h.t0.message) || "\u8F7D\u5165\u5931\u8D25",
                            ));
                        case 19:
                          return ((h.prev = 19), se(!1), h.finish(19));
                        case 22:
                        case "end":
                          return h.stop();
                      }
                  },
                  a,
                  null,
                  [[5, 16, 19, 22]],
                );
              }),
            );
            return function () {
              return l.apply(this, arguments);
            };
          })(),
          sr = (function () {
            var l = V()(
              w()().mark(function a() {
                var E, C, B, m, h, t;
                return w()().wrap(
                  function (c) {
                    for (;;)
                      switch ((c.prev = c.next)) {
                        case 0:
                          if (
                            ((C =
                              (E = Se[0]) === null || E === void 0
                                ? void 0
                                : E.originFileObj),
                            C)
                          ) {
                            c.next = 4;
                            break;
                          }
                          return (
                            re.Ay.warning(
                              "\u8BF7\u5148\u9009\u62E9\u626B\u63CF\u7248 PDF",
                            ),
                            c.abrupt("return")
                          );
                        case 4:
                          if (
                            (se(!0),
                            le(2),
                            N(
                              j === "api"
                                ? "\u6B63\u5728\u672C\u673A\u6267\u884C OCR \u4E0E\u8D22\u52A1\u52FE\u7A3D\u2026"
                                : "\u6B63\u5728\u6D4F\u89C8\u5668\u5185\u6267\u884C Arabic + English OCR\u2026",
                            ),
                            (c.prev = 7),
                            j !== "api")
                          ) {
                            c.next = 22;
                            break;
                          }
                          return (
                            (h = new FormData()),
                            h.append("file", C),
                            h.append("profile", ae),
                            (c.next = 14),
                            fetch("api/ocr", { method: "POST", body: h })
                          );
                        case 14:
                          return ((t = c.sent), (c.next = 17), t.json());
                        case 17:
                          if (((B = c.sent), t.ok)) {
                            c.next = 20;
                            break;
                          }
                          throw new Error(
                            ((m = B) === null || m === void 0
                              ? void 0
                              : m.error) || "OCR failed",
                          );
                        case 20:
                          c.next = 29;
                          break;
                        case 22:
                          if (!(j === "browser" && window.BrowserOCR)) {
                            c.next = 28;
                            break;
                          }
                          return (
                            (c.next = 25),
                            window.BrowserOCR.run(C, ae, function (d) {
                              var z = d.total ? (d.page || 0) / d.total : 0;
                              (le(
                                Math.max(
                                  5,
                                  Math.min(
                                    96,
                                    Math.round(z * 90 + (d.progress || 0) * 10),
                                  ),
                                ),
                              ),
                                d.message && N(d.message));
                            })
                          );
                        case 25:
                          ((B = c.sent), (c.next = 29));
                          break;
                        case 28:
                          throw new Error("OCR \u5F53\u524D\u4E0D\u53EF\u7528");
                        case 29:
                          (ce(B),
                            de({}),
                            he([]),
                            le(100),
                            N(
                              "\u8BC6\u522B\u5B8C\u6210\uFF1A\u53EA\u6709 verified \u5B57\u6BB5\u8FDB\u5165\u8BC4\u5206\uFF0Creview / missing \u5B57\u6BB5\u88AB\u81EA\u52A8\u62E6\u622A\u3002",
                            ),
                            (c.next = 40));
                          break;
                        case 36:
                          ((c.prev = 36),
                            (c.t0 = c.catch(7)),
                            re.Ay.error(
                              (c.t0 === null || c.t0 === void 0
                                ? void 0
                                : c.t0.message) ||
                                "OCR \u6267\u884C\u5931\u8D25",
                            ),
                            N(
                              (c.t0 === null || c.t0 === void 0
                                ? void 0
                                : c.t0.message) ||
                                "OCR \u6267\u884C\u5931\u8D25",
                            ));
                        case 40:
                          return ((c.prev = 40), se(!1), c.finish(40));
                        case 43:
                        case "end":
                          return c.stop();
                      }
                  },
                  a,
                  null,
                  [[7, 36, 40, 43]],
                );
              }),
            );
            return function () {
              return l.apply(this, arguments);
            };
          })(),
          nr = (function () {
            var l = V()(
              w()().mark(function a() {
                var E, C, B, m, h, t, U;
                return w()().wrap(
                  function (d) {
                    for (;;)
                      switch ((d.prev = d.next)) {
                        case 0:
                          if (v) {
                            d.next = 2;
                            break;
                          }
                          return d.abrupt("return");
                        case 2:
                          if (
                            ((E = Object.fromEntries(
                              pe.map(function (z) {
                                var ir = g()(z, 1),
                                  He = ir[0];
                                return [He, Le.includes(He)];
                              }),
                            )),
                            (d.prev = 3),
                            j !== "api")
                          ) {
                            d.next = 15;
                            break;
                          }
                          return (
                            (d.next = 7),
                            fetch("api/score", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                metrics:
                                  ((h = v.report) === null || h === void 0
                                    ? void 0
                                    : h.metrics) || [],
                                overrides: oe,
                                red_flags: E,
                              }),
                            })
                          );
                        case 7:
                          return ((U = d.sent), (d.next = 10), U.json());
                        case 10:
                          if (((m = d.sent), U.ok)) {
                            d.next = 13;
                            break;
                          }
                          throw new Error(
                            ((t = m) === null || t === void 0
                              ? void 0
                              : t.error) || "\u8BC4\u5206\u5931\u8D25",
                          );
                        case 13:
                          d.next = 16;
                          break;
                        case 15:
                          m =
                            (C = window.BrowserOCR) === null || C === void 0
                              ? void 0
                              : C.scorePaymentCapacity({
                                  metrics:
                                    ((B = v.report) === null || B === void 0
                                      ? void 0
                                      : B.metrics) || [],
                                  overrides: oe,
                                  red_flags: E,
                                });
                        case 16:
                          (ce(ue()(ue()({}, v), {}, { score: m })),
                            N(
                              m.complete
                                ? "10 \u9879\u6307\u6807\u5B8C\u6574\uFF0C\u6B63\u5F0F\u8BC4\u5206\u5DF2\u91CD\u65B0\u8BA1\u7B97\u3002"
                                : "\u5DF2\u4FDD\u5B58\u4EBA\u5DE5\u786E\u8BA4\u503C\uFF1B\u6307\u6807\u672A\u9F50\uFF0C\u4ECD\u4E0D\u8F93\u51FA\u6B63\u5F0F\u603B\u5206\u3002",
                            ),
                            (d.next = 23));
                          break;
                        case 20:
                          ((d.prev = 20),
                            (d.t0 = d.catch(3)),
                            re.Ay.error(
                              (d.t0 === null || d.t0 === void 0
                                ? void 0
                                : d.t0.message) || "\u8BC4\u5206\u5931\u8D25",
                            ));
                        case 23:
                        case "end":
                          return d.stop();
                      }
                  },
                  a,
                  null,
                  [[3, 20]],
                );
              }),
            );
            return function () {
              return l.apply(this, arguments);
            };
          })(),
          tr = [
            {
              title: "\u6307\u6807",
              dataIndex: "label",
              fixed: "left",
              width: 180,
              render: function (a, E) {
                return (0, e.jsxs)(e.Fragment, {
                  children: [
                    (0, e.jsx)("b", { children: E.label }),
                    (0, e.jsx)(M.A.Text, {
                      type: "secondary",
                      style: { display: "block", fontSize: 11 },
                      children: E.formula,
                    }),
                  ],
                });
              },
            },
            {
              title: "\u6743\u91CD",
              dataIndex: "weight",
              width: 75,
              render: function (a) {
                return "".concat(a, "%");
              },
            },
            {
              title: "\u6570\u503C",
              dataIndex: "value",
              width: 110,
              render: function (a, E) {
                return a == null
                  ? (0, e.jsx)(o.A, { children: "\u5F85\u8865" })
                  : (0, e.jsx)(M.A.Text, {
                      strong: !0,
                      children:
                        E.format === "percent"
                          ? "".concat((a * 100).toFixed(1), "%")
                          : Number(a).toLocaleString(),
                    });
              },
            },
            {
              title: "\u5224\u5B9A",
              dataIndex: "band",
              width: 95,
              render: function (a) {
                return (0, e.jsx)(o.A, {
                  color:
                    a === "good"
                      ? "success"
                      : a === "average"
                        ? "warning"
                        : a === "risk"
                          ? "error"
                          : "default",
                  children: {
                    good: "\u597D",
                    average: "\u4E00\u822C",
                    risk: "\u98CE\u9669",
                    pending: "\u5F85\u8865",
                  }[a],
                });
              },
            },
            {
              title: "\u52A0\u6743\u5206",
              dataIndex: "weighted_points",
              width: 85,
              render: function (a) {
                return a == null ? "\u2014" : a.toFixed(1);
              },
            },
            {
              title: "\u7F3A\u5931\u5B57\u6BB5",
              dataIndex: "missing_fields",
              render: function (a) {
                return a != null && a.length ? a.join("\u3001") : "\u2014";
              },
            },
          ];
        return (0, e.jsxs)(A.A, {
          className: "surface-card ocr-card",
          bordered: !1,
          children: [
            (0, e.jsxs)(Q.A, {
              justify: "space-between",
              align: "flex-start",
              gap: 16,
              wrap: !0,
              children: [
                (0, e.jsxs)("div", {
                  children: [
                    (0, e.jsx)(M.A.Title, {
                      level: 4,
                      style: { margin: 0 },
                      children:
                        "\u626B\u63CF\u7248\u8D22\u62A5 OCR \u4E0E\u4EBA\u5DE5\u590D\u6838",
                    }),
                    (0, e.jsx)(M.A.Paragraph, {
                      type: "secondary",
                      style: { margin: "6px 0 0" },
                      children:
                        "Arabic + English \xB7 \u53EA\u8BA9\u5DF2\u6838\u9A8C\u8D22\u52A1\u884C\u8FDB\u5165 10 \u9879\u8BC4\u5206 \xB7 \u539F\u59CB\u5168\u6587\u4E0D\u5199\u5165\u8FC1\u79FB\u5305",
                    }),
                  ],
                }),
                (0, e.jsx)(o.A, {
                  icon:
                    j === "api" ? (0, e.jsx)(Cu.A, {}) : (0, e.jsx)(vu.A, {}),
                  color:
                    j === "unavailable"
                      ? "error"
                      : j === "loading"
                        ? "processing"
                        : "cyan",
                  children:
                    j === "api"
                      ? "\u672C\u5730\u9AD8\u6027\u80FD\u6A21\u5F0F"
                      : j === "browser"
                        ? "\u6D4F\u89C8\u5668\u9690\u79C1\u6A21\u5F0F"
                        : j === "loading"
                          ? "\u521D\u59CB\u5316\u4E2D"
                          : "\u4E0D\u53EF\u7528",
                }),
              ],
            }),
            (0, e.jsx)(K.A, {
              style: { marginTop: 18 },
              type: j === "unavailable" ? "error" : "info",
              showIcon: !0,
              icon: (0, e.jsx)(mu.A, {}),
              message: er,
            }),
            _ &&
              (0, e.jsx)(Ce.A, {
                percent: qu,
                status: "active",
                style: { marginTop: 12 },
              }),
            (0, e.jsxs)(y.A, {
              gutter: [16, 16],
              style: { marginTop: 18 },
              children: [
                (0, e.jsx)(x.A, {
                  xs: 24,
                  lg: 13,
                  children: (0, e.jsxs)(Du.A.Dragger, {
                    accept: "application/pdf,.pdf",
                    maxCount: 1,
                    fileList: Se,
                    beforeUpload: function (a) {
                      return (
                        ke([
                          {
                            uid: a.uid,
                            name: a.name,
                            status: "done",
                            originFileObj: a,
                          },
                        ]),
                        !1
                      );
                    },
                    onRemove: function () {
                      return (ke([]), !0);
                    },
                    disabled: _ || j === "unavailable",
                    children: [
                      (0, e.jsx)("p", {
                        className: "ant-upload-drag-icon",
                        children: (0, e.jsx)(ne.A, {}),
                      }),
                      (0, e.jsx)("p", {
                        className: "ant-upload-text",
                        children:
                          "\u62D6\u5165\u626B\u63CF\u7248 PDF\uFF0C\u6216\u70B9\u51FB\u9009\u62E9",
                      }),
                      (0, e.jsx)("p", {
                        className: "ant-upload-hint",
                        children:
                          "\u5355\u4EFD\u4E0D\u8D85\u8FC7 30 MB / 80 \u9875\uFF1B\u9875\u9762\u56FE\u50CF\u4EC5\u7528\u4E8E\u8BC6\u522B",
                      }),
                    ],
                  }),
                }),
                (0, e.jsx)(x.A, {
                  xs: 24,
                  lg: 11,
                  children: (0, e.jsxs)(P.A, {
                    direction: "vertical",
                    size: 12,
                    style: { width: "100%" },
                    children: [
                      (0, e.jsx)(yu.A, {
                        value: ae,
                        options: wu,
                        onChange: Ie,
                        style: { width: "100%" },
                      }),
                      (0, e.jsx)(p.A, {
                        type: "primary",
                        size: "large",
                        block: !0,
                        loading: _,
                        disabled: j === "loading" || j === "unavailable",
                        onClick: sr,
                        icon: (0, e.jsx)(ne.A, {}),
                        children:
                          "\u5F00\u59CB OCR\u3001\u52FE\u7A3D\u4E0E\u8BC4\u5206",
                      }),
                      (0, e.jsxs)(Q.A, {
                        gap: 8,
                        wrap: !0,
                        children: [
                          (0, e.jsx)(p.A, {
                            disabled: j !== "browser" || _,
                            onClick: function () {
                              Qe("tasc_q2_2026");
                            },
                            children:
                              "\u8F7D\u5165 Asiacell \u5DF2\u6838\u9A8C\u6570\u636E",
                          }),
                          (0, e.jsx)(p.A, {
                            disabled: j !== "browser" || _,
                            onClick: function () {
                              Qe("tzni_q2_2026");
                            },
                            children:
                              "\u8F7D\u5165 Zain Iraq \u5DF2\u6838\u9A8C\u6570\u636E",
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
            v &&
              (0, e.jsxs)(e.Fragment, {
                children: [
                  (0, e.jsxs)(I.A, {
                    bordered: !0,
                    size: "small",
                    column: { xs: 1, sm: 2, lg: 4 },
                    style: { marginTop: 20 },
                    children: [
                      (0, e.jsx)(I.A.Item, {
                        label: "\u4E3B\u4F53",
                        children:
                          ((i = v.report) === null || i === void 0
                            ? void 0
                            : i.report_entity) || "\u2014",
                      }),
                      (0, e.jsx)(I.A.Item, {
                        label: "\u671F\u95F4",
                        children:
                          ((r = v.report) === null || r === void 0
                            ? void 0
                            : r.report_period) || "\u2014",
                      }),
                      (0, e.jsx)(I.A.Item, {
                        label: "\u6838\u9A8C\u5B57\u6BB5",
                        children:
                          (s =
                            (F = v.report) === null || F === void 0
                              ? void 0
                              : F.verified_metric_count) !== null &&
                          s !== void 0
                            ? s
                            : 0,
                      }),
                      (0, e.jsxs)(I.A.Item, {
                        label: "\u52FE\u7A3D\u901A\u8FC7",
                        children: [
                          ($ =
                            (S = v.report) === null || S === void 0
                              ? void 0
                              : S.verification_checks_passed) !== null &&
                          $ !== void 0
                            ? $
                            : 0,
                          " / ",
                          (k =
                            (R = v.report) === null || R === void 0
                              ? void 0
                              : R.verification_checks_total) !== null &&
                          k !== void 0
                            ? k
                            : 0,
                        ],
                      }),
                      (0, e.jsxs)(I.A.Item, {
                        label: "\u53EF\u8BA1\u7B97\u6307\u6807",
                        children: [
                          (G =
                            (J = v.score) === null || J === void 0
                              ? void 0
                              : J.available_metric_count) !== null &&
                          G !== void 0
                            ? G
                            : 0,
                          " / 10",
                        ],
                      }),
                      (0, e.jsxs)(I.A.Item, {
                        label: "\u8986\u76D6\u6743\u91CD",
                        children: [
                          (q =
                            (T = v.score) === null || T === void 0
                              ? void 0
                              : T.available_weight_pct) !== null && q !== void 0
                            ? q
                            : 0,
                          "%",
                        ],
                      }),
                      (0, e.jsx)(I.A.Item, {
                        label: "\u6B63\u5F0F\u603B\u5206",
                        children:
                          (b = v.score) !== null && b !== void 0 && b.complete
                            ? "".concat(v.score.base_score, " / 100")
                            : "\u6307\u6807\u672A\u9F50\uFF0C\u4E0D\u8BC4\u5206",
                      }),
                      (0, e.jsx)(I.A.Item, {
                        label: "\u6700\u7EC8\u8BC4\u7EA7",
                        children:
                          ((L = v.score) === null || L === void 0
                            ? void 0
                            : L.final_grade) || "\u5F85\u8865",
                      }),
                    ],
                  }),
                  (0, e.jsx)(Y.A, {
                    rowKey: "key",
                    size: "small",
                    scroll: { x: 850 },
                    pagination: !1,
                    columns: tr,
                    dataSource: Ae,
                    style: { marginTop: 16 },
                  }),
                  Me.length > 0 &&
                    (0, e.jsx)(A.A, {
                      size: "small",
                      className: "review-card",
                      title:
                        "\u4EBA\u5DE5\u786E\u8BA4\u8F93\u5165\uFF08\u53EA\u7528\u4E8E\u5F53\u524D\u4F1A\u8BDD\uFF09",
                      style: { marginTop: 16 },
                      children: (0, e.jsx)(y.A, {
                        gutter: [12, 12],
                        children: Me.map(function (l) {
                          var a;
                          return (0, e.jsxs)(
                            x.A,
                            {
                              xs: 24,
                              sm: 12,
                              lg: 8,
                              children: [
                                (0, e.jsx)(M.A.Text, {
                                  type: "secondary",
                                  children:
                                    ((a = window.BrowserOCR) === null ||
                                    a === void 0 ||
                                    (a = a.defaults) === null ||
                                    a === void 0 ||
                                    (a = a.fieldLabels) === null ||
                                    a === void 0
                                      ? void 0
                                      : a[l]) || l,
                                }),
                                (0, e.jsx)(bu.A, {
                                  style: { width: "100%", marginTop: 5 },
                                  value: oe[l],
                                  onChange: function (C) {
                                    return de(function (B) {
                                      return ue()(
                                        ue()({}, B),
                                        {},
                                        xu()({}, l, Number(C)),
                                      );
                                    });
                                  },
                                  placeholder:
                                    "\u8F93\u5165\u5DF2\u6838\u9A8C\u6570\u503C",
                                }),
                              ],
                            },
                            l,
                          );
                        }),
                      }),
                    }),
                  (0, e.jsxs)(A.A, {
                    size: "small",
                    className: "review-card",
                    title: "Red Flag \u6838\u9A8C",
                    style: { marginTop: 16 },
                    children: [
                      (0, e.jsx)(ge.A.Group, {
                        value: Le,
                        onChange: function (a) {
                          return he(a);
                        },
                        children: (0, e.jsx)(P.A, {
                          wrap: !0,
                          children: pe.map(function (l) {
                            var a = g()(l, 2),
                              E = a[0],
                              C = a[1];
                            return (0, e.jsx)(
                              ge.A,
                              { value: E, children: C },
                              E,
                            );
                          }),
                        }),
                      }),
                      (0, e.jsxs)(Q.A, {
                        gap: 8,
                        wrap: !0,
                        style: { marginTop: 14 },
                        children: [
                          (0, e.jsx)(p.A, {
                            type: "primary",
                            icon: (0, e.jsx)(ju.A, {}),
                            onClick: function () {
                              nr();
                            },
                            children: "\u91CD\u65B0\u8BA1\u7B97",
                          }),
                          (0, e.jsx)(p.A, {
                            icon: (0, e.jsx)(gu.A, {}),
                            onClick: function () {
                              return Ou(v);
                            },
                            children: "\u4E0B\u8F7D\u5BA1\u8BA1 JSON",
                          }),
                          (0, e.jsx)(o.A, {
                            icon: (0, e.jsx)(pu.A, {}),
                            color: "success",
                            children: "\u7F3A\u5931\u4E0D\u6309 0 \u5206",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
          ],
        });
      }
      var ku = [
          {
            key: "fx",
            category: "\u5916\u6C47\u57FA\u51C6",
            metric: "\u5B98\u65B9 USD / IQD",
            value: "1,310",
            frequency: "\u65E5\u9891",
            change: "\u8F83\u4E0A\u5468\u89C2\u5BDF\u4E0D\u53D8",
            relevance:
              "\u5B98\u65B9\u6362\u7B97\u57FA\u51C6\uFF0C\u4E0D\u4EE3\u8868\u53EF\u53CA\u65F6\u83B7\u5F97\u53EF\u6C47\u51FA\u7F8E\u5143",
            status: "\u7A33\u5B9A",
            tone: "success",
            source: "https://www.cbi.iq/",
          },
          {
            key: "w524",
            category: "\u516C\u5F00\u5E02\u573A",
            metric: "W524 \u671F\u9650 / \u5229\u7387",
            value: "7 \u5929 \xB7 5.25%",
            frequency: "\u5468\u9891/\u4E8B\u4EF6",
            change: "9\u67088\u65E5\u6267\u884C",
            relevance:
              "\u77ED\u671F IQD \u6D41\u52A8\u6027\u7BA1\u7406\u8BC1\u636E\uFF0C\u4E0D\u7B49\u540C\u7F8E\u5143\u53EF\u5F97\u6027",
            status: "\u89C2\u5BDF",
            tone: "info",
            source: "https://cbi.iq/news/view/3312",
          },
          {
            key: "b359",
            category: "\u516C\u5F00\u5E02\u573A",
            metric: "B359 \u671F\u9650",
            value: "14 \u5929",
            frequency: "\u4E8B\u4EF6",
            change: "9\u670813\u65E5\u4E0B\u4E00\u6267\u884C\u7A97\u53E3",
            relevance:
              "\u4E0B\u4E00\u53EF\u89C2\u5BDF\u8D27\u5E01\u5E02\u573A\u4E8B\u4EF6\uFF0C\u516C\u544A\u672A\u62AB\u9732\u4F20\u7EDF\u7968\u636E\u5229\u7387",
            status: "\u5F85\u7ED3\u679C",
            tone: "warning",
            source: "https://cbi.iq/news/view/3319",
          },
          {
            key: "liquidity",
            category: "\u94F6\u884C\u4F53\u7CFB",
            metric: "\u6D41\u52A8\u8D44\u4EA7 / \u77ED\u671F\u8D1F\u503A",
            value: ">60%",
            frequency: "\u4E8B\u4EF6",
            change: "9\u67085\u65E5\u62AB\u9732",
            relevance:
              "\u53EA\u8BF4\u660E\u4F53\u7CFB\u7F13\u51B2\uFF0C\u4E0D\u80FD\u5916\u63A8\u5230\u5177\u4F53\u4ED8\u6B3E\u884C",
            status: "\u7F13\u51B2",
            tone: "success",
            source: "https://cbi.iq/news/print_news/3309",
          },
          {
            key: "altaif",
            category: "\u94F6\u884C\u76D1\u7BA1",
            metric: "Al-Taif Bank \u72B6\u6001",
            value: "\u63A5\u7BA1 \xB7 \u5206\u6279\u63D0\u6B3E",
            frequency: "\u4E8B\u4EF6",
            change: "\u76D1\u7BA1\u5E72\u9884\u5347\u7EA7",
            relevance:
              "\u82E5\u4ED8\u6B3E\u94FE\u8DEF\u7ECF\u8FC7\u8BE5\u884C\uFF0C\u5C06\u76F4\u63A5\u589E\u52A0\u5EF6\u8FDF\u98CE\u9669",
            status: "\u9AD8\u98CE\u9669",
            tone: "danger",
            source: "https://cbi.iq/news/view/3318",
          },
          {
            key: "licences",
            category: "\u5916\u6C47\u901A\u9053",
            metric: "\u5916\u6C47\u516C\u53F8\u724C\u7167\u64A4\u9500",
            value: "4 \u5BB6",
            frequency: "\u4E8B\u4EF6",
            change: "9\u67086\u20137\u65E5\u96C6\u4E2D\u64A4\u9500",
            relevance:
              "\u975E\u94F6\u884C\u5916\u6C47\u6E20\u9053\u8FDE\u7EED\u6027\u8D70\u5F31\u3001\u5408\u89C4\u95E8\u69DB\u8D8B\u4E25",
            status: "\u6536\u7D27",
            tone: "warning",
            source: "https://www.cbi.iq/news/section/77",
          },
          {
            key: "balance",
            category: "CBI\u8D44\u4EA7\u8D1F\u503A\u8868",
            metric: "\u6700\u65B0\u53EF\u5F97\u6708\u4EFD",
            value: "2026-06",
            frequency: "\u6708\u9891",
            change: "\u672C\u5468\u65E0\u65B0\u6708\u8868",
            relevance:
              "\u50A8\u5907\u548C\u8D44\u4EA7\u8D1F\u503A\u8868\u7EE7\u7EED\u6807\u8BB0\u9648\u65E7\uFF0C\u4E0D\u505A\u5468\u5EA6\u5916\u63A8",
            status: "\u9648\u65E7",
            tone: "default",
            source: "https://cbi.iq/page/73",
          },
          {
            key: "facebook",
            category: "\u5B98\u65B9\u793E\u5A92",
            metric: "CBI Facebook \u6700\u65B0\u516C\u5F00\u5E16",
            value: "Al-Taif \u5B58\u6B3E\u58F0\u660E",
            frequency: "\u4E8B\u4EF6",
            change: "\u4E0E\u5B98\u7F51\u58F0\u660E\u4E00\u81F4",
            relevance:
              "\u53EA\u4F5C\u4E3A\u5FEB\u901F\u53D1\u73B0\u4E0E\u4EA4\u53C9\u6838\u9A8C\uFF0C\u5B98\u7F51\u4ECD\u662F\u8BB0\u5F55\u6E90",
            status: "\u5DF2\u6838\u9A8C",
            tone: "info",
            source: "https://web.facebook.com/cbi.iraq/",
          },
        ],
        Ru = [
          {
            key: "cash",
            index: "01",
            dimension: "\u73B0\u91D1",
            metric: "Cash / Current Liabilities",
            formula:
              "\u73B0\u91D1\u53CA\u73B0\u91D1\u7B49\u4EF7\u7269 \xF7 \u6D41\u52A8\u8D1F\u503A",
            weight: 15,
            good: ">30%",
            average: "15\u201330%",
            risk: "<15%",
            asiacell: "48.8%",
            asiaBand: "\u597D \xB7 15.0",
            zain: "14.1%",
            zainBand: "\u98CE\u9669 \xB7 0.0",
          },
          {
            key: "current",
            index: "02",
            dimension: "\u6D41\u52A8\u6027",
            metric: "Current Ratio",
            formula: "\u6D41\u52A8\u8D44\u4EA7 \xF7 \u6D41\u52A8\u8D1F\u503A",
            weight: 10,
            good: ">1.5x",
            average: "1.0\u20131.5x",
            risk: "<1.0x",
            asiacell: "0.92x",
            asiaBand: "\u98CE\u9669 \xB7 0.0",
            zain: "1.00x",
            zainBand: "\u4E00\u822C \xB7 6.0",
          },
          {
            key: "cfo-cl",
            index: "03",
            dimension: "\u7ECF\u8425\u73B0\u91D1\u6D41",
            metric: "CFO / Current Liabilities",
            formula:
              "\u7ECF\u8425\u73B0\u91D1\u6D41 \xF7 \u6D41\u52A8\u8D1F\u503A",
            weight: 10,
            good: ">30%",
            average: "10\u201330%",
            risk: "<10%",
            asiacell: "38.7%",
            asiaBand: "\u597D \xB7 10.0",
            zain: "-18.8%",
            zainBand: "\u98CE\u9669 \xB7 0.0",
          },
          {
            key: "fcf",
            index: "04",
            dimension: "\u81EA\u7531\u73B0\u91D1\u6D41",
            metric: "FCF",
            formula: "CFO \u2212 Capex",
            weight: 15,
            good: ">0",
            average: "\u63A5\u8FD10",
            risk: "<0",
            asiacell: "163,687",
            asiaBand: "\u597D \xB7 15.0",
            zain: "-410,902",
            zainBand: "\u98CE\u9669 \xB7 0.0",
          },
          {
            key: "cfo-ebitda",
            index: "05",
            dimension: "\u73B0\u91D1\u8F6C\u5316",
            metric: "CFO / EBITDA",
            formula: "\u7ECF\u8425\u73B0\u91D1\u6D41 \xF7 EBITDA",
            weight: 10,
            good: ">70%",
            average: "40\u201370%",
            risk: "<40%",
            asiacell: "63.3%",
            asiaBand: "\u4E00\u822C \xB7 6.0",
            zain: "\u5F85\u8865",
            zainBand: "EBITDA \u5F85\u6700\u7EC8\u786E\u8BA4",
          },
          {
            key: "debt",
            index: "06",
            dimension: "\u6760\u6746",
            metric: "Net Debt / EBITDA",
            formula:
              "(\u6709\u606F\u8D1F\u503A \u2212 \u73B0\u91D1) \xF7 EBITDA",
            weight: 10,
            good: "<2x",
            average: "2\u20133x",
            risk: ">3x",
            asiacell: "\u5F85\u8865",
            asiaBand: "\u6709\u606F\u8D1F\u503A\u5206\u7C7B",
            zain: "\u5F85\u8865",
            zainBand: "\u6709\u606F\u8D1F\u503A\u3001EBITDA",
          },
          {
            key: "interest",
            index: "07",
            dimension: "\u507F\u503A",
            metric: "Interest Coverage",
            formula: "EBITDA \xF7 \u5229\u606F\u8D39\u7528",
            weight: 10,
            good: ">5x",
            average: "2\u20135x",
            risk: "<2x",
            asiacell: "\u5F85\u8865",
            asiaBand: "\u5229\u606F\u8D39\u7528",
            zain: "\u5F85\u8865",
            zainBand: "EBITDA \u5F85\u6700\u7EC8\u786E\u8BA4",
          },
          {
            key: "dso",
            index: "08",
            dimension: "\u56DE\u6B3E",
            metric: "DSO",
            formula: "\u5E94\u6536\u8D26\u6B3E \xF7 Revenue \xD7 365",
            weight: 5,
            good: "<60\u5929",
            average: "60\u201390\u5929",
            risk: ">90\u5929",
            asiacell: "41.2 \u5929",
            asiaBand: "\u597D \xB7 5.0",
            zain: "234.0 \u5929",
            zainBand: "\u98CE\u9669 \xB7 0.0",
          },
          {
            key: "payable",
            index: "09",
            dimension: "\u4F9B\u5E94\u5546\u4ED8\u6B3E",
            metric: "Payable Days",
            formula: "\u5E94\u4ED8\u8D26\u6B3E \xF7 COGS \xD7 365",
            weight: 5,
            good: "<90\u5929",
            average: "90\u2013120\u5929",
            risk: ">120\u5929",
            asiacell: "\u5F85\u8865",
            asiaBand: "COGS",
            zain: "1,653.4 \u5929",
            zainBand: "\u98CE\u9669 \xB7 0.0",
          },
          {
            key: "our-ar",
            index: "10",
            dimension: "\u6211\u65B9\u98CE\u9669\u655E\u53E3",
            metric: "Our AR / Available Cash",
            formula: "\u6211\u65B9 AR \xF7 \u53EF\u52A8\u7528\u73B0\u91D1",
            weight: 10,
            good: "<20%",
            average: "20\u201340%",
            risk: ">40%",
            asiacell: "\u5F85\u8865",
            asiaBand: "\u6211\u65B9 AR\u3001\u53EF\u52A8\u7528\u73B0\u91D1",
            zain: "\u5F85\u8865",
            zainBand: "\u6211\u65B9 AR\u3001\u53EF\u52A8\u7528\u73B0\u91D1",
          },
        ],
        Tu = [
          {
            key: "oil",
            layer: "A \xB7 \u56FD\u5BB6\u8D44\u91D1\u4F9B\u7ED9",
            indicator: "\u6CB9\u8FD0\u4E0E\u8D22\u653F\u73B0\u91D1\u6D41",
            evidence:
              "Hormuz \u7EF4\u6301 CRITICAL\uFF1B8\u6708\u88C5\u8FD0\u8F83\u6218\u524D\u57FA\u7EBF\u4E0B\u964D",
            light: "\u7EA2",
            action:
              "\u7F29\u77ED\u56DE\u6B3E\u590D\u6838\u5468\u671F\uFF1B\u4E0D\u4F7F\u7528\u9648\u65E7\u51FA\u53E3\u5747\u503C",
          },
          {
            key: "fx",
            layer: "A \xB7 \u56FD\u5BB6\u8D44\u91D1\u4F9B\u7ED9",
            indicator: "\u5B98\u65B9/\u5E73\u884C\u6C47\u7387\u4EF7\u5DEE",
            evidence:
              "1,310 vs 1,555\uFF1B\u5E73\u884C\u6EA2\u4EF7\u7EA6 18.7%",
            light: "\u7EA2",
            action:
              "\u5BF9\u7F8E\u5143\u5E94\u6536\u505A IQD \u6210\u672C\u654F\u611F\u6027\u538B\u529B\u6D4B\u8BD5",
          },
          {
            key: "channel",
            layer: "B \xB7 \u652F\u4ED8\u901A\u9053",
            indicator: "\u94F6\u884C\u53CA\u4EE3\u7406\u884C\u94FE\u8DEF",
            evidence:
              "\u6536\u6B3E\u884C\u3001\u4ED8\u6B3E\u884C\u3001\u4EE3\u7406\u884C\u540D\u79F0\u4ECD\u5F85\u5185\u90E8\u8865\u5165",
            light: "\u9EC4",
            action:
              "\u9010\u9879\u6BD4\u5BF9 CBI \u9650\u5236\u540D\u5355\u548C OFAC 50% \u89C4\u5219",
          },
          {
            key: "customers",
            layer: "C \xB7 \u5BA2\u6237\u80FD\u529B",
            indicator: "Asiacell / Zain Iraq",
            evidence:
              "\u5747\u4EC5 6/10 \u53EF\u8BA1\u7B97\uFF1B\u4E0D\u5F97\u8F93\u51FA\u6B63\u5F0F\u603B\u5206",
            light: "\u9EC4",
            action:
              "\u8865\u9F50\u503A\u52A1\u5206\u7C7B\u3001\u5229\u606F\u3001COGS\u3001\u53EF\u52A8\u7528\u73B0\u91D1\u548C\u6211\u65B9 AR",
          },
          {
            key: "internal",
            layer: "D \xB7 \u6211\u65B9\u655E\u53E3",
            indicator:
              "AR\u3001\u8D26\u9F84\u3001\u4E89\u8BAE\u4E0E\u50AC\u6536",
            evidence: "\u5185\u90E8\u6570\u636E\u5C1A\u672A\u63A5\u5165",
            light: "\u672A\u77E5",
            action:
              "\u6309\u5BA2\u6237\u3001\u5E01\u79CD\u3001\u8D26\u9F84\u5EFA\u7ACB\u53EF\u5BA1\u8BA1\u8F93\u5165\u8868",
          },
        ],
        Nu = [
          {
            key: "S01",
            source: "CBI \u8D22\u52A1\u72B6\u51B5\u6708\u8868",
            publisher: "Central Bank of Iraq",
            asOf: "2026-06",
            status: "\u5B98\u65B9\xB7\u9648\u65E7",
            url: "https://www.cbi.iq/page/73",
          },
          {
            key: "S02",
            source: "SOMO \u6708\u5EA6\u51FA\u53E3\u5DE5\u4F5C\u7C3F",
            publisher: "SOMO",
            asOf: "2026-06",
            status: "\u5B98\u65B9\xB7\u9648\u65E7",
            url: "https://www.somooil.gov.iq/annual-summary-chart",
          },
          {
            key: "S05",
            source: "CBI \u7F8E\u5143\u4EA4\u6613\u53D7\u9650\u540D\u5355",
            publisher: "Central Bank of Iraq",
            asOf: "2026-02-22",
            status: "\u5B98\u65B9",
            url: "https://www.cbi.iq/news/view/3135",
          },
          {
            key: "S09",
            source: "OFAC Iraq oil-sector action",
            publisher: "U.S. Treasury",
            asOf: "2026-05-07",
            status: "\u76D1\u7BA1",
            url: "https://home.treasury.gov/news/press-releases/sb0492",
          },
          {
            key: "S11",
            source: "Zain Group Q2 / H1 results",
            publisher: "Zain Group",
            asOf: "2026-08-10",
            status: "\u5B98\u65B9",
            url: "https://www.zain.com/en/press-release/zaingroup2026-q2",
          },
          {
            key: "S13",
            source: "Ooredoo Q2 supplementary schedule",
            publisher: "Ooredoo Group",
            asOf: "2026-06-30",
            status: "\u5B98\u65B9",
            url: "https://www.ooredoo.com/wp-content/uploads/2026/07/Supplementary-Schedules-Q2-2026.pdf",
          },
          {
            key: "S24",
            source: "Asiacell H1 \u626B\u63CF\u8D22\u62A5",
            publisher: "Iraq Securities Commission",
            asOf: "2026-06-30",
            status: "OCR \u5DF2\u6838\u9A8C",
            url: "https://uploads.isc.gov.iq/upload/2026/08/11/6a7af9bc8d298.pdf",
          },
          {
            key: "S25",
            source: "Zain Iraq H1 \u626B\u63CF\u8D22\u62A5",
            publisher: "Iraq Securities Commission",
            asOf: "2026-06-30",
            status: "OCR \u5DF2\u6838\u9A8C",
            url: "https://uploads.isc.gov.iq/upload/2026/08/31/6a9554bede623.pdf",
          },
          {
            key: "S26",
            source: "CBI W524 / ICD832",
            publisher: "Central Bank of Iraq",
            asOf: "2026-09-06",
            status: "\u5B98\u65B9\u5468\u9891",
            url: "https://cbi.iq/news/view/3312",
          },
          {
            key: "S29",
            source: "Al-Taif Bank deposits statement",
            publisher: "Central Bank of Iraq",
            asOf: "2026-09-08",
            status: "\u5B98\u65B9",
            url: "https://cbi.iq/news/view/3318",
          },
          {
            key: "S32",
            source: "CBI Facebook",
            publisher: "Central Bank of Iraq",
            asOf: "2026-09-08",
            status: "\u5B98\u65B9\u793E\u5A92",
            url: "https://web.facebook.com/cbi.iraq/",
          },
        ],
        H = M.A.Title,
        f = M.A.Text,
        X = M.A.Paragraph,
        De = [
          {
            path: "overview",
            name: "\u603B\u89C8\u9A7E\u9A76\u8231",
            icon: (0, e.jsx)(Ze.A, {}),
          },
          {
            path: "cbi",
            name: "CBI \u6BCF\u5468\u5206\u6790",
            icon: (0, e.jsx)(Ke.A, {}),
          },
          {
            path: "capacity",
            name: "\u8FD0\u8425\u5546 10 \u9879\u8BC4\u5206",
            icon: (0, e.jsx)(Fe.A, {}),
          },
          {
            path: "ocr",
            name: "\u8D22\u62A5 OCR \u5DE5\u4F5C\u53F0",
            icon: (0, e.jsx)(ne.A, {}),
          },
          {
            path: "risk",
            name: "\u98CE\u9669\u77E9\u9635\u4E0E\u884C\u52A8",
            icon: (0, e.jsx)(Je.A, {}),
          },
          {
            path: "sources",
            name: "\u6765\u6E90\u4E0E\u8BC1\u636E\u94FE",
            icon: (0, e.jsx)(Ve.A, {}),
          },
        ],
        zu = {
          success: "success",
          warning: "warning",
          danger: "error",
          info: "processing",
          default: "default",
        },
        Pu = [
          {
            week: "W36 \u521D\u59CB",
            value: 44,
            type: "\u7EFC\u5408\u98CE\u9669\u6307\u6570",
          },
          {
            week: "W36 \u5237\u65B0",
            value: 44,
            type: "\u7EFC\u5408\u98CE\u9669\u6307\u6570",
          },
          {
            week: "W36 \u5468\u66F4",
            value: 40,
            type: "\u7EFC\u5408\u98CE\u9669\u6307\u6570",
          },
          {
            week: "W37 \u5F53\u524D",
            value: 30,
            type: "\u7EFC\u5408\u98CE\u9669\u6307\u6570",
          },
        ],
        $u = [
          { layer: "A \u56FD\u5BB6\u4F9B\u7ED9", value: 34 },
          { layer: "B \u652F\u4ED8\u901A\u9053", value: 25 },
          { layer: "C \u5BA2\u6237\u80FD\u529B", value: 0 },
          { layer: "D \u6211\u65B9\u655E\u53E3", value: 0 },
        ],
        Lu = [
          {
            index: "01",
            title: "\u5DE5\u8D44\u4E0E\u517B\u8001\u91D1",
            note: "7\u6708\u591A\u4E2A\u90E8\u59D4\u6B20\u85AA\uFF1B\u5F3A\u6EDE\u540E\u786E\u8BA4\u4FE1\u53F7",
            tone: "red",
          },
          {
            index: "02",
            title: "\u80FD\u6E90\u4E0E\u7CAE\u98DF",
            note: "\u6C11\u751F\u4F18\u5148\uFF0C\u4ED8\u6B3E\u987A\u4F4D\u4E0D\u8BA9\u6E21",
            tone: "amber",
          },
          {
            index: "03",
            title: "\u5730\u7F18\u4ED8\u6B3E",
            note: "\u90BB\u56FD\u7535\u529B\u3001\u5929\u7136\u6C14\u7B49\u521A\u6027\u652F\u51FA",
            tone: "amber",
          },
          {
            index: "04",
            title: "\u503A\u52A1\u4E0E\u4E3E\u503A",
            note: "\u8D22\u653F\u7F3A\u53E3\u6324\u538B\u540E\u7EED\u987A\u4F4D",
            tone: "blue",
          },
          {
            index: "05",
            title: "\u56FD\u4F01\u4E0E\u627F\u5305\u5546",
            note: "\u672C\u5730\u8FD0\u8425\u4ED8\u6B3E\u4F18\u5148\u4E8E\u5916\u56FD\u4F9B\u5E94\u5546",
            tone: "blue",
          },
          {
            index: "06",
            title: "\u5916\u56FD ICT \u4F9B\u5E94\u5546",
            note: "\u961F\u5C3E\uFF1B\u5DE5\u8D44\u5EF6\u8FDF\u610F\u5473\u7740\u6211\u65B9\u65E9\u5DF2\u627F\u538B",
            tone: "gold",
          },
        ],
        Mu = [
          {
            title: "\u672C\u5468\u5FC5\u505A",
            color: "#ff6b7a",
            items: [
              [
                "\u5B8C\u6210\u4E09\u7C7B\u94F6\u884C\u540D\u5355\u6BD4\u5BF9",
                "\u6536\u6B3E\u884C / \u5BA2\u6237\u4ED8\u6B3E\u884C / \u4EE3\u7406\u884C\u9010\u9879\u5BF9 CBI 28+4",
                "Treasury \xB7 2\u4E2A\u5DE5\u4F5C\u65E5",
              ],
              [
                "\u63A8\u52A8\u96C6\u56E2\u6216\u5883\u5916\u4ED8\u6B3E",
                "Zain Group\u3001Ooredoo Group \u786E\u8BA4 USD \u4ED8\u6B3E\u8DEF\u5F84",
                "\u5BA2\u6237\u7ECF\u7406 + CFO \xB7 5\u65E5",
              ],
              [
                "\u590D\u6838 OCR \u88AB\u62E6\u622A\u5B57\u6BB5",
                "\u786E\u8BA4\u503A\u52A1\u8BA1\u606F\u8303\u56F4\u3001\u53D7\u9650\u73B0\u91D1\u3001\u5229\u606F/COGS\uFF0C\u5E76\u8865\u5165\u6211\u65B9 AR",
                "AR Owner + Finance \xB7 \u5468\u4E94\u524D",
              ],
            ],
          },
          {
            title: "30 \u5929\u5185",
            color: "#ffbd59",
            items: [
              [
                "\u5EFA\u7ACB\u4E24\u6761\u5907\u7528\u6C47\u8DEF",
                "\u7EA6\u65E6 / \u963F\u8054\u914B\u4F18\u5148\uFF1B\u571F\u8033\u5176\u8DEF\u5F84\u5B8C\u6210 OFAC \u91CD\u7B5B",
                "Treasury \xB7 30\u65E5",
              ],
              [
                "\u6807\u51C6\u5316\u5408\u89C4\u5305",
                "\u5408\u540C\u3001\u53D1\u7968\u3001\u62A5\u5173/\u9A8C\u6536\u3001\u53D7\u76CA\u4EBA KYC \u4E00\u6B21\u9F50\u5957",
                "Finance Ops \xB7 14\u65E5",
              ],
              [
                "\u6309\u5BA2\u6237\u8BBE AR \u4E0A\u9650",
                "\u5355\u4E00\u5BA2\u6237\u8D85\u8FC7 50% \u65F6\uFF0C\u65B0\u5355\u5347\u7EA7\u5730\u533A\u90E8\u5BA1\u6279",
                "CFO \xB7 \u6708\u5185",
              ],
            ],
          },
          {
            title: "\u7ED3\u6784\u6027\u4FDD\u62A4",
            color: "#37c2ff",
            items: [
              [
                "\u65B0\u5927\u5355\u6539\u4E3A\u62C5\u4FDD\u7ED3\u7B97",
                "confirmed L/C\u3001SBLC\u3001\u9884\u4ED8\u6216\u6BCD\u516C\u53F8\u62C5\u4FDD",
                "Commercial + Legal",
              ],
              [
                "\u8865\u5145\u4E0D\u53EF\u5151\u6362\u6761\u6B3E",
                "currency inconvertibility / transfer restriction",
                "Legal \xB7 \u65B0\u5408\u540C\u8D77",
              ],
              [
                "\u590D\u6838 Sinosure \u9650\u989D",
                "\u6838\u5BF9\u56FD\u522B\u3001\u4E70\u65B9\u548C\u653F\u6CBB\u98CE\u9669\u627F\u4FDD\u53EF\u7528\u6027",
                "Risk \xB7 \u5B63\u5EA6",
              ],
            ],
          },
        ];
      function O(n) {
        var i = n.title,
          r = n.subtitle,
          s = n.extra;
        return (0, e.jsxs)(Q.A, {
          justify: "space-between",
          align: "flex-end",
          gap: 16,
          wrap: !0,
          className: "section-title",
          children: [
            (0, e.jsxs)("div", {
              children: [
                (0, e.jsx)(H, { level: 3, children: i }),
                (0, e.jsx)(f, { type: "secondary", children: r }),
              ],
            }),
            s,
          ],
        });
      }
      function Qu(n) {
        var i = n.navigate;
        return (0, e.jsxs)(e.Fragment, {
          children: [
            (0, e.jsxs)("section", {
              className: "hero-card",
              children: [
                (0, e.jsxs)("div", {
                  className: "hero-copy",
                  children: [
                    (0, e.jsxs)(P.A, {
                      size: [8, 8],
                      wrap: !0,
                      children: [
                        (0, e.jsx)(o.A, {
                          color: "error",
                          children: "\u9AD8\u98CE\u9669",
                        }),
                        (0, e.jsx)(o.A, {
                          color: "processing",
                          children: "\u6A21\u578B v13",
                        }),
                        (0, e.jsx)(o.A, {
                          children: "\u6570\u636E\u622A\u6B62 2026-09-10",
                        }),
                      ],
                    }),
                    (0, e.jsxs)(H, {
                      children: [
                        "\u4F0A\u62C9\u514B\u56DE\u6B3E\u98CE\u9669",
                        (0, e.jsx)("br", {}),
                        (0, e.jsx)("span", {
                          children: "\u51B3\u7B56\u9A7E\u9A76\u8231",
                        }),
                      ],
                    }),
                    (0, e.jsx)(X, {
                      children:
                        "\u628A\u56FD\u5BB6\u8D44\u91D1\u4F9B\u7ED9\u3001\u8DE8\u5883\u652F\u4ED8\u901A\u9053\u3001\u5BA2\u6237\u4ED8\u6B3E\u80FD\u529B\u4E0E\u6211\u65B9\u98CE\u9669\u655E\u53E3\u653E\u5728\u540C\u4E00\u6761\u8BC1\u636E\u94FE\u4E0A\u3002\u5F53\u524D\u4E3B\u56E0\u4ECD\u662F\u201C\u94B1\u51FA\u4E0D\u53BB\u201D\uFF0C\u5176\u6B21\u662F\u4ED8\u6B3E\u4F18\u5148\u7EA7\u9760\u540E\uFF1B\u5BA2\u6237\u201C\u6CA1\u94B1\u201D\u5C1A\u4E0D\u80FD\u4E0B\u7ED3\u8BBA\u3002",
                    }),
                    (0, e.jsxs)(Q.A, {
                      gap: 10,
                      wrap: !0,
                      children: [
                        (0, e.jsx)(p.A, {
                          type: "primary",
                          size: "large",
                          onClick: function () {
                            return i("capacity");
                          },
                          children:
                            "\u67E5\u770B\u8FD0\u8425\u5546\u8BC4\u5206",
                        }),
                        (0, e.jsx)(p.A, {
                          size: "large",
                          onClick: function () {
                            return i("cbi");
                          },
                          children: "\u67E5\u770B CBI \u5468\u62A5",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, e.jsxs)("div", {
                  className: "risk-dial",
                  children: [
                    (0, e.jsxs)("div", {
                      className: "risk-gauge",
                      children: [
                        (0, e.jsx)(Ce.A, {
                          type: "dashboard",
                          percent: 30,
                          size: 190,
                          strokeWidth: 8,
                          status: "exception",
                          showInfo: !1,
                        }),
                        (0, e.jsxs)("div", {
                          className: "risk-gauge-copy",
                          children: [
                            (0, e.jsx)("b", { children: "30" }),
                            (0, e.jsx)("span", {
                              children: "\u9AD8\u98CE\u9669",
                            }),
                            (0, e.jsx)("small", {
                              children: "\u98CE\u9669\u6307\u6570 / 100",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, e.jsx)(f, {
                      type: "secondary",
                      children:
                        "\u8F83 W36 \u4E0B\u964D 10 \u5206 \xB7 \u53E3\u5F84\u5DF2\u5347\u7EA7",
                    }),
                  ],
                }),
              ],
            }),
            (0, e.jsxs)(y.A, {
              gutter: [14, 14],
              className: "stat-row",
              children: [
                (0, e.jsx)(x.A, {
                  xs: 24,
                  sm: 12,
                  xl: 6,
                  children: (0, e.jsx)(ee.A, {
                    statistic: {
                      title: "\u5B98\u65B9 USD / IQD",
                      value: 1310,
                      suffix: "IQD",
                      description: (0, e.jsx)(o.A, {
                        color: "success",
                        children: "\u672C\u5468\u7A33\u5B9A",
                      }),
                    },
                    chart: (0, e.jsx)("div", { className: "stat-accent blue" }),
                  }),
                }),
                (0, e.jsx)(x.A, {
                  xs: 24,
                  sm: 12,
                  xl: 6,
                  children: (0, e.jsx)(ee.A, {
                    statistic: {
                      title: "\u5E73\u884C\u5E02\u573A\u6EA2\u4EF7",
                      value: 18.7,
                      precision: 1,
                      suffix: "%",
                      description: (0, e.jsx)(f, {
                        type: "danger",
                        children:
                          "\u7EA2\u6863 \xB7 \u94B1\u51FA\u53BB\u66F4\u8D35",
                      }),
                    },
                    chart: (0, e.jsx)("div", { className: "stat-accent red" }),
                  }),
                }),
                (0, e.jsx)(x.A, {
                  xs: 24,
                  sm: 12,
                  xl: 6,
                  children: (0, e.jsx)(ee.A, {
                    statistic: {
                      title: "CBI \u4F53\u7CFB\u6D41\u52A8\u6027\u7F13\u51B2",
                      value: 60,
                      prefix: ">",
                      suffix: "%",
                      description: (0, e.jsx)(f, {
                        type: "secondary",
                        children:
                          "\u4E0D\u53EF\u5916\u63A8\u5230\u5355\u4E00\u94F6\u884C",
                      }),
                    },
                    chart: (0, e.jsx)("div", {
                      className: "stat-accent green",
                    }),
                  }),
                }),
                (0, e.jsx)(x.A, {
                  xs: 24,
                  sm: 12,
                  xl: 6,
                  children: (0, e.jsx)(ee.A, {
                    statistic: {
                      title: "\u8FD0\u8425\u5546\u8BC4\u5206\u8986\u76D6",
                      value: 6,
                      suffix: "/ 10",
                      description: (0, e.jsx)(f, {
                        type: "warning",
                        children: "\u4E24\u5BB6\u5747\u7F3A 4 \u9879",
                      }),
                    },
                    chart: (0, e.jsx)("div", {
                      className: "stat-accent amber",
                    }),
                  }),
                }),
              ],
            }),
            (0, e.jsx)(O, {
              title: "\u51B3\u7B56\u4FE1\u53F7",
              subtitle:
                "\u4ECE\u6570\u636E\u4E8B\u5B9E\u76F4\u63A5\u6620\u5C04\u5230\u672C\u5468\u7BA1\u7406\u52A8\u4F5C",
            }),
            (0, e.jsxs)(y.A, {
              gutter: [14, 14],
              children: [
                (0, e.jsx)(x.A, {
                  xs: 24,
                  xl: 14,
                  children: (0, e.jsx)(A.A, {
                    bordered: !1,
                    className: "surface-card",
                    title: "\u5173\u952E\u53D8\u5316",
                    children: (0, e.jsx)(Z.A, {
                      dataSource: [
                        {
                          icon: (0, e.jsx)(Ye.A, {}),
                          title:
                            "\u56FD\u5BB6\u8D44\u91D1\u4F9B\u7ED9\u4ECD\u627F\u538B",
                          text: "Hormuz \u7EF4\u6301 CRITICAL\uFF1B\u5DE5\u8D44\u5EF6\u8FDF\u662F\u66F4\u5F3A\u7684\u8D22\u653F\u73B0\u91D1\u6D41\u6EDE\u540E\u4FE1\u53F7\u3002",
                          tag: "\u7EA2",
                        },
                        {
                          icon: (0, e.jsx)(Xe.A, {}),
                          title:
                            "\u652F\u4ED8\u901A\u9053\u5408\u89C4\u95E8\u69DB\u4E0A\u5347",
                          text: "\u5916\u6C47\u516C\u53F8\u724C\u7167\u64A4\u9500\u3001Al-Taif \u63A5\u7BA1\u548C\u571F\u8033\u5176\u4EE3\u7406\u8DEF\u5F84\u5236\u88C1\u9700\u8981\u9010\u94FE\u8DEF\u91CD\u7B5B\u3002",
                          tag: "\u7EA2",
                        },
                        {
                          icon: (0, e.jsx)(Fe.A, {}),
                          title:
                            "\u5BA2\u6237\u80FD\u529B\u53EA\u80FD\u7ED9\u90E8\u5206\u753B\u50CF",
                          text: "\u4E24\u5BB6\u8FD0\u8425\u5546\u5404 6/10 \u53EF\u8BA1\u7B97\uFF1B\u7F3A\u5931\u6570\u636E\u4E0D\u6309 0 \u5206\uFF0C\u4E5F\u4E0D\u8F93\u51FA\u6B63\u5F0F\u8BC4\u7EA7\u3002",
                          tag: "\u9EC4",
                        },
                      ],
                      renderItem: function (s) {
                        return (0, e.jsx)(Z.A.Item, {
                          extra: (0, e.jsxs)(o.A, {
                            color: s.tag === "\u7EA2" ? "error" : "warning",
                            children: [s.tag, "\u706F"],
                          }),
                          children: (0, e.jsx)(Z.A.Item.Meta, {
                            avatar: (0, e.jsx)("div", {
                              className: "signal-icon",
                              children: s.icon,
                            }),
                            title: s.title,
                            description: s.text,
                          }),
                        });
                      },
                    }),
                  }),
                }),
                (0, e.jsx)(x.A, {
                  xs: 24,
                  xl: 10,
                  children: (0, e.jsx)(A.A, {
                    bordered: !1,
                    className: "surface-card",
                    title: "\u672C\u5468\u7BA1\u7406\u5224\u65AD",
                    children: (0, e.jsx)(ve.A, {
                      items: [
                        {
                          color: "red",
                          children: (0, e.jsxs)(e.Fragment, {
                            children: [
                              (0, e.jsx)("b", {
                                children:
                                  "\u5148\u67E5\u4ED8\u6B3E\u8DEF\u5F84",
                              }),
                              (0, e.jsx)("br", {}),
                              (0, e.jsx)(f, {
                                type: "secondary",
                                children:
                                  "\u786E\u8BA4\u4E09\u7C7B\u94F6\u884C\u540D\u79F0\u53CA\u5BF9\u5E94\u884C\u5173\u7CFB\uFF0C\u4E0D\u80FD\u628A\u201C\u672A\u6BD4\u5BF9\u201D\u5F53\u4F5C\u201C\u672A\u547D\u4E2D\u201D\u3002",
                              }),
                            ],
                          }),
                        },
                        {
                          color: "orange",
                          children: (0, e.jsxs)(e.Fragment, {
                            children: [
                              (0, e.jsx)("b", {
                                children:
                                  "\u518D\u8865\u5BA2\u6237\u80FD\u529B\u6570\u636E",
                              }),
                              (0, e.jsx)("br", {}),
                              (0, e.jsx)(f, {
                                type: "secondary",
                                children:
                                  "\u503A\u52A1\u3001\u5229\u606F\u3001COGS\u3001\u53EF\u52A8\u7528\u73B0\u91D1\u3001\u6211\u65B9 AR \u9700\u540C\u53E3\u5F84\u6838\u9A8C\u3002",
                              }),
                            ],
                          }),
                        },
                        {
                          color: "blue",
                          children: (0, e.jsxs)(e.Fragment, {
                            children: [
                              (0, e.jsx)("b", {
                                children:
                                  "\u4ED8\u6B3E\u7ED3\u6784\u524D\u7F6E\u4FDD\u62A4",
                              }),
                              (0, e.jsx)("br", {}),
                              (0, e.jsx)(f, {
                                type: "secondary",
                                children:
                                  "\u63A8\u52A8\u6BCD\u516C\u53F8\u4ED8\u6B3E\u3001\u4FDD\u5151 L/C\u3001SBLC \u6216\u9884\u4ED8\u3002",
                              }),
                            ],
                          }),
                        },
                      ],
                    }),
                  }),
                }),
              ],
            }),
            (0, e.jsx)(O, {
              title: "\u98CE\u9669\u8D8B\u52BF\u4E0E\u56DB\u5C42\u7ED3\u6784",
              subtitle:
                "\u8BC4\u5206\u4E0B\u964D\u4EE3\u8868\u98CE\u9669\u6539\u5584\uFF1BC/D \u7F3A\u5931\u4E0D\u4EE5\u96F6\u5206\u53C2\u4E0E\u6B63\u5F0F\u5408\u6210",
            }),
            (0, e.jsxs)(y.A, {
              gutter: [14, 14],
              children: [
                (0, e.jsx)(x.A, {
                  xs: 24,
                  xl: 14,
                  children: (0, e.jsx)(A.A, {
                    bordered: !1,
                    className: "surface-card chart-card",
                    title: "\u5468\u5EA6\u98CE\u9669\u6307\u6570",
                    children: (0, e.jsx)(au.A, {
                      data: Pu,
                      xField: "week",
                      yField: "value",
                      color: "#37c2ff",
                      point: { size: 5 },
                      area: {
                        style: {
                          fill: "linear-gradient(-90deg, rgba(55,194,255,0.02) 0%, rgba(55,194,255,0.34) 100%)",
                        },
                      },
                      axis: {
                        y: { domain: !1, title: "\u98CE\u9669\u6307\u6570" },
                        x: { title: !1 },
                      },
                    }),
                  }),
                }),
                (0, e.jsx)(x.A, {
                  xs: 24,
                  xl: 10,
                  children: (0, e.jsx)(A.A, {
                    bordered: !1,
                    className: "surface-card chart-card",
                    title: "\u56DB\u5C42\u6700\u65B0\u53EF\u7528\u503C",
                    children: (0, e.jsx)(su.A, {
                      data: $u,
                      xField: "layer",
                      yField: "value",
                      colorField: "layer",
                      legend: !1,
                      axis: { x: { labelAutoRotate: !0 }, y: { domain: !1 } },
                    }),
                  }),
                }),
              ],
            }),
            (0, e.jsx)(O, {
              title: "\u4ED8\u6B3E\u4F18\u5148\u7EA7\u961F\u5217",
              subtitle:
                "\u771F\u6B63\u7684\u95EE\u9898\u4E0D\u662F\u56FD\u5BB6\u6709\u6CA1\u6709\u94B1\uFF0C\u800C\u662F\u5916\u56FD ICT \u4F9B\u5E94\u5546\u6392\u5728\u7B2C\u51E0\u4F4D",
            }),
            (0, e.jsx)("div", {
              className: "priority-grid",
              children: Lu.map(function (r) {
                return (0, e.jsxs)(
                  A.A,
                  {
                    bordered: !1,
                    className: "priority-card ".concat(r.tone),
                    children: [
                      (0, e.jsx)(f, { children: r.index }),
                      (0, e.jsx)("b", { children: r.title }),
                      (0, e.jsx)("small", { children: r.note }),
                    ],
                  },
                  r.index,
                );
              }),
            }),
          ],
        });
      }
      function Hu() {
        var n = [
          {
            title: "\u7C7B\u522B",
            dataIndex: "category",
            width: 130,
            fixed: "left",
            render: function (r) {
              return (0, e.jsx)(o.A, { children: r });
            },
          },
          {
            title: "\u6838\u5FC3\u6307\u6807",
            dataIndex: "metric",
            width: 210,
            render: function (r) {
              return (0, e.jsx)(f, { strong: !0, children: r });
            },
          },
          {
            title: "\u5F53\u524D\u503C",
            dataIndex: "value",
            width: 170,
            render: function (r) {
              return (0, e.jsx)(f, { className: "number-value", children: r });
            },
          },
          { title: "\u9891\u7387", dataIndex: "frequency", width: 100 },
          {
            title: "\u5468\u5EA6\u53D8\u5316",
            dataIndex: "change",
            width: 210,
          },
          {
            title: "\u4E0E\u56DE\u6B3E\u5173\u7CFB",
            dataIndex: "relevance",
            width: 360,
          },
          {
            title: "\u72B6\u6001",
            dataIndex: "status",
            width: 110,
            render: function (r, s) {
              return (0, e.jsx)(o.A, { color: zu[s.tone], children: r });
            },
          },
          {
            title: "\u6765\u6E90",
            dataIndex: "source",
            width: 90,
            render: function (r) {
              return (0, e.jsx)(p.A, {
                type: "link",
                href: r,
                target: "_blank",
                icon: (0, e.jsx)(Ee.A, {}),
                children: "\u539F\u6587",
              });
            },
          },
        ];
        return (0, e.jsxs)(e.Fragment, {
          children: [
            (0, e.jsx)(O, {
              title: "CBI \u6BCF\u5468\u6838\u5FC3\u6570\u636E\u5206\u6790",
              subtitle:
                "\u5B98\u7F51\u662F\u8BB0\u5F55\u6E90\uFF1BFacebook \u53EA\u7528\u4E8E\u5FEB\u901F\u53D1\u73B0\u548C\u4EA4\u53C9\u6838\u9A8C",
              extra: (0, e.jsxs)(P.A, {
                children: [
                  (0, e.jsx)(me.A, {
                    status: "processing",
                    text: "\u5468\u5EA6\u5FEB\u7167",
                  }),
                  (0, e.jsx)(o.A, { children: "2026-09-10" }),
                ],
              }),
            }),
            (0, e.jsx)(K.A, {
              showIcon: !0,
              type: "warning",
              message:
                "\u672C\u5468\u5224\u65AD\uFF1A\u4F53\u7CFB\u6D41\u52A8\u6027\u62AB\u9732\u63D0\u4F9B\u7F13\u51B2\uFF0C\u4F46 Al-Taif \u63A5\u7BA1\u4E0E\u5916\u6C47\u6E20\u9053\u724C\u7167\u64A4\u9500\u76F4\u63A5\u62AC\u9AD8\u7279\u5B9A\u4ED8\u6B3E\u94FE\u8DEF\u98CE\u9669\u3002",
              description:
                "\u5B98\u65B9\u6C47\u7387\u7A33\u5B9A\u4E0D\u4EE3\u8868\u7F8E\u5143\u53EF\u5F97\u3001\u4EE3\u7406\u884C\u53EF\u7528\u6216\u5B9E\u9645\u6C47\u51FA\u53CA\u65F6\u3002\u6240\u6709\u7ED3\u8BBA\u90FD\u4FDD\u7559\u6765\u6E90\u65E5\u671F\u4E0E\u9891\u7387\u3002",
            }),
            (0, e.jsx)(A.A, {
              bordered: !1,
              className: "surface-card table-card",
              style: { marginTop: 14 },
              children: (0, e.jsx)(Y.A, {
                rowKey: "key",
                pagination: !1,
                columns: n,
                dataSource: ku,
                scroll: { x: 1380 },
              }),
            }),
            (0, e.jsxs)(y.A, {
              gutter: [14, 14],
              style: { marginTop: 14 },
              children: [
                (0, e.jsx)(x.A, {
                  xs: 24,
                  lg: 8,
                  children: (0, e.jsxs)(A.A, {
                    bordered: !1,
                    className: "surface-card info-card",
                    title: "\u65E5\u9891",
                    children: [
                      (0, e.jsx)("b", { children: "\u5B98\u65B9\u6C47\u7387" }),
                      (0, e.jsx)("p", {
                        children:
                          "\u6BCF\u65E5\u8BFB\u53D6\u5B98\u7F51\u724C\u4EF7\uFF0C\u5E76\u4E0E\u5E73\u884C\u5E02\u573A\u4EA4\u53C9\u89C2\u5BDF\uFF1B\u4E0D\u628A\u4EF7\u5DEE\u7B49\u540C\u4E8E\u94F6\u884C\u53EF\u6C47\u51FA\u989D\u5EA6\u3002",
                      }),
                    ],
                  }),
                }),
                (0, e.jsx)(x.A, {
                  xs: 24,
                  lg: 8,
                  children: (0, e.jsxs)(A.A, {
                    bordered: !1,
                    className: "surface-card info-card",
                    title: "\u5468\u9891 / \u4E8B\u4EF6",
                    children: [
                      (0, e.jsx)("b", {
                        children:
                          "\u516C\u5F00\u5E02\u573A\u4E0E\u76D1\u7BA1\u516C\u544A",
                      }),
                      (0, e.jsx)("p", {
                        children:
                          "\u8DDF\u8E2A\u7968\u636E\u3001\u5B58\u5355\u3001\u94F6\u884C\u63A5\u7BA1\u3001\u724C\u7167\u548C\u53CD\u6D17\u94B1\u52A8\u4F5C\uFF0C\u6620\u5C04\u81F3\u4ED8\u6B3E\u94FE\u8DEF\u3002",
                      }),
                    ],
                  }),
                }),
                (0, e.jsx)(x.A, {
                  xs: 24,
                  lg: 8,
                  children: (0, e.jsxs)(A.A, {
                    bordered: !1,
                    className: "surface-card info-card",
                    title: "\u6708\u9891",
                    children: [
                      (0, e.jsx)("b", {
                        children: "\u50A8\u5907\u4E0E\u8D27\u5E01\u53D8\u91CF",
                      }),
                      (0, e.jsx)("p", {
                        children:
                          "\u7F3A\u5C11\u65B0\u6708\u8868\u65F6\u660E\u786E\u6807\u6CE8 stale\uFF0C\u7EDD\u4E0D\u5C06\u65E7\u503C\u4F2A\u88C5\u6210\u5B9E\u65F6\u6570\u636E\u3002",
                      }),
                    ],
                  }),
                }),
              ],
            }),
            (0, e.jsx)(A.A, {
              bordered: !1,
              className: "surface-card facebook-card",
              style: { marginTop: 14 },
              children: (0, e.jsxs)(Q.A, {
                justify: "space-between",
                align: "center",
                gap: 16,
                wrap: !0,
                children: [
                  (0, e.jsxs)(P.A, {
                    size: 14,
                    children: [
                      (0, e.jsx)("div", {
                        className: "facebook-mark",
                        children: "f",
                      }),
                      (0, e.jsxs)("div", {
                        children: [
                          (0, e.jsx)(H, {
                            level: 5,
                            children: "CBI Facebook \u5FEB\u901F\u76D1\u6D4B",
                          }),
                          (0, e.jsx)(f, {
                            type: "secondary",
                            children:
                              "\u6700\u65B0\u53EF\u89C1\u516C\u5F00\u5E16\uFF1AAl-Taif Bank \u5B58\u6B3E\u58F0\u660E \xB7 \u4E0E\u5B98\u7F51 9\u67088\u65E5\u58F0\u660E\u4E00\u81F4",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, e.jsx)(p.A, {
                    href: "https://web.facebook.com/cbi.iraq/",
                    target: "_blank",
                    icon: (0, e.jsx)(qe.A, {}),
                    children: "\u6253\u5F00\u5B98\u65B9\u9875\u9762",
                  }),
                ],
              }),
            }),
          ],
        });
      }
      function ye(n) {
        var i = n.name,
          r = n.subtitle,
          s = n.coverage,
          F = n.accent,
          $ = n.values;
        return (0, e.jsxs)(A.A, {
          bordered: !1,
          className: "surface-card operator-card",
          styles: { body: { padding: 20 } },
          children: [
            (0, e.jsxs)(Q.A, {
              justify: "space-between",
              align: "flex-start",
              children: [
                (0, e.jsxs)(P.A, {
                  children: [
                    (0, e.jsx)("div", {
                      className: "operator-mark",
                      style: { background: F },
                      children: i.slice(0, 1),
                    }),
                    (0, e.jsxs)("div", {
                      children: [
                        (0, e.jsx)(H, { level: 4, children: i }),
                        (0, e.jsx)(f, { type: "secondary", children: r }),
                      ],
                    }),
                  ],
                }),
                (0, e.jsx)(o.A, { color: "warning", children: s }),
              ],
            }),
            (0, e.jsx)("div", {
              className: "operator-stats",
              children: $.map(function (S) {
                var k = g()(S, 2),
                  R = k[0],
                  G = k[1];
                return (0, e.jsxs)(
                  "div",
                  {
                    children: [
                      (0, e.jsx)(f, { type: "secondary", children: R }),
                      (0, e.jsx)("b", { children: G }),
                    ],
                  },
                  R,
                );
              }),
            }),
            (0, e.jsx)(K.A, {
              type: "warning",
              showIcon: !0,
              message: "\u6B63\u5F0F\u8BC4\u7EA7\u6682\u4E0D\u8F93\u51FA",
              description:
                "\u7F3A\u5931\u6216 review \u72B6\u6001\u5B57\u6BB5\u4E0D\u4F1A\u88AB\u5F53\u6210 0\uFF0C\u4E5F\u4E0D\u4F1A\u88AB\u81EA\u52A8\u653E\u884C\u3002",
            }),
          ],
        });
      }
      function Gu() {
        var n = function (s, F) {
            var $ = s === "\u5F85\u8865",
              S = F.startsWith("\u597D"),
              k = F.startsWith("\u4E00\u822C");
            return (0, e.jsxs)("div", {
              children: [
                (0, e.jsx)(f, {
                  strong: !0,
                  className: $
                    ? ""
                    : S
                      ? "metric-good"
                      : k
                        ? "metric-warn"
                        : "metric-risk",
                  children: s,
                }),
                (0, e.jsx)("small", { className: "cell-note", children: F }),
              ],
            });
          },
          i = [
            { title: "#", dataIndex: "index", width: 55, fixed: "left" },
            {
              title: "\u7EF4\u5EA6 / \u6307\u6807",
              width: 245,
              fixed: "left",
              render: function (s, F) {
                return (0, e.jsxs)(e.Fragment, {
                  children: [
                    (0, e.jsx)(o.A, { children: F.dimension }),
                    (0, e.jsx)(f, { strong: !0, children: F.metric }),
                    (0, e.jsx)("small", {
                      className: "cell-note",
                      children: F.formula,
                    }),
                  ],
                });
              },
            },
            {
              title: "\u6743\u91CD",
              dataIndex: "weight",
              width: 70,
              render: function (s) {
                return (0, e.jsxs)(f, {
                  className: "weight",
                  children: [s, "%"],
                });
              },
            },
            {
              title: "\u597D / \u4E00\u822C / \u98CE\u9669",
              width: 230,
              render: function (s, F) {
                return (0, e.jsxs)(P.A, {
                  size: 4,
                  wrap: !0,
                  children: [
                    (0, e.jsx)(o.A, { color: "success", children: F.good }),
                    (0, e.jsx)(o.A, { color: "warning", children: F.average }),
                    (0, e.jsx)(o.A, { color: "error", children: F.risk }),
                  ],
                });
              },
            },
            {
              title: "ASIACELL",
              width: 190,
              render: function (s, F) {
                return n(F.asiacell, F.asiaBand);
              },
            },
            {
              title: "ZAIN IRAQ",
              width: 190,
              render: function (s, F) {
                return n(F.zain, F.zainBand);
              },
            },
          ];
        return (0, e.jsxs)(e.Fragment, {
          children: [
            (0, e.jsx)(O, {
              title:
                "\u5BA2\u6237\u4ED8\u6B3E\u80FD\u529B\u8BC4\u5206\u6A21\u578B",
              subtitle:
                "10 \u4E2A\u6838\u5FC3\u6307\u6807 \xB7 100 \u5206 \xB7 \u5168\u90E8\u6709\u6548\u540E\u624D\u8F93\u51FA\u6B63\u5F0F\u8BC4\u7EA7",
              extra: (0, e.jsxs)(P.A, {
                children: [
                  (0, e.jsx)(o.A, {
                    color: "processing",
                    children: "Asiacell 6/10 \xB7 65%",
                  }),
                  (0, e.jsx)(o.A, {
                    color: "processing",
                    children: "Zain Iraq 6/10 \xB7 60%",
                  }),
                ],
              }),
            }),
            (0, e.jsxs)(y.A, {
              gutter: [14, 14],
              children: [
                (0, e.jsx)(x.A, {
                  xs: 24,
                  xl: 12,
                  children: (0, e.jsx)(ye, {
                    name: "Asiacell",
                    subtitle: "Ooredoo Iraq \xB7 H1 2026",
                    coverage: "6/10 \xB7 \u8986\u76D6 65%",
                    accent: "linear-gradient(135deg,#e23b3b,#ff7a45)",
                    values: [
                      ["Q2 Revenue", "QAR 1,416m"],
                      ["Q2 EBITDA", "QAR 645m"],
                      ["Margin", "46%"],
                      ["Capex / Revenue", "9%"],
                    ],
                  }),
                }),
                (0, e.jsx)(x.A, {
                  xs: 24,
                  xl: 12,
                  children: (0, e.jsx)(ye, {
                    name: "Zain Iraq",
                    subtitle: "Zain Group 76% \xB7 H1 2026",
                    coverage: "6/10 \xB7 \u8986\u76D6 60%",
                    accent: "linear-gradient(135deg,#722ed1,#d43887)",
                    values: [
                      ["Q2 Revenue", "$334m"],
                      ["Q2 EBITDA", "$122m"],
                      ["Margin", "37%"],
                      ["Customers", "20.4m"],
                    ],
                  }),
                }),
              ],
            }),
            (0, e.jsx)(A.A, {
              bordered: !1,
              className: "surface-card table-card",
              style: { marginTop: 14 },
              children: (0, e.jsx)(Y.A, {
                rowKey: "key",
                size: "middle",
                pagination: !1,
                columns: i,
                dataSource: Ru,
                scroll: { x: 1040 },
              }),
            }),
            (0, e.jsxs)(y.A, {
              gutter: [14, 14],
              style: { marginTop: 14 },
              children: [
                (0, e.jsx)(x.A, {
                  xs: 24,
                  lg: 12,
                  children: (0, e.jsx)(A.A, {
                    bordered: !1,
                    className: "surface-card",
                    title: "\u6700\u7EC8\u8BC4\u7EA7",
                    children: (0, e.jsx)(I.A, {
                      column: 1,
                      size: "small",
                      items: [
                        {
                          key: "A",
                          label: (0, e.jsx)(o.A, {
                            color: "success",
                            children: "A",
                          }),
                          children: "80\u2013100 \xB7 Strong Payment Capacity",
                        },
                        {
                          key: "B",
                          label: (0, e.jsx)(o.A, {
                            color: "cyan",
                            children: "B",
                          }),
                          children: "70\u201379 \xB7 Good Payment Capacity",
                        },
                        {
                          key: "C",
                          label: (0, e.jsx)(o.A, {
                            color: "warning",
                            children: "C",
                          }),
                          children: "60\u201369 \xB7 Moderate Risk",
                        },
                        {
                          key: "D",
                          label: (0, e.jsx)(o.A, {
                            color: "error",
                            children: "D",
                          }),
                          children: "<60 \xB7 High Payment Risk",
                        },
                      ],
                    }),
                  }),
                }),
                (0, e.jsx)(x.A, {
                  xs: 24,
                  lg: 12,
                  children: (0, e.jsxs)(A.A, {
                    bordered: !1,
                    className: "surface-card",
                    title: "Red Flag \u964D\u7EA7\u89C4\u5219",
                    children: [
                      (0, e.jsx)(P.A, {
                        size: [8, 8],
                        wrap: !0,
                        children: [
                          "CFO \u8FDE\u7EED\u4E3A\u8D1F",
                          "FCF \u8FDE\u7EED\u4E3A\u8D1F",
                          "DSO \u6301\u7EED\u4E0A\u5347",
                          "\u5927\u989D\u503A\u52A1\u8FD1\u671F\u5230\u671F",
                          "\u6301\u7EED\u7ECF\u8425\u98CE\u9669",
                        ].map(function (r) {
                          return (0, e.jsx)(
                            o.A,
                            { color: "error", children: r },
                            r,
                          );
                        }),
                      }),
                      (0, e.jsx)(X, {
                        type: "secondary",
                        style: { marginTop: 12, marginBottom: 0 },
                        children:
                          "\u4EFB\u4E00\u9879\u7ECF\u8BC1\u636E\u786E\u8BA4\uFF0C\u5373\u4F7F\u603B\u5206\u8F83\u9AD8\uFF0C\u6700\u7EC8\u8BC4\u7EA7\u4E5F\u81F3\u5C11\u4E0B\u8C03\u4E00\u7EA7\u3002",
                      }),
                    ],
                  }),
                }),
              ],
            }),
            (0, e.jsxs)(Q.A, {
              gap: 8,
              wrap: !0,
              style: { marginTop: 14 },
              children: [
                (0, e.jsx)(p.A, {
                  href: "customer_payment_capacity_model.csv",
                  icon: (0, e.jsx)(te.A, {}),
                  children: "\u4E0B\u8F7D\u6A21\u578B CSV",
                }),
                (0, e.jsx)(p.A, {
                  href: "outputs/payment-capacity-ocr-20260910/customer_payment_capacity_model_ocr.xlsx",
                  icon: (0, e.jsx)(te.A, {}),
                  children: "\u4E0B\u8F7D OCR Excel \u6A21\u578B",
                }),
                (0, e.jsx)(o.A, {
                  children:
                    "\u5355\u4F4D\uFF1AIQD million\uFF08\u626B\u63CF\u8D22\u62A5\uFF09",
                }),
              ],
            }),
          ],
        });
      }
      function Wu() {
        var n = [
          {
            title: "\u98CE\u9669\u5C42",
            dataIndex: "layer",
            width: 180,
            fixed: "left",
            render: function (r) {
              return (0, e.jsx)(f, { strong: !0, children: r });
            },
          },
          { title: "\u6307\u6807", dataIndex: "indicator", width: 210 },
          { title: "\u8BC1\u636E", dataIndex: "evidence", width: 360 },
          {
            title: "\u706F\u53F7",
            dataIndex: "light",
            width: 90,
            render: function (r) {
              return (0, e.jsx)(o.A, {
                color:
                  r === "\u7EA2"
                    ? "error"
                    : r === "\u9EC4"
                      ? "warning"
                      : "default",
                children: r,
              });
            },
          },
          {
            title: "\u5EFA\u8BAE\u52A8\u4F5C",
            dataIndex: "action",
            width: 360,
          },
        ];
        return (0, e.jsxs)(e.Fragment, {
          children: [
            (0, e.jsx)(O, {
              title: "\u56DB\u5C42\u98CE\u9669\u77E9\u9635",
              subtitle:
                "\u7ED3\u8BBA\u3001\u8BC1\u636E\u3001\u706F\u53F7\u548C\u52A8\u4F5C\u4FDD\u6301\u5728\u540C\u4E00\u884C\uFF0C\u907F\u514D\u8BC4\u5206\u8131\u79BB\u4E1A\u52A1\u8BED\u5883",
            }),
            (0, e.jsx)(A.A, {
              bordered: !1,
              className: "surface-card table-card",
              children: (0, e.jsx)(Y.A, {
                rowKey: "key",
                pagination: !1,
                columns: n,
                dataSource: Tu,
                scroll: { x: 1120 },
              }),
            }),
            (0, e.jsx)(O, {
              title: "\u672A\u6765 13 \u5468\u60C5\u666F",
              subtitle:
                "\u6982\u7387\u662F\u7BA1\u7406\u5224\u65AD\u533A\u95F4\uFF0C\u4E0D\u662F\u7EDF\u8BA1\u9884\u6D4B\u6216\u9884\u8BA1\u5230\u8D26\u65F6\u95F4",
            }),
            (0, e.jsxs)(y.A, {
              gutter: [14, 14],
              children: [
                (0, e.jsx)(x.A, {
                  xs: 24,
                  lg: 8,
                  children: (0, e.jsxs)(A.A, {
                    bordered: !1,
                    className: "scenario-card green",
                    children: [
                      (0, e.jsx)(o.A, {
                        color: "success",
                        children: "S1 \xB7 20\u201330%",
                      }),
                      (0, e.jsx)(H, { level: 4, children: "\u7F13\u89E3" }),
                      (0, e.jsx)(X, {
                        children:
                          "\u5317\u5411\u8DEF\u7EBF\u589E\u5F3A\u3001Basra \u6062\u590D\u4E14\u5E73\u884C\u6EA2\u4EF7\u56DE\u843D\u81F3 15% \u4EE5\u4E0B\uFF1B\u901A\u9053\u98CE\u9669\u7F13\u89E3\u3002",
                      }),
                    ],
                  }),
                }),
                (0, e.jsx)(x.A, {
                  xs: 24,
                  lg: 8,
                  children: (0, e.jsxs)(A.A, {
                    bordered: !1,
                    className: "scenario-card amber",
                    children: [
                      (0, e.jsx)(o.A, {
                        color: "warning",
                        children: "S2 \xB7 50\u201360%",
                      }),
                      (0, e.jsx)(H, {
                        level: 4,
                        children: "\u5F53\u524D\u538B\u529B",
                      }),
                      (0, e.jsx)(X, {
                        children:
                          "\u6D77\u5CE1\u7EF4\u6301 CRITICAL\u3001\u6EA2\u4EF7\u505C\u7559\u7EA2\u6863\u4E14\u5DE5\u8D44\u961F\u5217\u7EE7\u7EED\u627F\u538B\uFF1B\u6574\u4F53\u4FDD\u6301\u9AD8\u98CE\u9669\u3002",
                      }),
                    ],
                  }),
                }),
                (0, e.jsx)(x.A, {
                  xs: 24,
                  lg: 8,
                  children: (0, e.jsxs)(A.A, {
                    bordered: !1,
                    className: "scenario-card red",
                    children: [
                      (0, e.jsx)(o.A, {
                        color: "error",
                        children: "S3 \xB7 15\u201325%",
                      }),
                      (0, e.jsx)(H, {
                        level: 4,
                        children: "\u5C3E\u90E8\u4E8B\u4EF6",
                      }),
                      (0, e.jsx)(X, {
                        children:
                          "\u94FE\u8DEF\u94F6\u884C\u547D\u4E2D\u5236\u88C1\u3001IQD \u6CD5\u5B9A\u8D2C\u503C\u6216 Basra \u4E2D\u65AD\u8D85\u8FC7 14 \u5929\uFF1B\u4ED8\u6B3E\u53EF\u80FD\u9636\u6BB5\u6027\u51BB\u7ED3\u3002",
                      }),
                    ],
                  }),
                }),
              ],
            }),
            (0, e.jsx)(K.A, {
              style: { marginTop: 14 },
              showIcon: !0,
              type: "warning",
              message: "\u6C47\u7387\u654F\u611F\u6027",
              description:
                "\u82E5\u5B98\u65B9\u6C47\u7387\u4ECE 1,310 \u5411\u5DF4\u683C\u8FBE\u73B0\u949E\u552E\u6C47\u4EF7 1,555 \u9760\u62E2\uFF0C\u507F\u4ED8\u540C\u989D USD \u5E94\u6536\u7684 IQD \u6210\u672C\u7EA6\u4E0A\u5347 18.7%\u3002\u56E0\u6211\u65B9 AR \u672A\u63A5\u5165\uFF0C\u6682\u4E0D\u91CF\u5316\u516C\u53F8\u73B0\u91D1\u655E\u53E3\u3002",
            }),
            (0, e.jsx)(O, {
              title: "\u6267\u884C\u6E05\u5355",
              subtitle:
                "\u6309\u672C\u5468\u300130 \u5929\u4E0E\u7ED3\u6784\u6027\u4FDD\u62A4\u5206\u5C42\uFF0C\u6BCF\u9879\u7ED1\u5B9A\u8D23\u4EFB\u4EBA\u4E0E\u65F6\u9650",
            }),
            (0, e.jsx)(y.A, {
              gutter: [14, 14],
              children: Mu.map(function (i) {
                return (0, e.jsx)(
                  x.A,
                  {
                    xs: 24,
                    xl: 8,
                    children: (0, e.jsx)(A.A, {
                      bordered: !1,
                      className: "surface-card action-card",
                      style: { borderTopColor: i.color },
                      title: i.title,
                      children: (0, e.jsx)(Z.A, {
                        dataSource: i.items,
                        renderItem: function (s) {
                          return (0, e.jsx)(Z.A.Item, {
                            children: (0, e.jsx)(Z.A.Item.Meta, {
                              title: s[0],
                              description: (0, e.jsxs)(e.Fragment, {
                                children: [
                                  (0, e.jsx)("span", { children: s[1] }),
                                  (0, e.jsx)(o.A, {
                                    color: "processing",
                                    style: { marginTop: 8 },
                                    children: s[2],
                                  }),
                                ],
                              }),
                            }),
                          });
                        },
                      }),
                    }),
                  },
                  i.title,
                );
              }),
            }),
          ],
        });
      }
      function Uu() {
        var n = [
          {
            title: "ID",
            dataIndex: "key",
            width: 75,
            fixed: "left",
            render: function (r) {
              return (0, e.jsx)(f, { code: !0, children: r });
            },
          },
          {
            title: "\u6765\u6E90",
            dataIndex: "source",
            width: 290,
            render: function (r, s) {
              return (0, e.jsxs)("a", {
                href: s.url,
                target: "_blank",
                rel: "noreferrer",
                children: [
                  (0, e.jsx)(f, { strong: !0, children: r }),
                  " ",
                  (0, e.jsx)(Ee.A, {}),
                ],
              });
            },
          },
          { title: "\u53D1\u5E03\u65B9", dataIndex: "publisher", width: 220 },
          { title: "\u622A\u6B62\u65E5", dataIndex: "asOf", width: 130 },
          {
            title: "\u72B6\u6001",
            dataIndex: "status",
            width: 140,
            render: function (r) {
              return (0, e.jsx)(o.A, {
                color: r.includes("\u9648\u65E7")
                  ? "default"
                  : r.includes("OCR")
                    ? "cyan"
                    : "success",
                children: r,
              });
            },
          },
        ];
        return (0, e.jsxs)(e.Fragment, {
          children: [
            (0, e.jsx)(O, {
              title: "\u6570\u636E\u6E90\u4E0E\u8BC1\u636E\u94FE",
              subtitle:
                "\u5B98\u65B9\u6E90\u3001\u76D1\u7BA1\u6E90\u3001OCR \u6838\u9A8C\u6E90\u4E0E\u4EA4\u53C9\u9A8C\u8BC1\u5206\u5C42\u5448\u73B0",
              extra: (0, e.jsx)(p.A, {
                href: "sources.csv",
                icon: (0, e.jsx)(te.A, {}),
                children: "\u5B8C\u6574 sources.csv",
              }),
            }),
            (0, e.jsx)(K.A, {
              showIcon: !0,
              type: "info",
              message: "\u6570\u636E\u7EAA\u5F8B",
              description:
                "\u6765\u6E90\u65E5\u671F\u3001\u9891\u7387\u548C\u72B6\u6001\u4E0E\u6570\u503C\u4E00\u8D77\u5C55\u793A\uFF1B\u516C\u5F00\u4FE1\u606F\u4E0D\u8DB3\u65F6\u6807\u8BB0 stale / \u5F85\u8865\uFF0C\u4E0D\u4F7F\u7528\u5047\u8BBE\u503C\u586B\u7A7A\u3002\u626B\u63CF\u8D22\u62A5\u53EA\u4FDD\u7559\u8D22\u52A1\u884C\u8BC1\u636E\u3001\u9875\u7801\u3001\u7F6E\u4FE1\u5EA6\u4E0E\u54C8\u5E0C\u3002",
            }),
            (0, e.jsx)(A.A, {
              bordered: !1,
              className: "surface-card table-card",
              style: { marginTop: 14 },
              children: (0, e.jsx)(Y.A, {
                rowKey: "key",
                pagination: !1,
                columns: n,
                dataSource: Nu,
                scroll: { x: 860 },
              }),
            }),
            (0, e.jsxs)(y.A, {
              gutter: [14, 14],
              style: { marginTop: 14 },
              children: [
                (0, e.jsx)(x.A, {
                  xs: 24,
                  lg: 8,
                  children: (0, e.jsx)(A.A, {
                    bordered: !1,
                    className: "surface-card info-card",
                    title: (0, e.jsxs)(e.Fragment, {
                      children: [
                        (0, e.jsx)(Be.A, {}),
                        " \u9690\u79C1\u6700\u5C0F\u5316",
                      ],
                    }),
                    children: (0, e.jsx)("p", {
                      children:
                        "PDF \u4E0D\u5165\u8FC1\u79FB\u5305\uFF1B\u9ED8\u8BA4\u4E0D\u4FDD\u7559\u5168\u6587 OCR\uFF1B\u5BA1\u8BA1\u7ED3\u679C\u4E0D\u542B\u7B7E\u540D\u3001\u59D3\u540D\u3001\u7535\u8BDD\u7B49\u5076\u53D1\u4E2A\u4EBA\u4FE1\u606F\u3002",
                    }),
                  }),
                }),
                (0, e.jsx)(x.A, {
                  xs: 24,
                  lg: 8,
                  children: (0, e.jsx)(A.A, {
                    bordered: !1,
                    className: "surface-card info-card",
                    title: (0, e.jsxs)(e.Fragment, {
                      children: [(0, e.jsx)(_e.A, {}), " \u53EF\u590D\u6838"],
                    }),
                    children: (0, e.jsx)("p", {
                      children:
                        "\u6BCF\u4E2A\u8FD0\u8425\u5546\u6863\u6848\u7ED1\u5B9A PDF SHA-256\uFF1B\u6587\u4EF6\u53D8\u5316\u4F1A\u81EA\u52A8\u964D\u7EA7\u4E3A hash mismatch review\u3002",
                    }),
                  }),
                }),
                (0, e.jsx)(x.A, {
                  xs: 24,
                  lg: 8,
                  children: (0, e.jsx)(A.A, {
                    bordered: !1,
                    className: "surface-card info-card",
                    title: (0, e.jsxs)(e.Fragment, {
                      children: [(0, e.jsx)(eu.A, {}), " \u53EF\u8FC1\u79FB"],
                    }),
                    children: (0, e.jsx)("p", {
                      children:
                        "\u6D4F\u89C8\u5668\u6A21\u5F0F\u65E0\u9700 API key\uFF1B\u672C\u5730\u6A21\u5F0F\u53EA\u4F9D\u8D56 Python\u3001Tesseract \u4E0E Poppler\u3002",
                    }),
                  }),
                }),
              ],
            }),
          ],
        });
      }
      function Zu() {
        var n = iu.Ay.useBreakpoint(),
          i = (0, D.useState)("overview"),
          r = g()(i, 2),
          s = r[0],
          F = r[1],
          Mr = (0, D.useState)(!1),
          Nr = g()(Mr, 2),
          Or = Nr[0],
          Pr = Nr[1],
          $ = (0, D.useState)(!1),
          S = g()($, 2),
          k = S[0],
          R = S[1],
          G = (0, D.useMemo)(function () {
            return { path: "/", routes: De };
          }, []),
          J = function (b) {
            var L = b.replace(/^\/+/, "") || "overview";
            (F(L), n.md === !1 && Pr(!0), window.scrollTo({ top: 0, behavior: "smooth" }));
          },
          q =
            s === "cbi"
              ? (0, e.jsx)(Hu, {})
              : s === "capacity"
                ? (0, e.jsx)(Gu, {})
                : s === "ocr"
                  ? (0, e.jsxs)(e.Fragment, {
                      children: [
                        (0, e.jsx)(O, {
                          title: "\u8D22\u62A5 OCR \u5DE5\u4F5C\u53F0",
                          subtitle:
                            "\u626B\u63CF\u4EF6\u63D0\u53D6\u3001\u8D22\u52A1\u52FE\u7A3D\u3001\u4EBA\u5DE5\u786E\u8BA4\u3001\u516C\u5F0F\u8BC4\u5206\u548C\u5BA1\u8BA1\u7559\u75D5",
                        }),
                        (0, e.jsx)(Su, {}),
                      ],
                    })
                  : s === "risk"
                    ? (0, e.jsx)(Wu, {})
                    : s === "sources"
                      ? (0, e.jsx)(Uu, {})
                      : (0, e.jsx)(Qu, { navigate: J });
        (0, D.useEffect)(
          function () {
            n.lg !== void 0 && Pr(!n.lg);
          },
          [n.lg],
        );
        return (0, e.jsxs)(nu.i, {
          title: "Iraq Treasury",
          logo: (0, e.jsx)("div", {
            className: "brand-logo",
            children: (0, e.jsx)(uu.A, {}),
          }),
          route: G,
          location: { pathname: "/".concat(s) },
          layout: "mix",
          splitMenus: !1,
          fixedHeader: !0,
          fixSiderbar: !0,
          siderWidth: 228,
          collapsed: Or,
          onCollapse: Pr,
          menu: {
            request: (function () {
              var T = V()(
                w()().mark(function L() {
                  return w()().wrap(function (W) {
                    for (;;)
                      switch ((W.prev = W.next)) {
                        case 0:
                          return W.abrupt("return", De);
                        case 1:
                        case "end":
                          return W.stop();
                      }
                  }, L);
                }),
              );
              function b() {
                return T.apply(this, arguments);
              }
              return b;
            })(),
          },
          menuProps: {
            selectedKeys: [s, "/".concat(s)],
            onClick: function (b) {
              var L = b.key;
              return J(String(L));
            },
          },
          token: {
            header: {
              colorBgHeader: "rgba(7,17,31,.94)",
              colorHeaderTitle: "#eef5ff",
              colorTextMenu: "#9fb0c5",
              colorTextMenuSelected: "#fff",
              colorBgMenuItemSelected: "rgba(55,194,255,.14)",
            },
            sider: {
              colorMenuBackground: "#081423",
              colorTextMenu: "#91a3ba",
              colorTextMenuSelected: "#fff",
              colorBgMenuItemSelected: "rgba(55,194,255,.14)",
            },
            pageContainer: {
              paddingBlockPageContainerContent: 20,
              paddingInlinePageContainerContent: n.md ? 24 : 12,
            },
          },
          actionsRender: function () {
            return n.md
              ? [
                  (0, e.jsx)(
                    me.A,
                    {
                      status: "success",
                      text: (0, e.jsx)(f, {
                        type: "secondary",
                        children: "\u7CFB\u7EDF\u5728\u7EBF",
                      }),
                    },
                    "status",
                  ),
                  (0, e.jsx)(
                    p.A,
                    {
                      icon: (0, e.jsx)(fe.A, {}),
                      onClick: function () {
                        return R(!0);
                      },
                      children: "\u65B9\u6CD5\u8BF4\u660E",
                    },
                    "method",
                  ),
                ]
              : [
                  (0, e.jsx)(
                    p.A,
                    {
                      type: "text",
                      shape: "circle",
                      "aria-label": "\u65B9\u6CD5\u8BF4\u660E",
                      icon: (0, e.jsx)(fe.A, {}),
                      onClick: function () {
                        return R(!0);
                      },
                    },
                    "method",
                  ),
                ];
          },
          avatarProps: n.md
            ? {
                src: void 0,
                icon: (0, e.jsx)(Be.A, {}),
                title: "Internal Reference",
              }
            : void 0,
          footerRender: function () {
            return (0, e.jsxs)("footer", {
              className: "app-footer",
              children: [
                (0, e.jsx)("span", {
                  children:
                    "Internal Reference \xB7 \u516C\u5F00\u4FE1\u606F\u4E0D\u8DB3\u5904\u5DF2\u6807\u8BB0\u5F85\u8865 / stale",
                }),
                (0, e.jsx)("span", {
                  children:
                    "Ant Design Pro v6 \xB7 \u6570\u636E\u622A\u6B62 2026-09-10",
                }),
              ],
            });
          },
          children: [
            (0, e.jsx)(tu.LN, {
              header: { title: !1, breadcrumb: {} },
              className: "page-shell",
              children: q,
            }),
            (0, e.jsxs)(lu.A, {
              width: n.md ? 520 : "92%",
              open: k,
              onClose: function () {
                return R(!1);
              },
              title: "\u56DB\u5C42\u98CE\u9669\u8BC4\u4EF7\u65B9\u6CD5",
              children: [
                (0, e.jsx)(ve.A, {
                  items: [
                    {
                      color: "red",
                      children: (0, e.jsxs)(e.Fragment, {
                        children: [
                          (0, e.jsx)("b", {
                            children:
                              "Layer A \xB7 \u56FD\u5BB6\u8D44\u91D1\u4F9B\u7ED9",
                          }),
                          (0, e.jsx)("p", {
                            children:
                              "\u77F3\u6CB9\u51FA\u53E3\u3001\u8D22\u653F\u652F\u4ED8\u3001\u50A8\u5907\u4E0E\u8D27\u5E01\u53D8\u91CF\uFF0C\u5224\u65AD\u56FD\u5BB6\u5C42\u9762\u8D44\u91D1\u538B\u529B\u3002",
                          }),
                        ],
                      }),
                    },
                    {
                      color: "orange",
                      children: (0, e.jsxs)(e.Fragment, {
                        children: [
                          (0, e.jsx)("b", {
                            children: "Layer B \xB7 \u652F\u4ED8\u901A\u9053",
                          }),
                          (0, e.jsx)("p", {
                            children:
                              "CBI \u9650\u5236\u3001\u4EE3\u7406\u884C\u3001OFAC/\u5236\u88C1\u4E0E\u5408\u89C4\u8DEF\u5F84\uFF0C\u5224\u65AD\u8D44\u91D1\u80FD\u5426\u6C47\u51FA\u3002",
                          }),
                        ],
                      }),
                    },
                    {
                      color: "blue",
                      children: (0, e.jsxs)(e.Fragment, {
                        children: [
                          (0, e.jsx)("b", {
                            children:
                              "Layer C \xB7 \u5BA2\u6237\u4ED8\u6B3E\u80FD\u529B",
                          }),
                          (0, e.jsx)("p", {
                            children:
                              "10 \u6307\u6807 100 \u5206\u6A21\u578B\uFF1B\u5168\u90E8\u6709\u6548\u624D\u5F62\u6210\u6B63\u5F0F A\u2013D \u8BC4\u7EA7\u3002",
                          }),
                        ],
                      }),
                    },
                    {
                      color: "gray",
                      children: (0, e.jsxs)(e.Fragment, {
                        children: [
                          (0, e.jsx)("b", {
                            children:
                              "Layer D \xB7 \u6211\u65B9\u98CE\u9669\u655E\u53E3",
                          }),
                          (0, e.jsx)("p", {
                            children:
                              "AR\u3001\u8D26\u9F84\u3001\u4E89\u8BAE\u3001\u50AC\u6536\u548C\u5BA2\u6237\u53EF\u52A8\u7528\u73B0\u91D1\uFF1B\u5F53\u524D\u5F85\u5185\u90E8\u6570\u636E\u63A5\u5165\u3002",
                          }),
                        ],
                      }),
                    },
                  ],
                }),
                (0, e.jsx)(cu.A, {}),
                (0, e.jsx)(K.A, {
                  showIcon: !0,
                  icon: (0, e.jsx)(ru.A, {}),
                  type: "warning",
                  message:
                    "\u98CE\u9669\u6307\u6570\u4E0D\u662F\u9884\u8BA1\u5230\u8D26\u5929\u6570",
                  description:
                    "\u5B83\u7528\u4E8E\u6BD4\u8F83\u98CE\u9669\u5C42\u7EA7\u4E0E\u53D8\u5316\u65B9\u5411\uFF1B\u7ED3\u8BBA\u5FC5\u987B\u56DE\u5230\u5177\u4F53\u4ED8\u6B3E\u8DEF\u5F84\u3001\u5BA2\u6237\u884C\u4E3A\u548C\u6211\u65B9\u655E\u53E3\u3002",
                }),
                (0, e.jsx)("img", {
                  className: "method-image",
                  src: "methodology-overview-v3.png",
                  alt: "\u56DB\u5C42\u65B9\u6CD5\u8BBA\u6982\u89C8",
                }),
              ],
            }),
          ],
        });
      }
      function Ku() {
        return (0, e.jsx)(ou.Ay, {
          theme: {
            algorithm: du.A.darkAlgorithm,
            token: {
              colorPrimary: "#37c2ff",
              colorInfo: "#37c2ff",
              colorSuccess: "#3ddc97",
              colorWarning: "#ffbd59",
              colorError: "#ff6b7a",
              colorBgBase: "#07111f",
              colorBgContainer: "#0d1b2d",
              borderRadius: 12,
              fontFamily:
                'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", sans-serif',
            },
            components: {
              Card: { colorBgContainer: "rgba(13,27,45,.88)" },
              Table: { headerBg: "#10243a", rowHoverBg: "#112a43" },
              Menu: { darkItemBg: "#081423" },
            },
          },
          children: (0, e.jsx)(hu.A, { children: (0, e.jsx)(Zu, {}) }),
        });
      }
    },
  },
]);
