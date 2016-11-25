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

function regexConfig(){
  var reg = {
    email:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    phone:/^1(3|4|5|7|8)\d{9}$/
  }
  return reg;
}

module.exports = {
  formatTime: formatTime,
  regexConfig:regexConfig
}
