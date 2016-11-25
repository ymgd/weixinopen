function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [hour,minute];

 // return [ month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTime2() {
  var date = new Date();
  var hour = date.getHours()
  var minute = date.getMinutes()

  return hour+':'+ formatNumber(minute);

 // return [ month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function halfHour(){
  let timeArr = [];
  for (let i =0; i<=48; i++){
    if(i % 2==0){
      timeArr.push(formatNumber(i/2) +':00');
    }else{
      timeArr.push(formatNumber(Math.floor(i/2))+":30")
    }
  }
  return timeArr;
}
let timeArr = halfHour();

function setTimeHalf(){
  var thisDate = new Date(), thisTime = formatTime(thisDate),lastTimeArr = [],index = 0;
  
 timeArr.map(function(t,i){
    let tArr = t.split(":");
    if (thisTime[0] >= Number(tArr[0])){
      index = thisTime[1]<=30?i:i+1;
    }
 })
 lastTimeArr = timeArr.slice(index);
 if (thisTime[1] !== 0 && thisTime[1]!==30){
    lastTimeArr.unshift(thisTime[0]+":"+formatNumber(thisTime[1]));
  }
  return lastTimeArr;
}
var sortBy =function (arr, prop, desc){ 
	var props=[], 
		ret=[], 
		i=0, 
		len=arr.length; 
	if(typeof prop=='string') { 
		for(; i<len; i++){ 
			var oI = arr[i]; 
			(props[i] = new String(oI && oI[prop] || ''))._obj = oI; 
		} 
	}else if(typeof prop=='function') { 
		for(; i<len; i++){ 
			var oI = arr[i];   
			(props[i] = new String(oI && prop(oI) || ''))._obj = oI; 
		} 
	}else{ 
		throw '参数类型错误'; 
	} 
	props.sort(); 
	for(i=0; i<len; i++) { 
		ret[i] = props[i]._obj; 
	} 
	if(desc) ret.reverse(); 
	return ret; 
}; 


module.exports = {
  formatTime: formatTime,
  setTimeHalf:setTimeHalf,
  sortBy:sortBy,
  formatTime2:formatTime2
}
