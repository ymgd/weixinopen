var order = ['green', 'red', 'yellow', 'blue', 'green']
Page({
  data: {
    goodlists : [],
    brannerlist : [],
    indicatorDots : true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },

  onLoad: function () {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    });

    var that = this; 
    wx.request({
      url: 'http://weixin.honglingjinclub.com/product/list?communityid=82', //仅为示例，并非真实的接口地址
      data:{},
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        wx.hideToast();
        var goodlists = res.data.body;
        for(var i=0; i<goodlists.length; i++){
          var good = goodlists[i];
          good.num = 0;
        }
        that.setData({
          goodlists: goodlists
        });
        console.log(that.data.goodlists);
      }
    });

    wx.request({
      url: 'http://weixin.honglingjinclub.com/banner/list?communityid=82', //仅为示例，并非真实的接口地址
      data:{},
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        wx.hideToast();
        that.setData({
          brannerlist: res.data.body
        });
        console.log(that.data.brannerlist);
      }
    })
  },
  calculate: function(goodid, num){
    var goodlist = new Array();
    for (var i=0;i<this.data.goodlists.length;i++)
    {
      var tempgood = this.data.goodlists[i];
      if(goodid==tempgood.id){
          tempgood.num = num;
      }
      goodlist.push(tempgood);
    }
    this.setData({
      goodlists: goodlist
    })
  },
  addCount: function(e){
    var goodid = e.target.dataset.goodid;
    var num = e.target.dataset.goodnum;
    num++;
    this.calculate(goodid, num);
  },
  subCount: function(e){
    var goodid = e.target.dataset.goodid;
    var num = e.target.dataset.goodnum;
    num--;
    this.calculate(goodid, num);
  },
  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
  },
  scroll: function(e) {
    console.log(e)
  },
  scrollToTop: function(e) {
    this.setAction({
      scrollTop: 0
    })
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  goodinfo: function(e) {
    wx.navigateTo({
      url: 'goodInfo?goodid=1'
    })
  }
})