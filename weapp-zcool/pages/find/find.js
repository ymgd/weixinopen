
var app = getApp();
var findList = require('../../data/find');

Page({
  data:{
    findList: findList.all,
    active: 'all',
    showLoadMore: false,
    isMore: true,
    idx: 0
  },
  onLoad:function(options){
    var _this = this;
    // 请求数据
    // wx.request({
    //   url: app.globalData.domain+'/list',
    //   header: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function(res) {
    //     console.log(res);
    //     if (res.status === 200) {
    //       _this.setData({
    //         news: res.data
    //       });
    //     }
    //   }
    // });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  chageFindData: function(event) {
    console.log(event);
    var type = event.currentTarget.dataset.type;
    if (findList[type]) {
      this.setData({
        findList: findList[type],
        active: type,
        showLoadMore: false,
        idx: 0
      });
    }
  },
  scrollToLower: function(e) {
    console.log(e,123)
    var isMore = true;
    if (this.data.idx >= 1) {
      isMore = false;
    }
    this.setData({
      showLoadMore: true,
      isMore: isMore,
      idx: this.data.idx+1
    })
  },
  // 显示详情页信息
  showDetail: function(e) {
    console.log(e);
    var idx = e.currentTarget.dataset.idx;
    wx.navigateTo({
      url: 'detail?idx='+idx
    })
  }
});