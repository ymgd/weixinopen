// userinfo.js
var app = getApp()
Page({
  data:{
    // text:"这是一个页面"
    userInfo: {}
  },
  onLoad:function(options){
    this.setData({
        userInfo: app.globalData.userInfo
    })
    console.log(this.data.userInfo);
  },
  onLogout:function(){
      app.globalData.userInfo=null
      wx.redirectTo({
          url:"../login/login"
      })
  },
  getWorks:function(){
      wx.navigateTo({
        url: "../record/record"
      })
  },
  changeAvatar:function(){
    var tempFilePaths = ''
    wx.chooseImage({
      count: 1,
      sizeType: 'compressed',
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://romeo.wang/upload.php', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'avatar',
          // formData:{
          //   'user': app.globalData.userInfo
          // },
          success: function(res){
            var data = res.data
            //do something
            console.log(data)
          },
          fail: function(){
            console.log('error')
          }
        })
      }
    })
  }
})