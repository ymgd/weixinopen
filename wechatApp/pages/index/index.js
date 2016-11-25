//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    text1: '红包个数',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res.tempFilePaths);
      }
    });
  },
  handle: function (ev) {
    this.setData({
      text1: ev.detail.value
    });
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
