//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
      input_value:""
    //   swiper: {
    //       indicatorDots: true,
    //       autoplay: true,
    //       interval: 0,
    //       duration: 300
    //   }
  },
  onLoad: function () {
    console.log('onLoad')
},

// searchIput:function (e) {
//     this.setData({
//         input_value: e.detail.value
//
//     });
// }
// ,
// searchWord:function () {
//     console.log(this.data.input_value);
//     wx.navigateTo({
//         url: "/pages/words/words"
//     });
// }
// searchIput:function () {
//     wx.navigateTo({
//         url: "../words/words"
//     })
// },
qie:function () {
    wx.navigateTo({
        url: "../words/words"
    })
}


})
