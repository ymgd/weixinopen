
//获取应用实例
var app = getApp()
Page({
  data: {
    merchandiseInfo: '',
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  onLoad: function (options) {
    var that = this
    var merchandiseID = options.merchandiseID
    //调用应用实例的方法获取全局数据
    app.getMerchandiseInfo(function(merchandiseInfo){
      //更新数据
      that.setData({
        merchandiseInfo:merchandiseInfo,
      })
    }, merchandiseID)}
})