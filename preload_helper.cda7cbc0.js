!(function () {
  "use strict";
  var t = "/".replace(/([^/])$/, "$1/"),
    a = location.pathname,
    e = a.startsWith(t) && decodeURI("/".concat(a.slice(t.length)));
  if (e) {
    var c = document,
      n = c.head,
      r = c.createElement.bind(c),
      s = (function (t, a, e) {
        var c,
          n =
            a.r[t] ||
            (null ===
              (c = Object.entries(a.r).find(function (a) {
                var e = a[0];
                return new RegExp(
                  "^".concat(
                    e.replace(/\/:[^/]+/g, "/[^/]+").replace("/*", "/.+"),
                    "$",
                  ),
                ).test(t);
              })) || void 0 === c
              ? void 0
              : c[1]);
        return null == n
          ? void 0
          : n.map(function (t) {
              var c = a.f[t][1],
                n = a.f[t][0];
              return {
                type: n.split(".").pop(),
                url: "".concat(e.publicPath).concat(n),
                attrs: [["data-".concat(a.b), "".concat(a.p, ":").concat(c)]],
              };
            });
      })(
        e,
        {
          p: "iraq-treasury-risk-dashboard",
          b: "webpack",
          f: [
            ["503.762efb4d.async.js", 503],
            ["p__Dashboard__index.e821a106.chunk.css", 997],
            ["p__Dashboard__index.9f0e2c11.async.js", 997],
          ],
          r: { "/": [0, 1, 2] },
        },
        { publicPath: "./" },
      );
    null == s ||
      s.forEach(function (t) {
        var a,
          e = t.type,
          c = t.url;
        if ("js" === e) (((a = r("script")).src = c), (a.async = !0));
        else {
          if ("css" !== e) return;
          (((a = r("link")).href = c), (a.rel = "preload"), (a.as = "style"));
        }
        (t.attrs.forEach(function (t) {
          a.setAttribute(t[0], t[1] || "");
        }),
          n.appendChild(a));
      });
  }
})();
