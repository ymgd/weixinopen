"use strict";

function init() {
    function e(e, i, t) {
        var r = i.project,
            n = i.wxssFilePath,
            o = (i.isBuild, ["-lc", n]),
            s = h(l, o, { cwd: r.projectpath }),
            a = [],
            c = [];
        s.on("close", function(e) { 0 === e ? (j[r.hash] || (j[r.hash] = {}), j[r.hash][n] = Buffer.concat(a).toString(), t(null, j[r.hash][n])) : t("编译 " + n + " 文件错误， 错误信息：" + Buffer.concat(c).toString()) }), s.stdout.on("data", function(e) { a.push(e) }), s.stderr.on("data", function(e) { c.push(e) })
    }
    var i = "darwin" === process.platform,
        t = global.appConfig.isDev,
        r = require("fs"),
        n = require("path"),
        o = require("../utils/tools.js"),
        s = require("../utils/projectManager.js"),
        a = require("../../config/dirConfig.js"),
        c = a.WeappVendor,
        u = t ? n.join(__dirname, "../vendor/") : c,
        l = i ? n.join(u, "wcsc") : n.join(u, "wcsc.exe"),
        h = require("child_process").spawn,
        p = require("../commit/getallwxss.js"),
        d = require("mkdir-p"),
        f = a.WeappBuildCache;
    d.sync(f);
    var j = {};
    s.manager.on("FILE_CHANGE", function(e, i, t) { ".wxss" === n.extname(t) && delete j[e.hash] }), _exports = function(i, t, s) {
        var a = t.project,
            c = t.isBuild,
            u = c ? i : o.getFilePath(i, a);
        if (c) p(u, function(i, t) {
            i ? s(i) : ! function() {
                var i = n.join(f, "" + (+new Date + parseInt(1e3 * Math.random())));
                r.writeFileSync(i, t), e(t, { project: a, wxssFilePath: i, isBuild: c }, function(e, t) { r.unlink(i), s(e, t) })
            }()
        });
        else {
            if (j[a.hash] && j[a.hash][u]) return void process.nextTick(function() { s(null, j[a.hash][u]) });
            var l = void 0;
            try { l = r.readFileSync(u, "utf8") } catch (h) {
                return void s("编译 " + u + " 文件错误， 错误信息：" + h.toString())
            }
            e(l, { project: a, wxssFilePath: u }, s)
        }
    }
}
var _exports;
init(), module.exports = _exports;
