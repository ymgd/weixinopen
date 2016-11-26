//获取应用实例
var app = getApp()
var util = require('../../utils/util.js')
var functions = require('../functions.js')
var url = 'http://api.cjkt.com/package/detail?id=40'
var pageSize = 20
Page({
  data: {
    userInfo: {}, 
    courses: [],
    token:null
  },
  onLoad: function () {
   var that = this;
    functions.fetchFilms.call(that, url, function(data){
        that.setData({
          showLoading: false
        })
      })
  },
  onReady: function() {
    wx.setNavigationBarTitle({
      title: '我的课程'
    })
  },
  onShow: function() {
      wx.setNavigationBarTitle({
      title: '我的课程'
    });
     var that = this;
     var appInstance = getApp();
    console.log(appInstance.globalData.token); // I am global data
     that.setData({
          token: appInstance.globalData.token
        })
  },
  toLogin: function() {
    wx.navigateTo({
      url: '../Login/Login'
    })
  }
})