//index.js
//获取应用实例
var app = getApp();
var subjectUtil = require("../../utils/subjectUtil.js");
Page({
  data: {
    movie: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
      wx.showToast({
        "title": "玩命加载中",
        "icon": "loading",
        "duration":　10000
      })
    var movieId = options.id;
    this.loadMovie(movieId);
  },
  loadMovie: function (movieId) {
    var that = this;
    wx.request({
      url: "https://api.douban.com/v2/movie/subject/" + movieId,
       header: {
        "Content-Type": "application/json,application/json"
       },

      success: function(res) {
        var subject = res.data;
        console.log(subject);
        subjectUtil.processSubject(subject);
        that.setData({
          movie: subject
        });
        wx.hideToast();
      }
    })
  },
  detail: function(e){
    wx.setStorage({
      "movieId": e.target.id
    })
    wx.navigateTo({
        url:"../detail/detail"
    })
  }
  
})
