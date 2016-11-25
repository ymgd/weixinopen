//获取新闻
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    navTab: ["最新", "亿人", "视频", "新闻", "导购"],
    currentNavtab: "0",
    imgUrls: [
      'http://pic.xcar.com.cn/2016/11/07/051d4c4163d9c581c9f568195a9f7451.jpg',
      'http://pic.xcar.com.cn/2016/11/08/706ba9a4f7512f701daa5ce0bc1801ea.jpg',
      'http://pic.xcar.com.cn/2016/11/07/972e4776c710906f0f065aa7f7cd69b6.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    article: [],
    article_length: 0,
    hidden: false,
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.refresh();
    setTimeout(function () {
      that.setData({
        hidden: true
      })
    }, 1000)
  },

  switchTab: function (e) {
    //获取数据
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
  refresh: function () {
    var article = util.getData2();
    console.log("loaddata");
    var article_data = article.data;
    this.setData({
      article: article_data,
      article_length: article_data.length
    });
  }
})