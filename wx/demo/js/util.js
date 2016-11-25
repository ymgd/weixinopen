function Fn() {}
Fn.prototype = {
  each: function(data, callback) {
    for (var x in data) {
      callback(x, data[x]);
    }
  },
  formatTime: function(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
  },
  formatNumber: function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
}
var fn = new Fn();
module.exports = fn