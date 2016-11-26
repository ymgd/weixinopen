"use strict";
/**
 * Created by allen on 2016/10/12 0012.
 */
var fs = require('fs');
var path = require('path');
var replaceIndicator = "{{port}}";
function getExpressTpl(port) {
    var templatePath = path.join(__dirname, './express.tpl');
    var content = fs.readFileSync(templatePath).toString();
    return content.replace(replaceIndicator, port.toString());
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getExpressTpl;
