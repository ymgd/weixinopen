//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '欢迎来到我的酒馆',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../popindex/popindex'
    })
  },
   bindTextTap: function() {
    wx.navigateTo({
      url: '../home_index/home_index'
    })
  },
  onLoad: function () {
    console.log('onLoad')
     wx.setNavigationBarTitle({
      title: '123'
    })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    setTimeout(
      function(){ 
        wx.redirectTo({
          url: '../home_index/home_index'
      })
    },3000)
  }, 
  
})
