"use strict";

function init() {
    function e(e, r, i, n) {
        var t = e.hash,
            c = F[t].cache;
        if (i = i.replace(/\\/g, "/"), "app.json" === i) return void(F[t].cache = {});
        i && c[i] && delete c[i], q.fileChange(e, r, i, n);
        var s = u.extname(i);
        ".wxml" === s ? o(e) : ".js" === s && a(e)
    }

    function r() {
        d.info("projectManager.js cleanProjects");
        for (var e in F) F[e].watcher.close();
        F = {}
    }

    function i(n) {
        var t = n.hash;
        if (!F[t]) {
            Object.keys(F).length > x && r(), d.info("manager.js initProject projectid " + n.projectid);
            var o = {};
            o.watcher = h.watch(n.projectpath, { ignored: [/node_modules/], ignoreInitial: !0, ignorePermissionErrors: !0, followSymlinks: !0, interval: 1e3, binaryInterval: 1e3 }).on("all", function(r, i, t) { i = u.relative(n.projectpath, i), e(n, r, i, t) }), o.watcher.on("error", function(e) { e && !w && (d.error("projectManager.js obj.watcher error " + e.toString()), w = !0, r(), i(n)) }), o.cache = {}, o.wxmlFileList = [], o.jsFileList = [], F[t] = o
        }
    }

    function getScripts(e, r) {
        var n = e.project,
            t = n.hash;
        i(n);
        var o = e.fileName,
            a = F[t].cache;
        if (a[o]) return void process.nextTick(function() { r(a[o].error, a[o].data) });
        var c = n.es6,
            s = e.needRequire,
            p = u.join(n.projectpath, o);
        l.readFile(p, "utf8", function(e, i) {
            if (e) return void r(e);
            if (c) {
                var n = u.basename(o);
                try {
                    var t = j.transform(i, { presets: ["es2015"], sourceMaps: "inline", sourceFileName: n, babelrc: !1 });
                    i = t.code.replace("sourceMappingURL=data:application/json;", "sourceMappingURL=data:application/json;charset=utf-8;")
                } catch (l) {
                    return void r({ e: l, sourceFileName: n }, i)
                }
            }
            i = 'define("' + o + '", function(require, module, exports, ' + m + "){" + i + "\n});", s && (i += 'require("' + o + '")'), a[o] = { error: null, data: i }, r(e, i)
        })
    }

    function getFile(e, r, n) {
        i(e);
        var t = e.hash,
            o = F[t].cache;
        if (o[r]) return void process.nextTick(function() { n(o[r].error, o[r].data) });
        d.info("manager.js project " + t + " getFile " + r);
        var a = u.join(e.projectpath, r);
        l.readFile(a, function(e, i) { e || (o[r] = { error: e, data: i }), n(e, i) })
    }

    function o(e, r) {
        f("./**/*.wxml", { nodir: !0, cwd: e.projectpath, ignore: ["node_modules/**/*"] }, function(i, n) {
            if (i) r && r(i, []);
            else {
                var t = e.hash;
                F[t].wxmlFileList = n, r && r(null, n)
            }
        })
    }

    function a(e, r) {
        f("**/*.js", { nodir: !0, cwd: e.projectpath, ignore: ["node_modules/**/*"] }, function(i, n) {
            if (i) r && r(i, []);
            else {
                var t = e.hash;
                F[t].jsFileList = n, r && r(null, n)
            }
        })
    }

    function getAllWXMLFileList(e, r) {
        i(e);
        var n = e.hash,
            t = F[n].wxmlFileList;
        t.length ? process.nextTick(function() { r(null, t) }) : o(e, r)
    }

    function getAllJSFileList(e, r) {
        i(e);
        var n = e.hash,
            t = F[n].jsFileList;
        t.length ? process.nextTick(function() { r(null, t) }) : a(e, r)
    }
    var l = require("fs"),
        u = require("path"),
        p = require("events").EventEmitter,
        f = require("glob"),
        h = require("chokidar"),
        j = require("babel-core"),
        d = require("../../common/log/log.js"),
        v = require("./tools.js"),
        g = require("../../stores/projectStores.js"),
        m = v.noBrowser.join(","),
        x = 1,
        F = {},
        w = !1;
    g.on("PROJECT_STORES_CHANGE", function(e, r) {
        var i = e.hash;
        d.info("projectManager.js project " + i + " unable " + r), F[i].cache = {}
    });
    var q = Object.assign({}, p.prototype, { fileChange: function(e, r, i, n) { this.emit("FILE_CHANGE", e, r, i, n) } });
    _exports = { getFile: getFile, manager: q, getAllWXMLFileList: getAllWXMLFileList, getAllJSFileList: getAllJSFileList, getScripts: getScripts }
}
var _exports;
init(), module.exports = _exports;
