//index.js
//获取应用实例
var app = getApp()
var indexData = require('../../data/index.js');

Page({
  data: {
    imgUrls: [
      'http://img.zcool.cn/community/focus/bd085820c53ba84a17289bf9c767.jpg',
      'http://img.zcool.cn/community/focus/bbad5820c54fa84a17289b7218e4.jpg',
      'http://img.zcool.cn/community/focus/544c5820c524a84a17289b5e033d.jpg',
      'http://img.zcool.cn/community/focus/4c375820c50da84a17289bb57ae4.jpg',
    ],
    interval: 3000,
    duration: 600,
    indexList: indexData    // 首页列表数据
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var _this = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      _this.setData({
        userInfo:userInfo
      })
    })
  },
  // 显示详情页面
  showDetail: function(e) {
    console.log(e);
    var idx = e.currentTarget.dataset.idx;
    wx.navigateTo({
      url: 'detail?idx='+idx
    })
  },
  onPullDownRefresh: function() {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000
    });
  },
  onReachBottom: function() {
    wx.stopPullDownRefresh({
      complete: function (res) {
        console.log(res, new Date())
      }
    })
  }
})
