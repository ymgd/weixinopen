
//获取应用实例
var app = getApp()
Page({
  data: {
    homePageInfo: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    streetIndicatorDots: false,
    streetAutoplay: true,
    streetInterval: 4000,
    streetDuration: 1000
  },
  //初始加载页面
  onLoad: function () {
    var that = this
    var requestInfo = {}
    requestInfo['startIndex'] = 80
    requestInfo['pageCount'] = 10
    requestInfo['cityID'] = "63"
    app.getHomePageInfo(
      function(homePageInfo){
      that.setData({
        homePageInfo:homePageInfo,
      })},
      requestInfo
    )
  },
  
  //跳转到全部分类界面
  goToMerchandisesPage: function(){
    wx.navigateTo({
      url: '../merchandises/merchandises'
    })
  },
})


