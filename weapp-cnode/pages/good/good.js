import cnode from '../../utils/fetch';

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
  onLoad: function(res) {
    let that = this;
    cnode.cnode('good', 20, 1, true, that);
  }
})