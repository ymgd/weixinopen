var $image_path = "../../assets/images/"

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date, f){
  var year  = date.getFullYear()
  var month = date.getMonth() + 1
  var day   = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  var ymd = [year, month, day].map(formatNumber)
  var hms = [hour, minute, second].map(formatNumber)
  var hm = [hour, minute].map(formatNumber)
  return f({ymd: ymd, hms: hms, hm:hm})
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


module.exports = {
  formatTime: formatTime,
  formatDate: formatDate
}
