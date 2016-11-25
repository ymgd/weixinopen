//获取应用实例
var app = getApp()
Page({
  data: {
    wHeight: 0,
    wWidth: 0,
  },

  //初始加载页面
  onLoad: function () {
    var that = this
    app.getSystemInfo(function(systemInfo){
      that.setData({
        wHeight:systemInfo.windowHeight,
        wWidth:systemInfo.windowWidth,
      })
    })

    //获取本地缓存中的tokenID(同步)
    try {
      var value = wx.getStorageSync('tokenID')
      if (value) {
          console.log('99999')
          console.log(value)
      }
    } 
    catch (e) {
      // Do something when catch error
    }

  },

  goToCreateMerchandise: function(){
    var that = this
    wx.navigateTo({
      url: '../createMerchandise/createMerchandise'
    })
  }
})

