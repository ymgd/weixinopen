"use strict";

function init() {
    function r(r, e) { r.error ? e(404, { "Weapp-Error": encodeURIComponent(r.error) }, r.error.toString()) : e(null, {}, r.data) }

    function e(e, m) {
        var q = n.getProject(e),
            g = n.getFileNameFromUrl(e, q),
            d = n.isWxmlFile(g),
            x = n.isWxssFile(g);
        if (x) p(e, { project: q }, function(e, t) { r({ error: e, data: t }, m) });
        else if (d) {
            var F = [];
            F.push(function(r) { s(q, { isBuild: !1, url: e }, function(e, t) { r(e, t) }) }), F.push(function(r) { a(e, { project: q }, function(e, t) { r(e, t) }) }), o.parallel(F, function(r, t) {
                if (r) {
                    var i = j.replace(/{{error}}/g, function() {
                        return n.parseErr(r)
                    });
                    return void m(500, {}, i)
                }
                var o = { pageFrameTpl: t[0], generateFunc: t[1].generateFunc, project: q, url: e },
                    s = u(o);
                m(null, s.header, s.body)
            })
        } else {
            var v = f.parse(e),
                h = v.pathname,
                T = i.basename(h);
            if (c.isAppTmpPath(T)) {
                var W = c.getRealPath(T);
                t.readFile(W, function(e, t) { r({ error: e, data: t }, m) })
            } else {
                i.extname(g);
                n.whiteFileExtName ? l.getFile(q, g, function(e, t) { r({ error: e, data: t }, m) }) : r({ error: "404" }, m)
            }
        }
    }
    var t = require("fs"),
        i = require("path"),
        o = require("async"),
        n = require("../utils/tools.js"),
        s = (require("../../stores/projectStores.js"), require("./transConfigToPf.js")),
        a = require("./transWxmlToJs.js"),
        u = require("./transWxmlToHtml.js"),
        l = require("../utils/projectManager.js"),
        p = require("./transWxssToCss.js"),
        c = require("../../utils/file.js"),
        f = require("url"),
        j = require("../tpl/errorTpl.js");
    _exports = { getResponse: e }
}
var _exports;
init(), module.exports = _exports;
