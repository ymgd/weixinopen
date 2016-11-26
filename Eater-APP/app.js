//app.js
App( {
  // onLaunch: function() {
  //   //调用API从本地缓存中获取数据
  //   var logs = wx.getStorageSync( 'logs' ) || []
  //   logs.unshift( Date.now() )
  //   wx.setStorageSync( 'logs', logs )
  // },
  httpClient( url, callback ) {
    wx.request( {
      url,
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function( res ) {
        callback( null, res.data )
      }
      , fail: function( error ) {
        callback( error )
      }
    })
  }
  ,
  // getUserInfo: function( cb ) {
  //   var that = this
  //   if( this.globalData.userInfo ) {
  //     typeof cb == "function" && cb( this.globalData.userInfo )
  //   } else {
  //     //调用登录接口
  //     wx.login( {
  //       success: function() {
  //         wx.getUserInfo( {
  //           success: function( res ) {
  //             that.globalData.userInfo = res.userInfo
  //             typeof cb == "function" && cb( that.globalData.userInfo )
  //           }
  //         })
  //       }
  //     })
  //   }
  // },
  // globalData: {
  //   userInfo: null
  // }
})