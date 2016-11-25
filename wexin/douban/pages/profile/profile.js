var app = getApp()

Page({
  data: {
    title: 'About Me',
    userInfo: {
      nickName: 'iceStone',
    },
    avatarUrl: '../../images/wechat.png'
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '关于我',
      success: function(res) {
        // success
      }
    })

    var that = this
    app.getUserInfo(function(res){
      console.log(res)
      that.setData({
          userInfo:res
      }) 
    })
  }
    
})
