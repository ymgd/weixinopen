"use strict";

function init() {
    var e = require("../../lib/react.js"),
        t = require("../../cssStr/cssStr.js"),
        s = require("../../stores/webviewStores.js"),
        r = (require("../../config/config.js"), require("../../stores/projectStores.js"), require("../../weapp/utils/tools.js")),
        i = (require("url"), e.createClass({
            displayName: "Tab",
            getInitialState: function() {
                var e = this,
                    t = "",
                    s = 0;
                return this.props.project && ! function() {
                    var i = e.props.project;
                    t = r.getWeappURL(i, { justHost: !0 });
                    var a = r.getWeappURL(i),
                        o = e.props.tabBar.list || [],
                        n = r.getFileNameFromUrl(a, i);
                    n = n.replace(".wxml", ""), s = o.findIndex(function(e) {
                        return e.pagePath === n
                    })
                }(), { href: t, selectedIdx: s, webviewIds: [], show: !1 }
            },
            _didMount: function() { this.setState({ show: !0 }) },
            componentDidMount: function() { this.state.webviewIds[this.state.selectedIdx] = this.props.currentWebviewID, s.on("APPSERVICE_INIT", this._didMount) },
            componentWillUnmount: function() { s.removeListener("APPSERVICE_INIT", this._didMount) },
            clickTab: function(e) {
                var t = this.props.tabBar,
                    s = t.list || [],
                    r = this.state.webviewIds || [],
                    i = this.state.selectedIdx;
                if (i !== e) {
                    var a = this.props._openNewWindowWebview,
                        o = s[e].pagePath + ".wxml",
                        n = a({ webviewID: r[e], url: o });
                    r[e] = n, this.setState({ selectedIdx: e, webviewIds: r, tabBar: { list: s } })
                }
            },
            render: function() {
                var s = this.props.tabBar,
                    r = this.props.showTabBar,
                    i = s.list || [],
                    a = r && i.length <= 5 && i.length >= 2 ? {} : Object.assign({}, t.displayNone);
                a.backgroundColor = s.backgroundColor, a.borderColor = "white" === s.borderStyle ? "white" : "black", a.color = s.color, a.visibility = this.state.show ? "visible" : "hidden";
                var o = [];
                for (var n in i) {
                    n *= 1;
                    var l = i[n],
                        c = n == this.state.selectedIdx && s.selectedColor ? { color: s.selectedColor } : { color: s.color },
                        d = n == this.state.selectedIdx ? l.selectedIconPath : l.iconPath,
                        p = d ? {} : t.displayNone;
                    l.key = l.key || Math.random(), d = d ? this.state.href + d : "", d && (d = d + "?r=" + Math.random()), o.push(e.createElement("a", { className: "tabbar-item", href: "javascript:;", onClick: this.clickTab.bind(this, n), key: l.key }, e.createElement("img", { className: "tabbar-icon", style: p, src: d }), e.createElement("p", { className: "tabbar-label", style: c }, l.text)))
                }
                return e.createElement("div", { className: "tabbar", style: a }, o)
            }
        }));
    _exports = i
}
var _exports;
init(), module.exports = _exports;
