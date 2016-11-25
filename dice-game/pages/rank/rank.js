//rank.js
Page({
  data: {
    rankLogs: []
  },
  //获取排行榜
  getRank: function() {
    var rank = [];
    rank.push(wx.getStorageSync('userInfo'));
    return rank;
  },
  onLoad: function () {
    var rank = this.getRank();
    this.setData({
      rankLogs: rank
    })
  }
})
