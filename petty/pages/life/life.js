//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '',
    userInfo: {},
    newShop: [],
    suitArr: []
  },
  //事件处理函数
  goDetail: function() {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  goCircle: function(){
    wx.navigateTo({
      url: '../circle/circle'
    })
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
