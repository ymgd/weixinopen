// 获取全局应用程序实例对象
var app = getApp();

Page({
  data: {
    movies: [],
    loading: true
  },
  onLoad () {
    this.getSplash()
  },
  //  TODO　cache
  getSplash () {
    app.douban.find('in_theaters', 1, 3)
    .then((data) => {
      this.setData({ 
        movies: data.subjects,
        loading: false 
      });
    })
  },
  handleStart () {
    // wx.redirectTo({ url: '../board/board' });
    wx.navigateTo({ url: '../board/board' })
  }  
})
