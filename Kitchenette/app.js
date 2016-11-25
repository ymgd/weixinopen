//app.js
App({

  // 全局数据对象(整个应用程序共享)

  globalData:{
    userInfo:null
  },

  // 应用程序全局方法
  fetchApi (api_url, callback) {

    wx.request({
      url: api_url,
      data: {},
      header: { 'Content-Type': 'application/json' },
      success (res) {
        callback(null, res.data)
      },
      fail (e) {
        callback(e)
      }
    })

  },


  // 生命周期方法

  onLaunch: function () {
    // 应用程序启动时触发一次
    console.log('App Launch')
  },

  onShow: function () {
    // 当应用程序进入前台显示状态时触发
    console.log('App Show')
  },

  onHide: function () {
    // 当应用程序进入后台状态时触发
    console.log('App Hide')
  }
})