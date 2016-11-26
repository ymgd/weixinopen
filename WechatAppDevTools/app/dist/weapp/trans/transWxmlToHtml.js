"use strict";

function init() {
    var e = (require("fs"), require("path"), require("../utils/tools.js"));
    _exports = function(r) {
        var t = r.pageFrameTpl,
            s = r.project,
            u = (r.url, e.getPageCssFiles(r.url, s));
        return u && (t = t.replace("<!--{{currentstyle}}-->", '<link rel="stylesheet" type="text/css" href="' + u + '">')), t = t.replace("<!--{{generateFunc}}-->", r.generateFunc), { header: {}, body: t }
    }
}
var _exports;
init(), module.exports = _exports;
