//discovery.js
const cache_key = 'booklist_101';
var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    userInfo: {},
    bookList: [],
    count: 0,
    imgUrls: [
      '../../imgs/scroll1.png',
      '../../imgs/scroll2.png',
      '../../imgs/scroll3.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //用户信息
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    //先取缓存
    wx.getStorage({
      key: cache_key,
      success: function (res) {
        // success
        console.log(res);
        that.setData({
          bookList: res.data.books,
          count: that.data.count + res.data.count
        });
      },
      fail: function () {
        // fail，再发送网络请求
        wx.request({
          url: 'https://api.douban.com/v2/book/series/101/books',
          success: function (res) {
            if (res.data.count == 0) {
              return;
            }
            //渲染到视图
            that.setData({
              bookList: res.data.books,
              count: that.data.count + res.data.count
            });
            //然后更新或保存到本地缓存
            wx.setStorage({
              key: cache_key,
              data: res.data
            })
          },
          fail: function (res) {
            console.log(res.data);
            console.log("fail");
          }
        });
      }
    });
  },
  upper: function (e) {
    console.log("已到顶部");
  },
  lower: function (e) {
    console.log("已到低部");
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 5000
    });
    wx.request({
      url: 'https://api.douban.com/v2/book/series/129/books',
      method:'GET',
      data:{count:that.data.count},
      success: function (res) {
        if (res.data.count == 0) {
          return;
        }
        //渲染到视图
        that.setData({
          bookList: that.data.bookList.concat(res.data.books),
          count: that.data.count + res.data.count
        });
        wx.hideToast();
      },
      fail: function (res) {
        console.log(res.data);
        console.log("fail");
      }
    });
  },
  onReady:function(){
    // 页面渲染完成
    wx.hideToast();
  },
});
