//index.js
//获取应用实例
var app = getApp()
Page( {
  data: {
    userInfo: {avatarUrl:'../../image/avator.jpg',nickName:'qieangel2013'},
    source: 'https://github.com/qieangel2013/SmallApp'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo( {
      url: '../logs/logs'
    })
  },
   go: function(event) {
    wx.navigateTo({
      url: '../live/index?type=' + event.currentTarget.dataset.type
    })
  },
  gos: function(event) {
    wx.navigateTo({
      url: '../camera/index?type=' + event.currentTarget.dataset.type
    })
  },
  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })
  }
})
