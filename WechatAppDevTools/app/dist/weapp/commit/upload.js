"use strict";

function init() {
    var e = require("fs"),
        r = require("./pack.js"),
        o = require("./build.js"),
        i = require("path"),
        n = require("../../common/request/request.js"),
        t = require("../../config/dirConfig.js"),
        s = require("../../stores/projectStores.js"),
        u = require("../../config/urlConfig.js"),
        p = require("rmdir");
    _exports = {};
    var d = t.Weappdest;
    _exports.uploadForTest = function(t, a, c) {
        var l = s.getProjectConfig(t),
            f = a.noCompile,
            v = void 0;
        try { v = l.Setting.MaxCodeSize } catch (m) { v = 1 }
        var q = 1024 * v,
            g = !a.isBuildForUpload;
        o(t, { isBuildForTest: g, noCompile: f }, function(o, s) {
            if (o) return void c({ msg: o.toString() });
            var l = i.join(d, +new Date + ".wx");
            r(s, l, function(r, o) {
                p(s, function(e, r, o) {});
                var i = e.lstatSync(l),
                    d = parseInt(i.size / 1024);
                if (d > q) return e.unlink(l, function() {}), void c({ msg: "代码包大小为 " + d + " kb，超出限制 " + (d - q) + " kb，请删除文件后重试" });
                var f = void 0;
                if (g) f = u.testSourceURL + "?appid=" + t.appid;
                else {
                    var v = encodeURIComponent(a.desc),
                        m = encodeURIComponent(a.version);
                    f = u.commitSourceURL + "?appid=" + t.appid + "&user-version=" + m + "&user-desc=" + v
                }
                n({ url: f, method: "post", body: e.readFileSync(o), needToken: 1 }, function(r, o, i) { c(r, o, i, { MAX_APP_LENGTH: q }), e.unlink(l, function() {}) })
            })
        })
    }, _exports.upload = function(e, r, o) { r.isBuildForUpload = !0, _exports.uploadForTest(e, r, o) }
}
var _exports;
init(), module.exports = _exports;
