
//WeatherHome.js
//获取应用实例
var config = require('../../config/config.js');
var util = require('../../utils/util.js')

Page({
  MyUserInfo: {
    id: 0,
    name: ''
  },
  data: {
    city: '',
    currtime:'',
    todayWeather: {},
    todayAqi: {},
    daily_forecast: []
  },

  onLoad: function () {
    var that = this;

    //获取经纬度
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var speed = res.speed;
        var accuracy = res.accuracy;
        //获取城市
        that.getCity(latitude, longitude);
      },
      fail: function (res) {
        //失败
        util.showToast('定位失败')
      }
    });
  },

  //获取城市
  getCity: function (latitude, longitude) {
    var that = this;
    wx.request({
      url: config.baiduGetCityAPI,
      data: {
        ak: config.baiduMapApiKey,
        location: latitude + ',' + longitude,
        output: 'json',
        pois: '0',
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log('*************xie getCityInfo:', res.data)
        that.getWeatherInfo(res.data.result.addressComponent.city);
        that.setData({ city: res.data.result.addressComponent.city })
      },
      fail: function (res) {
        util.showToast('定位失败')
      }
    })
  },

  //获取天气
  getWeatherInfo: function (cityName) {
    var tempCityName = cityName;
    var that = this;
    if (cityName.indexOf("市") >= 0) {
      tempCityName = cityName.substring(0, cityName.length - 1);
    }

    wx.request({
      url: config.weatherInfoAPI,
      data: {
        city: tempCityName,
      },
      header: {
        'Content-Type': 'application/json',
        'apikey': config.baiduApiKey
      },
      success: function (res) {
        if (res.statusCode == 200) {
          //成功.basic.update.loc
          var daily_forecast=res.data["HeWeather data service 3.0"]["0"].daily_forecast;
          daily_forecast[3].date = util.dateCovertWeek(daily_forecast[3].date);
          that.setData({
            currtime:res.data["HeWeather data service 3.0"]["0"].basic.update.loc,
            todayWeather: res.data["HeWeather data service 3.0"]["0"].now,
            todayAqi: res.data["HeWeather data service 3.0"]["0"].aqi,
            daily_forecast: daily_forecast,
          });
        } else {
          //失败
          util.showToast('获取天气失败')
        }
      },
      fail: function (res) {
        util.showToast('获取天气失败')
      }
    })
  },
})
