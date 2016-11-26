Page({
  data: {
    item: {
      url: 'http://img6.bdstatic.com/img/image/smallpic/chongwu1027.jpg',
      title: '他一定很爱你',
      subtitle: '阿杜'
    }
  },
  onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady() {
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: "在线音乐"
    })
  }
})