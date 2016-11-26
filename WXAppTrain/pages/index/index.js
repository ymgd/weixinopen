//index.js
var api = require('../../requests/api.js');
var requests = require('../../requests/request.js');

//获取应用实例
var app = getApp();

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
  },
  onLoad: function() {
    console.log('onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      });
    });
  },
	//事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs',
    });
  },
  successCbTrain: function(res) {
    var json = res.data;
    //将JSON类型转为String类型用以url参数传递，否则传递后会变成[object Object]
    var jsonString = JSON.stringify(json);
    wx.navigateTo({
      url: '../train/train?trainInfos='+jsonString,
    });
  },
	//获取火车票函数
  getTrainInfo: function() {
    var url = api.API_TRAIN_SEARCH_ZZ;
    var method = "GET";
    var header = {apikey: api.API_TRAIN_KEY};
    var data= {
        version: '1.0',
        from: '北京',
        to: '杭州',
        date: '2016-11-15',
      };
    requests.request(url, method, header, data, this.successCbTrain, null, null);
  },
});
