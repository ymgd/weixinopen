"use strict";
var constants_1 = require('./constants');
var io_utils_1 = require('./io-utils');
var path = require('path');
var inquirer = require('inquirer');
var questions = [
    {
        type: 'input',
        name: 'wxPath',
        message: '请输入微信web开发工具根目录',
        default: function () {
            return constants_1.WX_ROOT_PATH;
        },
        validate: function (rootPath) {
            var isFileExists = io_utils_1.isFileExistsSync(path.resolve(rootPath, constants_1.RELATIVE_SHORTCUT_PATH));
            if (isFileExists) {
                io_utils_1.updateWxRootPath(rootPath);
                return true;
            }
            return '路径不存在，请输入一个合法的路径: ';
        }
    },
];
function cmdPrompt() {
    return inquirer.prompt(questions).then(function (msg) {
        return path.resolve(msg.wxPath, constants_1.RELATIVE_SHORTCUT_PATH);
    });
}
exports.cmdPrompt = cmdPrompt;
