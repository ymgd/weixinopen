var app = getApp()

Page({
  data: {
    item: {},
    attachments: {},
    footnotes: {}
  },
  // 监听页面加载
  onLoad: function (options) {
    console.log('Entry Page: onLoad.')
    // 提取当前词条数据
    var entryData = app.globalData.api.data[Number(options.index)]
    console.dir(entryData)
    // 设定数据
    this.setData({
      item: entryData,
      attachments: entryData.attachments,
      footnotes: entryData.footnotes
    }),
    // 设定导航栏标题
    wx.setNavigationBarTitle({
      title: entryData.title
    })
  },
  // 监听页面初次渲染完成
  onReady () {
    console.log('Entry Page: onReady.')
  },
  // 监听页面显示
  onShow () {
    console.log('Entry Page: onShow.')
  },
  // 监听页面隐藏
  onHide () {
    console.log('Entry Page: onHide.')
  },
  // 监听页面卸载
  onUnload () {
    console.log('Entry Page: onUnload.')
  },
  // 监听用户下拉刷新动作
  onPullDownRefresh () {
    console.info('Entry Page: onPullDownRefresh.')
  },
})
