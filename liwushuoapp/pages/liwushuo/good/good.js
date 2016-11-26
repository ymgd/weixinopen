var app = getApp()

Page({
  data: {
    id: '',
    good: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    hidden: false,
  },
  onLoad: function(options){
    console.log(options)
    this.getGoodsData(options)
  },

  // 获取商店详情数据
  getGoodsData: function(options){
    // wx.showNavigationBarLoading();
    var that = this;
    that.setData({ hidden: false });
    wx.request({
      method: 'GET',
      url: 'http://115.29.245.211:8181/jgouINF/inter/shop/queryIshopInfo.do',
      header:{
        mid:0,
        token:0,
      },
      data: {
        id:options.id
      },
      success: function(res) {
        // wx.hideNavigationBarLoading();
        that.setData({ hidden: true });
        if(res.data.retcode == 1){
          var good = res.data.data;
          console.log(good.images)
          that.setData({ good:good });
        }
      },
      fail: function(){
        that.setData({ hidden: true });
        // wx.hideNavigationBarLoading();
      }
    })
  }
})
