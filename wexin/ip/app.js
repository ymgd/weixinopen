//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
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

// 调用第三方API接口
 getIpInfo:function(ip,result){
   wx.request({
      url: "http://ip.taobao.com/service/getIpInfo.php?ip="+ip,
      data: {
        x: '' ,
        y: ''
      },
       header: {
      'Content-Type': 'application/json'
       },
      success: function(res) {
         // console.log(res.data)
         // 判断result是不是函数（即回调函数）,如果是就把结果作为参数传回去
         typeof result == "funciton" && result(res.data)  
      }
    })
 },

  globalData:{
    userInfo:null
  }
})
