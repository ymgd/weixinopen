//app.js
// App()函数用来注册一个小程序。（一个小程序只能有一个App()，并且只能在app.js中初始化，其他地方可以使用getApp()来获取小程序实例）
App({
  //生命周期函数--监听小程序的初始化，当初始化完成会触发（全局只触发一次）
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  //成员方法：获取用户数据
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  //全局数据
  globalData:{
    userInfo:null
  }
})