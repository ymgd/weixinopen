var app = getApp()
var API_URL = "https://api.douban.com/v2/book/"
Page({
  data: {
    book: [],
  },

  onLoad: function(param) {
    var _this = this
    console.log(_this.data)

    wx.request({
      url: API_URL.concat(param.id),
      data: [],
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
			header: {"Content-Type":"application/json"},
      success: function(res){
        // success
        _this.setData({
         book: res.data,
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
