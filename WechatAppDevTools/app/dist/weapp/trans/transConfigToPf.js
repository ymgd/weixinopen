"use strict";

function init() {
    var e = global.appConfig.isDev,
        r = require("fs"),
        t = require("path"),
        s = require("../utils/tools.js"),
        n = (require("../commit/getallwxss.js"), require("../../config/config.js"), require("../utils/vendorManager.js")),
        i = require("../utils/projectManager.js"),
        o = require("./transWxssToCss.js"),
        a = require("async"),
        c = {},
        l = e ? { "<!--{{reportSDK}}-->": "reporter-sdk.js", "<!--{{webviewSDK}}-->": "webview-sdk.js", "<!--{{virtual_dom}}-->": "virtual_dom.js", "<!--{{exparser}}-->": "exparser.js", "<!--{{components_js}}-->": "wx-components.js", "<!--{{components_css}}-->": "wx-components.css" } : { "<!--{{WAWebview}}-->": "WAWebview.js" };
    n.manager.on("VENDOR_CHANGE", function() { c = {} }), i.manager.on("FILE_CHANGE", function(e, r, t) {
        if ("app.json" === t) {
            var s = e.hash;
            delete c[s]
        }
    }), _exports = function(i, p, u) {
        var v = p.isBuild,
            f = p.isBuildForTest,
            d = p.url,
            g = i.hash;
        return v || f || !c[g] ? void! function() {
            var p = {},
                j = t.join(i.projectpath, "app.wxss"),
                x = r.existsSync(j);
            p.wxss = function(e) {
                return x ? void(v ? o(j, { project: i, isBuild: !0 }, e) : e(null)) : void e(null)
            }, p.vendor = function(e) {
                var r = {};
                for (var t in l) r[t] = n.getFile(l[t]);
                e(null, r)
            }, a.parallel(p, function(r, t) {
                var n = require("../tpl/pageFrameTpl.js");
                if (v) {
                    if (r) return void u(r);
                    n = n.replace("<!--{{style}}-->", function() {
                        return "<style>" + t.wxss + "</style>"
                    })
                } else x && (n = n.replace("<!--{{style}}-->", function() {
                    return '<link rel="stylesheet" type="text/css" href="/app.wxss">'
                }));
                var o = Object.assign({}, l);
                v && (delete o["<!--{{reportSDK}}-->"], delete o["<!--{{webviewSDK}}-->"], delete o["<!--{{virtual_dom}}-->"], delete o["<!--{{exparser}}-->"], delete o["<!--{{components_css}}-->"], delete o["<!--{{components_js}}-->"]);
                var a = function(e) {
                    var r = o[e];
                    n = n.replace(e, function() {
                        return r.indexOf(".js") > 0 ? "<script>" + t.vendor[e] + "</script>" : r.indexOf(".css") > 0 ? "<style>" + t.vendor[e] + "</style>" : t.vendor[e]
                    })
                };
                for (var p in o) a(p);
                f && (n = n.replace("<!-- percodes -->", function() {
                    return "<script>var pageFrameStartTime = new Date();</script>"
                })), n = n.replace("<!--{{appconfig}}-->", function() {
                    var e = s.getProjectConfig(i);
                    return "<script> var __wxConfig = " + JSON.stringify(e) + " </script>"
                }), d && (n = n.replace("<!--{{pageconfig}}-->", function() {
                    var e = s.getPageJSON(i, d);
                    return "<script>  __wxConfig.window = " + JSON.stringify(e) + " </script>"
                })), v || e || (c[g] = { error: null, data: n }), u(null, n)
            })
        }() : void process.nextTick(function() {
            var e = c[g];
            u(e.error, e.data)
        })
    }
}
var _exports;
init(), module.exports = _exports;
