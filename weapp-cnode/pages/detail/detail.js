var util = require('../../utils/util');

Page({
  data: {
    detail: {},
  },
  onLoad: function (options) {
    const that = this;
    wx.request({
      url: `https://cnodejs.org/api/v1/topic/${options.id}`,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          detail: res.data.data,
        })
      }
    });
  }
})