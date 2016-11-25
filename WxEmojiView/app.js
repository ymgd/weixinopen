//app.js
var WxEmoji = require('WxEmojiView/WxEmojiView.js');
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    WxEmoji.init(":_/",{
      "00":"00.gif",
      "01":"01.gif",
      "02":"02.gif",
      "03":"03.gif",
      "04":"04.gif",
      "05":"05.gif",
      "06":"06.gif",
      "07":"07.gif",
      "08":"08.gif",
      "09":"09.gif",
      "09":"09.gif",
      "10":"10.gif",
      "11":"11.gif",
      "12":"12.gif",
      "13":"13.gif",
      "14":"14.gif",
      "15":"15.gif",
      "16":"16.gif",
      "17":"17.gif",
      "18":"18.gif",
      "19":"19.gif",

    });
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
    userInfo:null
  }
})