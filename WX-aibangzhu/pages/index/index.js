//index.js

//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World wechat',
    userInfo: {},
    modalHidden: true
  },
  //事件处理函数
  selectCommunity: function() {
    wx.navigateTo({
      url: '../community/community'
    })
  },
  //点击确认后进入model内容
  confirmMessage: function(){
    this.setData({
      modalHidden: false
    })
  },
  //model中点击"进入社区“
  confirmMessageYes: function(){
    this.setData({
      modalHidden: true
    })
    //TODO 用户点击“进入社区”后，将数据发送给API保存 并且开始将用户信息发送给社区随机人员
    wx.navigateTo({
      url: '../story/story'
    })
  },
  //用户选择“撤销验证“
  cancel: function(){
    this.setData({
      modalHidden: true
    })
  },
  // 用户选择“先不认证，进社区看看”
  withoutAuthenticated:function(){
    wx.navigateTo({
      url: '../story/story'
    })
  },
  formSubmit: function(e){
    console.log(e.detail.value)
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
      that.update()
    })
  }
})
