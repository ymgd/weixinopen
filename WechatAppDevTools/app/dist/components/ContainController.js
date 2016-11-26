"use strict";

function init() {
    var t = require("../lib/react.js"),
        e = require("../actions/windowActions.js"),
        i = require("../stores/windowStores.js"),
        o = require("../stores/webviewStores.js"),
        n = require("../stores/projectStores.js"),
        r = require("../common/log/log.js"),
        a = require("./lunch/lunch.js"),
        s = require("./Create/create.js"),
        l = require("./main.js"),
        c = require("../utils/newReport.js"),
        p = {},
        u = t.createClass({
            displayName: "ContainController",
            getInitialState: function() {
                var t = !!Object.keys(i.getUserInfo()).length,
                    e = !!t && global.appConfig.url;
                return t && e && global.Win.maximize(), { hasLogin: t, commonUrl: e, project: "" }
            },
            goToLogin: function() { this.setState({ hasLogin: !1, commonUrl: !1, project: "" }), global.Win.restore() },
            componentDidMount: function() {
                var t = this;
                global.Win.on("maximize", function() { p = { maxHeight: global.Win.height, maxWidth: global.Win.width } }), i.on("UPDATA_USER_INFO", function(e) {
                    var i = !!Object.keys(e).length;
                    i ? t.setState({ hasLogin: !0 }) : setTimeout(function() { t.goToLogin() }, 50)
                }), o.on("NOT_LOGIN", this.goToLogin), o.on("INVALID_LOGIN", this.goToLogin), n.on("CLOSE_PROJECT", function() { t.setState({ project: "", commonUrl: "" }), global.Win.restore() }), n.on("DEL_PROJECT", function() { t.setState({ project: "", commonUrl: "" }), global.Win.restore() })
            },
            handleOnClick: function(t) { e.bodyClick(t) },
            appQuit: function() { r.info("ContainController.js exit"), nw.App.quit() },
            appMax: function() { global.Win.width !== p.maxWidth || global.Win.height !== p.maxHeight ? global.Win.maximize() : global.Win.restore() },
            appMin: function() { global.Win.minimize() },
            goMain: function(t) {
                var e = this;
                t ? n.setProjectConfig(t, function(i) {
                    return i ? void alert(i) : (e.setState({ commonUrl: !1, project: t }), void global.Win.maximize())
                }) : (this.setState({ commonUrl: !0, project: "" }), global.Win.maximize());
                t ? c("project_open", t.appid) : c("url_open")
            },
            render: function() {
                var e = void 0;
                return e = this.state.commonUrl || this.state.project ? t.createElement(l, { project: this.state.project, appQuit: this.appQuit, appMax: this.appMax, appMin: this.appMin }) : this.state.hasLogin ? t.createElement(s, { appQuit: this.appQuit, goMain: this.goMain }) : t.createElement(a, { appQuit: this.appQuit }), t.createElement("div", { onClick: this.handleOnClick }, e)
            }
        });
    _exports = u
}
var _exports;
init(), module.exports = _exports;
