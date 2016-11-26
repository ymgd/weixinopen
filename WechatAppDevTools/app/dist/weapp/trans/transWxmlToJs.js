"use strict";

function init() {
    function e(e, t) {
        return "\n      <script>" + f[e.hash] + '</script>\n      <script>\n        document.dispatchEvent(new CustomEvent("generateFuncReady", {\n          detail: {\n            generateFunc: $gwx(\'./' + t + "')\n          }\n        }))\n      </script>\n    "
    }
    var t = global.appConfig.isDev,
        n = "darwin" === process.platform,
        r = require("fs"),
        i = require("path"),
        s = require("../../config/dirConfig.js"),
        o = s.WeappVendor,
        c = require("../utils/tools.js"),
        a = require("../utils/projectManager.js"),
        u = t ? i.join(__dirname, "../vendor/") : o,
        l = n ? i.join(u, "wcc") : i.join(u, "wcc.exe"),
        p = (require("glob"), require("child_process").spawn),
        d = (require("../commit/getallwxss.js"), require("./transWxssToCss.js")),
        f = {};
    a.manager.on("FILE_CHANGE", function(e, t, n) { ".wxml" === i.extname(n) && delete f[e.hash] }), _exports = function(t, n, s) {
        var o = n.project,
            u = n.isBuild,
            g = u ? t : c.getFilePath(t, o),
            h = i.relative(o.projectpath, g),
            j = "",
            x = "";
        if (u) {
            var v = i.join(o.projectpath, g.replace(".wxml", ".wxss"));
            r.existsSync(v) ? d(v, { project: o, isBuild: u }, function(e, t) {
                return e ? void s(e) : void s(null, { generateFunc: "", styleStr: "<style>" + t + "</style>" })
            }) : s(null, { generateFunc: x, styleStr: j })
        } else {
            if (f[o.hash]) return void process.nextTick(function() { s(null, { generateFunc: e(o, h.replace(/\\/g, "/")), styleStr: j }) });
            a.getAllWXMLFileList(o, function(t, n) {
                t ? s(t.toString()) : ! function() {
                    var t = n,
                        r = p(l, t, { cwd: o.projectpath }),
                        i = [],
                        c = [];
                    r.on("close", function(t) { 0 === t ? (f[o.hash] = Buffer.concat(i).toString(), x = e(o, h.replace(/\\/g, "/")), s(null, { generateFunc: x, styleStr: j })) : s("编译.wxml 文件错误， 错误信息：" + Buffer.concat(c).toString()) }), r.stdout.on("data", function(e) { i.push(e) }), r.stderr.on("data", function(e) { c.push(e) })
                }()
            })
        }
    }
}
var _exports;
init(), module.exports = _exports;
