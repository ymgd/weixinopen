//获取应用实例
var app = getApp()

Page({

    //初始化数据
    data: {
        imgsrc:"",
        desc:""
    },
    enterIndex:function(){
        wx.redirectTo({
            url: '../index/index'
        })
    },

    //生命周期函数
    onLoad:function(){
        console.log("onload");
        var that = this
        wx.request({
            url: 'https://news-at.zhihu.com/api/4/start-image/1080*1776', 
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log(res.data)
                that.setData({
                    imgsrc:res.data.img,
                    desc:res.data.text
                })
                
            }
         })

    },
    onReady: function() {
    // Do something when page ready.
    },
    onShow: function() {
        // Do something when page show.
        
    },
    onHide: function() {
        // Do something when page hide.
    },
    onUnload: function() {
        // Do something when page close.
    },
    onPullDownRefresh: function() {
        // Do something when pull down.
    },
    onReachBottom: function() {
        // Do something when page reach bottom.
    }
})
