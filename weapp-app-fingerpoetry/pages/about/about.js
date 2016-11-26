Page({
  data: {
  },
  //事件处理函数
  clickEnter: function() {
     wx.navigateTo({
      url: '../home/home'
    })
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
  }
})
