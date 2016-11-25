//index.js
//获取应用实例
var app = getApp();

Page({
  data: {
    userInfo: {},
    list: []
  },
  bindAddTap() {
    wx.navigateTo({
      url: '../new/index'
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;

    wx.getStorage({
      key: app.globalData.storeKey,
      success(res) {
        that.setData({
          list: res.data
        });
      }
    });

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
