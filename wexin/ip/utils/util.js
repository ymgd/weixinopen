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


// 调用第三方API接口
 function  getIpInfo(ip,result){
   wx.request({
      url: "http://ip.taobao.com/service/getIpInfo.php?ip="+ip,
      data: {
        x: '' ,
        y: ''
      },
       header: {
      'Content-Type': 'application/json'
       },
      success: function(res) {
         // console.log(res.data)
         result(res.data)
      }
    })
 }


module.exports = {
  formatTime: formatTime,
  getIpInfo:getIpInfo
}




