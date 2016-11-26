"use strict";

function init() {
    var e = "darwin" === process.platform,
        i = global.appConfig.isDev,
        n = require("fs"),
        r = require("path"),
        t = require("../utils/tools.js"),
        o = require("glob"),
        a = require("async"),
        s = require("../../config/dirConfig.js"),
        c = s.WeappVendor,
        l = require("../trans/transConfigToPf.js"),
        p = require("../trans/transWxmlToJs.js"),
        u = require("mkdir-p"),
        d = require("./initAppConfig.js"),
        f = require("./initAppServiceJs.js"),
        j = i ? r.join(__dirname, "../vendor/") : c,
        g = e ? r.join(j, "wcc") : r.join(j, "wcc.exe"),
        m = require("child_process").spawn,
        v = require("../../common/log/log.js"),
        h = require("babel-core"),
        F = s.Weappdest,
        w = t.whiteFileExtName;
    _exports = function(e, i, s) {
        var c = i.isBuildForTest,
            j = (e.projectpath, i.noCompile),
            y = e.es6,
            S = e.minified,
            x = r.join(F, "" + +new Date);
        u.sync(x);
        var q = {};
        q.appconfig = function(n) { d(e, i, function(e, i) { n(e, i) }) }, q.appservicejs = function(n) { f(e, i, function(e, i) { n(e, i) }) }, j || (q.pageFrame = function(i) { l(e, { isBuild: !0, isBuildForTest: c }, i) }), a.parallel(q, function(i, c) {
            if (i) return void s(i.toString());
            var l = c.appconfig,
                d = c.appservicejs;
            j ? o("./**", { nodir: !0, cwd: e.projectpath, ignore: ["./node_modules/**/*"] }, function(i, t) {
                for (var o = 0; o < t.length; o++) {
                    var a = t[o],
                        c = r.extname(a);
                    if (w[c]) {
                        var l = r.join(x, a),
                            p = r.dirname(l);
                        if (u.sync(p), y && ".js" === c) {
                            var d = n.readFileSync(r.join(e.projectpath, a), "utf8");
                            try {
                                var f = h.transform(d, { presets: ["es2015"], babelrc: !1, minified: S, comments: !1 });
                                n.writeFileSync(l, f.code)
                            } catch (j) {
                                return void s(j)
                            }
                        } else {
                            var g = n.readFileSync(r.join(e.projectpath, a));
                            n.writeFileSync(l, g)
                        }
                    } else v.info("build.js find file not in whiteList " + a)
                }
                s(null, x)
            }) : ! function() {
                var i = c.pageFrame;
                o("./**", { nodir: !0, cwd: e.projectpath, ignore: ["./**/*.js", "./**/*.json", "./**/*.wxss", "./node_modules/**/ * "] }, function(o, c) {
                    if (o) return void s(o);
                    for (var f = [], j = 0, h = c.length; j < h; j++) t.isWxmlFile(c[j]) && f.push(c[j]);
                    var F = ["-d"].concat(f),
                        w = m(g, F, { cwd: e.projectpath }),
                        y = "",
                        S = "";
                    w.on("close", function(o) {
                        0 === o ? ! function() {
                            i = i.replace("<!--{{allWXML}}-->", "<script>" + y + "</script>");
                            var o = {};
                            c.forEach(function(i) {
                                var a = r.join(x, i),
                                    s = r.dirname(a);
                                u.sync(s), t.isWxmlFile(i) ? o[i] = function(n) { p(i, { project: e, isBuild: !0 }, function(e, r) { e ? n(e.toString()) : n(null, { isWxml: !0, destFilePath: a.replace(".wxml", ".html"), data: r.styleStr + '<page></page><script>\n                          document.dispatchEvent(new CustomEvent("generateFuncReady", {\n                            detail: {\n                              generateFunc: $gwx(\'' + i.replace(/\\/g, "/") + "')\n                            }\n                          }))\n                        </script>" }) }) } : o[i] = function(t) { n.readFile(r.join(e.projectpath, i), function(e, i) { t(e, { isWxml: !1, destFilePath: a, data: i }) }) }
                            }), a.parallel(o, function(e, t) {
                                if (e) return void s(e.toString());
                                for (var o in t) {
                                    var a = t[o];
                                    n.writeFileSync(a.destFilePath, a.data)
                                }
                                n.writeFileSync(r.join(x, "page-frame.html"), i, "utf8"), n.writeFileSync(r.join(x, "app-config.json"), JSON.stringify(l), "utf8"), n.writeFileSync(r.join(x, "app-service.js"), d, "utf8"), s(null, x)
                            })
                        }() : (v.error("build.js ps stderr: " + S), s(S))
                    }), w.stdout.on("data", function(e) { y += e.toString() }), w.stderr.on("data", function(e) { S += e.toString() })
                })
            }()
        })
    }
}
var _exports;
init(), module.exports = _exports;
