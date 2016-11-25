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

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function validateEmail(email) {
    return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email)
}

function validatePassword(password) {
    return password && password.length >= 8;
}

function validatePhone(phone) {
    return phone && /^1\d{10}$/.test(phone)
}

function validateCode(code) {
    return code && 4 == code.length
}

module.exports = {
  formatTime: formatTime,
  guid: guid,
  validateEmail: validateEmail,
  validatePassword:validatePassword,
  validatePhone:validatePhone,
  validateCode:validateCode
}