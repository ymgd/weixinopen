//logs.js
var app = getApp();
var car_list = require("../../utils/car_list");
console.log(car_list.list);
Page({
    data: {
        list: car_list.list
    },
    upper: function(e) { //顶部
        console.log(e)
    },
    lower: function(e) { //底部
        console.log(e);

    },
    scroll: function(e) {
        console.log(e)
    },
    onReachBottom: function(e) {
       console.log(e);
    },
    onLoad: function() {
        console.log(wx.getSystemInfoSync());
        var _this = this;
        
        wx.getImageInfo({
            src: 'http://p1.bqimg.com/2251/ce9237b2dbd2c2d9s.png',
            success: function (res) {
                console.log(res.width)
                console.log(res.height)
            }
        })
    }
});