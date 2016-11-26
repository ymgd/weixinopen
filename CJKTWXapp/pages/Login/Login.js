var app = getApp()
Page({
  data: {
    motto: '欢迎来到我的酒馆',
    userInfo: {},
    toast1Hidden:true,
    token:null,
  },
  //事件处理函数
  login: function() {
    var that = this;
    app.globalData.token = 2953789090;
    that.setData({
          toast1Hidden: false
    })
   
    wx.navigateBack()
  },
  onLoad: function () {
    console.log('onLoad')
     
  }, 
  toast1Change:function(){
    var that = this
    that.setData({
          toast1Hidden: true
    })
  }
  
})