//app.js
App({
    globalData:{
    userInfo:null,
    appkey:'sdfhkjsdfksdj',
    appsecrect:'jjjjjjjjjjj',
    mainhost:'http://api.musicbible.com/api/v1',
    windowWidth:-1,
    windowHeight:-1
  },
    getAppInfo:function(){
      wx.getSystemInfo({
            success: function(res) {
                  // console.log(res.model)
                  // console.log(res.pixelRatio)
                  // console.log(res.windowWidth)
                  // console.log(res.windowHeight)
                  // console.log(res.language)
                  // console.log(res.version)
                  this.windowWidth =res.windowWidth
                  this.windowHeight=res.windowHeight
                  
            }
      })
  },
  onLaunch: function () {
    console.log('App Launch')
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getAppInfo();
  },
  onShow: function () {
    console.log('App Show')
    //获取当前页面的实例
    //var page = getCurrentPage();
  },
  onHide: function () {
    console.log('App Hide')
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
  }


})


