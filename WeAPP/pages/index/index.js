//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgSrc: 'https://img3.doubanio.com/pics/douban-icons/favicon_48x48.png'
  },
  handleButtonTap: function(){
    // 跳转至搜索页面
    wx.redirectTo({
      url: '../search/search'
    });
  }
})
