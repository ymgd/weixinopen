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

// 获得快递运单信息 com：快递公司简称，no：快递单号，cb：方法
getExpressInfo: function(com,no,cb) {
  // https请求
  wx.request({
    url: 'http://v.juhe.cn/exp/index?com='+com+'&no='+no+'&dtype=&key=16d0d5308da06ace4bee7e3cf3e32fe2',
    data: {
      x: '' ,
      y: ''
    },
    header: {
        'Content-Type': 'application/json'
    },
    success: function(res) {
      // console.log(res.data)
      cb(res.data)
    }
  })
},

  globalData:{
    userInfo:null
  }
})