Page({
  handleLogoutTap() {
    wx.clearStorageSync();
    wx.redirectTo({
      url: '../auth/onboard/onboard'
    });
  }
});
