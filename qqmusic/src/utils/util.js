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

(function() {
  var utils;
  
  module.exports = utils = {
  }

}( typeof module === 'undefined' ? {module:{exports:{}}} :module
))

function dealColor(rgb){
    if (!rgb) {
      return;
    }
    var css;
    var r = (rgb & 0x00ff0000) >> 16;
    var g = (rgb & 0x0000ff00) >> 8 ;
    var b = (rgb & 0x000000ff);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

module.exports = {
  formatTime: formatTime,
  dealColor: dealColor
}



//  module.exports.dec2Hex = function (dec) {
// 				return dec > 16 ? dec.toString(16) : '0' + dec.toString(16);
// 			}
// 			if (!rgb) {
// 				return;
// 			}
// 			var css;
// 			var r = (rgb & 0x00ff0000) >> 16;
// 			var g = (rgb & 0x0000ff00) >> 8 ;
// 			var b = (rgb & 0x000000ff);
// 			if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
// 				return;
// 			}
// 			var grayLevel = r * 0.299 + g * 0.587 + b * 0.114;
// 			if (grayLevel >= 192) {
// 				$('<link>').attr({ rel : 'stylesheet', type : 'text/css', href : '//imgcache.gtimg.cn/mediastyle/mobile/app/share/index_light.css?max_age=604800'}).appendTo('head');
// 			}
// 			var color =  dec2Hex(r) + dec2Hex(g) + dec2Hex(b);
// 			$('.c_bg1').css({ 'background-color' : '#' + color });
// 			$('.c_gradient').css({ 'color' : '#' + color });
