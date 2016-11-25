
var MathUtils = require('../utils/MathUtils.js')
var datenow =new Date()

//需要date格式的数据
function getTimeDifference(time){
    var current = datenow.getTime();
    //console.log('现在 '+current)
    var pass = time.getTime();
    //console.log('过去 '+pass)
    var diff =(current-pass);
     //console.log('相差 '+diff)
     
    var days = MathUtils.getIntNumber(diff/(1000*60*60*24))
    var hours = MathUtils.getIntNumber((diff - days * (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = MathUtils.getIntNumber((diff - days * (1000 * 60 * 60 * 24) - hours * (1000 * 60 * 60)) / (1000 * 60))
    var second = MathUtils.getIntNumber((diff - days * (1000 * 60 * 60 * 24) - hours * (1000 * 60 * 60) - minutes * (1000 * 60)) / (60 * 60))
    if (days != 0) {
                return "" + days + "天前";
            } else if (hours != 0) {
                return "" + hours + "小时前";
            } else if (minutes != 0) {
                return "" + minutes + "分钟前";
            } else {
                return "刚刚";
            }
}

module.exports = {
  getTimeDifference: getTimeDifference
}