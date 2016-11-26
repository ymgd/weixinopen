"use strict";
var fs = require('fs');
var constants_1 = require('./constants');
var path = require('path');
function isFileExistsSync(path) {
    return fs.existsSync(path);
}
exports.isFileExistsSync = isFileExistsSync;
function replaceFromFile(filePath, searchValue, replaceValue) {
    var content = fs.readFileSync(filePath).toString();
    var newContent = content.replace(searchValue, replaceValue);
    fs.writeFileSync(filePath, newContent);
}
function updateWxRootPath(value) {
    var packageConfigPath = path.resolve(__dirname, '../package.json');
    replaceFromFile(packageConfigPath, constants_1.WX_ROOT_PATH, value);
}
exports.updateWxRootPath = updateWxRootPath;
