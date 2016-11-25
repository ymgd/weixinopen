"use strict";

var Promise = global.Promise;
var regeneratorRuntime = global.regeneratorRuntime;
var co = global.co;

//logs.js
var wxp = require('../../utils/wxp.js');

Page({
    data: {
        loading: false
    },
    onLoad: function onLoad() {},
    upload_click: function upload_click() {
        console.log('upload_click');
        co(regeneratorRuntime.mark(function _callee() {
            var res_ci, res_up;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return wxp(wx.chooseImage, {
                                count: 8
                            });

                        case 2:
                            res_ci = _context.sent;

                            debugger;
                            _context.next = 6;
                            return wxp(wx.uploadFile, {
                                url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
                                filePath: res_ci.tempFilePaths[0],
                                name: 'file',
                                formData: {
                                    'user': 'test'
                                }
                            });

                        case 6:
                            res_up = _context.sent;

                            debugger;

                        case 8:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        })).catch(function (e) {
            debugger;
        });
    }
});