var util = require('../../utils/util.js')
var functions = require('../functions.js')
var url = 'http://api.cjkt.com/package/detail?id=40'
var pageSize = 20

Page({
  data: {
    courses: [],
    hasMore: true,
    showLoading: true,
    loadMoreLoading: false,
    start: 0
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },
  scroll: function(e){
    //console.log(e)
  },
  onLoad: function () {
      console.log(123);
    var that = this;
      functions.fetchFilms.call(that, url, function(data){
        that.setData({
          showLoading: false
        })
      })
  },
  loadMore: function(){
    var that = this
    functions.getCity(function(city){
      that.setData({
        loadMoreLoading: true
      })
      functions.fetchFilms.call(that, url, function(data){
        that.setData({
          loadMoreLoading: false
        })
      })
    })
  },
  viewDetail: function(e){
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../detail/detail?id=' + ds.id + '&title=' + ds.title + '&type=coming'
    })
  }
 
})