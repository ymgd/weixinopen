var app = getApp();
Page({
  data: {
    userInfo: {},
    userBirth:"123"
  },
  onLoad: function(options) {
    // Do some initialize when page load.
    var that = this;
    app.getUserInfo(function(userInfo){
        that.setData({userInfo: userInfo});
    });
    this.loadBirth();
  },
  onReady: function() {
    // Do something when page ready.
  },
  onShow: function() {
    // Do something when page show.
    // wx.setNavigationBarTitle = "第1页";
    this.loadBirth();
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    // Do something when pull down
  },
  // Event handler.
  onTouchBirthCell: function() {
    wx.navigateTo({url: "../birthPage/birthPage"});
  },

  loadBirth: function() {
    var that = this;
    wx.getStorage({
      key: "kUserBirth",
      success: function(res) {
        that.setData({
          userBirth: res.data
        });
      },
      fail: function() {
        that.setData({
          userBirth: "未指定"
        });
      }
    })
  }
})