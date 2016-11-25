//app.js
var config={
// 方法一：onLaunch（程序启动，调用方法）
  onLaunch: function() {
    //调用API从本地缓存中获取数据
console.log('程序启动了')
//  本地数据库＝getStorageSync
// 从微信的getStorageSync中回去”logs“信息
    var logs = wx.getStorageSync( 'logs' ) || []
// 填上当前的时间
    logs.unshift( Date.now() )
// 再保存到wx.setStorageSync中（Storage＝本地数据库）
    wx.setStorageSync( 'logs', logs )
  },


// 方法二：getUserInfo
  getUserInfo: function( cb ) {
    var that = this
    if( this.globalData.userInfo ) {
      typeof cb == "function" && cb( this.globalData.userInfo )
        } else {
      //调用登录接口
      wx.login( {
        success: function() {
          wx.getUserInfo( {
            success: function( res ) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb( that.globalData.userInfo )
            }
          })
        }
      })
    }
  },
  // 对象
  globalData: {
    userInfo: null
  }
}

App( config )