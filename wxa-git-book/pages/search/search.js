var app = getApp()
Page({
  data: {
    page: 0,
    books: [],
    loaded: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (page) {
    var page = page || this.data.page
    var that = this
    console.log('onLoad')
    console.log('that')
    wx.request({
      url: app.baseUrl+'books/all?',
      data: {
        limit:10,
        page
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          books: res.data.list,
          loaded: true
        })
      },
      fail: function(res) {
        console.log(res.data);

      }
    })
  },
  pullUpLoad: function () {
    this.setData( {
      page: this.data.page + 1,
      // loaded: false
    })
    console.log( "上拉拉加载更多...." + this.data.page )
    // this.onLoad( this.data.page )
  },
  pullDownRefresh: function () {
    console.log( "下拉刷新...." )
    this.setData( {
      page: 0,
      // loaded: false
    })
    // this.onLoad()
  }
})
