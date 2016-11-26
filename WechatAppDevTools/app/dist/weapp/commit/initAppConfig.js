"use strict";

function init() {
    var e = require("fs"),
        t = require("path");
    _exports = function(a, o, i) {
        try {
            ! function() {
                var n = o.isBuildForTest,
                    r = {},
                    s = void 0,
                    c = a.projectpath,
                    l = t.join(c, "app.json");
                s = JSON.parse(e.readFileSync(l, "utf8")), r.global = {}, s.window && (r.global.window = s.window), n ? r.debug = s.debug : r.debug = !1, s.networkTimeout && (r.networkTimeout = s.networkTimeout), r.pages = s.pages || [], r.page = {};
                for (var d = s.pages || [], p = 0, g = d.length; p < g; p++) {
                    var u = d[p],
                        h = t.join(c, u + ".json");
                    if (e.existsSync(h)) {
                        var f = JSON.parse(e.readFileSync(h, "utf8"));
                        r.page[u + ".html"] = { window: f }
                    }
                }
                r.entryPagePath = s.pages[0] + ".html";
                var v = s.tabBar || {},
                    w = v.list || [];
                w.forEach(function(a) {
                    a.pagePath = a.pagePath + ".html";
                    var o = a.iconPath,
                        i = a.selectedIconPath;
                    if (o) {
                        var n = void 0;
                        n = e.readFileSync(t.join(c, o)), a.iconData = n.toString("base64"), delete a.iconPath
                    }
                    if (i) {
                        var r = void 0;
                        r = e.readFileSync(t.join(c, i)), a.selectedIconData = r.toString("base64"), delete a.selectedIconPath
                    }
                }), r.tabBar = v, i(null, r)
            }()
        } catch (n) { i("生成 app-config 错误，错误信息: " + n.toString()) }
    }
}
var _exports;
init(), module.exports = _exports;
