//index.js
//获取应用实例
var test = require('../../mock-data/index')
var app = getApp()
Page({
  data: {
    imgUrls: [
      '../../assets/slide1.jpg',
      '../../assets/slide2.jpg',
      '../../assets/slide3.jpg',
      '../../assets/slide4.jpg',
    ]
  },
  onShow: function (query) {
    wx.request({
      url: 'https://wechat.xiadd.me',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res.data)// success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})
