//index.js
import cnode from '../../utils/fetch';

var app = getApp()
Page({
  data: {
    news: null
  },
  goDetail: function (event) {
    // console.log(event.currentTarget.dataset.id);
    wx.navigateTo({
      url: `../detail/detail?id=${event.currentTarget.dataset.id}`
    });
  },
  onLoad: function () {
    var that = this;
    cnode.cnode('all', 20, 1, true, that);
  }
})
