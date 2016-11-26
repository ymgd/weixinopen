Page({
  data: {
    current: 0,
    id: 0
  },
  onLoad: function (params) {
    this.setData({
      id: params.id
    })
  },
  onReady: function () {
    console.log(this.data.id);
    wx.setNavigationBarTitle({
      title: '西甲-巴萨3-4客负 皇马1-1丢榜首'
    });
  }
});
