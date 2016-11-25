//app.js,App函数 注册小程序 只能注册一次，且必须在此文件中
App({
  //生命周期一 当小程序初始化完成时，只初始化一次
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  //生命周期二 当小程序启动，或从后台进入前台显示，会触发onShow
  onShow:function(){
    //console.log('这是Onshow，我要显示了');
  },
  onHide:function(){
    //console.log('我进入后台了了，我要隐藏');
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