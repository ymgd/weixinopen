//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '指尖书香',
    enter: '进入诗和远方',
    userInfo: {
      "avatarUrl":"../../images/profile.png",
      "nickName":"寒江独钓"
    }
  },
  //事件处理函数
  clickEnter: function() {
     wx.navigateTo({
      url: '../home/home'
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
  }
})
