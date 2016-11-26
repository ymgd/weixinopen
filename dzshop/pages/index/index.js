//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    listimg:[
       ["/images/welcome01.png",0],
      ["/images/welcome02.png",1],
      ["/images/welcome03.png",2]
    ],
    dataIndex:[
      0,
      1,
      2
    ],
    title:[
      "1",
      "2",
      "3"
    ],
      swiper: {
      indicatorDots: true,
      autoplay: false,
      interval: 1000,
      duration: 500
    },
    current:0,
    imgmode:"scaleToFill"
    
  },
   onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  //事件处理函数
  tap: function() {
    var that = this
   // console.log(that.data);
    //页面跳转
    if(that.data.current==2){
      //console.log(2);
        wx.navigateTo({
        url: "../dzshop/shop/shop"
          
          // pagePath:"pages/dzshop/open/open"
       })
    }
  },
  onLoad: function () {
    
    var that = this
    //调用应用实例的方法获取全局数据
   
  },
    changeSlider: function( event ) {
    this.setData( {
      current: event.detail.current
    
    });
    //console.log(1);
  }
})
