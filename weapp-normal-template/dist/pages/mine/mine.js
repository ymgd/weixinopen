// 获取应用实例
const app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  // 事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../index/index'
    });
  },
  onLoad: function () {
    this.setData({
      userInfo: {
        nickName: 'Bell',
        motto: 'to be greedy'
      }
    })
  }
});
