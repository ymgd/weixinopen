"use strict";

var Promise = global.Promise;
var regeneratorRuntime = global.regeneratorRuntime;
var co = global.co;

var wxp = require('../../utils/wxp.js');
//index.js
//获取应用实例
var app = getApp();
Page({
    data: {
        motto: '',
        userInfo: {}
    },
    //事件处理函数
    bindViewTap: function bindViewTap(e) {
        wxp(wx.navigateTo, {
            url: '../logs/logs'
        });
    },
    onLoad: function onLoad() {
        co(regeneratorRuntime.mark(function _callee() {
            var that;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            that = this;
                            // yield wxp(wx.redirectTo, {
                            //     url: '../logs/logs'
                            // });
                            //调用应用实例的方法获取全局数据

                            app.getUserInfo(function (userInfo) {
                                //更新数据
                                that.setData({
                                    userInfo: userInfo
                                });
                            });
                            that.setData({
                                motto: 'hello'
                            });
                            wx.getStorage({
                                key: 'qwqw',
                                success: function success(res) {
                                    console.log(res.data);
                                },
                                fail: function fail(e) {}
                            });

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }).bind(this));
    }
});