Page({
  data: {
    hidden: true
  },
  loadingChange: function () {
    this.setData({
      hidden: true
    })
  },
  loadingTap: function () {
    this.setData({
      hidden: false
    })
  },
  onReady: function () {
        wx.setNavigationBarTitle({
            title: '商品搜索'
        })
    }
})