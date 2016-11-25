function cnode(tab='all', limit=40, page=1, mdrender=true, that) {
  wx.request({
    url: `https://cnodejs.org/api/v1/topics?tab=${tab}&limit=${limit}&page=${page}&mdrender=${mdrender}`,
    header: {
      'Content-type': 'application/json'
    },
    success: function (res) {
      that.setData({
        news: res.data.data
      })
    }
  })
}

module.exports = {
  cnode: cnode
}