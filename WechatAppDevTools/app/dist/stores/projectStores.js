"use strict";

function init() {
    function e(e) {
        var t = 0,
            r = void 0,
            o = void 0,
            i = void 0;
        if (0 === e.length) return t;
        for (r = 0, i = e.length; r < i; r++) o = e.charCodeAt(r), t = (t << 5) - t + o, t |= 0;
        return t > 0 ? t : 0 - t
    }

    function t() {
        var e = JSON.stringify(S);
        localStorage.setItem("projectLists", e), i.writeFile(l, e)
    }

    function r(e, t) {
        if (t) {
            var r = e.projectpath,
                c = o.join(__dirname, "../weapp/newquick/");
            try {
                var p = s.sync("./**/**", { cwd: c });
                p.forEach(function(e) {
                    var t = o.join(c, e),
                        n = o.join(r, e),
                        s = i.lstatSync(t);
                    if (s.isDirectory()) a.sync(n);
                    else {
                        var p = i.readFileSync(t);
                        i.writeFileSync(n, p)
                    }
                })
            } catch (f) { n.error("projectStores.js initProject error " + f.toString()) }
        }
    }
    var o = require("path"),
        i = require("fs"),
        n = require("../common/log/log.js"),
        s = require("glob"),
        a = require("mkdir-p"),
        c = require("../common/request/request.js"),
        p = require("../config/urlConfig.js"),
        f = require("../config/errcodeConfig.js"),
        u = require("../weapp/commit/unpack.js"),
        j = require("../config/dirConfig.js"),
        d = require("events").EventEmitter,
        g = j.WeappProjectInfo;
    if (!g) {
        var h = o.join(nw.App.getDataPath(), "..");
        g = o.join(h, "WeappProject")
    }
    var l = o.join(g, "projectinfo.json"),
        S = JSON.parse(localStorage.getItem("projectLists")) || [];
    i.writeFile(l, localStorage.getItem("projectLists") || "[]");
    var v = {},
        m = null,
        y = !1,
        O = { Network: { RequestDomain: [], WsRequestDomain: [], UploadDomain: [], DownloadDomain: [] }, Setting: { MaxLocalstorageSize: 10, MaxCodeSize: 5, MaxWebviewDepth: 5, MaxBackgroundLifespan: 300, MaxRequestConcurrent: 5, MaxUploadConcurrent: 1, MaxDownloadConcurrent: 5 } };
    S.forEach(function(t) { t.hash = e(t.projectid), void 0 === t.es6 && (t.es6 = !0) });
    var P = Object.assign({}, d.prototype, {
        getCurrentProject: function() {
            return m
        },
        setProjectEs6: function(e, r) {
            var o = this.getProjectByHash(e);
            o.es6 = r, t(), this.emit("PROJECT_STORES_CHANGE", o, r)
        },
        setProjectMinified: function(e, r) {
            var o = this.getProjectByHash(e);
            o.minified = r, t()
        },
        getProjectByHash: function(e) {
            return e = parseInt(e), S.find(function(t) {
                return t.hash === e
            })
        },
        getProjectByID: function(e) {
            return S.find(function(t) {
                return t.projectid === e
            })
        },
        getProjectList: function() {
            return n.info("projectStores.js getProjectList " + JSON.stringify(S)), S
        },
        addVerifyProject: function(r, i) {
            var s = this;
            r.hash = e(r.projectid);
            var a = r.projectpath;
            u(o.join(a, "source.wx"), function(e, o) { e ? i(e) : (r.projectpath = o, r.isVerify = !1, S.unshift(r), t(), n.info("projectStores.js add " + JSON.stringify(r)), s.emit("ADD_PROJECT", S), i(null, o)) })
        },
        add: function(o, i) { o.hash = e(o.projectid), o.es6 = !0, S.unshift(o), r(o, i), t(), n.info("projectStores.js add " + JSON.stringify(o)), this.emit("ADD_PROJECT", S) },
        del: function(e) {
            var r = S.findIndex(function(t) {
                return t.projectid === e
            });
            if (r > -1) {
                var o = S[r];
                delete localStorage["projectattr" + o.hash], S.splice(r, 1), t(), n.info("projectStores.js del " + e), this.emit("DEL_PROJECT", S)
            }
        },
        close: function() { this.emit("CLOSE_PROJECT") },
        restart: function(e) { this.emit("RESTART_PROJECT", e) },
        getProjectConfig: function(e) {
            return v[e.hash]
        },
        setProjectConfig: function(e, t) {
            if (!y) {
                m = e;
                var r = "projectattr" + e.hash,
                    o = JSON.parse(localStorage.getItem(r)),
                    i = e.isTourist;
                if (i) {
                    var s = Object.assign({}, O);
                    return s.appid = e.appid, v[e.hash] = s, void t()
                }
                y = !0, o && (v[e.hash] = o, t());
                var a = p.getWeappAttrURL,
                    u = a + "?appid=" + e.appid + "&_r=" + Math.random();
                n.info("projectStores.js begin get projectAttr " + u), c({ url: u, body: JSON.stringify({ appid_list: [e.appid] }), method: "post", needToken: 1 }, function(i, s, a) {
                    if (y = !1, i) return n.error("projectStores.js end get projectAttr network error: " + JSON.stringify(i)), void alert(JSON.stringify(i));
                    n.info("projectStores.js end get projectAttr " + a);
                    var c = void 0;
                    try { c = JSON.parse(a) } catch (p) {
                        return n.error("projectStores.js end get projectAttr parse body error: " + a + " " + JSON.stringify(i)), void(!o && alert("系统错误 " + a))
                    }
                    var u = c.baseresponse,
                        j = u ? parseInt(u.errcode) : 0;
                    if (0 === j) {
                        var d = c.attr_list[0];
                        v[e.hash] = d, localStorage.setItem(r, JSON.stringify(d)), o || t()
                    } else {
                        if (j === f.DEV_App_Not_Band) {
                            alert("当前开发者未绑定此 appid ，请到 mp 后台操作后重试"), nw.Shell.openExternal("https://mp.weixin.qq.com/"), n.error("projectStores.js setProjectConfig error " + j);
                            var g = require("./webviewStores.js");
                            return void g.emit("NOT_LOGIN")
                        }!o && alert("系统错误 " + a)
                    }
                })
            }
        }
    });
    _exports = P
}
var _exports;
init(), module.exports = _exports;
