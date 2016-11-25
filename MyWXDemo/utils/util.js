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
/**
 * check function's arguments
 * @param args arugments of function
 */
function checkArguments(args){
  var actual = args.length;
  var expected = args.callee.length;
  if(actual!=expected){
    throw new Error("Wrong number of arguments:expected:"+expected+"; actually passed  "+actual);
  }
}

module.exports = {
  formatTime: formatTime
}
