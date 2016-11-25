//app.js
var Api = require('utils/api.js');
var g
App({
  globalData:{
    pagePrivate:null,
    pagePublic:null,
    windowWidth:null,
    windowHeight:null,
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // this.getUserInfo()

    var that =this
    var _pixelRatio,_windowWidth,_windowHeight
    
    wx.getSystemInfo({
      success: function(res) {
        //设置屏幕宽/高
        // console.log(res)
        that.globalData.windowWidth = res.windowWidth
        that.globalData.windowHeight = res.windowHeight

        console.log(res.windowWidth,res.windowHeight,res.pixelRatio)
      }
    })
    },
})

