//index.js
Page({
  data: {
    films: [],
    loading: false,
    title: '正在热映',
    video: 'video-hide',
    datails: '',
    windowWidth: 0
  },
  onLoad: function (options) {
    var id = 'http://m.maoyan.com/movie/' + options.id + '.json'
    this.setData({
      title: options.titles
    })
    var that = this
    wx.request({
      url: id, //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          films: res.data.data,
          loading: true
        })
        var pages = that.data.films.MovieDetailModel.dra
        pages = pages.replace(/<.*?>/ig,"")
        that.setData({
          details: pages
        })
        console.log(pages)
      }
    })
  },
  onReady: function(){
    var that = this
    wx.setNavigationBarTitle({
      title: that.data.title
    })
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  pay: function(){
    console.log('pay');
    wx.requestPayment({
       'timeStamp': '',
       'nonceStr': '',
       'package': '',
       'signType': 'MD5',
       'paySign': '',
       'success':function(res){
          console.log('success');
       },
       'fail':function(res){
          console.log('fail');
       }
    })
  },
  vShow: function(){
    this.setData({
      video: 'video-show'
    })
  },
  vHid: function(){
    this.setData({
      video: 'video-hide'
    })
  }
})
