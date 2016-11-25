const url = "https://api.douban.com/v2/movie/subject/";
const newData = require('../../data/data.js');
Page({
  data:{
    info:{},
    hidden: false,
    movieId: {},
    casts: []
  },
  onLoad: function () {
    var movieId = wx.getStorageSync("movieId");
    this.setData({movieId: movieId});
  },
  onShow: function () {
    let param = {
      API_URL : 'https://api.douban.com/v2/movie/subject/' + this.data.movieId
    }
    newData.result(param).then( data => {
      wx.setNavigationBarTitle({
        title: data.data.title
      });
      this.setData({
          hidden: true,
          info: data.data
      });
    });
  }
})