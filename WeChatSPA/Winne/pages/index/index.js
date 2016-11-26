//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    userInfo:{}
  },
  //事件处理函数
  onLoad: function () {
    //console.log(app.globalData.userInfo);
    this.setData({
      userInfo:app.globalData.userInfo
    })
  },
  onUserinfo: function () {
    wx.navigateTo({
      url: '../userinfo/userinfo'
    })
  },
  onShop: function () {
    wx.navigateTo({
      url: "../goods/goods"
    })
  }
})