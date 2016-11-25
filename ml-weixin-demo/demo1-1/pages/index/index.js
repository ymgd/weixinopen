//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '欢迎进入旺财谷',
    userInfo: {},
    avatarUrl: 'https://www.wangcaigu.com/template/default/Public/images/favicon.ico',
    nickName: '旺财谷',
    animateFirstpPage: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 进入内容页
  intoConetnt:function(){
    wx.navigateTo({
      url: '../firstpage/firstpage'
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
