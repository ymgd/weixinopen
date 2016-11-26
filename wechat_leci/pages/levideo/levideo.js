//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        current: 0,
        list: [],
        swiper: {
            duration: 300
        }
    },
    onLoad: function() {
        console.log('onLoad')
    },
    videoErrorCallback: function(e) {
        console.log('视频错误信息:')
        console.log(e.detail.errMsg)
    },
    switchSlider: function (event) {
      this.setData({
        current: event.target.dataset.index
      })
    },

    changeSlider: function (event) {
      this.setData({
        current: event.detail.current
      });
    }


})
