//app.js
App({
  onLaunch: function () {
    this.globalData.accesstoken = wx.getStorageSync('__accesstoken__');
  },
  onShow: function () {
    console.log('onShow');
  },
  onHide: function () {
    console.log('onHide');
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
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    accesstoken: null
  }
})
