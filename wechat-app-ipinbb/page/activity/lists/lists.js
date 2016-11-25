Page({
  data: {
       list: []                // 商品数据
  },
  onLoad: function (e) {
      wx.request({
        url: 'http://service.ipinbb.com:8080/dispatcherService/getAttendGroupList',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {      // 设置请求的 header
          'Content-Type': 'application/json'
        },
        success: function(res){
            console.log(res);    
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  }
})