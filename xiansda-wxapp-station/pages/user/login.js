//index.js
//获取应用实例
var app = getApp()
var xsd = require("../../xsd/index")
var sync = require('../../utils/sync')
var Promise = require("../../utils/bluebird.min")

Page({
  data: {
    access:false,
    retry:false,
    welcome: '正在登录鲜时达...',
    userInfo: {},
  },
  onShow: function () {
    console.log('onLoad')
    this.login()
  },
  login(){
    this.setData({
      welcome: '正在登录鲜时达...',
      retry:false
    })

    wx.showNavigationBarLoading()

    app.getUserInfo().then(userInfo=>{
      this.setData({userInfo})
      return {userInfo, accessCode:app.globalData.accessCode}
    }).then(params=>{
      const postData = {code: params.accessCode, userInfo:params.userInfo}
      postData.code='station-test1' //测试用
      return xsd.api.post('station/login', postData).then(data=>{
        if(!!data.user){
          this.setData({
            welcome:'登录成功...'
          })
          xsd.station.login(data.user)
        }else{
          this.setData({
            access:true,
            retry:false,
            welcome:'无效用户'
          })
        }

      })

    }).catch(err=>{
      this.setData({
        welcome:err,
        retry:true
      })
    }).finally(()=>{
      wx.hideNavigationBarLoading()
    })
  },
  back(){
    wx.navigateBack()
  }  
})
