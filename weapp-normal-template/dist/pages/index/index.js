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
      url: '../mine/mine'
    });
  },

  onLoad: function () {
    console.log('onLoad');
    this.setData({
      appinfo: {
        name: 'weapp-template',
        desc: 'template of weapp'
      }
    })
  }
});
