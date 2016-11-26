//news.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '中华列表',        //title
    hidden: false,            //加载提示
    page: 1,                  //当前页码
    RecommendPic:[],          //轮播图
    newsArray:[]              //新闻
  },
  //事件处理函数，跳转到详情页
  bindViewTap: function(event) {
    var newsId = event.currentTarget.dataset.newsid;
    var newsinfoUrl = '../info/news_info?newsId='+newsId;
    wx.navigateTo({
      url: newsinfoUrl
    })
  },
  //页面加载监听，页面准备好后执行===在此处获取newss数据
  onLoad: function (options) {
    console.log('news===加载数据--'+options.type);
    var self = this;
    this.getNews({page: self.data.page});
  },
  //加载数据
  getNews:function(data){
      var that = this;
      that.setData({
        hidden: false
      });
      if (!data) data = {};
      if (!data.page) data.page = 1;
      if (data.page === 1) {
        that.setData({
          RecommendPic: [],
          newsArray:[] 
        });
      }
      //http://huimian.app.china.com/NewsServlet.do?processID=getNewsList&Page=1&PageSize=20&Type=1
      wx.request({
        url: 'http://huimian.app.china.com/NewsServlet.do',
        data: {
           processID:'getNewsList',
           Page: data.page ,
           PageSize: '20',
           Type:3
        },
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
          var data = res.data;//接口返回的数据
          //console.log("接口返回的数据="+data);
          var newsArray = data.Data;
          //console.log("新闻数据=="+newsArray);
          var RecommendPic = data.RecommendPic;
          //console.log("轮播图=="+RecommendPic);
          //赋值
          that.setData({
            newsArray:newsArray,
            RecommendPic:RecommendPic,
            newsArray: that.data.newsArray.concat(res.data.Data.map(function (item) {
              return item;
            }))
          })
          setTimeout(function () {
            that.setData({
              hidden: true
            });
          }, 300);
        }
      })
  },
  turnToTag:function(event){
    console.log("newsjs="+event);
    app.globalData.tagJS.turnToTag(event);
  },
  //下拉触发
  lower: function(e) {
    var self = this;
    self.setData({
      page: self.data.page + 1
    });
    this.getNews({page: self.data.page});  
  }

})
