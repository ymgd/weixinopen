function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function repayDate(month) {
			var date = new Date();
      date.setMonth(date.getMonth()+month);
			var year = date.getFullYear(),
				month = date.getMonth()+1,
				day = date.getDate();
			return year + '/' + month + '/' + day;
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  repayDate: repayDate
}
