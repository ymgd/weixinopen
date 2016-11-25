Page({
  data: {
    list: [],
    loading: true,
    title: 'Loading...'
  },
  onLoad (params) {
    const apiUrl = 'https://api.douban.com/v2/movie/' + params.type
    const _this = this
    wx.request({
      url: apiUrl,
      data: {},
      header: {
          'Content-Type': 'application/json'
      },
      success: function (res) {
        _this.setData({ list: res.data.subjects, title: res.data.title, loading: false })
      }
    })
  }
})
