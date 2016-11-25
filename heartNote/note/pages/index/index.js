//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    scrollTop: 100,
    noteData: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function() {
    var that = this
    var data = []
    wx.getStorage({
      key: 'note',
      success: function(res){
        data = res.data;
        console.log(res.data)
        that.setData({
          noteData: res.data
        })
      }
    })
  },
  goWrite:function() {
    wx.navigateTo({
      url: '../write/write'
    })
  },
  clear: function() {
    wx.clearStorage()
  }
})
