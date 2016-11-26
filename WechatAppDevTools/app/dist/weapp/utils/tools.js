"use strict";

function init() {
    var path = require("path"),
        fs = require("fs"),
        url = require("url"),
        o = require("../../stores/projectStores.js"),
        n = (require("../../config/config.js"), require("../../config/dirConfig.js")),
        s = require("../../stores/windowStores.js");
    _exports = {}, _exports.noBrowser = ["window", "document", "frames", "self", "location", "navigator", "localStorage", "history", "Caches", "screen", "alert", "confirm", "prompt", "XMLHttpRequest", "WebSocket "], _exports.whiteFileExtName = { ".wxml": !0, ".wxss": !0, ".png": !0, ".jpg": !0, ".jpeg": !0, ".gif": !0, ".js": !0, ".json": !0 }, _exports.getBaseURL = function(e) {
        return "http://" + e.hash + ".debug.open.weixin.qq.com/"
    }, _exports.getUrlFromFilePath = function(e, t) {
        return _exports.getBaseURL(e) + t
    }, _exports.getProjectHashFromURL = function(e) {
        var t = e.replace(/https?:\/\//, "").split(".");
        return t[0]
    }, _exports.getWeappURL = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = "http://" + e.hash + ".debug.open.weixin.qq.com/";
        if (t.justHost) return o;
        var n = void 0;
        try { n = _exports.getProjectConfig(e) } catch (s) {
            return ""
        }
        var a = n.pages || [];
        return url.resolve(o, a[0] + ".html")
    }, _exports.parseErr = function(e) {
        return e = JSON.stringify(e), e.replace(/\\/g, "/").replace(/`/g, "\\`")
    }, _exports.getPageJSON = function(r, o) {
        try {
            var n = this.getBaseURL(r);
            o = o.replace(n, "").replace(/\?.*/g, "");
            var s = r.projectpath,
                a = JSON.parse(fs.readFileSync(path.join(s, "app.json"), "utf8")),
                i = path.join(s, o.replace(".html", ".json")),
                p = fs.existsSync(i),
                c = {};
            return p && (c = JSON.parse(fs.readFileSync(i, "utf8"))), Object.assign({}, a.window, c)
        } catch (u) {
            return {}
        }
    }, _exports.getProjectConfig = function(r, o) {
        var projectpath = r.projectpath,
            appjsonpath = path.join(projectpath, "app.json"),
            a = void 0;
        try { a = fs.readFileSync(appjsonpath, "utf8") } catch (i) {
            throw "Read app.json error：" + i.toString()
        }
        var p = void 0;
        try { p = JSON.parse(a) } catch (i) {
            throw "Parse app.json error： " + i.toString()
        }
        return p
    }, _exports.getProject = function(e) {
        var t = this.getProjectHashFromURL(e);
        return o.getProjectByHash(t)
    }, _exports.getFileRelativePath = function(e, t) {
        var o = url.parse(e),
            n = o.pathname || "";
        if (n = n.replace(/^\//, ""), "" === n) {
            var s = void 0;
            try { s = _exports.getProjectConfig(t) } catch (a) {
                return ""
            }
            var i = s.pages || [];
            return i[0] ? i[0] + ".wxml" : "index.wxml"
        }
        return n.replace(/\.html$/, ".wxml")
    }, _exports.getFilePath = function(t, r) {
        var o = this.getFileRelativePath(t, r),
            n = r.projectpath;
        return path.join(n, o)
    }, _exports.isWxmlFile = function(e) {
        return /\.wxml$/.test(e)
    }, _exports.isWxssFile = function(e) {
        return /\.wxss$/.test(e)
    }, _exports.isWxmlURL = function(t) {
        var o = url.parse(t),
            n = o.pathname,
            s = path.extname(n);
        return "" === s || ".html" === s || ".wxml" === s
    }, _exports.getWxImports = function(e) {
        var t = e.match(/\<wx-import.*\<\/wx-import\>/g) || [],
            r = [];
        return t.forEach(function(e) {
            var t = e.match(/src="(.*?)"/),
                o = t ? t[1] : "";
            o && (/$\.wxml/.test(o) || (o += ".wxml"), r.push(o))
        }), r
    }, _exports.getFileNameFromUrl = function(e, t) {
        return this.getFileRelativePath(e, t)
    }, _exports.getPageCssFiles = function(r, o, n) {
        var s = this.getFileRelativePath(r, o),
            a = s.replace(/\..*$/g, ".wxss");
        return fs.existsSync(path.join(o.projectpath, a)) ? path.parse(a).base : ""
    }, _exports.getProjectStorage = function(r) {
        var o = r.appid,
            a = r.appname,
            i = s.getUserInfo(),
            p = i ? i.openid : "unknow",
            c = path.join(n.WeappStorage, o + "_" + a + "_" + p + ".data.json"),
            u = void 0;
        try { u = fs.readFileSync(c, "utf8") } catch (g) { u = "{}" }
        return JSON.parse(u)
    }
}
var _exports;
init(), module.exports = _exports;
