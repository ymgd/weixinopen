//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
    },
    onMoveCar: function(event){
        wx.navigateTo({
            url: '../calldriver/calldriver'
        });
    },
    onFullInfo: function(event){
        wx.navigateTo({
            url: '../fullinfo/fullinfo'
        });
    },
    onLoad: function () {

    },
    _dialog: function(){
        var d = document.createElement('template');
        d.is = 'kbutton';
        document.body.appendChild(d);
    },
})
