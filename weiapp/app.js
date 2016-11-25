//app.js
App({
  app_key:'',
  app_secret:'',
  onLaunch: function () {
    var obj = this;
    wx.getStorage({
      key: 'ecs_selected_zone',
      success: function(res){
        obj.globalData.ecs_selected_zone = res.data;
      }
    })
  },
  // getUserInfo:function(cb){
  //   var that = this
  //   if(this.globalData.userInfo){
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   }else{
  //     //调用登录接口
  //     wx.login({
  //       success: function () {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             that.globalData.userInfo = res.userInfo
  //             typeof cb == "function" && cb(that.globalData.userInfo)
  //           }
  //         })
  //       }
  //     })
  //   }
  // },
  globalData:{
    userInfo:null,
    app_key:null,
    app_secret:null,
    ecs_selected_zone:'',
  }
})