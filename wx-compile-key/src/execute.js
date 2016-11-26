"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var cmdPrompt_1 = require('./cmdPrompt');
var wxChmod_1 = require('./wxChmod');
var exposeShortcut_1 = require('./exposeShortcut');
var findPort_1 = require('./findPort');
var index_1 = require('../tpl/index');
exports.execute = function () {
    return __awaiter(this, void 0, void 0, function* () {
        var path = yield cmdPrompt_1.cmdPrompt();
        try {
            yield wxChmod_1.default(path);
            var port = yield findPort_1.default();
            var appendScriptStr = index_1.default(port);
            var isSuccess = yield exposeShortcut_1.exposeCompileShortcut(path, appendScriptStr);
            if (isSuccess) {
                console.info("\u6DFB\u52A0\u81EA\u52A8\u7F16\u8BD1\u6210\u529F");
            }
        }
        catch (err) {
            console.info(err);
        }
    });
};
