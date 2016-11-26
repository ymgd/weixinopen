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

function getTotalSeconds(hh, mm, ss){
  return hh*3600 + mm*60 + ss*1
}

function getHHSSMM(totalInSecond){

  var hh = parseInt(totalInSecond/3600)
  if(hh<10) hh = '0'+hh;

  var mm = parseInt(totalInSecond / 60 % 60 );
  if(mm<10) mm = '0'+mm;

  var ss = parseInt(totalInSecond % 60 % 60);
  if(ss<10) ss = '0'+ss;
  
  return `${hh}:${mm}:${ss}`
    
}

let generateTimeArr = (range) => {
    //range should be the max value -1
    let retArr = [];
    for(let i=0; i<range; i++){
      retArr[i] = i;
    }
    return retArr;
}

module.exports = {
  formatTime: formatTime,
  getTotalSeconds: getTotalSeconds,
  getHHSSMM: getHHSSMM,
  generateTimeArr: generateTimeArr
}
