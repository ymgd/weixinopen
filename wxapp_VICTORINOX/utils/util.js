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

//toast
function showToast(msg){
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 1500
    })
}

//loadingtoast
function showLoadingToast(msg){
    wx.showToast({
      title: msg,
      icon: 'loading',
      duration: 2000
    })
}

//日期转星期，date:2016-11-14,return:星期一
function dateCovertWeek(date){
  var weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
  var arys1= new Array();      
  arys1=date.split('-');
  return weekArray[new Date(arys1[0],parseInt(arys1[1]-1),arys1[2]).getDay()];
}

module.exports = {
  formatTime: formatTime,
  showToast:showToast,
  showLoadingToast:showLoadingToast,
  dateCovertWeek:dateCovertWeek,
}
