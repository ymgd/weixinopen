"use strict";
var chmod = require('chmod');
var permissionMode = 777;
function wxChmod(path) {
    return new Promise(function (resolve, reject) {
        try {
            chmod(path, permissionMode);
            resolve(true);
        }
        catch (err) {
            reject(err);
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = wxChmod;
