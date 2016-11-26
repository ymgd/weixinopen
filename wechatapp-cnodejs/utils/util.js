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

function getDateDiff(timeStamp){
  const minute = 1000 * 60,
        hour = minute * 60,
        day  = hour * 24,
        halfmonth = day * 15,
        month = day * 30,
        year = day * 365,
        now = new Date().getTime(),
        diffValue = now - timeStamp

  if(diffValue < 0){
      return '数据出错'
  }

   let yearAgo = diffValue / year,
          monthAgo = diffValue / month,
          weekAgo = diffValue / (7*day),
          dayAgo = diffValue / day,
          hourAgo = diffValue / hour,
          minAgo = diffValue / minute,
          result = '';

   if(yearAgo >= 1){
     result = parseInt(yearAgo) + '年以前'
   }else if(monthAgo >= 1){
     result = parseInt(monthAgo) + '个月前'
   }else if(weekAgo >= 1){
     result = parseInt(weekAgo) + '星期前'
   }else if(dayAgo >= 1){
     result = parseInt(dayAgo) + '天前'
   }else if(hourAgo >= 1){
     result = parseInt(hourAgo) + '小时前'
   }else if(minAgo >= 5){
     result = parseInt(minAgo) + '分钟前'
   }else{
     result = '刚刚发布'
   }                       
   return result
}

module.exports = {
  formatTime: formatTime,
  getDateDiff:getDateDiff
}
