
Page({
  data: {
    cache: '10.24M',
    tel: '400-800-300',
    version: 'v2.2.0'
  },
  onLoad: function() {
    // body...
  },
  netSwitchChange: function(e) {
    console.log(e);
  },
  clearCache: function(e) {
    this.setData({
      cache: '0M'
    });
    wx.showToast({
      title: '缓冲已清除',
      icon: 'success'
    })
  }
})