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

function isFunction(fn) {
   return Object.prototype.toString.call(fn)=== '[object Function]';
}

function getObjKeys(obj){
  var keys = []
  for(var i in obj){
    keys.push(i)
  }
  return keys
}

function getObjValues(obj){
  var values = []
  for(var i in obj){
    values.push(obj[i])
  }
  return values
}

function unicode2HZ(str){
  return str.replace(/\&#x([0-9A-F]{4});/g, (all,code)=>{
      return String.fromCharCode(parseInt(code,16));
  })
}

function formatIssueData(data){
  var newData = Object.assign({}, data)
  
  for(var i = 0, len = newData.article.length; i < len; i++){
    var newArticle = {}
    newArticle.title = getObjKeys(newData.article[i])[0]
    newArticle.data = getObjValues(newData.article[i])[0]
    newData.article[i] = newArticle
  }

  return newData
}

function bindGoDetailPage(e){
  var url = encodeURIComponent(e.currentTarget.dataset.url)

  // navigateTo跳转页面内的某个页面
  wx.navigateTo({
    url: `../detail/detail?url=${url}`
  })
}

module.exports = {
  formatTime: formatTime,
  isFunction: isFunction,
  getObjKeys: getObjKeys,
  getObjValues: getObjValues,
  unicode2HZ: unicode2HZ,
  formatIssueData: formatIssueData,
  bindGoDetailPage: bindGoDetailPage
}
