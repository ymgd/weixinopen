const newData = require('../../data/data.js');
Page({
  data:{
    start: 0,
    scrollHeight: 0,
    hidden: false,
    noRes: true,
    hot:[]
  },
  clickShow: function (event) {
    wx.setStorageSync("movieId",event.currentTarget.id);
    wx.navigateTo({
      url: '../show/show',
    })
  },
  onLoad: function () {
    let _this = this;
    let param = {
      API_URL : 'https://api.douban.com/v2/movie/coming_soon',
      data : {
        'start' : this.data.start,
        'count' : 10
      }
    }
    newData.result(param).then( data => {    
      this.setData({
          hot:data.data.subjects,
          hidden: true
      })
    });
    console.log('onLoad');
  },
  onShow: function () {
      wx.getSystemInfo( {
        success: ( res ) => {
            this.setData( {
                scrollHeight: res.windowHeight
            })
        }
      })
  },
  lower: function () {
    this.setData({
        start: this.data.start + 10,
        hidden: false
    });
    let param = {
      API_URL : 'https://api.douban.com/v2/movie/coming_soon',
      data : {
        'start' : this.data.start,
        'count' : 10
      }
    }
    newData.result(param).then( data => {    
      if (data.data.length == 0) {
        this.setData({
          hidden: true,
          noRes: false
        });
      }else {
        this.setData({
          hot: this.data.hot.concat(data.data.subjects),
          hidden: true
        });
      }
    });
  },
  toastChange: function (event) {
    this.setData({noRes: true});
  }
})