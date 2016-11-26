"use strict";

function init() {
    function e(e) {
        var t = e ? new Date(e) : new Date;
        return t.toLocaleDateString() + " " + t.toLocaleTimeString()
    }

    function t(e) { c.showTipsMsg({ msg: e, type: "error" }) }
    var a = require("../../lib/react.js"),
        s = require("../../cssStr/cssStr.js"),
        i = (require("../../utils/tools.js"), require("../../weapp/commit/upload.js")),
        l = require("../../actions/projectActions.js"),
        r = require("../../common/log/log.js"),
        o = require("../../utils/newReport.js"),
        d = (require("../../stores/webviewStores.js"), require("../../stores/windowStores.js")),
        n = require("../../config/errcodeConfig.js"),
        c = require("../../actions/windowActions.js"),
        p = require("../../stores/projectStores.js"),
        m = a.createClass({
            displayName: "Detail",
            getInitialState: function() {
                var e = this.props.project,
                    t = e.isTourist,
                    a = localStorage["last-up-test-time-" + e.hash],
                    s = localStorage["last-up-load-time-" + e.hash];
                return { lastUploadTime: t ? "项目未关联AppID" : s ? s : "未上传", lastTestTime: t ? "项目未关联AppID" : a ? a : "未提交", showDailog: !1, desc: "", version: "", saveBtnClass: "detail-upload-dialog-button-primary", saveBtnTitle: "上传", testBtnClass: "detail-meta-upload", testBtnTitle: "预览", qrcode_img: "", isTourist: t, es6: e.es6, minified: e.minified }
            },
            closeImg: function() { this.setState({ qrcode_img: "" }) },
            upload: function() {
                var e = this.props.project,
                    t = e.isTourist;
                t || this.setState({ showDailog: !0, qrcode_img: "" })
            },
            descChange: function(e) {
                var t = e.target.value;
                this.setState({ desc: t })
            },
            versionChange: function(e) {
                var t = e.target.value;
                this.setState({ version: t })
            },
            delProject: function() {
                var e = confirm("确认删除 " + decodeURIComponent(this.props.project.appname) + " ?");
                if (e) {
                    var t = this.props.project.appid;
                    l.del(this.props.project.projectid), delete localStorage["last-up-test-time-" + this.props.project.hash], delete localStorage["last-up-load-time-" + this.props.project.hash], o("project_delete", t)
                }
            },
            cancel: function() { this.lock || this.setState({ showDailog: !1 }) },
            save: function() {
                var e = this;
                if (!this.lock) {
                    if (!this.state.version) return void t("请填写版本信息");
                    if (!this.state.desc) return void t("请填写描述信息");
                    this.setState({ saveBtnClass: "detail-upload-dialog-button-primary detail-upload-dialog-button-primary-loading", saveBtnTitle: "上传中" }), this.lock = !0;
                    var a = { version: this.state.version, desc: this.state.desc, noCompile: !0 };
                    i.upload(this.props.project, a, function(t, a, s, i) { e.getResp({ error: t, resp: a, res: s, options: i, type: "upload" }) })
                }
            },
            uploadForTest: function(e) {
                var t = this,
                    a = this.props.project,
                    s = a.isTourist;
                s || this.lock || (this.setState({ testBtnClass: "detail-upload-dialog-button-primary detail-upload-dialog-button-primary-loading", testBtnTitle: "上传中" }), this.lock = !0, i.uploadForTest(this.props.project, { noCompile: !0 }, function(e, a, s, i) { t.getResp({ error: e, resp: a, res: s, options: i, type: "test" }) }))
            },
            getResp: function(a) {
                this.lock = !1;
                var s = a.error,
                    i = (a.resp, a.res),
                    l = a.type,
                    o = a.options,
                    d = { testBtnClass: "detail-meta-upload", saveBtnClass: "detail-upload-dialog-button-primary", saveBtnTitle: "上传", testBtnTitle: "预览" };
                if (s) {
                    var c = "string" == typeof s ? s : s.msg;
                    t(c || "提交预览出错，请去调试窗口编译代码，查看详细错误信息"), this.setState(d)
                } else {
                    try { i = JSON.parse(i) } catch (p) {
                        return t("系统错误，上传回包：" + i), this.setState(d), void(this.lock = !1)
                    }
                    var m = i.baseresponse,
                        u = m ? parseInt(m.errcode) : 0,
                        h = parseInt(i.wxpkg_size / 1024);
                    if (u === n.DEV_App_Not_Band) return t("当前开发者未绑定此 appid ，请到 mp 后台操作后重试"), nw.Shell.openExternal("https://mp.weixin.qq.com/"), r.error("details.js uploadForTest error " + u), void this.setState(d);
                    if (u === n.DEV_Need_Admin) return t("需要管理员才能进行上传操作，请检查后重试"), r.error("details.js uploadForTest error " + u), void this.setState(d);
                    if (u === n.DEV_COMPILE_EMPTY_SOURCE) return t("代码包为空，请检查后重试"), r.error("details.js uploadForTest error " + u), void this.setState(d);
                    if (u === n.DEV_COMPILE_WXPKG_MAX_LIMIT) return t("编译包大小为 " + h + " kb，超过限制 " + (h - o.MAX_APP_LENGTH) + " kb，请删除文件后重试"), r.error("details.js uploadForTest error " + u), void this.setState(d);
                    if (u === n.DEV_COMPILE_INVALID_WXPKG) return t("代码包错误，错误代码 " + u), r.error("details.js uploadForTest error " + u), void this.setState(d);
                    if (u === n.DEV_COMPILE_WXML_FAIL) return t("wxml 编译错误，错误信息：" + i.compile_err_msg), r.error("details.js uploadForTest error " + u), void this.setState(d);
                    if (u === n.DEV_COMPILE_WXSS_FAIL) return t("wxss 编译错误，错误信息：" + i.compile_err_msg), r.error("details.js uploadForTest error " + u), void this.setState(d);
                    if (u === n.DEV_COMPILE_INVALID_JSON_FILE) return t("json 编译错误，错误信息：" + i.compile_err_msg), r.error("details.js uploadForTest error " + u), void this.setState(d);
                    if (u === n.DEV_COMPILE_LACK_OF_FILE) return t("缺少文件，错误信息：" + i.compile_err_msg), r.error("details.js uploadForTest error " + u), void this.setState(d);
                    if (u === n.DEV_Need_Update) return t("工具版本过旧，请升级工具后重试"), r.error("details.js uploadForTest error " + u), void this.setState(d);
                    var g = e();
                    h && (g = g + ", 编译包大小 " + h + " kb"), 0 === u ? (d.qrcode_img = i.qrcode_img, "test" === l ? (d.lastTestTime = g, localStorage.setItem("last-up-test-time-" + this.props.project.hash, g)) : (d.lastUploadTime = g, localStorage.setItem("last-up-load-time-" + this.props.project.hash, g)), d.showDailog = !1, this.setState(d)) : (t("系统错误，错误代码：" + u + ",错误信息：" + m.errmsg), this.setState(d))
                }
                this.lock = !1
            },
            onEs6Change: function() {
                var e = !this.state.es6;
                p.setProjectEs6(this.props.project.hash, e), this.setState({ es6: e })
            },
            onMinified: function() {
                var e = !this.state.minified;
                p.setProjectMinified(this.props.project.hash, e), this.setState({ minified: e })
            },
            render: function() {
                var e = this.props,
                    t = e.show,
                    i = e.project,
                    l = this.state.isTourist,
                    r = l ? s.displayNone : {},
                    o = "detail" === t ? {} : s.displayNone,
                    n = i.app_head_img || "../images/logo.png",
                    c = i ? decodeURIComponent(i.appname) : "",
                    p = i ? i.appid : "",
                    m = i ? i.projectpath : "",
                    u = "",
                    h = s.displayNone,
                    g = "";
                if (this.state.qrcode_img) {
                    u = a.createElement("img", { src: "data:image/png;base64," + this.state.qrcode_img, style: { width: "200px", heigth: "200px", marginBottom: "20px" } }), h = {};
                    var v = +new Date + 15e5,
                        E = new Date(v),
                        f = d.getUserInfo();
                    g = "请使用 " + f.nickName + " 的微信扫描二维码，预览当前开发版本，二维码将在 " + E.toTimeString().replace(/\s.*/g, "") + " 时失效。"
                }
                var N = this.state.es6,
                    _ = this.state.minified;
                return a.createElement("div", { className: "detail", style: o }, a.createElement("div", { className: "detail-logo-wrapper" }, a.createElement("img", { src: n, className: "detail-logo" }), a.createElement("p", { className: "detail-name" }, c), a.createElement("p", { className: "detail-appid" }, "App ID: ", p)), a.createElement("div", { className: "detail-meta-wrapper" }, a.createElement("div", { className: "detail-meta" }, a.createElement("p", { className: "detail-meta-label" }, "本地开发目录"), a.createElement("p", { className: "detail-meta-value" }, m)), a.createElement("div", { className: "detail-meta " + (l ? "detail-meta-disabled" : "") }, a.createElement("p", { className: "detail-meta-label" }, "最近上传时间"), a.createElement("p", { className: "detail-meta-value" }, this.state.lastUploadTime), a.createElement("a", { onClick: this.upload, href: "javascript:;", className: "detail-meta-upload-default " + (l ? "detail-meta-upload-default-disabled" : "") }, "上传")), a.createElement("div", { className: "detail-meta " + (l ? "detail-meta-disabled" : "") }, a.createElement("p", { className: "detail-meta-label" }, "最新更新时间"), a.createElement("p", { className: "detail-meta-value" }, this.state.lastTestTime), a.createElement("a", { onClick: this.uploadForTest, href: "javascript:;", className: this.state.testBtnClass + "  " + (l ? "detail-meta-upload-disabled" : "") }, this.state.testBtnTitle)), a.createElement("div", { className: "detail-meta detail-meta-column" }, a.createElement("label", { htmlFor: "es6toes5", onClick: this.onEs6Change, className: "detail-meta-es6toes5" }, a.createElement("input", { type: "checkbox", checked: N }), a.createElement("i", null), "开启 ES6 转 ES5"), a.createElement("label", { htmlFor: "minified", onClick: this.onMinified, className: "detail-meta-es6toes5" }, a.createElement("input", { type: "checkbox", checked: _ }), a.createElement("i", null), "开启 代码压缩上传"))), a.createElement("div", { className: "detail-opr-wrapper" }, a.createElement("a", { onClick: this.delProject, href: "javascript:;", className: "button" }, "删除项目")), a.createElement("div", { style: this.state.showDailog ? { marginTop: -51 } : s.displayNone, className: "detail-upload-dialog" }, a.createElement("div", { className: "detail-upload-dialog-hd" }, a.createElement("h3", { className: "detail-upload-dialog-hd-title" }, "上传")), a.createElement("div", { className: "detail-upload-dialog-bd" }, a.createElement("p", { className: "detail-upload-dialog-tips" }, "上传后，可以在公众平台查看本版本"), a.createElement("div", { className: "detail-upload-dialog-form" }, a.createElement("div", { className: "detail-upload-dialog-form-item" }, a.createElement("label", { className: "detail-upload-dialog-form-label" }, "版本号"), a.createElement("div", { className: "detail-upload-dialog-form-input-box" }, a.createElement("input", { onChange: this.versionChange, value: this.state.version, type: "text", className: "detail-upload-dialog-form-input" }), a.createElement("p", { className: "detail-upload-dialog-form-tips" }, "合理设置版本号便于管理，请输入如 v1.0.0 "))), a.createElement("div", { className: "detail-upload-dialog-form-item" }, a.createElement("label", { className: "detail-upload-dialog-form-label" }, "项目备注"), a.createElement("div", { className: "detail-upload-dialog-form-input-box" }, a.createElement("input", { onChange: this.descChange, value: this.state.desc, type: "text", className: "detail-upload-dialog-form-input" }), a.createElement("p", { className: "detail-upload-dialog-form-tips" }, "可以备注项目版本优化内容等，便于管理员识别"))))), a.createElement("div", { className: "detail-upload-dialog-ft" }, a.createElement("a", { onClick: this.cancel, href: "javascript:;", className: "detail-upload-dialog-button-default" }, "取消"), a.createElement("a", { onClick: this.save, href: "javascript:;", style: r, className: this.state.saveBtnClass }, this.state.saveBtnTitle))), a.createElement("div", { className: "setting-show", style: h }, a.createElement("div", { className: "setting-hd" }, a.createElement("h3", { className: "setting-hd-title" }, "预览")), a.createElement("div", { className: "setting-bd" }, u, a.createElement("p", null, g)), a.createElement("div", { className: "setting-ft" }, a.createElement("a", { href: "javascript:;", onClick: this.closeImg, className: "setting-button-default" }, "确定"))))
            }
        });
    _exports = m
}
var _exports;
init(), module.exports = _exports;
