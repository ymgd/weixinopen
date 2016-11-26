"use strict";
var fs = require('fs');
function isAppendScriptExists(content, appendScriptStr) {
    return content.indexOf(appendScriptStr) > -1;
}
function hasAppendedPromise(shortcutPath, appendScriptStr) {
    return new Promise(function (resolve, reject) {
        fs.readFile(shortcutPath, function (err, data) {
            if (err) {
                reject(err);
                return;
            }
            var content = data.toString();
            resolve(isAppendScriptExists(content, appendScriptStr));
        });
    });
}
function appendScript(shortcutPath, appendScriptStr) {
    return new Promise(function (resolve, reject) {
        fs.appendFile(shortcutPath, appendScriptStr, function (err) {
            !err ? resolve(true) : reject(err);
        });
    });
}
function exposeCompileShortcut(shortcutPath, appendScriptStr) {
    return hasAppendedPromise(shortcutPath, appendScriptStr)
        .then(function (hasAppended) {
        if (!hasAppended) {
            return appendScript(shortcutPath, appendScriptStr);
        }
        return Promise.reject(new Error("script has already appended."));
    });
}
exports.exposeCompileShortcut = exposeCompileShortcut;
