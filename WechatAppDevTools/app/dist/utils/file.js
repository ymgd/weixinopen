"use strict";

function init() {
    var e = (require("os"), require("path")),
        r = (require("http"), require("../common/request/request.js")),
        n = require("fs"),
        i = require("../stores/windowStores.js"),
        t = require("../config/dirConfig.js"),
        o = (require("url"), nw.App, t.WeappFileCache),
        a = "apptmpfile_",
        u = "appforeverfile_",
        c = function(r) {
            var t = void 0,
                u = i.getUserInfo(),
                c = u ? u.openid : "unknow";
            do t = a + "_" + r + "_" + c + "_" + +new Date; while (n.existsSync(e.join(o, t)));
            return t
        };
    _exports = {
        isAppTmpPath: function(e) {
            return 0 === e.indexOf(a) || 0 === e.indexOf(u)
        },
        getRealPath: function(r) {
            return this.isAppTmpPath(r) ? e.join(o, r) : r
        },
        copyFileDataToTemp: function(r, i) {
            var t = c(i);
            return n.writeFileSync(e.join(o, t), r), t
        },
        copyFileToTemp: function(e, r) {
            if (n.existsSync(e)) {
                var i = n.readFileSync(e);
                return this.copyFileDataToTemp(i, r)
            }
            return !1
        },
        saveFileForever: function(r) {
            var i = e.join(o, r);
            if (n.existsSync(i)) {
                var t = r.replace(a, u);
                return n.renameSync(i, e.join(o, t)), t
            }
            return !1
        },
        uploadFileToServer: function(e) {
            var i = e.url,
                t = e.filePath,
                o = e.name,
                a = e.header,
                u = e.formData;
            a = a || {}, u = u || {}, u[o] = n.createReadStream(this.getRealPath(t)), r({ url: i, method: "post", needToken: -1, headers: a, formData: u }, function(r, n, i) { e.callback && e.callback(r, n, i) })
        },
        downloadFileFormServer: function(e) {
            var n = e.url,
                i = e.header;
            i = i || {}, r({ url: n, method: "get", encoding: null, needToken: -1, headers: i }, function(r, n, i) { e.callback && e.callback(r, n, i) })
        }
    }
}
var _exports;
init(), module.exports = _exports;
