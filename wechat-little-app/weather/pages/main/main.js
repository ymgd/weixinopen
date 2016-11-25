Page({
  data:{
    // text:"这是一个页面"
    city:"",
    today:{},
    today:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.loadInfo();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  loadInfo(){
  var page = this;
  wx.getLocation({
    
  type: 'gcj02', //返回可以用于wx.openLocation的经纬度
  success: function(res) {
    var latitude = res.latitude
    var longitude = res.longitude
    console.log(latitude,longitude);
    page.loadCity(latitude,longitude);
  }
})

  },

//获取城市名
loadCity:function(latitude,longitude){

   var page = this;
   
    wx.request({
      url: 'http://api.map.baidu.com/geocoder/v2/?ak=Vj9vWKmz0TqXMibCwSzcVxdzxBPRwrTb&location='+latitude+','+longitude+'&output=json',
      data: {
        x: '' ,
        y: ''
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
      var city = res.data.result.addressComponent.city;
       city = city.replace("市","");
      page.setData({city:city});
      page.loadWeather(city);
      
      }
    })

},

//获取天气
loadWeather:function(city){

   var page = this;
   
    wx.request({
      url: 'http://wthrcdn.etouch.cn/weather_mini?city='+city,
      
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
         
         var future = res.data.data.forecast;
         var todayInfo = future.shift();//数组的第一个元素移除，并且返回新数组
         var today = res.data.data;
         today.todayInfo = todayInfo;
         page.setData({today:today,future:future})
        
      }
    })
}


// Vj9vWKmz0TqXMibCwSzcVxdzxBPRwrTb
// http://wthrcdn.etouch.cn/weather_mini?city=%E4%B8%8A%E6%B5%B7


})