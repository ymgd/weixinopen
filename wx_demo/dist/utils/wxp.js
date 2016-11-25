"use strict";

var Promise = global.Promise;
var regeneratorRuntime = global.regeneratorRuntime;
var co = global.co;

module.exports = function (api, arg) {
    return new Promise(function (resolve, reject) {
        arg.success = resolve;
        arg.fail = function (res) {
            if (res && res.errMsg) {
                reject(new Error(res.errMsg));
            } else {
                reject(res);
            }
        };
        api.call(wx, arg);
    });
};