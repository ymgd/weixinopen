//index.js
//获取应用实例
var app = getApp();
var subjectUtil = require("../../utils/subjectUtil.js");
Page({
  data: {
    movie: [],
    hiddenEnd:true,
    start:0,
  },
  onLoad: function () {
      this.showMovie();
  },
  onReachBottom: function () {
    if(!this.data.hiddenEnd) {
      return;
    }
    this.showMovie();
  },
  showMovie: function () {
    wx.showToast({
        "title": "玩命加载中",
        "icon": "loading",
        "duration":　10000
      })
    this.loadMovie();
  },
  loadMovie: function (start) {
    var that = this;
    wx.request({
      url: "https://api.douban.com/v2/movie/top250?start=" + that.data.start + "&count=20",
       header: {
        "Content-Type": "application/json,application/json"
       },

      success: function(res) {
        var subjects = res.data.subjects;
        console.log(subjects);
        subjectUtil.processSubjects(subjects);
         that.setData({
           movie: that.data.movie.concat(subjects)
         });
        that.setData({
          start: that.data.start + 20
        })
        if(subjects.length < 20) {
          that.setData({
           hiddenEnd: false
          });
          return;
        }
        wx.hideToast();
        
      }
    })
  },
  detail: function(e) {
    app.detail(e);
  }
})
