Page({
  data: {
// 假数据，社区信息数据
    community: [
      "满庭芳园", "流星花园", "龙岗世纪"
      ]
  },

  onLoad: function () {
    this.setData({
      community: community.map(function (log) {
        return log;
      })
    })
  }
})
