//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    location: {},
    now:{},
    ldate:'',
    week:'',
    weathers:[],
    currentWeatherImg:'',
    locationImage:'../../img/limg.png',
    locationImageId:'locationImage',
    formId:'form',
  },
  
  // 事件处理函数
  bindEvent:function(e) {
    var that = this;
    var id = e.target.id;
    //form表单事件
    if(that.data.formId == id){
      util.getWeatherData(e.detail.value.text,function(data){
        data.now.temperature = data.now.temperature + '℃';
        that.setData({
          location:data.location,
          now:data.now,
            currentWeatherImg:'../../img/big/'+data.now.code+'.png',          
        });
        // console.log(that.data.location);
        // console.log(that.data.now);
        // console.log(data);
      });
      util.getWeatherDays(e.detail.value.text,function(data){
        for(var i = 0;i<data.length;i++ ){
          data[i].code_day = '../../img/'+data[i].code_day+'.png';
          data[i].code_night = '../../img/'+data[i].code_night+'.png';
        }
        that.setData({
          weathers:data,
        });
          // console.log(data);
      });
    }
    //
    if(that.data.locationImageId == id){
      this.getLocationAndWeather(that);
     }
  },

  onLoad: function () {
    var page = this;
    this.getLocationAndWeather(page);
    util.getDate(function(data){
        page.setData({
              ldate:data
            }); 
    });
     util.getWeek(function(data){
        page.setData({
              week:data
            }); 
    });
  },
  //获取当前位置和该位置的天气情况
 getLocationAndWeather:function (object){
  util.getLocaton(function(latitude,longitude){
       util.getWeatherData(latitude+':'+longitude,function(data){
          data.now.temperature = data.now.temperature + '℃';
          object.setData({
            location:data.location,
            now:data.now,
            currentWeatherImg:'../../img/big/'+data.now.code+'.png',
          });  
          // console.log(data);
      });
      util.getWeatherDays(latitude+':'+longitude,function(data){
        for(var i = 0;i<data.length;i++ ){
          data[i].code_day = '../../img/'+data[i].code_day+'.png';
          data[i].code_night = '../../img/'+data[i].code_night+'.png';
        }
        object.setData({
          weathers:data,
        });
          // console.log(data);
      });
    });
}
})