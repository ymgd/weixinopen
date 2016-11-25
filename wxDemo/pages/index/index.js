//index.js
//获取应用实例
let app = getApp()
Page({
  data: {
    Github: 'https://github.com/answershuto',
    Blog: 'https://answershuto.github.io',
    userInfo: {}
  },
  onLoad() {
    let that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
