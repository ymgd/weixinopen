# zhihudaily-weapp
知乎日报微信小程序


微信小程序开发文档  
https://mp.weixin.qq.com/debug/wxadoc/dev/?t=20161107



# 使用步骤

- 下载微信小程序开发工具
- 微信小程序注册申请 ，获取AppID(手机预览需用到)
- 服务器配置 ，添加合法域名，每个月只可修改3次 ，可添加多个域名
- 下载开发工具后创建项目，输入申请的AppID，填写项目名称，导入该工程
- 项目预览体验


![zhihudaily-weapp.gif](http://upload-images.jianshu.io/upload_images/1410006-3d284988d34cb4fd.gif?imageMogr2/auto-orient/strip)



# 必须掌握的几个知识点


## 目录
- [小程序配置](https://github.com/fozero/zhihudaily-weapp)
- [小程序常用API接口](https://github.com/fozero/zhihudaily-weapp)


## 小程序配置

- app.json文件小程序设置全局配置 ，包括页面路径、窗口、选项卡，以及网络超时等
``` 
{
  "pages": [
    "pages/index/index",
    "pages/logs/index"
  ],
  "window": {
    "navigationBarTitleText": "Demo"
  },
  "tabBar": {
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页"
    }, {
      "pagePath": "pages/logs/logs",
      "text": "日志"
    }]
  },
  "networkTimeout": {
    "request": 10000,
    "downloadFile": 10000
  },
  "debug": true
}
``` 
- 通过appapp.js文件中App()来注册一个小程序  提供了生命周期方法
``` 
App({
  onLaunch: function() { 
    // Do something initial when launch.
  },
  onShow: function() {
      // Do something when show.
  },
  onHide: function() {
      // Do something when hide.
  },
  globalData: 'I am global data'
})
``` 


通过全局的getApp()函数，获取小程序实例
``` 
// other.js
var appInstance = getApp()
console.log(appInstance.globalData) // I am global data
``` 
注意：

App() 必须在 app.js 中注册，且不能注册多个。

不要在定义于 App() 内的函数中调用 getApp() ，使用 this 就可以拿到 app 实例。

不要在 onLaunch 的时候调用 getCurrentPage()，此时 page 还没有生成。

通过 getApp() 获取实例之后，不要私自调用生命周期函数。


- 通过Page() 函数用来注册页面
``` 
//index.js
Page({
  data: {
    text: "This is page data."
  },
  onLoad: function(options) {
    // Do some initialize when page load.
  },
  onReady: function() {
    // Do something when page ready.
  },
  onShow: function() {
    // Do something when page show.
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
  },
  // Event handler.
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    })
  },
  customData: {
    hi: 'MINA'
  }
})
``` 







## 小程序常用API接口

- wx.request https网络请求
``` 
wx.request({
  url: 'test.php', //仅为示例，并非真实的接口地址
  method:"GET",
  data: {
     x: '' ,
     y: ''
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {
    console.log(res.data)
  }
})
``` 

- 本地缓存   

通过key的形式添加缓存setStorage （异步接口）  
``` 
wx.setStorage({
  key:"key"
  data:"value"
})
``` 
通过key的形式获取缓存getStorage  （异步接口）
``` 
wx.getStorage({
  key: 'key',
  success: function(res) {
      console.log(res.data)
  } 
})
``` 

从本地缓存中异步移除指定 key
``` 
wx.removeStorage({
  key: 'key',
  success: function(res) {
    console.log(res.data)
  } 
})
``` 
清理本地数据缓存
``` 
wx.clearStorage()
``` 


- 显示、隐藏消息提示框
``` 
wx.showToast({
  title: '加载中',
  icon: 'loading',
  duration: 10000
})

setTimeout(function(){
  wx.hideToast()
},2000)
``` 



- 动态设置当前页面的标题
``` 
wx.setNavigationBarTitle({
  title: '当前页面'
})
``` 


- 导航 

保留当前页面，跳转到应用内的某个页面
``` 
wx.navigateTo({
  url: 'test?id=1'
})
``` 
关闭当前页面，跳转到应用内的某个页面
``` 
wx.redirectTo({
  url: 'test?id=1'
})
``` 

- 获取用户信息，需要先调用 wx.login 接口
``` 
wx.getUserInfo({
  success: function(res) {
    var userInfo = res.userInfo
    var nickName = userInfo.nickName
    var avatarUrl = userInfo.avatarUrl
    var gender = userInfo.gender //性别 0：未知、1：男、2：女 
    var province = userInfo.province
    var city = userInfo.city
    var country = userInfo.country
  }
})
``` 


- 设备

获取网络类型
``` 
wx.getNetworkType({
  success: function(res) {
    var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
  }
})
``` 

获取系统信息（异步接口）
``` 
wx.getSystemInfo({
  success: function(res) {
    console.log(res.model)
    console.log(res.pixelRatio)
    console.log(res.windowWidth)
    console.log(res.windowHeight)
    console.log(res.language)
    console.log(res.version)
  }
})
``` 
拨打电话
``` 
wx.makePhoneCall({
  phoneNumber: '1340000' //仅为示例，并非真实的电话号码
})
``` 

- 获取当前的地理位置、速度
``` 
wx.getLocation({
  type: 'wgs84',
  success: function(res) {
    var latitude = res.latitude
    var longitude = res.longitude
    var speed = res.speed
    var accuracy = res.accuracy
  }
})
``` 

