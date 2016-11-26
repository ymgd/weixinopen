
Page({
  data: {
    results: []
  },
  onLoad: function () {
    this.setData({
      results: (wx.getStorageSync('results') || [])
    })
  }
})