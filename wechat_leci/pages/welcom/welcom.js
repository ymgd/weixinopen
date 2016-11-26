//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
      swiper: {
          indicatorDots: true,
          duration: 300
      }
  },

  onLoad: function () {
    // console.log('onLoad')

},
inleci:function () {
    wx.navigateTo({
        url: "../study/study"
    })
}

})
