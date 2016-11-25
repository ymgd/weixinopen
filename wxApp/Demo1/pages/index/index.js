//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '我的第一个微信小程序！',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 页面初始化 options为页面跳转所带来的参数
    console.log("load 页面加载完毕");
    var that = this
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      that.update()
    })
  },
  onReady:function(){
    // 页面渲染完成
    console.log("ready 页面渲染完成");
  },
  onShow:function(){
    // 页面显示
    console.log("show 页面开始展示");
  },
  onHide:function(){
    // 页面隐藏
    console.log("hide 页面开始隐藏");
  },
  onUnload:function(){
    // 页面关闭
    console.log("unload 页面关闭");
  }
})
