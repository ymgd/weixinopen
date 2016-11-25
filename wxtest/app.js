//app.js
App({
  onLaunch: function () {
    var that=this;
    //调用API从本地缓存中获取数据
    that.curid = wx.getStorageSync('curid') || "CN101010100"
    wx.setStorageSync('curid', that.curid)
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
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
  globalData:{
    userInfo:null
  }
  

})
