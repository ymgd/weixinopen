var baseUrl = "http://tingapi.ting.baidu.com/v1/restserver/ting";
var size=10;

var apiMethod = {
  getList: "baidu.ting.billboard.billList",
  getSong: "baidu.ting.song.play",
  search: "baidu.ting.search.catalogSug"
}

var request = data => new Promise((resolve, reject) => {
  wx.request({
    url: baseUrl,
    data: data,
    success: res => resolve(res.data),
    fail: err => reject(err)
  })
})
//请求歌曲列表
var getList = (id,page) => request({
    method: apiMethod['getList'], 
    size: size, 
    type: id, 
    offset: (page-1)*size
  })
//请求某一首歌
  var getSong=(id) => request({
    method: apiMethod['getSong'],
    songid: id
  })
  //根据关键词搜索
  var search= keyword => request({
    method: apiMethod['search'],
    query: keyword
  })

//格式化时间，将秒数转为0:00格式
var formate = n => {
  var minute=Math.floor(n/60);
  var seconds=Math.ceil(n%60);
  seconds=seconds.toString();
  seconds=seconds[1]?seconds:'0'+seconds;
  return minute+':'+seconds;
}
//将时间字符串转为秒数
var timeToSeconds = time => {
  var arr=time.split(':');
  return parseInt(arr[0])*60+parseFloat(arr[1])
}


module.exports = {
  getList: getList,
  getSong: getSong,
  search: search,
  formate: formate,
  timeToSeconds: timeToSeconds
}
