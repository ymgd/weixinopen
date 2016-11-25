// mine.js
var FormData = require('../../utils/formData.js'),
    util = require('../../utils/util.js'),
    constants = require('../../utils/contants.js'),
    app = getApp();

Page({
    data: {
        // text:"这是一个页面"
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        console.log(' mine.js onLoad:' + JSON.stringify(options));

        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            if (!userInfo.ofoInfo) {
                setTimeout(function () {
                    wx.navigateTo({
                        url: '../login/login'
                    });
                }, 300);
                return;
            }
            that.setData({
                userInfo: userInfo,
                token: userInfo.ofoInfo.token
            })
        });
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            if (!userInfo.ofoInfo) {
                wx.navigateTo({
                    url: '../login/login'
                });
                return;
            }
            that.setData({
                userInfo: userInfo,
                token: userInfo.ofoInfo.token
            })
        });
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
})