//获取全局应用程序实例对象
var app = getApp();

Page({
    data: {
        title: 'About Me',
        userInfo: {}
    },

    onLoad: function () {
        var that = this;
        app.getUserInfo(function (userInfo) {
            that.setData({
                userInfo: userInfo
            });
        });
    }
})