"use strict";

function init() {
    var t = require("../../lib/react.js"),
        e = require("../../cssStr/cssStr.js"),
        i = require("../../stores/webviewStores.js"),
        a = require("../../stores/windowStores.js"),
        s = require("../../actions/leftviewActions.js"),
        o = require("../../weapp/utils/tools.js"),
        r = require("../../common/log/log.js"),
        n = require("path"),
        l = require("fs"),
        c = t.createClass({
            displayName: "WebviewHeader",
            getInitialState: function() {
                return { webviewID: parseInt(this.props.webviewID), canGoBack: !1, title: "", titleColor: {}, left: "", right: "", backgroundColor: {}, showBarLoading: !1 }
            },
            titleLock: !1,
            _upWebviewStatus: function(t, e) { this.titleLock && delete e.title, r.info("WebviewHeader.js UP_WEBVIEW_STATUS webviewID:" + t + " data:" + JSON.stringify(e)), 0 !== t && (e.canGoBack = !0), Object.assign(this.state, e), this.setState(this.state) },
            _cleanWebview: function() {
                var t = this.state.webviewID;
                r.info("WebviewHeader.js _cleanWebview webviewID:" + t), this.titleLock = !1, this.setState({ left: "", right: "", backgroundColor: {}, titleColor: {}, showBarLoading: !1 })
            },
            _setInterfaceFromPageFrame: function(t) {
                var e = t.name,
                    i = decodeURI(t.value);
                if ("sdk-barBackgroundColor" === e) this.setState({ backgroundColor: { backgroundColor: i } });
                else if ("sdk-barColor" === e) {
                    var a = this.state.left || {},
                        s = this.state.right || {};
                    a.color = s.color = i, this.setState({ titleColor: { color: i }, left: a, right: s })
                } else if ("sdk-barLeftButtonText" === e) {
                    var o = this.state.left || {};
                    o.text = i, this.setState({ left: o })
                } else if ("sdk-barRightButtonText" === e) {
                    var r = this.state.right || {};
                    r.text = i, this.setState({ right: r })
                } else "sdk-barTitle" === e ? (this.titleLock = !0, this.setState({ title: i })) : "sdk-showNavigationBarLoading" === e ? this.setState({ showBarLoading: !0 }) : "sdk-hideNavigationBarLoading" === e && this.setState({ showBarLoading: !1 })
            },
            _setInterfaceRes: function(t, e, i, a) {
                if (i) {
                    r.info("WebviewHeader.js SET_INTERFACE_RES webviewID:" + t + " " + e);
                    var s = a.args;
                    if ("setNavigationBarButtons" === e) {
                        var o = s.left || "",
                            n = s.right || "";
                        this.setState({ left: o, right: n })
                    } else if ("setNavigationBarColor" === e) {
                        var l = s.color;
                        this.setState({ backgroundColor: { backgroundColor: l } })
                    } else if ("setPageTitle" === e) {
                        var c = s.title,
                            h = s.color;
                        this.titleLock = !0;
                        var g = { title: c };
                        h && (g.color = h), this.setState(g)
                    } else "enableFullScreen" === e ? this.props.enableFullScreen(t, !0) : "showNavigationBarLoading" === e ? this.setState({ showBarLoading: !0 }) : "hideNavigationBarLoading" === e && this.setState({ showBarLoading: !1 })
                }
            },
            _changeUrl: function(t, e) {
                if (e == this.state.webviewID) {
                    var i = {},
                        a = {},
                        s = {},
                        r = t.match(/\/(([^\/\?]*)(\?([^\/]*))?)$/);
                    if (null !== r && null !== r[1]) {
                        var c = o.getFileNameFromUrl(t, this.props.project).replace(/\.wxml/, "");
                        try {
                            var h = o.getProjectConfig(this.props.project);
                            i = h.window || {}, a = h.pages || [], a.indexOf(c) !== -1 && (s = JSON.parse(l.readFileSync(n.join(this.props.project.projectpath, c + ".json"), "utf8")))
                        } catch (g) {}
                        this.setState({ title: s.navigationBarTitleText || i.navigationBarTitleText, navigationBarTextStyle: s.navigationBarTextStyle || i.navigationBarTextStyle, navigationBarBackgroundColor: s.navigationBarBackgroundColor || i.navigationBarBackgroundColor })
                    }
                }
            },
            componentDidMount: function() {
                var t = this.state.webviewID;
                i.on("SET_INTERFACE_RES_" + t, this._setInterfaceRes), a.on("CHANGE_WEBVIEW_URL", this._changeUrl), i.on("UP_WEBVIEW_STATUS_" + t, this._upWebviewStatus), i.on("CLEAN_WEBVIEW_" + t, this._cleanWebview), i.on("SET_INTERFACT_FROMPAGEFRAME_" + t, this._setInterfaceFromPageFrame)
            },
            componentWillUnmount: function() {
                var t = this.state.webviewID;
                i.removeListener("CLEAN_WEBVIEW_" + t, this._cleanWebview), i.removeListener("SET_INTERFACE_RES_" + t, this._setInterfaceRes), i.removeListener("UP_WEBVIEW_STATUS_" + t, this._upWebviewStatus), i.removeListener("SET_INTERFACT_FROMPAGEFRAME_" + t, this._setInterfaceFromPageFrame), a.removeListener("CHANGE_WEBVIEW_URL", this._changeUrl)
            },
            handleRightClick: function() { s.clickRightHeader(this.state.webviewID) },
            goBack: function(t) { this.props.goBack() },
            render: function() {
                var i = { width: this.props.offset.width },
                    a = !this.props.hideBack && this.state.canGoBack ? {} : e.visibilityHidden;
                0 == this.props.webviewID && this.props.project && (a = e.visibilityHidden);
                var s = this.props.project ? e.visibilityHidden : {},
                    o = { color: this.state.navigationBarTextStyle || "white" };
                return this.state.navigationBarBackgroundColor && (i.backgroundColor = this.state.navigationBarBackgroundColor), t.createElement("div", { style: i, className: "simulator-hd" }, t.createElement("div", { onClick: this.goBack, style: a, className: "simulator-hd-back" }, t.createElement("i", { className: "simulator-hd-back-icon" }), t.createElement("span", { style: o }, "返回")), t.createElement("h3", { className: "simulator-hd-title", style: o }, this.state.showBarLoading ? t.createElement("i", { className: "simulator-hd-title-loading" }) : "", this.state.title), t.createElement("div", { style: s, onClick: this.props.showFooter, className: "simulator-hd-option" }, t.createElement("i", { className: "simulator-hd-option-icon" })))
            }
        });
    _exports = c
}
var _exports;
init(), module.exports = _exports;
