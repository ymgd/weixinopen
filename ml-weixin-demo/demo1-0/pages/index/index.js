//index.js
//获取应用实例
var app = getApp()
//  方法一：page
var page={
  data: {
    motto: '进入我的程序',
    userInfo: {},
    mylogobtn :'显示or隐藏',
    userLogoShow : true,
    nicknamitems : [1,2,3]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  btnclick: function(){
    // 该函数，控制 userLogoShow的值：true或false,来添加、移除
    this.setData({
      userLogoShow:!this.data.userLogoShow
    })
  },
  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
}
Page(page);
