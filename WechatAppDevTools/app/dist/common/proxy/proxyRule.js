"use strict";

function init() {
    function e(e) {
        var r = e.headers.host,
            n = e.connection.encrypted && !/^http:/.test(e.url) ? "https" : "http",
            i = "http" === n ? e.url : n + "://" + r + e.url,
            o = t.parse(i);
        return o.pureHref = o.href.replace(/\?.*/, "").replace(/\#.*/, ""), o
    }
    var r = require("fs"),
        t = require("url"),
        n = require("path"),
        i = (require("zlib"), require("../../utils/report.js")),
        o = require("../../weapp/weApp.js"),
        s = require("../../config/config.js"),
        p = 7,
        u = "https://chrome-devtools-frontend.appspot.com/serve_rev/@180870/",
        a = "https://clients1.google.com/tbproxy/af/",
        c = s.weappURLRegular,
        f = s.weappASURLRegular;
    _exports = {
        shouldUseLocalResponse: function(r, t) {
            var n = e(r),
                i = n.pureHref;
            return 0 === i.indexOf(u) || (!!c.test(i) || (0 === i.indexOf(a) || !!f.test(i)))
        },
        dealLocalResponse: function(t, s, l) {
            var d = e(t),
                v = d.pureHref;
            if (0 === v.indexOf(u)) {
                var h = v.replace(u, "") || "devtools.html";
                "180870.manifest" === h && i([{ type: p, times: 1 }]);
                var m = n.join(__dirname, "manifest", h),
                    x = r.readFileSync(m);
                l(200, {}, x)
            } else c.test(v) ? ! function() {
                var e = d.href;
                o.getResponse(e, function(r, t, i) {
                    if (r) return void l(r, t, i || "");
                    n.extname(e).replace(".", "");
                    l(200, t, i)
                })
            }() : 0 === v.indexOf(a) ? l(400, {}, "") : f.test(v) && o.getAppservice(v, function(e, r, t) {
                return e ? void l(e, {}, t) : void l(200, r, t)
            })
        }
    }
}
var _exports;
init(), module.exports = _exports;
