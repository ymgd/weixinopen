
//获取应用实例
var app = getApp()
Page({
  data: {
   logs:[]
  },
  onLoad: function () {
      var logs =wx.getStorageSync('callogs');
      this.data.logs=logs;
  }
})
