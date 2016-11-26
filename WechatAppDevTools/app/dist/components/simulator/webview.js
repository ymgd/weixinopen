"use strict";

function _defineProperty(e, t, o) {
    return t in e ? Object.defineProperty(e, t, { value: o, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = o, e
}

function init() {
    var e = require("../../lib/react.js"),
        t = require("../../lib/react-dom.js"),
        o = require("./webviewheader.js"),
        i = require("./webviewbody.js"),
        s = require("./webviewfooter.js"),
        r = require("./webviewloading.js"),
        h = require("./webviewshare.js"),
        a = require("../native/modal.js"),
        n = require("../native/toast.js"),
        w = require("../native/ActionSheet.js"),
        p = require("./webviewAuthorizeDialog.js"),
        l = require("../../stores/webviewStores.js"),
        c = e.createClass({
            displayName: "Webview",
            getInitialState: function() {
                return { showFooter: !1, showShare: !1, showAuthorizeDialog: !1, shareOpt: {}, webviewID: parseInt(this.props.webviewID), translateY: 0, transitionDelay: 0 }
            },
            goBack: function(e) {
                var o = this.state.webviewID,
                    i = t.findDOMNode(this.refs.container).querySelector(".webviewbody" + o);
                this.props.goBack(o, i, e)
            },
            showFooter: function u(e) {
                var u = void 0 === e ? !this.state.showFooter : e;
                this.setState({ showFooter: u })
            },
            showAuthorizeDialog: function(e) { this.setState({ showAuthorizeDialog: void 0 === e ? !this.state.showAuthorizeDialog : e }) },
            showShare: function(e) { this.setState({ showShare: e }) },
            _showShareWebview: function(e, t, o) { this.setState({ showShare: !0, showFooter: !1, shareOpt: { title: o.title, desc: o.desc || o.title, imgUrl: o.img_url, sdkName: t.sdkName } }) },
            _onStopPullDownRefresh: function() { this.setState({ transitionDelay: "0.3", translateY: 0 }) },
            componentDidMount: function() { l.on("SHOW_SHARE_WEBVIEW_" + this.state.webviewID, this._showShareWebview), l.on("STOP_PULL_DOWN_REFRESH", this._onStopPullDownRefresh) },
            componentWillUnmount: function() { l.removeListener("SHOW_SHARE_WEBVIEW_" + this.state.webviewID, this._showShareWebview), l.removeListener("STOP_PULL_DOWN_REFRESH", this._onStopPullDownRefresh) },
            render: function() {
                var t, l = this.props.offset,
                    c = { width: l.width, backgroundColor: this.props.config && this.props.config.backgroundColor || "#ffffff" },
                    u = { width: l.width, height: l.height, transition: "all " + this.state.transitionDelay + "s linear", transform: "translate3d(0," + this.state.translateY + "px,0)" };
                return e.createElement("div", { ref: "container", className: "simulator", style: c }, e.createElement(o, (t = { offset: l, webviewID: this.props.webviewID, goBack: this.goBack, hideBack: this.props.hideBack, showFooter: this.showFooter }, _defineProperty(t, "webviewID", this.props.webviewID), _defineProperty(t, "project", this.props.project), t)), e.createElement("div", { className: "simulator-bd", style: u }, e.createElement(r, { webviewID: this.props.webviewID }), e.createElement(h, { show: this.state.showShare, showShare: this.showShare, webviewID: this.props.webviewID, showFooter: this.showFooter, shareOpt: this.state.shareOpt, getSimulatorActions: this.props.getSimulatorActions }), e.createElement(i, { offset: l, goBack: this.goBack, href: this.props.href, webviewID: this.props.webviewID, addAsWebview: this.props.addAsWebview, project: this.props.project, getSimulatorActions: this.props.getSimulatorActions, postAppRoute: this.props.postAppRoute, isMatch: this.props.isMatch }), e.createElement(s, { offset: l, show: this.state.showFooter, showFooter: this.showFooter, webviewID: this.props.webviewID, getSimulatorActions: this.props.getSimulatorActions }), e.createElement(p, { getSimulatorActions: this.props.getSimulatorActions, show: this.state.showAuthorizeDialog, showAuthorizeDialog: this.showAuthorizeDialog, webviewID: this.props.webviewID }), e.createElement(w, null), e.createElement(n, { project: this.props.project }), e.createElement(a, null)))
            }
        });
    _exports = c
}
var _exports;
init(), module.exports = _exports;
