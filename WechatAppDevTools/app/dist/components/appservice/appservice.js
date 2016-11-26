"use strict";

function init() {
    var e = require("../../lib/react.js"),
        t = (require("../../lib/react-dom.js"), require("../../cssStr/cssStr.js")),
        s = require("../../stores/webviewStores.js"),
        r = require("../../stores/windowStores.js"),
        o = require("../../actions/webviewActions.js"),
        n = require("../../stores/projectStores.js"),
        i = require("../../weapp/utils/tools.js"),
        a = require("./../../common/log/log.js"),
        c = require("../../common/assdk/asSdk.js"),
        p = require("../../debugger/debugger.js"),
        d = require("../../config/dirConfig.js"),
        l = require("../../actions/windowActions.js"),
        u = 1e5,
        v = 1e6,
        g = e.createClass({
            displayName: "DevTools",
            addContentScripts: function() { this.appserviceWebview.addContentScripts([{ name: "contentScripts", matches: ["<all_urls>"], js: { files: ["app/dist/contentscript/contentScript.js"] }, run_at: "document_start" }]) },
            devtoolsAddContentScripts: function() { this.devtoolsview.addContentScripts([{ name: "devtoolsContentScripts", matches: ["<all_urls>"], js: { files: ["app/dist/contentscript/contentScript.js"] }, run_at: "document_start" }]) },
            _initport: function(e) {
                var t = this,
                    s = e.name;
                s === "webview" + u ? (a.info("appservice.js appserviceview " + s), this.port = e, e.onMessage.addListener(function(e) { t.msgQuery = [], t.onMessage(e) }), e.onDisconnect.addListener(function() { delete t.port }), this.postMessage("contentscript", {}, "SHAKE_HANDS")) : s === "webview" + v && (a.info("appservice.js devtoolsview " + s), this.devtoolsPort = e, e.onMessage.addListener(function(e) { t.devtoolsOnMessage(e) }), e.onDisconnect.addListener(function() { t.devtoolsMsgQuery = [], delete t.devtoolsPort }), this.devtoolsPostMessage("contentscript", {}, "SHAKE_HANDS"))
            },
            initRuntime: function() { chrome.runtime.onConnect.addListener(this._initport) },
            _externalPort: function(e) {
                var t = this,
                    r = e.name;
                "storage" === r ? (a.info("appservice.js appserviceview " + r), this.externalPort = e, e.onMessage.addListener(function(e) {
                    var s = e.command;
                    if ("GET_APP_DATA" === s) {
                        var r = { storage: i.getProjectStorage(t.props.project) };
                        t.externalPostMessage(r, "tabui-setAsData")
                    }
                }), e.onDisconnect.addListener(function() { t.externalMsgQuery = [], delete t.externalPort }), this.externalPostMessage({}, "SHAKE_HANDS")) : "appdata" === r ? (a.info("appservice.js appserviceview " + r), this.externalAppDataPort = e, e.onMessage.addListener(function(e) {
                    var s = e.command;
                    "GET_APP_DATA" === s ? t.postMessage("appservice", {}, "GET_APP_DATA") : "WRITE_APP_DATA" === s && t.postMessage("appservice", e.data, "WRITE_APP_DATA")
                }), e.onDisconnect.addListener(function() { t.externalAppDataMsgQuery = [], delete t.externalAppDataPort }), this.externalAppDataPostMessage({}, "SHAKE_HANDS")) : "wxml" === r && (a.info("appservice.js appserviceview " + r), this.externalWxmlPort = e, e.onMessage.addListener(function(e) {
                    var r = e.command,
                        o = e.ext,
                        n = e.data;
                    if ("GET_CURRENT_DEBUGGEE" === r) {
                        var i = s.getCurrentWebviewID(),
                            c = t.debuggeeMap[i];
                        if (!c) return void a.error("appservice.js error do not find " + i + " debuggee");
                        t.externalWxmlPostMessage({ res: { debuggee: c }, ext: o, args: n }, "GET_CURRENT_DEBUGGEE")
                    } else "SEND_COMMAND" === r && p.sendCommand(n.debuggee, n.method, n.commandParams, function(e) { t.externalWxmlPostMessage({ res: e, ext: o, args: n }, "GET_DEVTOOLS_RES") })
                }), e.onDisconnect.addListener(function() { t.externalWxmlMsgQuery = [], delete t.externalWxmlPort }), this.externalWxmlPostMessage({}, "SHAKE_HANDS"))
            },
            initExternal: function() { chrome.runtime.onConnectExternal.addListener(this._externalPort) },
            onMessage: function(e) {
                var t = this;
                if ("COMMAND_FROM_ASJS" === e.command) {
                    var r = e.sdkName;
                    return "__open-tools-log" === r ? void nw.Shell.openItem(d.WeappLog) : "__open-tools-vendor" === r ? void nw.Shell.openItem(d.WeappVendor) : "APP_SERVICE_COMPLETE" === r ? void s.emit("APPSERVICE_INIT") : "send_app_data" === r ? void this.externalAppDataPostMessage(e, "SEND_APP_DATA") : "publish" === r ? void o.asPublish(e) : void c.exec(e, function(s, n) { setTimeout(function() { t.postMessage("appservice", s, "GET_ASSDK_RES", e) }, 0), "setStorage" !== r && "clearStorage" !== r && "setStorageSync" !== r && "clearStorageSync" !== r || o.upASData(n.appid, n.storage) })
                }
            },
            devtoolsOnMessage: function(e) {},
            postMessage: function(e, t, s, r) {
                var o = this,
                    n = { to: e, msg: t, command: s, ext: r },
                    i = this.port;
                return i ? (this.msgQuery.length && (this.msgQuery.forEach(function(e) { o.port.postMessage(e) }), this.msgQuery = []), void i.postMessage(n)) : void this.msgQuery.push(n)
            },
            devtoolsPostMessage: function(e, t, s, r) {
                var o = this,
                    n = { to: e, msg: t, command: s, ext: r },
                    i = this.devtoolsPort;
                return i ? (this.devtoolsMsgQuery.length && (this.devtoolsMsgQuery.forEach(function(e) { o.devtoolsPort.postMessage(e) }), this.devtoolsMsgQuery = []), void i.postMessage(n)) : void this.devtoolsMsgQuery.push(n)
            },
            externalWxmlPostMessage: function(e, t) {
                var s = { msg: e, command: t },
                    r = this.externalWxmlPort;
                return r ? (this.externalWxmlMsgQuery.length && (this.externalWxmlMsgQuery.forEach(function(e) { r.postMessage(e) }), this.externalWxmlMsgQuery = []), void r.postMessage(s)) : void this.externalWxmlMsgQuery.push(s)
            },
            externalAppDataPostMessage: function(e, t) {
                var s = { msg: e, command: t },
                    r = this.externalAppDataPort;
                return r ? (this.externalAppDataMsgQuery.length && (this.externalAppDataMsgQuery.forEach(function(e) { r.postMessage(e) }), this.externalAppDataMsgQuery = []), void r.postMessage(s)) : void this.externalAppDataMsgQuery.push(s)
            },
            externalPostMessage: function(e, t) {
                var s = this,
                    r = { msg: e, command: t },
                    o = this.externalPort;
                return o ? (this.externalMsgQuery.length && (this.externalMsgQuery.forEach(function(e) { s.externalPort.postMessage(e) }), this.externalMsgQuery = []), void o.postMessage(r)) : void this.externalMsgQuery.push(r)
            },
            _initAppservice: function() {
                function e() {
                    function t() {
                        function e() { o.removeEventListener("loadcommit", e) }
                        s.removeEventListener("loadcommit", t), o.addEventListener("loadcommit", e), s.showDevTools(!0, o)
                    }
                    o.removeEventListener("loadcommit", e), s.addEventListener("loadcommit", t), s.src = "http://" + i.hash + ".appservice.open.weixin.qq.com/appservice"
                }
                var t = this.refs.container,
                    s = this.appserviceWebview = document.createElement("webview");
                s.style.cssText = "height:0.01px;width:0.01px";
                var r = s.getUserAgent();
                s.setUserAgentOverride(r + " appservice webview/" + u), t.appendChild(s), this.addContentScripts();
                var o = this.devtoolsview = document.createElement("webview");
                o.className = "devtools-content";
                var n = o.getUserAgent() + " asviewdevtools webview/" + v + " chromeRuntimeID/" + chrome.runtime.id;
                o.setUserAgentOverride(n), o.setAttribute("partition", "persist:devtools"), t.appendChild(o), this.devtoolsAddContentScripts();
                var i = this.props.project;
                o.addEventListener("loadcommit", e), o.src = "about:blank", this.initRuntime(), this.initExternal(), this.onHeadersReceived(), this.onBeforeSendHeaders(), this.onSyncMessage()
            },
            _postMsgToAS: function(e) { this.postMessage("appservice", e, "MSG_FROM_WEBVIEW") },
            _upASData: function(e, t) {
                var s = { storage: t };
                this.externalPostMessage(s, "tabui-setAsData")
            },
            _restart: function() { this.appserviceWebview.reload() },
            _startDebuggee: function(e, t) {
                var s = this,
                    r = t.webview,
                    o = t.webviewOffset;
                new Date;
                p.start(r, { webviewOffset: o }, function(t) { s.debuggeeMap[e] = t, s.externalWxmlPostMessage({ debuggee: t }, "CHANGE_DEBUGGEE") }, function(e, t, r) { s.externalWxmlPostMessage({ debuggee: e, method: t, params: r }, "ON_EVENT") }, function(e, t) {
                    s.externalWxmlPostMessage({ debuggee: e }, "ON_DETACH");
                    for (var r in s.debuggeeMap)
                        if (s.debuggeeMap[r].targetId === e.targetId) return void delete s.debuggeeMap[r]
                })
            },
            _changeWebview: function(e) {
                var t = this.debuggeeMap[e];
                t && this.externalWxmlPostMessage({ debuggee: t }, "CHANGE_DEBUGGEE")
            },
            _setWebviewInfo: function(e) {
                for (var t in this.debuggeeMap) p.sendCommand(this.debuggeeMap[t], "Emulation.setDeviceMetricsOverride", { width: parseInt(e.width), height: parseInt(e.height), deviceScaleFactor: e.dpr, mobile: !0, fitWindow: !1 })
            },
            _getWeappError: function(e, t, s) { this.postMessage("appservice", { fileName: i.getFileNameFromUrl(t), errStr: s }, "WINDOW_GET_WEBAPP_ERROR") },
            inspector: function() {
                return this.externalWxmlPort ? void this.externalWxmlPostMessage({}, "SET_INSPECT_MODE") : void l.showTipsMsg({ msg: "请先切换至 Wxml Pannel", type: "error" })
            },
            onSyncMessage: function() {
                var e = this.appserviceWebview;
                e.addEventListener("dialog", function(e) {
                    var t = e.messageType || "",
                        s = e.messageText;
                    if ("prompt" === t) {
                        var r = /^____sdk____/.test(s);
                        r && ! function() {
                            var t = JSON.parse(s.replace(/^____sdk____/, ""));
                            "COMMAND_FROM_ASJS" === t.command && ! function() {
                                var s = t.sdkName;
                                c.exec(t, function(r, n) {
                                    var i = { to: "appservice", msg: r, command: "GET_ASSDK_RES", ext: t };
                                    e.dialog.ok(JSON.stringify(i)), "setStorageSync" !== s && "clearStorageSync" !== s || o.upASData(n.appid, n.storage)
                                })
                            }()
                        }()
                    }
                })
            },
            onBeforeSendHeaders: function() {
                var e = this.appserviceWebview,
                    t = e.request,
                    s = this.props.project;
                t.onBeforeSendHeaders.addListener(function(e) {
                    var t = e.requestHeaders || [],
                        r = t.findIndex(function(e) {
                            return "cookie" === e.name.toLowerCase()
                        });
                    t.splice(r, 1);
                    for (var o = 0; o < t.length; ++o) "_Cookie" === t[o].name && (t[o].name = "Cookie"), "Referer" === t[o].name && (t[o].value = "https://servicewechat.com/" + s.appid + "/devtools/page-frame.html");
                    return { requestHeaders: e.requestHeaders }
                }, { urls: ["<all_urls>"] }, ["blocking", "requestHeaders"])
            },
            onHeadersReceived: function() {
                var e = this.appserviceWebview,
                    t = e.request;
                t.onHeadersReceived.addListener(function(t) {
                    var s = t.type;
                    if ("script" === s) {
                        var r = t.responseHeaders || [],
                            o = r.find(function(e) {
                                return "es6-error" === e.name
                            });
                        if (o) {
                            var n = r.find(function(e) {
                                    return "es6-errorfile" === e.name
                                }),
                                i = decodeURIComponent(n.value),
                                a = JSON.parse(decodeURIComponent(o.value));
                            e.executeScript({ code: "console.error('编译 " + i + " 错误');console.error(`" + a.codeFrame + "`)" })
                        }
                    }
                    if ("xmlhttprequest" === s) {
                        var c = t.responseHeaders || [];
                        return c.push({ name: "Access-Control-Allow-Origin", value: "*" }), c.push({ name: "Access-Control-Allow-Headers", value: "X-Requested-With, Content-Type" }), { responseHeaders: c }
                    }
                }, { urls: ["<all_urls>"] }, ["blocking", "responseHeaders"])
            },
            componentDidMount: function() { this.msgQuery = [], this.devtoolsMsgQuery = [], this.externalMsgQuery = [], this.externalAppDataMsgQuery = [], this.externalWxmlMsgQuery = [], this.debuggeeMap = {}, this._initAppservice(), s.on("POST_MSG_TOAS", this._postMsgToAS), s.on("UP_AS_DATA", this._upASData), n.on("RESTART_PROJECT", this._restart), r.on("START_WEBVIEW_DEBUGGEE", this._startDebuggee), r.on("WINDOW_CHANGE_WEBVIEW_ID", this._changeWebview), r.on("SET_WEBVIEW_INFO", this._setWebviewInfo), r.on("WINDOW_GET_WEBAPP_ERROR", this._getWeappError) },
            componentWillUnmount: function() { this.devtoolsview.remove(), this.appserviceWebview.remove(), s.removeListener("POST_MSG_TOAS", this._postMsgToAS), s.removeListener("UP_AS_DATA", this._upASData), n.removeListener("RESTART_PROJECT", this._restart), r.removeListener("START_WEBVIEW_DEBUGGEE", this._startDebuggee), r.removeListener("WINDOW_CHANGE_WEBVIEW_ID", this._changeWebview), r.removeListener("SET_WEBVIEW_INFO", this._setWebviewInfo), r.removeListener("WINDOW_GET_WEBAPP_ERROR", this._getWeappError), chrome.runtime.onConnectExternal.removeListener(this._externalPort), chrome.runtime.onConnect.removeListener(this._initport) },
            render: function() {
                var s = "appservice" === this.props.show ? { height: "100%" } : t.webviewDisplayNone,
                    r = "debug" === this.props.propshow ? {} : t.displayNone;
                return e.createElement("div", { style: s, ref: "container", className: "devtools" }, e.createElement("div", { style: r, onClick: this.inspector, className: "devtools-inspector" }))
            }
        });
    _exports = g
}
var _exports;
init(), module.exports = _exports;
