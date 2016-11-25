//app.js

import AV from  './utils/av-weapp-min.js';
var APP_ID = 'YQ3DlLau95vRL7LuFXkFXdTk-gzGzoHsz';
var APP_KEY = 'E1VW1CrR4QziuhlHP1b7Hl74';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    let that = this;
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
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
  globalData:{
    user:null
  },
  AV:AV
})