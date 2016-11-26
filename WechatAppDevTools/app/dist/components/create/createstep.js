"use strict";

function init() {
    function e(e) { alert(e) }
    var t = require("../../lib/react.js"),
        a = (require("../../utils/tools.js"), require("../../cssStr/cssStr.js")),
        r = require("path"),
        i = require("../../utils/newReport.js"),
        s = require("../../config/urlConfig.js"),
        o = require("../../common/request/request.js"),
        c = (require("../../stores/webviewStores.js"), require("../../common/log/log.js")),
        n = require("glob"),
        p = require("../../config/errcodeConfig.js"),
        l = (require("../../actions/windowActions.js"), require("../../stores/projectStores.js")),
        m = require("../../actions/projectActions.js"),
        d = ".wxwx",
        u = "touristappid",
        h = t.createClass({
            displayName: "Createstep",
            getInitialState: function() {
                return { projectpath: "", appid: "", appname: "", error: "", saveBtnDisable: !0, showQuickStart: !1, checked: !0, showLoading: !1, isTourist: !1 }
            },
            chooseDir: function() {
                var e = this,
                    t = document.createElement("input");
                t.setAttribute("type", "file"), t.setAttribute("nwdirectory", !0), t.style.display = "none", global.contentDocumentBody.appendChild(t), t.addEventListener("change", function(a) {
                    n("*", { cwd: t.value }, function(a, i) {
                        var s = 0 === i.length;
                        e.setState({ projectpath: t.value, showQuickStart: s, verify: 1 === i.length && r.extname(i[0]) === d })
                    }), global.contentDocumentBody.removeChild(t)
                }), t.addEventListener("cancel", function(e) { global.contentDocumentBody.removeChild(t) }), t.click()
            },
            editAppid: function(e) {
                var t = e.target,
                    a = t.value;
                this.setState({ appid: a })
            },
            editAppname: function(e) {
                var t = e.target,
                    a = t.value;
                this.setState({ appname: a })
            },
            tourist: function() { this.setState({ isTourist: !this.state.isTourist }) },
            addProject: function() {
                var t = this,
                    a = this.state.projectpath,
                    r = this.state.isTourist,
                    n = r ? u : this.state.appid,
                    d = encodeURIComponent(this.state.appname);
                if (!n) return void e("请填写 appid ");
                if (!d) return void e("请填写 项目名称 ");
                if (!a) return void e("请选择 项目目录 ");
                var h = n + "_" + d,
                    f = this.props.projectLists.find(function(e) {
                        return e.projectid === h
                    });
                if (f) return void this.setState({ projectpath: "", appid: "", appname: "", saveBtnDisable: !0, error: "已存在 " + n + " " + decodeURIComponent(f.appname) + " 项目，请重新输入" });
                var v = this.state.showQuickStart && this.state.checked;
                this.setState({ showLoading: !0 });
                var g = { projectpath: "", appid: "", appname: "", error: "", saveBtnDisable: !0, showLoading: !1, verify: !1, isTourist: !1 };
                if (r) {
                    var j = { appid: n, appname: d, projectpath: a, projectid: h, app_head_img: "", is_admin: !1, isTourist: !0 };
                    m.add(j, v), i("project_createsuc", n), this.setState(g), this.props.goMain(j), o({ url: s.touristCreateURL + "?appid=" + n, needToken: 1 })
                } else o({ url: s.createWeappURL + "?appid=" + n, needToken: 1 }, function(r, s, o) {
                    if (r) c.error("createstep.js create  " + r.toString()), t.setState({ showLoading: !1 }), e(r.toString());
                    else {
                        t.setState({ showLoading: !1 }), c.info("createstep.js create  " + o);
                        var u = JSON.parse(o),
                            j = u.baseresponse,
                            b = j ? parseInt(j.errcode) : 0;
                        if (b === p.DEV_App_Not_Band) return e("当前开发者未绑定此 appid ，请到 mp 后台操作后重试"), nw.Shell.openExternal("https://mp.weixin.qq.com/"), void c.error("createstep.js create project error " + b);
                        if (0 === b) {
                            var E = u.app_head_img ? u.app_head_img + "/0" : "";
                            return f = { appid: n, appname: d, projectpath: a, projectid: h, app_head_img: E, is_admin: u.is_admin, isTourist: !1 }, void(t.state.verify ? l.addVerifyProject(f, function(a) {
                                return a ? (e(a.toString()), void c.error("createstep.js addVerifyProject error " + a.toString())) : (t.setState(g), void t.props.goMain(f))
                            }) : (m.add(f, v), i("project_createsuc", n), t.setState(g), t.props.goMain(f)))
                        }
                        var N = o || "系统错误";
                        e(N)
                    }
                })
            },
            changeCheckbox: function(e) {
                var t = e.target.checked;
                this.setState({ checked: t })
            },
            render: function() {
                var e = this.props.show ? {} : a.displayNone,
                    r = this.state.showQuickStart ? {} : a.visibilityHidden,
                    i = this.props.createBack,
                    s = this.state.isTourist,
                    o = s ? "无 AppID 部分功能受限" : this.state.appid,
                    c = s ? "" : "填写小程序AppID ",
                    n = s ? "返回填写小程序AppID" : "无 AppID ",
                    p = this.state.showLoading ? "create-form-button-primary detail-upload-dialog-button-primary-loading" : "create-form-button-primary";
                return t.createElement("div", { className: "create-step2", style: e }, t.createElement("div", { className: "create-toolbar app-drag" }, t.createElement("a", { onClick: i, href: "javascript:;", className: "create-toolbar-close app-no-drag" }, t.createElement("i", { className: "create-toolbar-back-icon" }), t.createElement("span", null, "返回"))), t.createElement("div", { className: "create-body" }, t.createElement("div", { className: "create-name" }, "添加项目"), t.createElement("div", { className: "create-form" }, t.createElement("div", { className: "create-form-item" }, t.createElement("label", { htmlFor: "", className: "create-form-label" }, "AppID"), t.createElement("div", { className: "create-form-input-box" }, t.createElement("input", { value: o, onChange: this.editAppid, type: "text", className: "create-form-input", disabled: s }), t.createElement("p", { style: this.state.error ? a.displayNone : {}, className: "create-form-tips" }, c, t.createElement("a", { onClick: this.tourist, href: "javascript:;", className: "create-form-tourist" }, n)), t.createElement("p", { style: this.state.error ? {} : a.displayNone, className: "create-form-tips-warn" }, this.state.error))), t.createElement("div", { className: "create-form-item" }, t.createElement("label", { htmlFor: "", className: "create-form-label" }, "项目名称"), t.createElement("div", { className: "create-form-input-box" }, t.createElement("input", { value: this.state.appname, onChange: this.editAppname, type: "text", className: "create-form-input" }))), t.createElement("div", { className: "create-form-item" }, t.createElement("label", { htmlFor: "", className: "create-form-label" }, "项目目录"), t.createElement("div", { onClick: this.chooseDir, className: "create-form-input-box" }, t.createElement("input", { value: this.state.projectpath, disabled: "true", type: "text", className: "create-form-input create-form-input-with-pointer" }), t.createElement("p", { className: "create-form-tips" })), t.createElement("div", { className: "create-form-extra" }, t.createElement("a", { href: "javascript:;", onClick: this.chooseDir, className: "create-form-extra-button" }, "选择"))), t.createElement("div", { style: r, className: "create-quick-checkbox" }, t.createElement("input", { id: "quick-checkbox", onChange: this.changeCheckbox, checked: this.state.checked, type: "checkbox" }), t.createElement("label", { htmlFor: "quick-checkbox" }, "在当前目录中创建 quick start 项目"))), t.createElement("div", { className: "create-form-footer" }, t.createElement("a", { href: "javascript:;", className: "create-form-button-default", onClick: i }, "取消"), t.createElement("a", { onClick: this.addProject, href: "javascript:;", className: p }, "添加项目"))))
            }
        });
    _exports = h
}
var _exports;
init(), module.exports = _exports;
