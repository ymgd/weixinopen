//index.js
var app = getApp();
Page({
  data: {
    movies:[],
    loading:false,
    banners:['../../images/1.jpg','../../images/2.jpg'],
    dots:true,
    autoplay:30000,
  },
  onLoad:function(){
    this.getMovies();
  },
  getMovies:function(){
    var that = this;
    wx.request({
      url:'https://api.douban.com/v2/movie/in_theaters',
      data:{city:"杭州"},
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
        wx.stopPullDownRefresh()
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