"use strict";

function init() {
    var React = require("../lib/react.js"),
        popup = require("./popup/popup.js"),
        menubar = require("./menubar/menubar.js"),
        toolbar = require("./toolbar/toolbar.js"),
        sidebar = require("./sidebar/sidebar.js"),
        develop = require("./develop/develop.js"),
        detail = require("./detail/detail.js"),
        setting = require("./setting/setting.js"),
        toast = require("./toast/toast.js"),
        edit = require("./edit/edit.js"),
        dialog = require("./dialog/dialog.js"),
        about = require("./about/about.js"),
        windowStores = require("../stores/windowStores.js"),
        mobile = require("./mobile/mobile.js"),
        Main = React.createClass({
            displayName: "Main",
            getInitialState: function() {
                return { show: "debug", showSetting: !1 }
            },
            optProject: function(e) { this.setState({ show: e }) },
            showSetting: function() { this.setState({ showSetting: !this.state.showSetting }) },
            componentDidMount: function() { windowStores.on("SHOW_SETTING", this.showSetting) },
            render: function() {
                return React.createElement("div", { className: "main" }, 
                    React.createElement(menubar, { appQuit: this.props.appQuit, appMin: this.props.appMin, appMax: this.props.appMax, showSetting: this.showSetting, project: this.props.project }), 
                    React.createElement(toolbar, { project: this.props.project }), 
                    React.createElement("div", { className: "body" }, 
                        React.createElement(sidebar, { project: this.props.project, optProject: this.optProject }), 
                        React.createElement(develop, { show: this.state.show, optDebugger: this.optDebugger, project: this.props.project }), 
                        React.createElement(edit, { show: this.state.show, project: this.props.project }), 
                        React.createElement(detail, { project: this.props.project, show: this.state.show }), 
                        React.createElement(mobile, { show: this.state.show })), 
                    React.createElement(toast, null), 
                    React.createElement(setting, { show: this.state.showSetting, showSetting: this.showSetting }), 
                    React.createElement(dialog, null), 
                    React.createElement(popup, null), 
                    React.createElement(about, null))
            }
        });
    _exports = Main
}
var _exports;
init(), module.exports = _exports;
