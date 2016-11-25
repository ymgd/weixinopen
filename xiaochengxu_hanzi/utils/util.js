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

module.exports = {
  formatTime: formatTime
}

function showToast(toastTip){
  // wx.showToast({
  //   title: toastTip,
  //   icon: 'success',
  //   duration: 2000
  // })
  console.log('sdf111'+toastTip);
}

// function hideToast(){
//   wx.hideToast();
// }
// function showModal(){
//   wx.showModal({
//           title: '加载失败',
//           content: '网络连接失败，稍后重试！',
//           confirmText:'点击重试',
//           success: function(res) {
//             if (res.confirm) {
//               this();
//             }
//           }
//         })
// }
// function showLoading(loadingTip){
//   wx.showToast({
//     title: loadingTip,
//     icon: 'loading',
//     duration: 10000
//   })
// }
