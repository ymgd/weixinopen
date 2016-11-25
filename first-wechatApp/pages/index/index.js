//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // onPullDownRefresh:function(){
  //   console.log('pullDown')
  // },
  // onReachBottom:function(){
  //   console.log('reachBottom')
  // },
  onLoad: function () {
    console.log('onLoad')
    var self = this;
    setTimeout(function () { 
      self.setData({
        motto:'yoyo check now'
      })
    }, 2000)

    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
