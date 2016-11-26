Page({
  data: {
    text: "Page search",
    search: '',
    tab: [{
      label: '排行榜',
      url: '/pages/online/index/index',
      active: false
    }, {
      label: '搜索',
      url: '/pages/online/search/index',
      active: true
    }],
    list: [
      {
        title: '他一定很爱你',
        author: '阿杜'
      },
      {
        title: '天黑',
        author: '阿杜'
      },
      {
        title: '他和她的故事',
        author: '徐良'
      },
      {
        title: '不在犹豫',
        author: '黄家驹'
      }
    ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
    wx.setNavigationBarTitle({title: "在线搜索"})
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  bindSearch (e) {

  }
})