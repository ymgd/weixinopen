"use strict";

function init() {
    var e = require("fs"),
        r = require("path"),
        n = require("glob"),
        o = require("../utils/tools.js"),
        t = o.noBrowser.join(",");
    _exports = function(o, i, u) {
        var a = i.isBuildForTest,
            s = o.projectpath;
        try {
            ! function() {
                var o = r.join(s, "app.json"),
                    i = JSON.parse(e.readFileSync(o, "utf8")),
                    c = i.pages || [];
                n("**/*.js", { nodir: !0, cwd: s, ignore: ["node_modules/**/*"] }, function(n, o) {
                    try {
                        for (var i = [], p = [], l = ["var __wxAppData = {};\n            var __wxRoute;\n            var __wxRouteBegin"], v = {}, f = 0, j = c.length; f < j; f++) {
                            var _ = c[f] + ".js",
                                d = r.join(s, _),
                                h = e.readFileSync(d, "utf8");
                            v[_] = !0, l.push("__wxRoute = '" + _.replace(/\.js$/, "") + "';__wxRouteBegin = true"), l.push('define("' + _ + '", function(require, module){\n              var ' + t + ";\n              " + h + "\n            })"), l.push('require("' + _ + '")')
                        }
                        for (var g = 0, x = o.length; g < x; g++) {
                            var q = o[g];
                            if (!v[q]) {
                                var w = r.join(s, q),
                                    y = e.readFileSync(w, "utf8");
                                "app.js" === q ? p.push(y) : i.push('define("' + q + '", function(require, module){\n                  var ' + t + ";\n                  " + y + "\n              })")
                            }
                        }
                        var S = i.concat(p).concat(l),
                            m = S.join(";");
                        a ? u(null, "try{\n" + m + "\n}catch(e){console.error(e)}") : u(null, m)
                    } catch (n) { u("生成 appservice.js 错误，错误信息: " + n.toString()) }
                })
            }()
        } catch (c) { u("生成 appservice.js 错误，错误信息: " + c.toString()) }
    }
}
var _exports;
init(), module.exports = _exports;
