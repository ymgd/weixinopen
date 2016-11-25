//app.js

App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    //var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)
  },
  getUserInfo: function(cb) {
    var that = this

    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          });
        }
      })
    }
  },
  login: function(callback) {
    var _this = this;

    if (_this.globalData.opendID) {
      callback({
        openID: _this.globalData.opendID
      });
    } else {
      wx.login({
        success: function(res) {
          var code = res.code;
          wx.getUserInfo({
            success: function(res) {

              wx.request({
                url: _this.globalData.domain + 'api/get-user-info',
                method: 'post',
                data: {
                  userInfo: res.userInfo,
                  code: code,
                  APPID: _this.globalData.APPID,
                  SECRET: _this.globalData.SECRET
                },
                success: function(res) {

                  if (callback && res && res.data) {
                    callback({
                      openID: res.data.openid
                    });
                  }
                },
                fail: function() {
                  callback({
                    openID: null
                  });
                }
              });
            }
          })

        }
      });
    }


    // wx.checkSession({
    //   success: function(res) {
    //     console.log('成功', res);
    //   },
    //   fail: function(res) {
    //     console.log('失败', res);
    //   }
    // });
  },
  globalData: {
    getTime: function() {
      return new Date().getTime();
    },
    domain: 'https://web.huizecdn.com/',
    APPID: 'wxe2ad8c364455262b',
    SECRET: 'd119ef2dc7d07a5a0c476125e96a1552',
    opendID: null,
    userInfo: null
  }
})