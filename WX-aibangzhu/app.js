//app.js

// 此页面首先验证用户身份是否是已经注册用户
// 如果是已经注册的用户，直接进入信息页面
// 如果是未注册用户，进入引导注册页面

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = {
      
    }
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData: {
    userInfo: null
  }
})



