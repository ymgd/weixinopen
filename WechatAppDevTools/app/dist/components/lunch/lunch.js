"use strict";

function init() {
    var e = require("../../lib/react.js"),
        n = require("../../common/request/request.js"),
        t = (require("../../cssStr/cssStr.js"), require("../../actions/windowActions.js")),
        r = require("../../common/log/log.js"),
        i = require("../../config/urlConfig.js"),
        o = "darwin" === process.platform ? "darwin" : "win",
        a = "https://res.wx.qq.com/zh_CN/htmledition/v2/images/web_wechat_no_contect.png",
        s = e.createClass({
            displayName: "Lunch",
            handleOnClick: function() { this.props.appQuit() },
            componentWillUnmount: function() { this.refs.container.innerHTML = "" },
            _loadstop: function(e) {
                var i = this,
                    s = this.webview;
                s.executeScript({ code: "\n            var s = document.createElement('style')\n            s.innerText = `\n              body{\n                overflow:hidden;\n                background-color: #f0f0f0!important;\n                padding: inherit!important;\n                color: #373737!important;\n              }\n              .impowerBox .title {\n                display: none;\n              }\n              .impowerBox .qrcode {\n                width: 170px;\n                height: 170px;\n                margin-top: -7px;\n              }`\n              document.head.appendChild(s)\n              var normal = document.querySelectorAll('.normal')\n              for(var i = 0; i < normal.length; i++) {\n                normal[i].classList.remove('normal')\n              }\n          " }), s.style.display = "block";
                var c = s.request;
                c.onBeforeRequest.addListener(function(e) {
                    if ("main_frame" !== e.type) return {};
                    var c = e.url;
                    return c = c.replace("state=login", "state=" + o), r.info("lunch.js get URL : " + c), n({ url: c }, function(e, n, o) {
                        if (e) alert("网络错误 " + e.toString()), s.removeEventListener("loadstop", i._loadstop), i.componentDidMount();
                        else {
                            r.info("lunch.js get res " + JSON.stringify(o)), o = JSON.parse(o);
                            var c = o.baseresponse,
                                l = c.errcode ? parseInt(c.errcode) : 0;
                            if (0 !== l) return alert("登录失败，错误信息：" + c.errmsg), s.removeEventListener("loadstop", i._loadstop), void i.componentDidMount();
                            for (var d in localStorage) 0 === d.indexOf("projectattr") && delete localStorage[d];
                            var m = n.headers,
                                p = m["debugger-signature"],
                                u = m["debugger-newticket"],
                                h = +new Date,
                                f = { signature: p, newticket: u, openid: o.openid, nickName: o.nickname, headUrl: o.headurl || a, ticketExpiredTime: 1e3 * o.ticket_expired_time + h, signatureExpiredTime: 1e3 * o.signature_expired_time + h, sex: 1 === o.sex ? "male" : "female", province: o.province, city: o.city, contry: o.contry };
                            t.upDateUserInfo(f)
                        }
                    }), { cancel: !0 }
                }, { urls: ["<all_urls>"] }, ["blocking"]), r.info("lunch.js init loginWebview")
            },
            componentDidMount: function() {
                var e = (this.refs.container, this.webview = document.createElement("webview"));
                e.src = i.LOGIN_URL, e.style.display = "none", e.addEventListener("loadstop", this._loadstop), this.refs.container.innerHTML = "", this.refs.container.appendChild(e)
            },
            render: function() {
                return e.createElement("div", { className: "lunch" }, e.createElement("div", { className: "lunch-toolbar app-drag" }, e.createElement("a", { onClick: this.handleOnClick, href: "javascript:;", className: "lunch-toolbar-close app-no-drag" }, e.createElement("i", { className: "lunch-toolbar-close-icon app-no-drag" }))), e.createElement("div", { className: "lunch-body" }, e.createElement("div", { className: "lunch-logo-wrapper" }, e.createElement("i", { className: "lunch-logo" })), e.createElement("div", { className: "lunch-name" }, "微信开发者工具"), e.createElement("div", { className: "lunch-line" }), e.createElement("div", { ref: "container", className: "lunch-qrcode" })))
            }
        });
    _exposts = s
}
var _exposts;
init(), module.exports = _exposts;
