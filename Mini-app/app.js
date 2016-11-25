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

// ========== 应用程序全局方法 ==========
  fetchApi(url, callback) {
    wx.request({
      url,
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        callback(null, res.data)
      },
      fail(e) {
        callback(e)
      }
    })
  },
  
  //封装的数据请求类
  req: function(url,data,param){
    var requestData = {
      url: url,
      data: typeof data == 'object' ? data : {},
      method: typeof param.method == 'string' && param.method.length > 0 ? param.method.toUpperCase() : 'GET',
      header: typeof param.header == 'object' ? param.header : {},
      success: function(res) {
        typeof param.success == 'function' && param.success(res);
      },
      fail: function(res){
        typeof param.fail == 'function' && param.fail(res);
      },
      complete: function(res){
        typeof param.complete == 'function' && param.complete(res);
      }
    };
    wx.request(requestData);
  },

  // ========== 生命周期方法 ==========
  onLaunch() {
    // 应用程序启动时触发一次
    console.log('App Launch')
  },

  onShow() {
    // 当应用程序进入前台显示状态时触发
    console.log('App Show')
  },
  onHide() {
    // 当应用程序进入后台状态时触发
    console.log('App Hide')
  },
  globalData:{
    userInfo:null
  }




})