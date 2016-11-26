//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    //加载状态
    loadingHidden: false,
    //当前温度
    currentTemperature: '',
    //夜间温度
    nightAirTemperature: '',
    //白天温度
    dayAirTemperature: '',
    //当前天气
    weather: '',
    //污染指数
    aqi: '',
    //污染程度
    quality: '',
    //风力
    windPower: '',
    //风向
    windDirection: '',
    //因为数据返回不是数组所以要自己封装一个数组
    list: [],
    height: 0,


  },

  onLoad: function () {
    console.log('onLoad')
    var that = this

    //100%好像不好使 可以获取设备高度
    wx.getSystemInfo({
      success: function (res) {
        that.data.height = res.windowHeight;
      }
    })

    wx.getLocation({
      success: function (res) {
        //通过经纬度请求数据
        wx.request({
          //这个网站有免费API赶紧收藏
          url: 'http://route.showapi.com/9-5',
          data: {
            showapi_appid: '11697',
            showapi_sign: '6c0c15c5ec61454dac5288cea2d32881',
            //
            from: '5',
            lng: res.longitude,
            lat: res.latitude,
            //获取一周情况 0是不获取
            needMoreDay: '1',
            needIndex: '1'
          },
          success: function (res) {
            console.log(res)
            console.log(res.data.showapi_res_body.now.api)
            that.setData({
              //改变加载状态
              loadingHidden: true,

              currentTemperature: res.data.showapi_res_body.now.temperature,
              nightAirTemperature: res.data.showapi_res_body.f1.night_air_temperature,
              dayAirTemperature: res.data.showapi_res_body.f1.day_air_temperature,
              weather: res.data.showapi_res_body.now.weather,
              aqi: res.data.showapi_res_body.now.aqi,
              quality: res.data.showapi_res_body.now.aqiDetail.quality,
              windPower: res.data.showapi_res_body.now.wind_power,
              windDirection: res.data.showapi_res_body.now.wind_direction,
              //拼接数组
              list: [
                {
                  'day_weather_pic': res.data.showapi_res_body.f1.day_weather_pic,
                  'weekday': res.data.showapi_res_body.f1.weekday,
                  'day_air_temperature': res.data.showapi_res_body.f1.day_air_temperature,
                  'night_air_temperature': res.data.showapi_res_body.f1.night_air_temperature
                },
                {
                  'day_weather_pic': res.data.showapi_res_body.f2.day_weather_pic,
                  'weekday': res.data.showapi_res_body.f2.weekday,
                  'day_air_temperature': res.data.showapi_res_body.f2.day_air_temperature,
                  'night_air_temperature': res.data.showapi_res_body.f2.night_air_temperature
                },
                {
                  'day_weather_pic': res.data.showapi_res_body.f3.day_weather_pic,
                  'weekday': res.data.showapi_res_body.f3.weekday,
                  'day_air_temperature': res.data.showapi_res_body.f3.day_air_temperature,
                  'night_air_temperature': res.data.showapi_res_body.f3.night_air_temperature
                },
                {
                  'day_weather_pic': res.data.showapi_res_body.f4.day_weather_pic,
                  'weekday': res.data.showapi_res_body.f4.weekday,
                  'day_air_temperature': res.data.showapi_res_body.f4.day_air_temperature,
                  'night_air_temperature': res.data.showapi_res_body.f4.night_air_temperature
                },
                {
                  'day_weather_pic': res.data.showapi_res_body.f5.day_weather_pic,
                  'weekday': res.data.showapi_res_body.f5.weekday,
                  'day_air_temperature': res.data.showapi_res_body.f5.day_air_temperature,
                  'night_air_temperature': res.data.showapi_res_body.f5.night_air_temperature
                },
                {
                  'day_weather_pic': res.data.showapi_res_body.f6.day_weather_pic,
                  'weekday': res.data.showapi_res_body.f6.weekday,
                  'day_air_temperature': res.data.showapi_res_body.f6.day_air_temperature,
                  'night_air_temperature': res.data.showapi_res_body.f6.night_air_temperature
                },
                {
                  'day_weather_pic': res.data.showapi_res_body.f7.day_weather_pic,
                  'weekday': res.data.showapi_res_body.f7.weekday,
                  'day_air_temperature': res.data.showapi_res_body.f7.day_air_temperature,
                  'night_air_temperature': res.data.showapi_res_body.f7.night_air_temperature
                }

              ]
            })
          }
        })

      }
    })

  }
})
