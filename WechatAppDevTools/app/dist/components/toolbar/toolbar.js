"use strict";

function init() {
    var e = require("../../lib/react.js"),
        t = require("./userinfo.js"),
        r = require("./projectinfo.js"),
        o = require("./urlbar.js"),
        n = require("./clearbutton.js"),
        s = require("../../stores/windowStores.js"),
        i = e.createClass({
            displayName: "Toolbar",
            getInitialState: function() {
                var e = s.getUserInfo();
                return { userInfo: e }
            },
            _upDataUserInfo: function(e) { this.setState({ uesrInfo: e }) },
            componentDidMount: function() { s.on("UPDATA_USER_INFO", this._upDataUserInfo) },
            componentWillUnmount: function() { s.removeListener("UPDATA_USER_INFO", this._upDataUserInfo) },
            render: function() {
                var s = this.props.project;
                return s ? e.createElement("div", { className: "toolbar" }, e.createElement(t, { userInfo: this.state.userInfo })) : e.createElement("div", { className: "toolbar" }, e.createElement(t, { userInfo: this.state.userInfo }), e.createElement(r, { project: this.props.project }), e.createElement(o, { project: this.props.project }), e.createElement(n, null))
            }
        });
    _exports = i
}
var _exports;
init(), module.exports = _exports;
