// 主页

Page({
  data: {
    imgUrls: [
      '/image/westworld.jpg',
      '/image/got.jpg',
      '/image/shield.jpg'
    ],
    isHiddenToast:true,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  // changeIndicatorDots: function(e) {
  //   this.setData({
  //     indicatorDots: !this.data.indicatorDots
  //   })
  // },
  // changeAutoplay: function(e) {
  //   this.setData({
  //     autoplay: !this.data.autoplay
  //   })
  // },
  // intervalChange: function(e) {
  //   this.setData({
  //     interval: e.detail.value
  //   })
  // },
  // durationChange: function(e) {
  //   this.setData({
  //     duration: e.detail.value
  //   })
  // }
showDetails:function(){
  wx.navigateTo({
    url: '../info/info'
  })
},
isShowToast:function(){
  this.setData({
    isHiddenToast:false
  })
},
toastChange:function(){
  this.setData({
    isHiddenToast:true
  })
}
})