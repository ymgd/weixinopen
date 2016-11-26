"use strict";

function init() {
    var e, t = require("../../lib/react.js"),
        a = require("../../cssStr/cssStr.js"),
        i = require("../../actions/webviewActions.js"),
        s = require("../../actions/windowActions.js"),
        r = require("../../actions/projectActions.js"),
        l = require("../../stores/projectStores.js"),
        c = require("./music.js"),
        n = require("./cache.js"),
        o = require("../../utils/newReport.js"),
        d = t.createClass({
            displayName: "Sidebar",
            getInitialState: function() {
                return this.props.project && o("project_debug", this.props.project.appid), { active: "debug", inForeground: !0 }
            },
            _restart: function() { this.setState({ active: "debug", inForeground: !0 }), this.props.optProject("debug") },
            componentDidMount: function() { l.on("RESTART_PROJECT", this._restart) },
            componentWillUnmount: function() { l.removeListener("RESTART_PROJECT", this._restart) },
            handleOnclick: function(e) {
                var t = e.currentTarget,
                    a = t.dataset,
                    i = a.type;
                this.setState({ active: i }), this.props.optProject(i), o("project_" + i, this.props.project.appid)
            },
            handleAppTerminate: function(e) { r.close(), o("project_" + close, this.props.project.appid) },
            handleAppRestart: function(t) {
                var a = this;
                clearTimeout(e), e = setTimeout(function() { r.restart(a.props.project), o("project_restart", a.props.project.appid) }, 200)
            },
            handleAppEnterBackground: function(e) { this.setState({ inForeground: !1 }), s.appEnterBackground(), i.postMessageToAS({ eventName: "onAppEnterBackground", type: "ON_APPLIFECYCLE_EVENT" }), o("project_background", this.props.project.appid) },
            handleAppEnterForeground: function(e) { this.setState({ inForeground: !0 }), s.appEnterForeground(), i.postMessageToAS({ eventName: "onAppEnterForeground", type: "ON_APPLIFECYCLE_EVENT" }) },
            handleCompile: function() { r.restart(this.props.project), this.props.optProject("debug"), o("project_compile", this.props.project.appid) },
            render: function() {
                var e = { detail: "sidebar-item", debug: "sidebar-item", edit: "sidebar-item", mobile: "sidebar-item" };
                if (e[this.state.active] = "sidebar-item sidebar-item-active", !this.props.project) return t.createElement("div", { className: "sidebar" }, t.createElement("div", { "data-type": "debug", onClick: this.handleOnclick, className: e.debug }, t.createElement("i", { className: "sidebar-item-icon sidebar-item-icon-debug" }), t.createElement("label", { className: "sidebar-item-label" }, "调试")), t.createElement("div", { "data-type": "mobile", onClick: this.handleOnclick, className: e.mobile }, t.createElement("i", { className: "sidebar-item-icon sidebar-item-icon-detail" }), t.createElement("label", { className: "sidebar-item-label" }, "手机")), t.createElement("div", { className: "sidebar-item sidebar-item-sep" }), t.createElement("div", { className: "sidebar-item-toolbar" }, t.createElement("div", { title: "返回", "data-type": "appTerminate", onClick: this.handleAppTerminate, className: "sidebar-item" }, t.createElement("i", { className: "sidebar-item-icon  sidebar-item-icon-close" }), t.createElement("label", { className: "sidebar-item-label" }, "返回"))));
                var i = this.state.inForeground ? {} : a.displayNone,
                    s = this.state.inForeground ? a.displayNone : {},
                    r = "debug" === this.state.active ? {} : a.displayNone,
                    l = "edit" === this.state.active ? {} : a.displayNone,
                    o = "debug" === this.state.active || "edit" === this.state.active ? { borderTop: "none" } : {};
                return t.createElement("div", { className: "sidebar" }, t.createElement("div", { "data-type": "edit", onClick: this.handleOnclick, className: e.edit }, t.createElement("i", { className: "sidebar-item-icon sidebar-item-icon-editor" }), t.createElement("label", { className: "sidebar-item-label" }, "编辑")), t.createElement("div", { "data-type": "debug", onClick: this.handleOnclick, className: e.debug }, t.createElement("i", { className: "sidebar-item-icon sidebar-item-icon-debug" }), t.createElement("label", { className: "sidebar-item-label" }, "调试")), t.createElement("div", { "data-type": "detail", onClick: this.handleOnclick, className: e.detail }, t.createElement("i", { className: "sidebar-item-icon sidebar-item-icon-detail" }), t.createElement("label", { className: "sidebar-item-label" }, "项目")), t.createElement("div", { className: "sidebar-item sidebar-item-sep" }), t.createElement("div", { className: "sidebar-item-toolbar", style: r }, t.createElement(c, null), t.createElement("div", { title: ("darwin" === process.platform ? "Command" : "Ctrl") + " + b", onClick: this.handleAppRestart, className: "sidebar-item" }, t.createElement("i", { className: "sidebar-item-icon  sidebar-item-icon-reset" }), t.createElement("label", { className: "sidebar-item-label" }, "重启")), t.createElement("div", { title: "切换到后台", "data-type": "appEnterBackground", onClick: this.handleAppEnterBackground, style: i, className: "sidebar-item" }, t.createElement("i", { className: "sidebar-item-icon sidebar-item-icon-backward" }), t.createElement("label", { className: "sidebar-item-label" }, "后台")), t.createElement("div", { title: "切换到前台", "data-type": "appEnterForeground", onClick: this.handleAppEnterForeground, style: s, className: "sidebar-item" }, t.createElement("i", { className: "sidebar-item-icon  sidebar-item-icon-forward" }), t.createElement("label", { className: "sidebar-item-label" }, "前台")), t.createElement(n, { project: this.props.project })), t.createElement("div", { className: "sidebar-item-toolbar", style: l }, t.createElement("div", { title: ("darwin" === process.platform ? "Command" : "Ctrl") + " + b", onClick: this.handleCompile, className: "sidebar-item" }, t.createElement("i", { className: "sidebar-item-icon  sidebar-item-icon-reset" }), t.createElement("label", { className: "sidebar-item-label" }, "编译"))), t.createElement("div", { className: "sidebar-item-toolbar", style: o }, t.createElement("div", { title: "关闭项目", "data-type": "appTerminate", onClick: this.handleAppTerminate, className: "sidebar-item" }, t.createElement("i", { className: "sidebar-item-icon  sidebar-item-icon-close" }), t.createElement("label", { className: "sidebar-item-label" }, "关闭"))))
            }
        });
    _exports = d
}
var _exports;
init(), module.exports = _exports;
