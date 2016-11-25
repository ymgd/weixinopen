# ml-weixin-demo
微信小程序demo制作

一：app.json
使用app.json文件来对微信小程序进行全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、设置多 tab 等。
pages
接受一个数组，每一项都是字符串，来指定小程序由哪些页面组成。每一项代表对应页面的【路径+文件名】信息，数组的第一项代表小程序的初始页面。小程序中新增/减少页面，都需要对 pages 数组进行修改。

文件名不需要写文件后缀，因为框架会自动去寻找路径.json,.js,.wxml,.wxss的四个文件进行整合。

{
  "pages":[
    "pages/index/index",
    "pages/logs/logs"
  ],
  "window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#f33446",
    "navigationBarTitleText": "旺财谷微信小程序",
    "navigationBarTextStyle":"white"
  }
}

window:
用于设置小程序的状态栏、导航条、标题、窗口背景色
tabBar 是一个数组，只能配置最少2个、最多5个 tab，tab 按数组的顺序排序。

二：app.js
  //app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
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
  },

  // 动画函数
  onShow: function(){
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1500,
      timingFunction: "ease",
      delay: 100,
      backgroundColor: '#f0f'
    })
  }

})




