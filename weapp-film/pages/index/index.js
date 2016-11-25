//index.js
Page({
  data: {
    films: [],
    limit: 6,
    loading: false,
    windowHeight: 0,
    windowWidth: 0
  },
  onLoad: function () {
    this.setData({
      loading: false
    })
  },
  onShow: function(){
    var that = this
    wx.request({
      url: 'http://m.maoyan.com/movie/list.json', //仅为示例，并非真实的接口地址
      data: {
        offset: 0,
        type: 'hot',
        limit: that.data.limit
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          films: res.data.data.movies,
          loading: true
        })
      }
    })
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  pullDownRefresh: function(e) {
    this.onLoad()
  },
  pullUpLoad: function(e) {
    var limit = this.data.limit + 6
    console.log(limit)
    this.setData({
      limit: limit
    })
    this.onShow()
  }
})
