"use strict";

function init() {
    var e = require("../../lib/react.js"),
        t = require("../devtools/devtools.js"),
        s = require("../mobile/mobile.js"),
        r = require("../appservice/appservice.js"),
        o = (require("../../cssStr/cssStr.js"), e.createClass({
            displayName: "Debugger",
            getInitialState: function() {
                return { show: this.props.project ? "appservice" : "devtools" }
            },
            changeShow: function(e) {
                var t = e.currentTarget,
                    s = t.dataset,
                    r = s.type;
                this.setState({ show: r })
            },
            render: function() {
                var o = (this.state.show, this.props.project),
                    a = "";
                return o && (a = e.createElement(r, { show: this.state.show, project: this.props.project, propshow: this.props.propshow })), e.createElement("div", { className: "debugger" }, e.createElement("div", { className: "debugger-tab" }, e.createElement("div", { className: "debugger-tab-bd" }, e.createElement(t, { show: this.state.show }), a, e.createElement(s, { show: this.state.show }))))
            }
        }));
    _exports = o
}
var _exports;
init(), module.exports = _exports;
