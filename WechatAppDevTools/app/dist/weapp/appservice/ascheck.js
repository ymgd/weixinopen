"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
! function() {
    function e(e) {
        return Array.isArray(e) ? "array" : "undefined" == typeof e ? "undefined" : _typeof(e)
    }
    var t = "app-config.json",
        o = { appServiceScripts: { type: "array" }, global: { type: "object" }, page: { type: "object" }, tabBar: { type: "object" }, networkTimeout: { type: "object" } },
        r = Object.assign({}, __wxConfig);
    delete r.appname, delete r.appid, delete r.apphash;
    var n = Object.keys(r);
    n.forEach(function(n) {
        var p = o[n];
        if (p) {
            var y = e(r[n]);
            p.type !== y && console.error(t + " 中 " + n + " 配置无效，要求是 " + p.type + " ，实际是 " + y + "， " + JSON.stringify(r[n]))
        } else console.warn(t + " 中存在无效配置 " + n)
    })
}();
