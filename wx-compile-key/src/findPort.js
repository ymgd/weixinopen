"use strict";
var constants_1 = require('./constants');
var fs = require('fs');
var path = require('path');
var portastic = require('portastic');
var packageConfig = require('../package.json');
var port = packageConfig.port;
var minPort = port.min;
var maxPort = port.max;
function findPort() {
    var promise = portastic.find({
        min: minPort,
        max: maxPort
    });
    return promise.then(function (ports) {
        if (ports.length === 0) {
            return Promise.reject("findPort.ts: ports from " + minPort + " to " + maxPort + " are all unavailable");
        }
        return ports[0];
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = findPort;
var portRegexIndicator = /server\.listen\((\d+)\)/;
function getPort() {
    var targetPath = path.resolve(constants_1.WX_ROOT_PATH, constants_1.RELATIVE_SHORTCUT_PATH);
    var fileContent = fs.readFileSync(targetPath).toString();
    var result = portRegexIndicator.exec(fileContent);
    if (result.length > 1) {
        return +result[1];
    }
    return void 0;
}
exports.getPort = getPort;
