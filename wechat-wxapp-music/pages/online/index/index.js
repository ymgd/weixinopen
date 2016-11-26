Page({
  data: {
    text: "Page index",
    tab: [
      {
        label: '排行榜',
        url: '/pages/online/index/index',
        active: true
      }, {
        label: '搜索',
        url: '/pages/online/search/index',
        active: false
      }
    ],
    ranks: [
      {
        text: '新歌榜',
        type: 'new',
      },
      {
        text: '热歌榜',
        type: 'hot'
      },
      {
        text: '摇滚榜',
        type: 'row'
      },
      {
        text: '流行榜',
        type: 'popular'
      }
    ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
    wx.setNavigationBarTitle({title: "在线音乐"})
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})