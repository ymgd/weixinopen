//app.js
var Promise = require("./utils/bluebird.min")

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  login(){
    if(!!this.globalData.accessCode) 
      return Promise.resolve(this.globalData.accessCode)

    const that = this
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res)=>{
          that.globalData.accessCode = res.code
          resolve(res.code)
        }
      })
    })
  },
  getUserInfo(){
    //console.log(this.globalData)
    if(!!this.globalData.userInfo) 
      return Promise.resolve(this.globalData.userInfo)

    const that = this
    return new Promise((resolve, reject) => {
      that.login().then(()=>{
        wx.getUserInfo({
          success: function (res) {
            //console.log(res.userInfo)
            that.globalData.userInfo = res.userInfo
            resolve(res.userInfo)
          }
        })
      })
    })
  },
  globalData:{
    env:'dev',
    userInfo:null
  }
})