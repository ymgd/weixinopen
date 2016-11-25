var config = require("../../config.js");
var util = require("../../utils/util.js");
var apimanager = require("../../utils/apimanager.js");

Page({
  data:{
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    this.showloadingView();
    this.loadLastestListing();
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  },
  showloadingView: function() {
    wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
    });
  },
  loadLastestListing: function() {
    var url = config.getLastestAdListingUrl();
    var that = this;
    apimanager.request({
        url: url,
        method: 'GET',
        success: function(ret) {
            that.loadLastestListingSuccess(ret);
        },
        fail: function() {
            that.loadLastestListingFail();
        },
        complete: function(){
            setTimeout(function() {
              wx.hideToast();
            }, 1000);
        }});
  },
  loadLastestListingSuccess: function(ret) {
    if (ret.data.type != "data") {
      this.loadLastestListingFail();
      return;
    }
    
    var items = ret["data"]["result"];
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        var date = new Date(item.display.content.timeStamp * 1000);
        item.display.content.date = util.adFormatTime(date);
    }
    this.setData({
        items: items
    });
  },
  loadLastestListingFail: function() {
    wx.showToast({
      title: "加载数据失败",
      duration: 2000
    });

    this.setData({
        loadingDataError: true
    });
  },
  loadAdDatas: function() {
    this.setData({
        loadingDataError: false
    });
    this.showloadingView();
    this.loadLastestListing()
  }
})