//app.js

App( {
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync( 'logs' ) || []
    logs.unshift( Date.now() )
    wx.setStorageSync( 'logs', logs )
  },
  getUserInfo: function( cb ) {
    var that = this;
   console.log("getUserInfo.js 1" );

    if( this.globalData.userInfo ) {

      // ofo 用户信息
      if( !this.globalData.userInfo.ofoInfo ) {
        var userInfo2 = wx.getStorageSync( "userInfo" );
        if (userInfo2 && userInfo2 == 'object')
        this.globalData.userInfo = userInfo2;
      }
      typeof cb == "function" && cb( this.globalData.userInfo )
      return;
    }

   console.log("getUserInfo.js 2" );
    var userInfo2 = wx.getStorageSync( "userInfo" );
    if( userInfo2 && typeof userInfo2 == 'object') {
      this.globalData.userInfo = userInfo2
      
      typeof cb == "function" && cb( this.globalData.userInfo )
      return
    }


  console.log("getUserInfo.js 3" );
    //调用登录接口
    wx.login( {
      success: function() {
        wx.getUserInfo( {
          success: function( res ) {
            console.log("getUserInfo.js 4" );
            that.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb( that.globalData.userInfo )
          }
        })
      }
    })
  },
  getUserInfoSync() {
    return this.globalData.userInfo;
  },
  globalData: {
    userInfo: null
  }
})