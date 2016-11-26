function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 获取当天天气
function getWeatherData(city,callback){
    wx.request({
      url:'https://api.thinkpage.cn/v3/weather/now.json',
      data:{
        key:'mqzzrlzwvkgw0762',
        location:city,
        lnguage:'zh-Hans',
      },
      header:{
        'Content-Type':'application/json'
      },
      success:function(req){
        var result = req.data.results[0];  
        callback(result);
           
      },
      fail:function(req){}
    })
}
// 获取未来几天的天气
function getWeatherDays(city,callback){
    wx.request({
      url:'https://api.thinkpage.cn/v3/weather/daily.json',
      data:{
        key:'mqzzrlzwvkgw0762',
        location:city,
        lnguage:'zh-Hans',
        start:1,
        days:6,
      },
      header:{
        'Content-Type':'application/json'
      },
      success:function(req){
        var r = req.data.results[0].daily;  
        callback(r);
           
      },
      fail:function(req){}
    })
}
// 获取当前位置的经纬度
function getLocaton(callback){
    wx.getLocation({
        type:'wgs84',
        success:function(req){
            callback(req.latitude,req.longitude);
        }
    })
}
// 获取当天的日期
function getDate(callback){
    var date = new Date();
	var dateStr = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
    callback(dateStr);
}
// 获取当天是星期几
function getWeek(callback){
    var date = new Date();    
    var week = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"]; 
    var weekStr = week[date.getDay()-1];
    callback(weekStr);
}
module.exports = {
  formatTime: formatTime,
  getWeatherData:getWeatherData,
  getWeatherDays:getWeatherDays,
  getLocaton:getLocaton,
  getDate:getDate,
  getWeek:getWeek
}
