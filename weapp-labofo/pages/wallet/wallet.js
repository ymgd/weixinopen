// wallet.js
var FormData = require('../../utils/formData.js'),
    util = require('../../utils/util.js'),
    constants = require('../../utils/contants.js'),
    app = getApp();

Page({
    data: {
        // text:"这是一个页面"
        balance: 0,
        packetnum: 0,
        bond: 0
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        console.log('trade.js onLoad:' + JSON.stringify(options));

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
                userInfo: userInfo
            })

            var formData = new FormData();
            formData.append('token', userInfo.ofoInfo.token);

            wx.request({
                url: constants.API_SERVER + '/v4/info/wallet',
                method: 'POST',
                data: formData.getContentData(),
                header: {
                    'Content-Type': formData.getContentType()
                },
                success: function (res) {
                    var data = res.data;
                    if (data.errorCode == 200) {
                        var info = data.values.info;
                        that.setData({
                            balance: info.balance,
                            packetnum: info.packetnum,
                            bond: info.bond
                        });
                    } else {
                        console.error("获取钱包错误：" + data);
                    }
                }
            });
        });

    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
})