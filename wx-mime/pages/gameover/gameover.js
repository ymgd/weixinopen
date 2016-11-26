var app = getApp();

Page({
  data: {
    score: 0,
    roomNo: 0
  },
  onLoad: function () {
      this.setData({
          score: app.getMyScore(),
          roomNo: app.getRoomNo()
      });
  },
});
