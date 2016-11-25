
var util = require('../../utils/util.js');
var config = require('../../config.js');

Page({
  data:{
    newsDetail: {}
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.getDetail(options.id);
  },
  
  getDetail: function ( newsId ) {
      var that = this;
      wx.request({
        url: config.getNewsDetailUrl,
        data: {
            id: newsId
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          var date = new Date(Number(res.data.time));
          res.data.time = util.formatTime(date);
          that.setData({
              newsDetail: res.data
          });
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