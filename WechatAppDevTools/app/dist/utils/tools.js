"use strict";

function init() {
    var e = require("url"),
        n = require("os"),
        t = require("path"),
        o = require("fs"),
        r = require("net"),
        i = require("../common/log/log.js"),
        s = require("async"),
        a = require("child_process").exec,
        c = (require("rmdir"), require("../config/config.js"), require("../config/dirConfig.js")),
        l = (nw.App, {}),
        p = !1,
        u = 9973,
        f = "darwin" === process.platform;
    _exports = {
        parseURL: function(e) {
            var n = /^http(s)?:\/\//;
            return n.test(e) ? e : "http://" + e
        },
        getAvailablePort: function(e, n) {
            function t(e) {
                var n = u,
                    o = r.createServer();
                o.listen(n, function(t) { o.once("close", function() { u = n + 1, e(null, n) }), o.close() }), o.on("error", function(o) { i.info("tools.js getAvailablePort error " + n), u++, t(e) })
            }
            for (var o = [], a = 0; a < n; a++) o.push(t);
            s.series(o, function(n, t) { i.info("tools.js getAvailablePort success " + JSON.stringify(t)), e(t) })
        },
        getAppConfig: function() {
            var e = nw.App.getDataPath(),
                n = t.join(e, "..", "config.json"),
                r = { isDev: false /*!!process.execPath.match("nw.exe") || !!process.execPath.match("nwjs.app")*/ },
                s = o.existsSync(n);
            if (!s) return r;
            try { r = JSON.parse(o.readFileSync(n)) } catch (a) {}
            return i.info("tools.js getAppConfig: " + JSON.stringify(r)), r.isDev = r.isDev || !!process.execPath.match("nw.exe") || !!process.execPath.match("nwjs.app"), r.onLine = !1, r
        },
        getArgsURL: function(e) {
            var n = Array.isArray(e);
            n || (e = e.split(" "));
            var t = e.find(function(e) {
                return 0 === e.indexOf("href://")
            });
            if (t) {
                var o = t.replace("href://", "");
                return this.parseURL(o)
            }
        },
        getSysIpInfo: function() {
            var e = n.networkInterfaces(),
                t = [];
            return Object.keys(e).forEach(function(n) {
                var o = 0;
                e[n].forEach(function(e) { "IPv4" === e.family && e.internal === !1 && (o >= 1 || t.push(e.address)) })
            }), i.info("index.js getSysIpInfo: " + JSON.stringify(t)), t
        },
        openInspectWin: function(e) {
            var n = require("path");
            nw.Window.open("about:blank", { show: !1, width: 799, height: 799, inject_js_end: n.join(__dirname, "../inject/chromeInspect.js") }, function(e) { e.maximize(), e.window.location = "chrome://inspect/#devices", e.show(), i.info("index.js openInspectWin") })
        },
        clearProxyCache: function() { l = {} },
        getProxyForURL: function(n) {
            var t = e.parse(n);
            return n = t.protocol + "//" + t.hostname, l[n] ? i.info("tools.js getProxyForURL " + n + " from proxyCache: " + l[n]) : (l[n] = nw.App.getProxyForURL(n), i.info("tools.js getProxyForURL " + n + " from nw.App.getProxyForURL: " + l[n])), l[n]
        },
        getVersionNum: function(e) {
            return e = e || nw.App.manifest.version, e = e.replace(/\./g, ""), parseInt(e)
        },
        hasNewVersion: function(e) {
            var n = e.clientConfig.last_version,
                t = nw.App.manifest.version;
            if (t === n || !n) return {};
            t = t.split(".");
            for (var o = n.split("."), r = 0, i = o.length; r < i; r++) {
                if (parseInt(o[r]) > parseInt(t[r])) {
                    var s = e.urlConfig.webdebugger_download + "?from=tools&cv=" + this.getVersionNum();
                    return s += "darwin" === process.platform ? "&os=darwin" : "x64" === process.arch ? "&os=x64" : "&os=x86", { last_version: n, downloadURL: s }
                }
                if (parseInt(o[r]) < parseInt(t[r])) return {}
            }
        },
        notifications: function(e, n, t, o) {
            var r = (+new Date).toString();
            return o = o || function() {}, t = t || [], p || (p = {}, chrome.notifications.onButtonClicked.addListener(function(e, n) { p[e] && p[e](n) })), p[r] = o, chrome.notifications.create(r, { type: "basic", iconUrl: "app/images/logo.png", title: e, message: n, buttons: t }), r
        },
        up: function(e) {
            var n = global.appVersion = nw.App.manifest.version;
            if (global.appConfig.isDev) return void e();
            var o = localStorage.getItem("new-version"),
                r = this.getVersionNum(o),
                s = this.getVersionNum();
            s < r ? ! function() {
                var r = function(n, t, r) { n ? (p.innerHTML = '<div class="app-up-data">更新失败</div>', setTimeout(function() { e() }, 3e3)) : (p.innerHTML = "", global.appVersion = o, p.innerHTML = '<div class="app-up-data">更新成功，当前版本 ' + o + "</div>", global.contentWindow.title = "微信web开发者工具 v" + o, global.Win.title = "微信web开发者工具 v" + o, setTimeout(function() { e(), nw.Shell.openExternal("https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html") }, 1e3), delete localStorage["new-version"]), delete localStorage["new-version"] };
                i.info("tools.js currentVersion: " + n + " newVersion: " + o + " ");
                var s = c.WeappApplication,
                    l = f ? t.join(s, o, "app.nw") : t.join(s, o, "package.nw"),
                    p = global.contentDocument.querySelector("#container");
                if (p.innerHTML = '<div class="app-up-data">更新中...</div>', f) {
                    var u = t.join(__dirname, "../../../../");
                    a('cp -r "' + l + '" "' + u + '"', r)
                } else {
                    var d = require("node-windows"),
                        g = 'xcopy "' + l + '" "' + t.join(process.execPath, "..", "package.nw") + '" /s /e /y /i';
                    d.elevate(g, r)
                }
            }() : e()
        },
        chooseFile: function(e) {
            var n = document.createElement("input");
            n.style.display = "none", n.setAttribute("type", "file"), e.accept && n.setAttribute("accept", e.accept), e.dir && n.setAttribute("nwdirectory", !0), e.multiple && n.setAttribute("multiple", "multiple"), global.contentDocumentBody.appendChild(n), n.addEventListener("change", function(t) { e.sucCall && e.sucCall(t), global.contentDocumentBody.removeChild(n) }), n.addEventListener("cancel", function(t) { e.cancelCall && e.cancelCall(t), global.contentDocumentBody.removeChild(n) }), n.click()
        }
    }
}
var _exports;
init(), module.exports = _exports;
