//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'pushPageView',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  textTap: function(){
      wx.navigateTo({
      url: '../request/request',
  success: function(res){
    // success
 console.log('push success')
  },
  fail: function() {
    // fail
    console.log('fail')
  },
  complete: function() {
    // complete
    console.log('push complete')
  }
})
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      
    })
  }
})
