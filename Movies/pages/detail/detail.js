// detail.js
var app = getApp();
Page({
  data:{
    movie:{},
    loading:false,
    title:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.loadMovie(options.id);
  },
  onReady:function(){
    this.setTitle(this.data.title)
  },
  //加载电影信息
  loadMovie:function(movieId){
     var that = this;
     wx.request({
        url: 'https://api.douban.com/v2/movie/subject/'+movieId,
        header: {
            'Content-Type': 'application/json'
        },
        success: function(data) {
          var text = app.getSubjectseTxt(data.data)
          data.data.text = text;
          that.setData({
            movie:data.data,
            loading:true,
            title:data.data.title
          });
        }
    })
  },
  setTitle:function(title){
    wx.setNavigationBarTitle({
      title:title
    })
  }
})