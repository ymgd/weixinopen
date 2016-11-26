var subjectUtil = require('../../utils/subjectUtil.js');

Page({
  data:{
    movies:[],
    hidden: false,
  },
  onLoad:function(options){
    this.loadMovies();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  loadMovies:function(){
    var page =this;
    wx.request({
      url: "https://api.douban.com/v2/movie/top250",
      header: {
        "Content-Type": "application/json"
      },
      success: function(res){
        console.log(res);
        var subjects = res.data.subjects
        subjectUtil.processSubjects(subjects)
        page.setData({
          movies: subjects,
          hidden: true
          });
      }
    })
  },
  detail: function(e){
    getApp().detail(e);
  }
})