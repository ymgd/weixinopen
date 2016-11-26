var requestBody = require('./util.js')
const BASE_URL = 'http://ystest.minicart.cn:8080/tandroid'

function getTrainInfo(selectObj){
  return new Promise((resolve,reject) => {
    wx.request({
      url:`${BASE_URL}/queryTrainInfoByRelateTrainNumber.action?${requestBody.fullRequestBody(selectObj)}`,
      success: resolve,
      fail: reject

    })
  })
}

function getTrainAD(){
  return new Promise((resolve,reject) => {
     wx.request({
      url:`${BASE_URL}/queryAdvertisingList.action`,
      success: resolve,
      fail: reject
    })
  })
}

function getTrainProduct(selectObj){
  return new Promise((resolve,reject) => {
    wx.request({
      url:`${BASE_URL}/queryProductListForInside.action?${requestBody.fullRequestBody(selectObj)}`,
      success: resolve,
      fail: reject

    })
  })
}


module.exports = {
  getTrainInfo: getTrainInfo,
  getTrainAD: getTrainAD,
  getTrainProduct: getTrainProduct,
}


// class Douban {
//   // 不支持
//   // static API_URL = 'https://api.douban.com/v2/movie/'

//   constructor (title, movies) {
//     this.title = title
//     this.movies = movies
//   }
// }
