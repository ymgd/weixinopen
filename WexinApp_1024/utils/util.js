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

function getRandomNum(Min,Max){   
  var Range = Max - Min;   
  var Rand = Math.random();   
  return(Min + Math.round(Rand * Range));   
}

function swapItems(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
};

function scan_array(arr) {
  var str = '';
  for(var key in arr) {
    if(typeof(arr[key]) == 'array' || typeof(arr[key]) == 'object') {// 递归调用
      scan_array(arr[key]);
    } else {
      str = str + ' ' + arr[key];
    }
  }
  console.log(str);
}

module.exports = {
  formatTime: formatTime,
  getRandomNum: getRandomNum,
  swapItems: swapItems,
  scan_array: scan_array
}