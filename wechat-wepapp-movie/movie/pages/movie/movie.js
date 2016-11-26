var subjectUtil = require('../../utils/subjectUtil.js');//模板块调取
Page({
  data:{
    indicatorDots: true,//面板指示点
    autoplay:true,//自动切换
    interval: 3000,//间隔时间
    duration: 1000,//滑动时间
    imgUrls: [//调取轮播图片
      '/assets/img/001.jpg',
      '/assets/img/002.jpg',
      '/assets/img/003.jpg',
    ],
    movies:[],//api调取的电影数据
    hidden: false,//显示loading
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
    wx.request({//请求网络
      url: "https://api.douban.com/v2/movie/in_theaters",
      header: {
        "Content-Type": "application/json"
      },
      success: function(res){
        console.log(res);
        var subjects = res.data.subjects//将api数据保持到变量中
        subjectUtil.processSubjects(subjects);//处理数据
        page.setData({
          movies: subjects,
          hidden: true//数据加载完毕后，关闭loading
          });
      }
    })
  },
  detail: function(e){//跳转至详情页面
    var i = getApp()
    getApp().detail(e);
  }
})