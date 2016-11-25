const app = getApp();

const conf = {
  data: {
    logo: "http://p0.jmstatic.com/templates/jumei/images/logo_new_v1.jpg"
  },
  login() {
    wx.showToast({
      title: "请稍后..."
    });
    wx.navigateBack({
      delta: 1,
      success: function (res) {
        // success
        wx.setStorage({
          key: 'user',
          data: {
            'uid': '45213665',
            'hasLogin': true
          },
          success: function (_res) {
          }
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
};

Page(conf);