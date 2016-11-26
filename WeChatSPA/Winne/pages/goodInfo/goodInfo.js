// goodInfo.js
var app = getApp()
Page({
  data:{
    // text:"这是一个页面"
    good:{},
    count:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    wx.getStorage({
        key: 'goodInfo',
        success: function(res){
            that.setData({
                good: res.data
            })
            //console.log(that.data.good)
        }
    })
  },
  onUnload:function(){
    wx.clearStorage()
  },
  onPurchase:function(){
    wx.navigateTo({
      url:"../purchase/purchase"
    })
  }
})