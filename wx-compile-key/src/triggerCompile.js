"use strict";
var request = require('request');
var findPort_1 = require('./findPort');
function triggerCompile() {
    var port = findPort_1.getPort();
    if (port) {
        try {
            request.get("http://localhost:" + port).on('error', function (err) {
                console.error(err);
            });
        }
        catch (err) {
            throw new Error("请打开微信web开发平台\r\n" + err.toString());
        }
    }
    else {
        throw new Error("triggerCompile.ts: please append script before trigger compile");
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = triggerCompile;
