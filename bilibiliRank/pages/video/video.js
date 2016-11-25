Page({
  data: {
    info: {},
    url: 'http://app.bilibili.com/x/v2/search'
  },
  onLoad: function (params) {
    var that = this;
    var aid = params.aid;
    var fav = params.fav;
    var coins = params.coins;
    var type = params.typename || '连载动画';

    wx.setNavigationBarTitle({
      title: 'av'+aid,
      compelte: function(res) {
        console.log(res);
      }
    });
    
    wx.request({
      url: this.data.url,
      data: {
        keyword: 'av'+aid
      },
      success: function(res) {
        if (res.statusCode === 200) {
          var info = res.data.data.items.archive[0];
          info.fav = fav;
          info.coins = coins;
          info.type = type;
          that.setData({
            info: info
          });
        }
      }
    });
  }
})