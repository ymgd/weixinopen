
var indexList = require('../../data/index');

Page({
  data: {
      title: '设计文章：10月H5行业精品案例出炉了！',
      author: '小呆xd',
      imgUrl: 'http://img.zcool.cn/community/026de3581c535aa84a0d304fe83b43.jpg@800w_1l_2o_100sh.jpg',
      content: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (option) {
    // this.setData({
    //   content: indexList[option.idx].content
    // })
    console.log('onLoad');
  },
  imageInfo: function(e) {
    console.log(e);
  }
});