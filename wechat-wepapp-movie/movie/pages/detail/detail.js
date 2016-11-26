var subjectUtil = require('../../utils/subjectUtil.js');//模板快调取

Page({
  data:{
    movie:{}
  },
  onLoad:function(options){
    console.log(options)//
    this.loadMoive();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  loadMoive:function(){
    var page = this;
    var movieID = wx.getStorageSync('movieID');//获取本地缓存
    console.log(movieID);
    wx.request({
      url: 'https://api.douban.com/v2/movie/subject/'+ movieID,
      data: {},
       header: {
      'Content-Type': 'application/json'
       },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        console.log(res);
        var subject = res.data;
        subjectUtil.processSubject(subject);
        page.setData({movie:subject})
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    }) 
  }
})
