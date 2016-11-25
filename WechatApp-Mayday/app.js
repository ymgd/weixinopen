var Constant = require('./utils/constant.js');

//app.js
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        console.log('onLaunch');

        //使用假数据
        this.globalData.isMock = false;
        //测试模式
        this.globalData.isDebug = true;

        this.init();
    },
    init: function () {
        var version = wx.getStorageSync('version');
        if (version !== Constant.VERSION) {
            console.log('init', '更新版本.');

            wx.setStorageSync('version', Constant.VERSION);
        }
    },
    getUserInfo: function (cb) {
        var that = this;
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            console.log('login');
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            console.log(res);
                            that.globalData.userInfo = res.userInfo;
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                },
                fail: function (a) {
                    console.log(a);
                }
            });
        }
    },
    globalData: {
        userInfo: null
    }
})
