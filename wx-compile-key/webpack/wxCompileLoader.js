"use strict";
var _this = this;
var triggerCompile_1 = require('../src/triggerCompile');
exports.autoCompileWebpackLoader = function (content) {
    _this.cacheable && _this.cacheable();
    triggerCompile_1.default();
    return content;
};
