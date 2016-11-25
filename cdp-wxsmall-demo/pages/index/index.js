//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    cityName: '上海',
    cityList: ['1','2','3','4']
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.request({
      url: 'http://m.changdipai.com/changdipai/category/search', 
      data: {
        tagName: 'city'
      },
      success: function(res) {
        
      }
    })
  }
})
