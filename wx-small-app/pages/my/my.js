const app = getApp()
const user1 = app.globalData.user
console.info('进来了my page')
console.info(app.globalData,'app.globalData')
Page({
  data: {
    systemInfo: [],
    username: ''
  },
  onReady: function () {
    console.info('my ready000000000')
  },
  onLoad: function() {
    console.info('my onLoad')
  },
  onHide: () => {
    console.info('my onHide')
  },
  onUnload: () => {
    console.info('my onUnload')
  },
  onShow: function() {
    console.info("my onShow")
    const user = app.globalData.user
    console.info(user,'user')
    if( user ) {
      console.info(user.get('username'),'username')
      console.info( user )
      this.setData({
        username: user.get('username')
      })
    }
  },
  login: function(e) {
    wx.navigateTo({
      url: './login/login',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})
