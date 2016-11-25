//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  toTab: function() {
    wx.navigateTo({
      url: '../tab/index'
    })
  },
  toSplash: function() {
    wx.navigateTo({
      url: '../splash/index'
    })
  },
  toLoadPull: function() {
    wx.navigateTo({
      url: '../pullload/index'
    })
  },

  toUpload: function() {
    wx.navigateTo({
      url: '../upload/index'
    })
  },
  toDialog: function() {
    wx.navigateTo({
      url: '../dialog/index'
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
