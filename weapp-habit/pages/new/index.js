var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    userInfo: {},
    content: ''
  },
  bindInput(e) {
    this.setData({
      content: e.detail.value
    });
  },
  bindAddTap() {
    var list = wx.getStorageSync(app.globalData.storeKey) || [];
    
    list.push({
      id: list.length,
      content: this.data.content,
      streak: 0,
      lastCheckTime: '',
      createTime: util.formatDate(new Date())
    });

    wx.setStorageSync(app.globalData.storeKey, list);
    this.goIndex();
  },
  goIndex() {
    wx.navigateTo({
      url: '../index/index'
    });
  },
  onLoad: function () {
    var that = this;

    app.getUserInfo(function(userInfo) {
      that.setData({
        userInfo:userInfo
      });
    });
  }
});
