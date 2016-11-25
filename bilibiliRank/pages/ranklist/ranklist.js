Page({
  data: {
    videos: [],
    url: [
      "http://www.bilibili.com/index/rank/all-07.json",
      "http://www.bilibili.com/index/rank/all-7-33.json",
      "http://www.bilibili.com/index/rank/origin-07.json"
    ]
  },
  onLoad: function (params) {
    var that = this;
    var rankType = params.id || this.data.id;

    wx.request({
      url: this.data.url[rankType],
      success: function(res) {
        if (res.statusCode === 200) {
          that.setData({
            videos: res.data.rank.list.slice(0, 10)
          });
        }
      }
    });
  }
})