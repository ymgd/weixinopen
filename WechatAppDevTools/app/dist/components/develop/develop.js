"use strict";

function init() {
    var React = require("../../lib/react.js"),
        Simulator = require("../simulator/controller.js"),
        Debugger = require("../debugger/debugger.js"),
        cssStr = require("../../cssStr/cssStr.js"),
        projectStores = require("../../stores/projectStores.js"),
        Develop = React.createClass({
            displayName: "Develop",
            getInitialState: function() {
                return { project: !!this.props.project }
            },
            _restart: function() {
                var e = this;
                this.setState({ project: !1 }, function() { e.setState({ project: !0 }) })
            },
            componentDidMount: function() { projectStores.on("RESTART_PROJECT", this._restart) },
            componentWillUnmount: function() { projectStores.removeListener("RESTART_PROJECT", this._restart) },
            render: function() {
                var o = this.props.show,
                    i = "debug" === o ? {} : Object.assign({}, cssStr.webviewDisplayNone),
                    p = void 0;
                return this.props.project ? 
                this.state.project ? (p = React.createElement(Simulator, { project: this.props.project }), i.marginTop = -52) : p = "" : 
                p = React.createElement(Simulator, { project: this.props.project }), 
                React.createElement("div", { className: "develop", style: i }, 
                	p, 
                	React.createElement(Debugger, { project: this.props.project, propshow: o })
                	)
            }
        });
    _exports = Develop
}
var _exports;
init(), module.exports = _exports;
