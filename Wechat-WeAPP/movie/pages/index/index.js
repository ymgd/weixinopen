//index.js
//获取应用实例
var app = getApp();
var subjectUtil = require("../../utils/subjectUtil.js");
Page({
  data: {
    AK: 'hWtYHdhw2fIwi9PWsWX09IVmGtLVp2UG',
    imgSrc: [
      "../assets/img/001.jpg",
      "../assets/img/002.jpg",
      "../assets/img/003.jpg",
    ],
    movie: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
      wx.showToast({
        "title": "玩命加载中",
        "icon": "loading",
        "duration":　10000
      })
    var that = this;
    wx.getLocation({
      type: "gcj02",
      success: function(res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
      that.loadCity(latitude, longitude, that.data.AK, that.loadMovie)
      }
    })
  },
  loadCity: function (latitude, longitude, AK, callback) {
        var that = this;
        var url = 'https://api.map.baidu.com/geocoder/v2/?location=' + latitude + ',' + longitude + '&output=json&ak=' + AK;
        wx.request({
            url: url,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                console.log(res);
                var city = res.data.result.addressComponent.city;
                city = city.substring(0,city.length-1);
                var url = "https://api.douban.com/v2/movie/in_theaters?city=" + city;
                callback && callback(url);
            }
        })
    },
  loadMovie: function (url) {
    var that = this;
    wx.request({
      url: url,
       header: {
        "Content-Type": "application/json,application/json"
       },

      success: function(res) {
        console.log(res);
        var subjects = res.data.subjects;
        if(subjects.length < 1) {
          return;
        }
        console.log(subjects);
        subjectUtil.processSubjects(subjects);
        that.setData({
          movie: subjects
        });
        wx.hideToast();
      }
    })
  },
  detail: function(e){
   app.detail(e);
  }
  
})
