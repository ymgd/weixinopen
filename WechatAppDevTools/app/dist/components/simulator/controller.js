"use strict";

function init() {
    var React = require("../../lib/react.js"),
        ReactDOM = require("../../lib/react-dom.js"),
        toolbar = require("./toolbar.js"),
        scanDialog = require("./scanDialog.js"),
        webviewtab = require("./webviewtab.js"),
        webview = require("./webview.js"),
        tools = require("../../weapp/utils/tools.js"),
        file = require("../../utils/file.js"),
        webviewStores = require("../../stores/webviewStores.js"),
        p = (require("../../stores/windowStores.js"), require("../../actions/windowActions.js")),
        webviewActions = require("../../actions/webviewActions.js"),
        l = (require("../../stores/projectStores.js"), require("../../cssStr/cssStr.js")),
        log = require("../../common/log/log.js"),
        request = require("../../common/request/request.js"),
        simulatorActions = require("./actions/simulatorActions.js"),
        webviewBackwardMask = require("./webviewBackwardMask.js"),
        app_tools = require("../../utils/tools.js"),
        url = require("url"),
        urlConfig = require("../../config/urlConfig.js"),
        m = 0,
        S = 0,
        _ = React.createClass({
            displayName: "Controller",
            getInitialState: function() {
                var url = "app/html/about.html",
                    tabBar = {},
                    r = webviewStores.getOffset(),
                    window_config = {};
                if (this.props.project) {
                    var project = this.props.project;
                    url = tools.getWeappURL(project);
                    try {
                        var o = tools.getProjectConfig(project);
                        tabBar = o.tabBar || {}, window_config = o.window || {}
                    } catch (n) {}
                }
                return { currentWebviewID: 0, showCard: !1, tabBar: tabBar, showTabBar: !1, href: url, offset: r, cardInfo: {}, list: { 0: { href: url, dataURI: "", preWebviewID: 0, config: window_config } } }
            },
            setAnimateImg: function(e, r) {
                var i = document.createElement("div");
                if (r.dataURI) {
                    var s = document.createElement("img");
                    i.appendChild(s), s.src = r.dataURI
                }
                i.className = "simulator-animate-png";
                var o = ReactDOM.findDOMNode(this.refs["webview" + this.state.currentWebviewID]),
                    a = o.getBoundingClientRect(),
                    n = a.top,
                    c = a.left,
                    p = a.height,
                    u = a.width;
                e ? i.style.cssText = "background-color:" + r.color + ";width:" + u + "px;height:" + p + "px;top:" + n + "px;left:" + c + "px;transform:translate3d(" + u + "px,0,0)" : i.style.cssText = "margin-top:42px;width:" + u + "px;height:" + p + "px;top:" + n + "px;left:" + c + "px;transform:translate3d(0,0,0)", global.contentDocumentBody.appendChild(i);
                i.offsetTop;
                return i
            },
            postAppRoute: function(e, t, r) {
                if (this.props.project) {
                    e = e.replace(/http\:\/\/.*?\//, "");
                    var i = e.match(/(([^\?]*)(\?([^\/]*))?)$/),
                        s = "",
                        o = {};
                    if (i) {
                        s = i[2] || "index.wxml";
                        for (var a = (i[4] || "").split("&"), n = 0; n < a.length; ++n) {
                            var c = a[n].split("=");
                            2 == c.length && (o[c[0]] = c[1])
                        }
                    }
                    this.getSimulatorActions("S_POSTMSG_TO_AS", null, { eventName: "onAppRoute", type: "ON_APPLIFECYCLE_EVENT", data: { path: s, query: o, openType: r }, webviewID: t })
                }
            },
            goBack: function(e, r, i, s) {
                var o = this;
                if (s = s || 1, this.props.project || !r.canGoBack() || i) {
                    var n, c, p, u = function() {
                        if (0 === e) return { v: void 0 };
                        for (c = e, p = []; s-- && o.state.list[c] && 0 != c;) p.push(c), n = o.state.list[c], c = n.prevWebviewID;
                        o.state.list[c] || (c = 0);
                        var i = ReactDOM.findDOMNode(o.refs["webview" + e]),
                            u = i.querySelector(".webviewbody" + e);
                        u.captureVisibleRegion(function(e) {
                            var i = o.setAnimateImg(!1, { dataURI: e }),
                                s = u.offsetWidth,
                                n = Object.assign({}, o.state.list);
                            for (var l in p) delete n[p[l]];
                            o.setState({ list: n, currentWebviewID: c }, function() {
                                i.addEventListener("transitionend", function() {
                                    global.contentDocumentBody.removeChild(i);
                                    var e = ReactDOM.findDOMNode(o.refs["webview" + c]),
                                        s = e.querySelector(".webviewbody" + c);
                                    if (o.props.project) {
                                        var n = r.src,
                                            u = tools.getBaseURL(o.props.project);
                                        0 === n.indexOf(u) && o.postAppRoute(s.src, o.state.currentWebviewID, "navigateBack")
                                    }
                                    for (var l in p) o.getSimulatorActions("S_DELETE_WEBVIEW", null, { webviewID: p[l] });
                                    o.getSimulatorActions("S_CHANGE_CURRENT_WEBVIEW", null, { webviewID: c })
                                }), i.style.transform = "translate3d(" + s + "px,0,0)"
                            })
                        })
                    }();
                    if ("object" === ("undefined" == typeof u ? "undefined" : _typeof(u))) return u.v
                } else r.back()
            },
            _openNewWebview: function(e) {
                var t = this,
                    r = e.webviewID,
                    i = e.url,
                    s = e.showUrl,
                    o = tools.getPageJSON(this.props.project, i),
                    n = o.backgroundColor || "#ffffff",
                    c = this.setAnimateImg(!0, { color: n });
                c.style.transform = "translate3d(0,0,0)", c.addEventListener("transitionend", function() {
                    c.parentNode.removeChild(c), m++;
                    var e = Object.assign({}, t.state.list);
                    e[m] = { prevWebviewID: r, showUrl: s, href: i, config: o }, t.setState({ currentWebviewID: m, list: e }), t.getSimulatorActions("S_CHANGE_CURRENT_WEBVIEW", null, { webviewID: m })
                })
            },
            _openNewWindowWebview: function(e) {
                var t = this,
                    r = e.webviewID,
                    i = e.url,
                    s = e.showUrl,
                    o = tools.getPageJSON(this.props.project, i),
                    n = (o.backgroundColor || "#ffffff", this.props.project),
                    c = tools.getWeappURL(n, { justHost: !0 });
                i = url.resolve(c, i);
                var p = { currentWebviewID: r };
                if ("number" != typeof r) {
                    r = ++m;
                    var u = Object.assign({}, this.state.list);
                    u[r] = { showUrl: !!s, hideBack: !0, href: i, config: o }, p.list = u
                }
                return this.setState(p, function() { t.postAppRoute(i, r, "switchTab"), t.getSimulatorActions("S_CHANGE_CURRENT_WEBVIEW", null, { webviewID: r }) }), r
            },
            _webviewSDK: function(e, t, r, i) {
                if (log.info("Webview.js WEBVIEW_SDK " + e + ", " + JSON.stringify(t) + ", " + r + ", " + JSON.stringify(i)), "openUrlWithExtraWebview" === r) {
                    this._openNewWebview({ webviewID: e, url: t.args.url, showUrl: !0 });
                    var s = webviewStores.getWebviewPorts();
                    for (var o in s) {
                        var a = s[o];
                        a.postMessage({ sdkName: "onAppRoute", data: {}, to: "appservice" })
                    }
                }
            },
            _changeWebviewID: function(e) { this.setState({ currentWebviewID: e }) },
            _setWebviewInfo: function(e) {
                var t = 0,
                    r = this.state.tabBar,
                    i = r.list || [];
                t = i.length <= 5 && i.length >= 3 ? 60 : 0, e.height && this.setState({ offset: { height: e.height - t, width: e.width, dpr: e.dpr } })
            },
            _setWebviewSnapshot: function(e, t) {
                var r = Object.assign({}, this.state.list);
                r[e].dataURI = t, this.setState({ list: r })
            },
            _postMessageToAllWebview: function(e) {
                var t = this,
                    r = e.webviewIds || [],
                    i = 0 === r.length;
                setTimeout(function() {
                    e.act = "sendMsgFromAppService";
                    var s = void 0;
                    s = i ? Object.keys(t.state.list) : r, s.forEach(function(r) { t.getSimulatorActions("S_SET_ACTION", r, e) })
                }, 17)
            },
            _getShortUrl: function(e) {
                var t = "";
                if (this.props.project) {
                    var r = this.props.project;
                    t = tools.getWeappURL(r, { justHost: !0 })
                }
                return e.replace(t, "")
            },
            _asSdk: function(e, r, i) {
                var s = this;
                if ("redirectTo" === e) {
                    var o = this.state.currentWebviewID,
                        a = ReactDOM.findDOMNode(this.refs["webview" + o]),
                        p = a.querySelector(".webviewbody" + o);
                    p.src = r.args.url, i({ errMsg: "redirectTo:ok", url: this._getShortUrl(r.args.url), webviewId: o })
                } else if ("navigateTo" === e) {
                    var l = this.state.currentWebviewID;
                    this._openNewWebview({ webviewID: l, url: r.args.url, showUrl: !0 }), i({ errMsg: "navigateTo:ok", url: this._getShortUrl(r.args.url), webviewId: m + 1 })
                } else if ("navigateBack" === e) ! function() {
                    var e = s.state.currentWebviewID,
                        o = ReactDOM.findDOMNode(s.refs["webview" + e]),
                        a = o.querySelector(".webviewbody" + e);
                    s.goBack(s.state.currentWebviewID, a, !1, r.args.pages || 1), setTimeout(function() { i({ errMsg: "navigateBack:ok", url: s._getShortUrl(a.src) }) }, 200)
                }();
                else if ("setNavigationBarTitle" === e) ! function() {
                    var e = s.state.currentWebviewID,
                        t = r.args;
                    setTimeout(function() { s.getSimulatorActions("S_SET_WEBVIEW_MARGIN", e, { name: "sdk-barTitle", value: t.title || "" }), i({ errMsg: "setNavigationBarTitle:ok" }) }, 0)
                }();
                else if ("showNavigationBarLoading" === e) ! function() {
                    var e = s.state.currentWebviewID;
                    r.args;
                    setTimeout(function() { s.getSimulatorActions("S_SET_WEBVIEW_MARGIN", e, { name: "sdk-showNavigationBarLoading" }), i({ errMsg: "showNavigationBarLoading:ok" }) }, 0)
                }();
                else if ("hideNavigationBarLoading" === e) ! function() {
                    var e = s.state.currentWebviewID;
                    r.args;
                    setTimeout(function() { s.getSimulatorActions("S_SET_WEBVIEW_MARGIN", e, { name: "sdk-hideNavigationBarLoading" }), i({ errMsg: "hideNavigationBarLoading:ok" }) }, 0)
                }();
                else if ("openLocation" === e) {
                    var f = this.state.currentWebviewID,
                        d = r.args,
                        h = d.latitude,
                        w = d.longitude,
                        _ = "marker=coord:" + h + "," + w;
                    d.name && (_ += ";title:" + encodeURIComponent(d.name)), d.address && (_ += ";addr:" + encodeURIComponent(d.address)), this._openNewWebview({ webviewID: f, url: "http://apis.map.qq.com/tools/poimarker?type=0&" + _ + "&key=JMRBZ-R4HCD-X674O-PXLN4-B7CLH-42BSB&referer=wxdevtools" }), sdkRes.errMsg = "openLocation:ok", i(sdkRes)
                } else if ("login" === e) {
                    var W = "";
                    if (this.props.project) {
                        var I = this.props.project;
                        W = I.appid
                    }
                    var E = { scope: ["snsapi_base"] };
                    request({ url: urlConfig.jsLoginURL + "?appid=" + W, method: "post", body: JSON.stringify(E), needToken: 1 }, function(e, t, r) {
                        var s = {},
                            o = "";
                        e || 200 !== t.statusCode || (r = JSON.parse(r), r.baseresponse && (0 == r.baseresponse.errcode ? (s = { code: r.code }, s.errMsg = "login:ok") : o = r.baseresponse.errmsg)), s.errMsg || (s.errMsg = "login:fail; " + o), i(s)
                    })
                } else if ("scanCode" === e) ! function() {
                    var e = function s(e) { i("ok" == e.msg ? { errMsg: "scanCode:ok", result: e.result, scanType: e.scanType } : "cancel" == e.msg ? { errMsg: "scanCode:cancel" } : { errMsg: "scanCode:" + e.msg }), webviewStores.removeListener("SCAN_CODE_RETURN", s) },
                        t = r.args;
                    setTimeout(function() { webviewActions.showScanCodeDialog(t), webviewStores.on("SCAN_CODE_RETURN", e) }, 0)
                }();
                else if ("operateWXData" === e) ! function() {
                    var e = "",
                        t = r.args;
                    if (s.props.project) {
                        var o = s.props.project;
                        e = o.appid
                    }
                    request({ url: urlConfig.jsOperateWXDATAURL + "?appid=" + e, method: "post", body: JSON.stringify({ data: JSON.stringify(t.data || {}) }), needToken: 1 }, function(r, o, a) {
                        var n = {},
                            p = "";
                        if (!r && 200 === o.statusCode && (a = JSON.parse(a), a.baseresponse))
                            if (0 == a.baseresponse.errcode) try { n.data = JSON.parse(a.data), n.errMsg = "operateWXData:ok" } catch (u) { n.errMsg = "operateWXData:fail" } else if (a.baseresponse.errcode == -12e3) {
                                    var l, f = function() {
                                        l = S++;
                                        var r = function o(r, s, a) {
                                            n.errMsg = a ? "operateWXData:ok" : "operateWXData:cancel";
                                            var p = s[0];
                                            if (a && p.checked) {
                                                var u = { data: JSON.stringify(t.data || {}), grant_scope: p.scope };
                                                request({ url: urlConfig.jsOperateWXDATAURL + "?appid=" + e, method: "post", body: JSON.stringify(u), needToken: 1 }, function(e, t, r) {
                                                    var s = {};
                                                    if (!e && 200 === t.statusCode && (r = JSON.parse(r), r.baseresponse && 0 === r.baseresponse.errcode)) try { s.data = JSON.parse(r.data), s.errMsg = "operateWXData:ok" } catch (o) { s.errMsg = "operateWXData:fail" }
                                                    s.errMsg || (s.errMsg = "operateWXData:fail; "), i(s)
                                                })
                                            } else i(n);
                                            webviewStores.removeListener("AUTHORIZE_SDK_RETURN_" + r, o)
                                        };
                                        return webviewStores.on("AUTHORIZE_SDK_RETURN_" + l, r), s.getSimulatorActions("S_AUTHORIZE_SDK", s.state.currentWebviewID, { authorizeSdkId: l, url: a.appicon_url + "/0", appname: a.appname, scope_list: [a.scope] }), { v: void 0 }
                                    }();
                                    if ("object" === ("undefined" == typeof f ? "undefined" : _typeof(f))) return f.v
                                } else p = a.baseresponse.errmsg;
                        n.errMsg || (n.errMsg = "operateWXData:fail; " + p), i(n)
                    })
                }();
                else if ("authorize" === e) ! function() {
                    var e = "";
                    if (s.props.project) {
                        var t = s.props.project;
                        e = t.appid
                    }
                    var o = r.args,
                        a = { scope: o.scope || [] };
                    request({ url: urlConfig.jsAuthorizeURL + "?appid=" + e, method: "post", body: JSON.stringify(a), needToken: 1 }, function(t, r, o) {
                        var a = {},
                            n = "";
                        if (!t && 200 === r.statusCode && (o = JSON.parse(o), o.baseresponse))
                            if (a.body = o, 0 == o.baseresponse.errcode) a.errMsg = "authorize:ok";
                            else if (o.baseresponse.errcode == -12e3) {
                            var p, u = function() {
                                p = S++;
                                var t = function r(t, s, o) {
                                    if (a.errMsg = o ? "authorize:ok" : "authorize:cancel", o) {
                                        for (var n = [], p = 0; p < s.length; ++p) {
                                            var u = s[p];
                                            u.checked && n.push(u.scope)
                                        }
                                        console.log(s);
                                        var l = { scope: n };
                                        request({ url: urlConfig.jsAuthorizeConfirmURL + "?appid=" + e, method: "post", body: JSON.stringify(l), needToken: 1 }, function(e, t, r) {
                                            var s = {};
                                            e || 200 !== t.statusCode || (r = JSON.parse(r), r.baseresponse && 0 === r.baseresponse.errcode && (s.errMsg = "authorize:ok")), s.errMsg || (s.errMsg = "authorize:fail; "), i(s)
                                        })
                                    } else i(a);
                                    webviewStores.removeListener("AUTHORIZE_SDK_RETURN_" + t, r)
                                };
                                return webviewStores.on("AUTHORIZE_SDK_RETURN_" + p, t), s.getSimulatorActions("S_AUTHORIZE_SDK", s.state.currentWebviewID, { authorizeSdkId: p, url: o.appicon_url + "/0", appname: o.appname, scope_list: o.scope_list }), { v: void 0 }
                            }();
                            if ("object" === ("undefined" == typeof u ? "undefined" : _typeof(u))) return u.v
                        } else n = o.baseresponse.errmsg;
                        a.errMsg || (a.errMsg = "authorize:fail; " + n), i(a)
                    })
                }();
                else if ("chooseImage" === e || "chooseVideo" === e) {
                    var D = "chooseImage" === e ? "image/*" : "video/*";
                    app_tools.chooseFile({
                        accept: D,
                        multiple: !0,
                        sucCall: function(t) {
                            var r = s.props.project,
                                o = t.target.value.split(";"),
                                a = o.length;
                            if (a > 9) return void i({ errmsg: e + ":fail" });
                            var c = [];
                            o.forEach(function(e) { c.push(file.copyFileToTemp(e, r.hash)) });
                            var p = { errMsg: e + ":ok", tempFilePaths: c };
                            i(p)
                        },
                        cancelCall: function(t) {
                            var r = { errMsg: e + ":fail" };
                            i(r)
                        }
                    })
                }
            },
            _upWebviewStatus: function(e, t) { this.upCurrentWebviewURL(t.url) },
            isTabWebview: function(e) {
                var t = tools.getFileNameFromUrl(e, this.props.project),
                    r = this.state.tabBar,
                    i = r.list || [],
                    s = !!i.find(function(e) {
                        return e.pagePath === t.replace(/\.wxml$/, "")
                    });
                return s
            },
            upCurrentWebviewURL: function(e) {
                if (this.props.project && "about:blank" !== e) {
                    var t = this.isTabWebview(e),
                        r = webviewStores.getOffset();
                    t && (r.height = r.height - 45), this.setState({ showTabBar: !!t, offset: r })
                }
            },
            addAsWebview: function(e) { this.asWebviewID = e },
            getSimulatorActions: function(e, r, i) {
                var s = { currentWebviewID: this.state.currentWebviewID };
                if (simulatorActions(e, r, i, s), "S_CHANGE_CURRENT_WEBVIEW" === e) {
                    var o = i.webviewID;
                    if (o === this.state.currentWebviewID) {
                        var a = ReactDOM.findDOMNode(this.refs["webview" + o]),
                            n = a.querySelector("webview"),
                            c = n.src;
                        this.upCurrentWebviewURL(c), p.changeUrl(c, o)
                    }
                }
            },
            componentDidMount: function() { webviewStores.on("WEBVIEW_SDK", this._webviewSDK), webviewStores.on("CHANGE_WEBVIEW_ID", this._changeWebviewID), webviewStores.on("SET_WEBVIEW_INFO", this._setWebviewInfo), webviewStores.on("AS_PUBLISH", this._postMessageToAllWebview), webviewStores.on("SEND_AS_SDK", this._asSdk), webviewStores.on("SET_WEBVIEW_SNAPSHOT", this._setWebviewSnapshot), webviewStores.on("UP_WEBVIEW_STATUS", this._upWebviewStatus) },
            componentWillUnmount: function() { webviewStores.removeListener("WEBVIEW_SDK", this._webviewSDK), webviewStores.removeListener("CHANGE_WEBVIEW_ID", this._changeWebviewID), webviewStores.removeListener("SET_WEBVIEW_INFO", this._setWebviewInfo), webviewStores.removeListener("AS_PUBLISH", this._postMessageToAllWebview), webviewStores.removeListener("SEND_AS_SDK", this._asSdk), webviewStores.removeListener("SET_WEBVIEW_SNAPSHOT", this._setWebviewSnapshot), webviewStores.removeListener("UP_WEBVIEW_STATUS", this._upWebviewStatus) },
            render: function() {
                var t = [];
                for (var a in this.state.list) {
                    var n = a == this.state.currentWebviewID ? {} : l.webviewDisplayNone,
                        c = this.state.list[a],
                        p = this.isTabWebview(c.href);
                    t.push(React.createElement("div", { key: a, style: n }, 
                    	React.createElement(webview, { project: this.props.project, offset: this.state.offset, ref: "webview" + a, isMatch: p, href: c.href, config: c.config, hideBack: !!c.hideBack, webviewID: a, goBack: this.goBack, addAsWebview: this.addAsWebview, getSimulatorActions: this.getSimulatorActions, postAppRoute: this.postAppRoute })))
                }
                var u = { width: this.state.offset.width, margin: "0 auto" };
                return React.createElement("div", { className: "simulator-wrapper" }, 
                	React.createElement(toolbar, { getSimulatorActions: this.getSimulatorActions, list: this.state.list, currentWebviewID: this.state.currentWebviewID }), 
                	React.createElement(scanDialog, { currentWebviewID: this.state.currentWebviewID }), 
                	t, 
                	React.createElement("div", { style: u }, 
                		React.createElement(webviewtab, { project: this.props.project, _openNewWindowWebview: this._openNewWindowWebview, tabBar: this.state.tabBar, showTabBar: this.state.showTabBar, currentWebviewID: this.state.currentWebviewID })), 
                	React.createElement(webviewBackwardMask, null))
            }
        });
    _exports = _
}
var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    },
    _typeof = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function(e) {
        return "undefined" == typeof e ? "undefined" : _typeof2(e)
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : "undefined" == typeof e ? "undefined" : _typeof2(e)
    },
    _exports;
init(), module.exports = _exports;
