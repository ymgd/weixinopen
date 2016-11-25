//获取应用实例
var app = getApp()
Page({
  data: {
    searchPageInfo: [],
    
  },
  //初始加载页面
  onLoad: function () {
    var that = this
    var requestInfo = {}
    app.getSearchPageInfo(
      function(searchPageInfo){
      that.setData({
        searchPageInfo:searchPageInfo,
      })},
      requestInfo
    )
  }
})