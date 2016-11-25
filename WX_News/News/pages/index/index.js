//index.js
var util = require('../../utils/util.js');
var config = require('../../config.js');

//获取应用实例
var app = getApp()
Page({
  data: {
    news: []
  },

  //事件处理函数
  bindViewTap: function() {
  },

  onLoad: function () {
    var that = this;
    wx.request({
      url: config.getNewsUrl,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        that.parseDate(res.data);
        that.setData({
          news: res.data
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  parseDate: function ( news ) {
    // var filterTime = function ( time ) {
    //   if ( parseInt(time/10) === 0 ) {
    //     return '0' + time;
    //   } else {
    //     return time;
    //   }
    // };

    if ( news.length > 0 ) {
      for ( var i = 0; i < news.length; i++ ) {
        // var newsDate = new Date(parseInt(news[i].time));
        // var year = filterTime(newsDate.getFullYear());
        // var month = filterTime(newsDate.getMonth()+1);
        // var day = filterTime(newsDate.getDate());
        // var hours = filterTime(newsDate.getHours());
        // var mins = filterTime(newsDate.getMinutes());
        // news[i].time = year + '/' + month + '/' + day + ' ' + hours + ':' + mins;
        var date = new Date(Number(news[i].time));
        news[i].time = util.formatTime(date);
      }
    }
  },

  readNewsDetail: function ( event ) {
    var newsId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + newsId
    });
  }
})
