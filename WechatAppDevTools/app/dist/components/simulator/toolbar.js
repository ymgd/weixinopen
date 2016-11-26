"use strict";

function init() {
    var t = require("../../lib/react.js"),
        e = require("../../cssStr/cssStr.js"),
        s = require("./devicemodules.js"),
        o = require("./network.js"),
        i = require("../../stores/windowStores.js"),
        r = require("../../actions/windowActions.js"),
        a = "toolstabs",
        l = t.createClass({
            displayName: "ToolBar",
            getInitialState: function() {
                return { showItems: !1, showMask: !1 }
            },
            _clickToolsbar: function(t) { a != t && this.setState({ showItems: !1 }) },
            componentDidMount: function() { i.on("CLICK_TOOLSBAR", this._clickToolsbar) },
            componentWillUnmount: function() { i.removeListener("CLICK_TOOLSBAR", this._clickToolsbar) },
            showItems: function n(t) {
                t.stopPropagation();
                var n = !this.state.showItems;
                if (n)
                    for (var e in this.props.list) this.props.getSimulatorActions("S_SET_ACTION", parseInt(e), { act: "CAPTURE" });
                this.setState({ showItems: n }), r.clickToolsbar(a)
            },
            clickItems: function(t) {
                t.stopPropagation();
                var e = t.currentTarget,
                    s = e.dataset,
                    o = parseInt(s.webviewid);
                this.setState({ webviewID: o }), this.props.getSimulatorActions("S_CHANGE_CURRENT_WEBVIEW", null, { webviewID: o })
            },
            render: function() {
                var i = this.props.list,
                    r = this.props.currentWebviewID,
                    a = Object.keys(i).length,
                    l = a > 1 ? {} : e.displayNone,
                    n = this.state.showMask ? {} : e.displayNone,
                    c = [];
                for (var m in i) {
                    var u = "simulator-toolbar-tabs-item " + (m == r ? " simulator-toolbar-tabs-item-current" : "");
                    c.push(t.createElement("div", { onClick: this.clickItems, className: u, "data-webviewid": m, key: m }, t.createElement("img", { src: i[m].dataURI })))
                }
                var p = this.state.showItems ? {} : e.displayNone;
                return t.createElement("div", { className: "simulator-toolbar" }, t.createElement(s, { getSimulatorActions: this.props.getSimulatorActions }), t.createElement(o, null), t.createElement("div", { onClick: this.showItems, className: "simulator-toolbar-tabs", style: l }, t.createElement("p", null, "正在调试", a, "个页面"), t.createElement("i", { className: "simulator-toolbar-model-icon-down" }), t.createElement("div", { className: "simulator-toolbar-tabs-content", style: p }, c)), t.createElement("div", { style: n, className: "simulator-toolbar-mask" }))
            }
        });
    _exports = l
}
var _exports;
init(), module.exports = _exports;
