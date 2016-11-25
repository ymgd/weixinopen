Page({
  data: {
    title: '详情页',
    userInfo: {avatarUrl:'../../image/avator.jpg',nickName:'qieangel2013'},
    img:'https://hamlet.b0.upaiyun.com/1601/27161/2e8c13bc2d0847718c223bcd0f5f6fe3.png'
  },
  //事件处理函数
  onLoad: function (options) {
    this.title = options.type || '详情页'
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '详情页'
    })
  },
})
