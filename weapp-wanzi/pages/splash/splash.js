
var conf = require('../../conf/conf.js');
//获取应用实例
var app = getApp();
Page({
    data: {
        winH: 0,
        splashes: []
    },
    onLoad: function() {
        var used = wx.getStorageSync('used'),
            splashes = null;
        if (!used) {
            splashes = conf.splashes;
            splashes.push('');
        }
        else {
            splashes = [conf.splash];
            setTimeout(()=>{
                this.navToHome();
            }, conf.splashDuration);
        }
        
        this.setData({
            winH: app.getWinH(),
            splashes: splashes
        });
        wx.setStorage({
            key: 'used',
            data: 'yes',
            success: function(res) {
                console.log('tag stored. ' + res.data);
            },
            fail: function(err) {
                console.log('error ' + err);
            }
        });
    },
    swiperChange: function(event){
        var index = event.detail.current;
        if (index === this.data.splashes.length-1) {
            this.navToHome();
        }
    },
    navToHome: function(){
        wx.redirectTo({
            url: '../index/index'
        });
    }
});