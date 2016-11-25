var wxp = require('../../utils/wxp.js');
//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        motto: '',
        userInfo: {}
    },
    //事件处理函数
    bindViewTap: function(e) {
        wxp(wx.navigateTo, {
            url: '../logs/logs'
        });
    },
    onLoad: function() {
        co(function*() {
            var that = this;
            // yield wxp(wx.redirectTo, {
            //     url: '../logs/logs'
            // });
            //调用应用实例的方法获取全局数据
            app.getUserInfo(function(userInfo) {
                //更新数据
                that.setData({
                    userInfo: userInfo
                })
            })
            that.setData({
                motto: 'hello'
            })
            wx.getStorage({
                key: 'qwqw',
                success: function(res) {
                    console.log(res.data)
                },
                fail: function(e) {

                }
            })
        }.bind(this));
    }
})