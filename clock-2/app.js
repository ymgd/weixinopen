//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var configs = wx.getStorageSync('configs') || {}
    if(Object.keys(configs).length === 0 && configs.constructor === Object){
      //configs is a empty object
      configs = this.initConfigs();
    }
    wx.setStorageSync('configs', configs)
  },
  initConfigs(){
    return {
      config1: {
        isActive: false,
        name: "立论阶段",
        id: "config1",
        duration: 180,
        notificationTime: 5,
        desc: "（一）正方一辩开篇立论，@ \n（二）反方一辩开篇立论，@" 
      },
      config2: {
        isActive: true,
        name: "驳立论阶段",
        id: "config2",
        duration: 120,
        notificationTime: 5,
        desc: "（一）反方二辩驳对方立论，@ \n（二）正方二辩驳对方立论，@" 
      },
      config3: {
        isActive: true,
        name: "质辩环节",
        id: "config3",
        duration: 90,
        notificationTime: 5,
        desc: "（一）正方三辩提问反方一、二、四辩各一个问题，反方辩手分别应答。三个问题累计回答时间为@。\n（二）反方三辩提问正方一、二、四辩各一个问题，正方辩手分别应答。三个问题累计回答时间为@。" 
      },
      config4: {
        isActive: true,
        name: "自由辩论",
        id: "config4",
        duration: 240,
        notificationTime: 5,
        desc: "（一）自由辩论 @" 
      },
      config5: {
        isActive: true,
        name: "总结陈词",
        id: "config5",
        duration: 180,
        notificationTime: 5,
        desc: "（一）反方四辩总结陈词，@。\n（二）正方四辩总结陈词，@。" 
      }
    }
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})