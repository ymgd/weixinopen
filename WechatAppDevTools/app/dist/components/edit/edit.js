"use strict";

function init() {
    function e(e) { p.showTipsMsg({ msg: e, type: "error" }) }

    function t(e) {
        return e.replace(/\\/g, "/")
    }
    var r = require("glob"),
        s = require("fs"),
        i = require("path"),
        n = require("url"),
        o = require("rmdir"),
        a = require("../../lib/react.js"),
        c = require("../../cssStr/cssStr.js"),
        p = (require("../../actions/webviewActions.js"), require("../../actions/windowActions.js")),
        h = require("../../stores/windowStores.js"),
        u = (require("../../actions/projectActions.js"), require("../../weapp/utils/tools.js")),
        d = require("../../weapp/utils/projectManager.js"),
        l = require("../../common/log/log.js"),
        m = {},
        f = !1,
        v = a.createClass({
            displayName: "Edit",
            getInitialState: function() {
                return { project: this.props.project }
            },
            onMessage: function(e) {
                var a = this,
                    c = e.command,
                    p = e.msg,
                    h = e.ext,
                    d = this.state.project;
                switch (c) {
                    case "GET_FILE_LIST":
                        if (f) return;
                        f = !0;
                        var l = p.options,
                            v = l.ignore || ["node_modules/**/*", "node_modules"];
                        r("**", { cwd: d.projectpath, ignore: v }, function(e, t) {
                            f = !1;
                            for (var r = { ret: e ? e.toString() : 0, res: e ? [] : t }, n = 0; n < t.length; n++) {
                                var o = t[n],
                                    c = i.join(d.projectpath, o),
                                    p = s.lstatSync(c),
                                    u = p.isDirectory();
                                u && (t[n] = o + "/")
                            }
                            t.forEach(function(e) { m[e] = !0 }), a.postMessage("webframe", "RETURN_RES", r, h)
                        });
                        break;
                    case "GET_FILE_DATA":
                        var g = p.path,
                            w = i.extname(g);
                        if (".jpg" === w || ".png" === w || ".jpeg" === w || "icon" === w) return void this.postMessage("webframe", "RETURN_RES", { ret: "0", res: n.resolve(u.getBaseURL(d), g) }, h);
                        s.readFile(i.join(d.projectpath, g), "utf8", function(e, t) {
                            var r = { ret: e ? e.toString() : 0, res: e ? "" : t };
                            a.postMessage("webframe", "RETURN_RES", r, h)
                        });
                        break;
                    case "SAVE_FILE_DATA":
                        var E = i.join(d.projectpath, p.path),
                            _ = p.data,
                            R = void 0;
                        try {
                            s.writeFileSync(E, _, "utf8");
                            var S = s.lstatSync(E),
                                j = +S.mtime;
                            m[t(p.path)] = j, R = { ret: 0, res: p.path }
                        } catch (b) { R = { ret: b.toString(), res: "" } }
                        this.postMessage("webframe", "RETURN_RES", R, h);
                        break;
                    case "DEL_FILE":
                        var y = p.path,
                            N = void 0;
                        try { s.unlinkSync(i.join(d.projectpath, y)), y = t(y), N = { ret: 0, res: y }, delete m[y] } catch (b) { N = { ret: b.toString(), res: "" } }
                        this.postMessage("webframe", "RETURN_RES", N, h);
                        break;
                    case "RENAME_FILE":
                        var T = i.join(d.projectpath, p.oldPath),
                            M = i.join(d.projectpath, p.newPath),
                            D = void 0;
                        try { s.renameSync(T, M), delete m[t(p.oldPath)], m[p.newPath] = !0, D = { ret: 0, res: p.newPath } } catch (b) { D = { ret: b.toString(), res: "" } }
                        this.postMessage("webframe", "RETURN_RES", D, h);
                        break;
                    case "RM_DIR":
                        var L = function() {
                            var e = d.projectpath,
                                r = i.join(e, p.path);
                            return o(r, function(r, s, n) {
                                r || (s.forEach(function(r) {
                                    var s = i.relative(e, r);
                                    s = t(s), delete m[s]
                                }), n.forEach(function(r) {
                                    var s = i.relative(e, r);
                                    s = t(s), delete m[s]
                                }));
                                var o = { ret: r ? r.toString() : 0, res: r ? "" : s };
                                a.postMessage("webframe", "RETURN_RES", o, h)
                            }), "break"
                        }();
                        if ("break" === L) break;
                    case "ADD_FILE":
                        var A = i.join(d.projectpath, p.path),
                            I = s.existsSync(A),
                            U = void 0;
                        if (I) U = { ret: p.path + " already existed" }, this.postMessage("webframe", "RETURN_RES", U, h);
                        else {
                            try { s.writeFileSync(A, "", "utf8"), m[t(p.path)] = !0, U = { ret: 0, res: p.path } } catch (b) { U = { ret: b.toString(), res: "" } }
                            this.postMessage("webframe", "RETURN_RES", U, h)
                        }
                        break;
                    case "MAKE_DIR":
                        var k = i.join(d.projectpath, p.path),
                            F = void 0;
                        try { s.mkdirSync(k), m[t(p.path)] = !0, F = { ret: 0, res: k } } catch (b) { F = { ret: b.toString(), res: "" } }
                        this.postMessage("webframe", "RETURN_RES", F, h);
                        break;
                    case "GET_PROJECT_INFO":
                        this.postMessage("webframe", "RETURN_RES", { ret: 0, res: d }, h)
                }
            },
            postMessage: function(e, t, r, s) {
                var i = this,
                    n = { to: e, msg: r, command: t, ext: s };
                return this.port ? (this.msgQuery.length && (this.msgQuery.forEach(function(e) { i.port.postMessage(e) }), this.msgQuery = []), void this.port.postMessage(n)) : void this.msgQuery.push(n)
            },
            initport: function(e) {
                var t = this;
                "edit" === e.name && (this.port = e, this.port.onMessage.addListener(this.onMessage), this.port.onDisconnect.addListener(function() { t.port.onMessage.removeListener(t.onMessage), delete t.port, delete t.portID, t.msgQuery = [] }), this.postMessage("contentscript", "SHAKE_HANDS", {}))
            },
            initRuntime: function() { chrome.runtime.onConnect.addListener(this.initport) },
            addContentScripts: function() { this.webview.addContentScripts([{ name: "contentscript", matches: ["<all_urls>"], js: { files: ["app/dist/contentscript/editcontent.js"] }, run_at: "document_start" }]) },
            _windowFocus: function() {
                if ("focus" !== this.currentStatus) {
                    var e = { eventType: "focus" };
                    this.postMessage("webframe", "WINDOW_CHANGE", e, {}), this.currentStatus = "focus"
                }
            },
            _windowBlur: function() {
                if ("blur" !== this.currentStatus) {
                    var e = { eventType: "blur" };
                    this.postMessage("webframe", "WINDOW_CHANGE", e, {}), this.currentStatus = "blur"
                }
            },
            componentDidMount: function() {
                this.msgQuery = [], this.show = this.props.show;
                var t = this.refs.container,
                    r = this.webview = document.createElement("webview");
                r.className = "simulator-bd-webview_body", r.setAttribute("partition", "persist:trusted"), r.setUserAgentOverride(r.getUserAgent() + " devtoolsedit"), t.appendChild(r), this.addContentScripts(), this.initRuntime(), r.addEventListener("dialog", function(t) {
                    var r = t.messageType || "",
                        s = t.messageText;
                    if ("alert" === r) e(s);
                    else if ("confirm" === r) {
                        var i = confirm(s);
                        i ? t.dialog.ok() : t.dialog.cancel()
                    } else if ("prompt" === r) {
                        var n = prompt(s);
                        null !== n ? t.dialog.ok(n) : t.dialog.cancel()
                    }
                }), this.initWatcher(), r.src = "app/html/edit.html", h.on("WINDOW_BLUR", this._windowFocus), h.on("WINDOW_FOCUS", this._windowBlur)
            },
            componentWillUnmount: function() { chrome.runtime.onConnect.removeListener(this.initport), h.removeListener("WINDOW_BLUR", this._windowFocus), h.removeListener("WINDOW_FOCUS", this._windowBlur), this.webview.remove(), m = {} },
            initWatcher: function() {
                var e = this,
                    r = d.manager;
                r.on("FILE_CHANGE", function(r, s, n, o) {
                    if (r.hash === e.state.project.hash) {
                        var a = {};
                        n = t(n);
                        var c = (i.join(r.projectpath, n), m[n]);
                        if ("add" !== s && "addDir" !== s || c)
                            if ("unlink" !== s && "unlinkDir" !== s || !c) {
                                if ("change" !== s) return void l.info("edit.js watch " + s);
                                var p = +o.mtime;
                                if (m[n] === p) return;
                                m[n] = p, a = { eventType: s, fileName: n }
                            } else a = { eventType: s, fileName: n }, delete m[n];
                        else a = { eventType: s, fileName: n };
                        "unlink" === a.eventType && (a.eventType = "delete"), "unlinkDir" === a.eventType && (a.eventType = "deleteDir"), e.postMessage("webframe", "FILE_CHANGE", a, {})
                    }
                })
            },
            componentWillReceiveProps: function(e) { "edit" === e.show ? this._windowFocus() : this._windowBlur() },
            render: function() {
                var e = this.props,
                    t = e.show,
                    r = (e.project, "edit" === t ? {} : c.displayNone);
                return a.createElement("div", { className: "edit", ref: "container", style: r })
            }
        });
    _exports = v
}
var _exports;
init(), module.exports = _exports;
