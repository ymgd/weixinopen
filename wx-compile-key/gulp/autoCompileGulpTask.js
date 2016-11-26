"use strict";
var triggerCompile_1 = require('../src/triggerCompile');
exports.autoCompileGulpTask = function (cb) {
    triggerCompile_1.default();
    cb();
};
