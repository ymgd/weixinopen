"use strict";

function init() {
    var e = require("../../lib/react.js"),
        t = require("../../stores/webviewStores.js"),
        s = require("../../actions/leftviewActions.js"),
        i = require("../../stores/windowStores.js"),
        r = require("../../actions/windowActions.js"),
        o = require("../../actions/projectActions.js"),
        n = require("../../common/log/log.js"),
        a = require("../../config/config.js"),
        c = (require("../../common/jssdk/sdkNameTrans.js"), require("../../utils/newReport.js")),
        w = (require("../../common/assdk/asSdk.js"), !1),
        v = e.createClass({
            displayName: "WebviewBody",
            getInitialState: function() {
                return { webviewID: parseInt(this.props.webviewID) }
            },
            captureVisibleRegion: function() {
                var e = this;
                this.webview.captureVisibleRegion(function(t) { e.props.getSimulatorActions("S_GET_SNAPSHOT", e.state.webviewID, { dataURI: t }) })
            },
            _setWebviewActions: function(e, t) {
                var s = this,
                    i = this.webview,
                    r = t.act,
                    n = this.postMessage;
                switch (r) {
                    case "reBuild":
                        this.props.project && setTimeout(function() { o.restart(s.props.project), c("project_shortcut_restart", s.props.project.appid) }, 17);
                        break;
                    case "reLoad":
                        i.reload();
                        break;
                    case "goBack":
                        this.props.goBack();
                        break;
                    case "goForward":
                        i.forward();
                        break;
                    case "load":
                        w = "urlbar" !== t.from, i.src = t.url;
                        break;
                    case "goToBlank":
                        i.src = "app/html/about.html";
                        break;
                    case "sendMsg":
                        var a = { sdkName: t.sdkName, res: t.res };
                        n("webframe", a, "INVOKE_SDK", t.ext);
                        break;
                    case "sendMsgFromAppService":
                        n("webframe", t, "MSG_FROM_APPSERVICE");
                        break;
                    case "open":
                        nw.Shell.openExternal(i.src);
                        break;
                    case "CAPTURE":
                        return void this.captureVisibleRegion()
                }
            },
            _getJSSDKRes: function(e, t, s, i) {
                n.info("WebviewBody.js GET_JSSDK_RES " + e + ", " + t + ", " + JSON.stringify(s) + ", " + JSON.stringify(i));
                var r = { sdkName: t, res: s };
                this.postMessage("webframe", r, "GET_JSSDK_RES", i)
            },
            setUserAgentOverride: function(e) { e = e || t.getUA().replace("{{webviewID}}", this.state.webviewID), this.webview.setUserAgentOverride(e) },
            setWebviewSrc: function(e) { this.webview.src = e },
            upWebviewStatus: function(e) {
                var t = this.webview,
                    s = { url: t.src, canGoBack: t.canGoBack() };
                this.props.getSimulatorActions("S_UP_WEBVIEW_STATUS", this.state.webviewID, Object.assign(e, s))
            },
            loadstart: function() {
                var e = this;
                this.webview.addEventListener("loadstart", function(t) { t.isTopLevel && e.upWebviewStatus({ loading: "start" }) })
            },
            loadcommit: function() {
                var e = this,
                    s = this.webview;
                s.addEventListener("loadcommit", function(i) {
                    if (i.isTopLevel && (e.upWebviewStatus({ type: "loadcommit" }), !e.initDevtools)) {
                        if (e.props.project) {
                            var r = t.getOffset(),
                                o = e.props.isMatch;
                            o && (r.height = r.height - 45), e.props.getSimulatorActions("S_START_DEBUGGEE", e.state.webviewID, { webview: s, webviewOffset: r })
                        } else {
                            var n = e.props.offset;
                            e.props.getSimulatorActions("S_OPEN_DEVTOOLS", e.state.webviewID, { webview: s, webviewOffset: n })
                        }
                        e.initDevtools = !0
                    }
                })
            },
            loadstop: function() {
                var e = this;
                this.webview.addEventListener("loadstop", function(t) { e.upWebviewStatus({ loading: "stop" }), e.props.project || e.postMessage("webframe", {}, "COMMAND_GET_TITLE"), s.hideAll(e.state.webviewID) })
            },
            initEvent: function() {
                this.loadstart(), this.loadcommit(), this.loadstop();
                var e = this.webview;
                global.appConfig.isDev || e.contextMenus.onShow.addListener(function(e) { e.preventDefault() }), e.addEventListener("newwindow", function(t) { "new_window" === t.windowOpenDisposition && (e.src = t.targetUrl) }), e.addEventListener("dialog", function(e) {
                    var t = e.messageType || "",
                        s = e.messageText;
                    if ("alert" === t) alert(s);
                    else if ("confirm" === t) {
                        var i = confirm(s);
                        i ? e.dialog.ok() : e.dialog.cancel()
                    } else if ("prompt" === t) {
                        var r = prompt(s);
                        null !== r ? e.dialog.ok(r) : e.dialog.cancel()
                    }
                })
            },
            onBeforeSendHeaders: function() {
                var e = this.webview,
                    t = e.request;
                t.onBeforeSendHeaders.addListener(function(e) {
                    if (e.requestHeaders) return e.requestHeaders.push({ name: "linchao", value: "chaolin" }), { requestHeaders: e.requestHeaders }
                }, { urls: ["<all_urls>"] }, ["blocking", "requestHeaders"])
            },
            onBeforeRequest: function() {
                var e = this,
                    t = this.webview,
                    s = t.request;
                s.onBeforeRequest.addListener(function(t) {
                    if ("main_frame" !== t.type) return {};
                    if (!w) return w = !0, {};
                    var s = t.url;
                    if (/^chrome-extension:\/\//.test(s) || /^file:\/\//.test(s)) return {};
                    if (a.weappURLRegular.test(s)) return {};
                    var i = /\#wechat_redirect$/.test(s);
                    return e.props.getSimulatorActions("S_GET_A8KEY", e.state.webviewID, { url: s, isSync: i }), { cancel: i }
                }, { urls: ["<all_urls>"] }, ["blocking"])
            },
            onHeadersReceived: function() {
                var e = this,
                    t = this.webview,
                    s = t.request;
                s.onHeadersReceived.addListener(function(t) {
                    var s = t.responseHeaders || [],
                        i = t.type,
                        o = e.state.webviewID;
                    t.url.match(/\.wxss$/) && s.forEach(function(e) {
                        var s = e.name;
                        "Weapp-Error" === s && r.getWeappError(o, t.url, decodeURIComponent(e.value))
                    }), "main_frame" === i && (e.props.project && 0 === e.state.webviewID && !e.tiggerAppRoute && (e.props.postAppRoute(e.webview.src, e.state.webviewID, "appLaunch"), e.tiggerAppRoute = !0), e.props.getSimulatorActions("S_CLEAN_WEBVIEW", o), e.errNum = 0, s.forEach(function(e) {
                        var s = e.name;
                        "Weapp-Error" === s && r.getWeappError(o, t.url, decodeURIComponent(e.value))
                    }))
                }, { urls: ["<all_urls>"] }, ["blocking", "responseHeaders"])
            },
            initRequest: function() { this.onHeadersReceived(), this.onBeforeRequest(), this.onBeforeSendHeaders() },
            addContentScripts: function() { this.webview.addContentScripts([{ name: "contentscript", matches: ["<all_urls>"], js: { files: ["app/dist/contentscript/contentScript.js"] }, run_at: "document_start" }]) },
            _initport: function(e) {
                var s = this;
                e.name === "webview" + this.state.webviewID && (n.info("WebviewBody.js chrome.runtime.onConnect.addListener " + e.name), this.port = e, this.portID = e.name, t.addWebviewPorts(this.portID, this.port), this.port.onMessage.addListener(this.onMessage), this.port.onDisconnect.addListener(function() { t.delWebviewPorts(s.portID), s.port.onMessage.removeListener(s.onMessage), delete s.port, delete s.portID, s.msgQuery = [] }), this.postMessage("contentscript", {}, "SHAKE_HANDS"))
            },
            initRuntime: function() { chrome.runtime.onConnect.addListener(this._initport) },
            toAppService: function(e) { e.webviewID = this.state.webviewID, this.props.getSimulatorActions("S_POSTMSG_TO_AS", this.state.webviewID, e) },
            onMessage: function(e) {
                var t = e.command,
                    s = this.state.webviewID,
                    i = e.msg;
                switch (t) {
                    case "COMMAND_GET_TITLE":
                        this.upWebviewStatus(i);
                        break;
                    case "EXEC_JSSDK":
                        i.ext = e.ext, this.props.getSimulatorActions("S_EXEC_JSSDK", s, i);
                        break;
                    case "TO_APP_SERVICE":
                        this.toAppService(i);
                        break;
                    case "PULLDOWN_REFRESH":
                        this.props.getSimulatorActions("S_POSTMSG_TO_AS", this.state.webviewID, { eventName: "onPullDownRefresh", data: {}, webviewID: this.state.webviewID })
                }
                n.info("WebviewBody.js message " + s + " " + JSON.stringify(e))
            },
            postMessage: function(e, t, s, i) {
                var r = this,
                    o = { to: e, msg: t, command: s, ext: i };
                return o.webviewID = this.state.webviewID, o.id = this.id, this.port ? (this.msgQuery.length && (this.msgQuery.forEach(function(e) { r.port.postMessage(e) }), this.msgQuery = []), void this.port.postMessage(o)) : void this.msgQuery.push(o)
            },
            _setInterfaceRes: function(e, t, s) { "closeWindow" === t && (0 === e ? this.webview.src = "app/html/about.html" : this.props.goBack(!0)) },
            _setWebviewInfo: function(e) {
                var t = e.ua;
                if (t) {
                    var s = i.getSetting(),
                        r = s ? s.version : a.defaultWechatVersion,
                        o = t.replace("{{webviewID}}", this.state.webviewID).replace("{{version}}", r);
                    this.webview.setUserAgentOverride(o), n.info("WebviewBody.js _setWebviewUA success " + t)
                }
                var c = e.version;
                if (c) {
                    var w = this.webview.getUserAgent(),
                        v = w.match(/MicroMessenger\/(.*?)\s/)[1];
                    this.webview.setUserAgentOverride(w.replace(v, c))
                }
                this.webview.reload()
            },
            _clearWebviewData: function(e) {
                var t = e.callBack;
                delete e.callBack, this.webview.clearData({ since: 0 }, e, function() { t && t(), n.info("WebviewBody.js _clearWebviewData success ") })
            },
            _didMount: function() {
                var e = this,
                    s = this.refs.container;
                global.webviews || (global.webviews = []);
                var r = this.webview = document.createElement("webview");
                global.webviews.push(r), r.className = "simulator-bd-webview_body webviewbody" + this.state.webviewID, r.setAttribute("partition", "persist:trusted"), s.appendChild(r), this.setUserAgentOverride(), this.addContentScripts(), this.initRuntime();
                var o = this.props.href || "app/html/about.html";
                if (this.props.project) {
                    var n = function a() { setTimeout(function() { e.setWebviewSrc(o) }, 50), r.removeEventListener("loadcommit", a) };
                    r.addEventListener("loadcommit", n), r.src = "about:blank"
                } else this.setWebviewSrc(o);
                this.initEvent(), this.initRequest(), t.on("SET_WEBVIEW_ACTION_" + this.state.webviewID, this._setWebviewActions), t.on("GET_JSSDK_RES_" + this.state.webviewID, this._getJSSDKRes), t.on("SET_INTERFACE_RES_" + this.state.webviewID, this._setInterfaceRes), t.on("SET_WEBVIEW_INFO", this._setWebviewInfo), t.on("CLEAR_WEBVIEW_DATA", this._clearWebviewData), t.on("STOP_PULL_DOWN_REFRESH", this._onStopPullDownRefresh), i.on("INIT_DEVTOOLS_SUCCESS" + this.state.webviewID, this._successDevtools)
            },
            _onStopPullDownRefresh: function() { this.postMessage("webframe", {}, "STOP_PULL_DOWN_REFRESH") },
            _successDevtools: function() { this.postMessage("webframe", {}, "INIT_DEVTOOLS_SUCCESS") },
            componentDidMount: function() { this.id = Math.random(), this.msgQuery = [], this.props.project && 0 === this.state.webviewID ? t.on("APPSERVICE_INIT", this._didMount) : this._didMount() },
            componentWillUnmount: function() {
                var e = this.state.webviewID,
                    s = global.contentDocumentBody.querySelector(".devtools" + e);
                s && s.remove(), this.initDevtools = !1, t.removeListener("CLEAR_WEBVIEW_DATA", this._clearWebviewData), t.removeListener("APPSERVICE_INIT", this._didMount), t.removeListener("SET_WEBVIEW_ACTION_" + e, this._setWebviewActions), t.removeListener("GET_JSSDK_RES_" + e, this._getJSSDKRes), t.removeListener("SET_INTERFACE_RES_" + e, this._setInterfaceRes), t.removeListener("SET_WEBVIEW_INFO", this._setWebviewInfo), t.removeListener("STOP_PULL_DOWN_REFRESH", this._onStopPullDownRefresh), i.removeListener("INIT_DEVTOOLS_SUCCESS" + this.state.webviewID, this._successDevtools), chrome.runtime.onConnect.removeListener(this._initport)
            },
            render: function() {
                return e.createElement("div", { className: "simulator-bd-webview", ref: "container" })
            }
        });
    _exports = v
}
var _exports;
init(), module.exports = _exports;
