//logs.js
var app = getApp()
var API_URL = "https://api.douban.com/v2/book/search"
Page({
  data: {
    size: 100,
    title: "数据加载中...",
    books: [],
    loading: true
  },

  onLoad: function() {
    var _this = this
    console.log(_this.data)
    
    var params = {
      tag: "科幻",
      start: 0,
      count: _this.data.size
    }

    wx.request({
      url: API_URL,
      data: params,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
			header: {"Content-Type":"application/json"},
      success: function(res){
        // success
        _this.setData({
         books: res.data.books,
         loading: false
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  
})
