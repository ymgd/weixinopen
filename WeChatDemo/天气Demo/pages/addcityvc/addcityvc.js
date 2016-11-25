
//svar util = require("../../uril/util.js")
var app = getApp();
Page({
    data: {
        input: '',
        storecity: []
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数

    },
    onReady: function () {
        // 页面渲染完成

    },
    onShow: function () {
        // 页面显示
        this.display();
    },
    onHide: function () {
        // 页面隐藏

    },
    onUnload: function () {
        // 页面关闭

    },
    inputChange: function (e) {
        var that = this;
        console.log(e.detail.value);
        that.setData({
            input: e.detail.value
        })
    },
    search: function () {
        var that = this;
        wx.hideKeyboard();
        wx.showNavigationBarLoading();
        wx.request({
            url: 'https://free-api.heweather.com/v5/search',
            data: {
                city: that.data.input,
                key: app.apikey
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                // success
                console.log(res);
                var status = res.data.HeWeather5;
                var dic = status[0];

                if (dic.status == "ok") {

                    var city = dic.basic.city;
                    wx.showModal({
                        title: '确认',
                        content: '你确认添加' + city + "到本地吗？",
                        success: function (res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                                try {
                                    var value = wx.getStorageSync('citylist')
                                    if (value) {
                                        // Do something with return value
                                        if (value.indexOf(city) <= -1) {//数组是否包含这个城市
                                            var list = value;
                                            list.push(city); //添加城市到数组中

                                            wx.setStorageSync('citylist', list);//同步到应用
                                            that.display(); //刷新界面
                                            wx.showToast({
                                                title: '添加成功',
                                                icon: 'success',
                                                duration: 1000
                                            })
                                        } else {
                                            wx.showToast({
                                                title: '已经存在' + city,
                                                icon: 'loading',
                                                duration: 1000
                                            })
                                        }
                                    } else {
                                        var list = [city];
                                        try {
                                            wx.setStorageSync('citylist', list);
                                            that.display();
                                        } catch (e) {

                                        }

                                    }
                                } catch (e) {
                                    // Do something when catch error
                                }
                            }
                        }
                    })
                } else if (dic.status == "unknown city") {
                    wx.showToast({
                        title: '没有此城市',
                        icon: 'loading',
                        duration: 2000
                    })
                }
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
                wx.hideNavigationBarLoading();
            },
        })
    },
    //刷新页面的城市
    display: function () {
        try {
            var value = wx.getStorageSync('citylist')
            if (value) {
                this.setData({
                    storecity: value
                })
            } else {
                this.setData({
                    storecity: ["城市列表为空"]
                })
            }
            // Do something with return value

        } catch (e) {
            // Do something when catch error
        }
    },
    //清除缓存
    clean: function () {
        var that = this;
        try {
            wx.clearStorageSync();
            that.display();
            wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1000
            })
        } catch (e) {

        }
    }

})