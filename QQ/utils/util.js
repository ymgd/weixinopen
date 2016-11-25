function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  //[year, month, day].map(formatNumber).join('/') + ' ' + 
  return [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  randomInt : function(min,max){
      var num = Math.random()*(max - min + 1) + min;
      num = parseInt(num, 10);
      return num;
  },
  copyTo : function(_from,to){
     for(var k in _from){ to[k] = _from[k]; }
  },
  formatString : function(){
    if (arguments.length > 0) {
        var s = arguments[0];
        if (arguments.length == 1) { return s; }
        for ( var i = 0; i < arguments.length - 1; i++) {
          s = s.replace(new RegExp("\\{" + i + "\\}", "g"),arguments[i + 1]);
        }
        return s;
      }
      return null;
  }
}
