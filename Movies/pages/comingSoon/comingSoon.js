// comingSoon.js
var app = getApp();
Page({
  data: {
    movies:[],
    loading:false
  },
  onLoad:function(){
    this.getMovies();
  },
  getMovies:function(){
    var that = this;
    wx.request({
      url:'https://api.douban.com/v2/movie/coming_soon',
      header:{'Content-Type': 'application/json'},
      success:function(data){
        var subjects = data.data.subjects;
        for(var subject in subjects){
          var text = app.getSubjectseTxt(subjects[subject]);
          subjects[subject].text = text;
        }
        that.setData({
          movies:subjects,
          loading:true
        });
         wx.stopPullDownRefresh();
      }
    });
  },
  detail:function(e){
    app.detail(e);
  },
  onPullDownRefresh:function(){
    this.setData({
      loading:false
    });
    this.getMovies();
  }
})