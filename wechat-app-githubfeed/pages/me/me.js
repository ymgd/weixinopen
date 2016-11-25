const app = getApp();

Page({
  data: {
    username: '',
    avatar_url: ""
  },

  onReady() {
    const user = wx.getStorageSync('user');

    if (user) {
      this.setData({ username: user.username, avatar_url: user.avatar_url });
    }
  },

  goRouteSettings() {
    wx.navigateTo({ 
      url: '../settings/settings'
    });
  }
});
