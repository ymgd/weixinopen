//app.js
App({
   // ========== 应用程序全局方法 ==========
  fetchApi (url, callback) {
    wx.request({
      url,
      // data: {
        
      //   },
      // header: { 
      //   'Content-Type': 'application/json',
      //  },
      success (res) {
        callback(null, res.data)
      },
      fail (e) {
        callback(e)
      }
    })
  },
  onLaunch: function () {
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
})