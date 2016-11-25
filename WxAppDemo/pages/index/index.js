//index.js
//获取应用实例
const app = getApp()

Page({
  data: {},
  //事件处理函数
  onLoad() {
    console.log('onLoad')
  },
  onRedirect() {
    console.log('123')
    wx.navigateTo({
      url: '../repositories/repositories'
    })
  }
})
