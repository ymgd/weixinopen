function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

// function countdown(time) {

//     if (typeof time !== 'number' || time < 0) {
//         return time
//     }
//     setInterval(function(){
//         return (time/1000) - 1
//     }, 1000)
// }

module.exports = {
  formatTime: formatTime,
  // countdown: countdown
}
