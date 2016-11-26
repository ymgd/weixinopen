var api = require('request/api.js');
var request = require('request/request.js');

App({
  onLaunch: function() {
    console.log('App onLaunch');
  },
  onShow: function() {
    console.log('App onShow');
  },
  onHide: function() {
    console.log('App onHide');
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb === "function" && cb(this.globalData.userInfo)
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
  },
  api: api,
  request: request
})
