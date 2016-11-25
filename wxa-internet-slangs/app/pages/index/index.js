var app = getApp()

Page({
  data: {
    entries: app.globalData.api.data
  },
  // 监听页面加载
  onLoad () {
    console.log('Index Page: onLoad.')
  },
  // 监听页面初次渲染完成
  onReady () {
    console.log('Index Page: onReady.')
  },
  // 监听页面显示
  onShow () {
    console.log('Index Page: onShow.')
  },
  // 监听页面隐藏
  onHide () {
    console.log('Index Page: onHide.')
  },
  // 监听页面卸载
  onUnload () {
    console.log('Index Page: onUnload.')
  },
  // 监听用户下拉刷新动作
  onPullDownRefresh () {
    console.info('Index Page: onPullDownRefresh.')
  },
  // 跳转详情页
  touchEntry (e) {
    wx.navigateTo({
      url: '../entry/entry?index=' + e.currentTarget.dataset.index
    })
  }
})
