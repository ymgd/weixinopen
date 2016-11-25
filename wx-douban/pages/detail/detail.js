var fn = require("../../functions.js");
var app = getApp();
Page({
    data: {
        pageLoadingHide: false
    },
    onLoad: function(options){
        var that = this;
        fn.getApiData("subject/"+options.id, {}, function(res){
            if(res.statusCode == 200){
                that.setData({
                    data: res.data,
                    pageLoadingHide: true
                });
                console.log(that.data.data.title);
                wx.setNavigationBarTitle({
                    title: that.data.data.title
                });
            }else{
                that.setData({
                    fail: true,
                    data: res.errMsg,
                    pageLoadingHide: true
                });
            }
        },function(){
            that.setData({
                fail: true,
                data: "请求失败",
                pageLoadingHide: true
            });
        });
    }
});