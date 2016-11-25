//index.js

var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    feed: [],
    feed_length: 0
  },
  //事件处理函数
  // 点击”分享“、“评论”、“点赞”
  fenxiang: function() {
   
  },
  dianzan: function() {
    // 弹出toast
    wx.showToast({
      title: '已赞！可在“我的”-“已赞”中查看或进行预订！',
      icon: 'success',
      duration: 2000
    })
  },
  pinglun:function() {
    
  },
  seeuser:function() {
    //wx.navigateTo({ })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.refresh();
  },
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function(){wx.hideNavigationBarLoading();wx.stopPullDownRefresh();}, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){wx.hideNavigationBarLoading();that.nextLoad();}, 1000);
    console.log("lower")
  },
  
  //网络请求数据, 实现首页刷新
  // ？？哪里？？
  refresh0: function(){
    var index_api = '';
    util.getData(index_api)
        .then(function(data){
          console.log(data);
        });
  },

  //使用本地 fake 数据实现刷新效果
  refresh: function(){
    var feed = util.getData2();
    console.log("load data");
    var feed_data = feed.data;
    this.setData({
      feed:feed_data,
      feed_length: feed_data.length
    });
  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function(){
    var next = util.getNext();
    console.log("continue load");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
  }
})