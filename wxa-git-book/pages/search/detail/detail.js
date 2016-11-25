var app = getApp()
Page({
  data: {
    id: "",
    chapters: [],
    percent: 0
  },
  onLoad: function(options) {
    var that = this
    wx.request({
      url: app.baseUrl + "book/"+options.id+"/contents",
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data.progress.chapters);
        that.setData({
          id: options.id,
          chapters: res.data.progress.chapters,
          percent: res.data.progress.percent
        })
      }
    })
  }
})
