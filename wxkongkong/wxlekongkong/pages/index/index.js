const kPageSize = 30;
var app = getApp();
var config = require("../../config.js");
var util = require("../../utils/util.js");
var apimanager = require("../../utils/apimanager.js");

Page({
  data: {
    items: [],
    vinteval: 20,
    windowHeight: 400,
    hasMore: false,//是否还有更多数据可以加载.
    loadingDataError: false,
    firstloadingData: true
  },
  customerData: {
    SV: 1,
    lastId: 0,
    loadingIdx: 0,
    selectedctgindex: 0,//当前选择的index.
    isloadingMore: false,//是否正在加载跟多中...
    lastestads: [], //最新交易列表
  },
  onLoad: function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function(){
    // 页面渲染完成
    console.log('loadPagelyoutDatas');
    this.loadPagelyoutDatas();
  },
  onShow: function(){
    // 页面显示
    var that = this;
    wx.getSystemInfo( {
      success: ( res ) => {
        that.setData( {
          windowHeight: res.windowHeight
        });
      }
    })
  },
  onHide: function(){
    // 页面隐藏
  },
  onUnload: function(){
    // 页面关闭
  },
  scrolltolower: function(e) {
    if (!this.customerData.isloadingMore) {
      this.loadAdDataWithType(false);
    }
  },
  loadPagelyoutDatas: function() {
    this.showloadingView();
    this.onPullDownRefresh();
  },
  showloadingView: function() {
    if (this.data.firstloadingData) {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 100000
      })
    }
  },
  onPullDownRefresh: function() {
    //下拉刷新
    if (this.customerData.isloadingMore) {
      wx.stopPullDownRefresh();
      return ;
    }
    this.customerData.isloadingMore = true;
    this.resetLoadAdDataPrams();

    var params = {
      SV: '4',
      id: '0',
      opts: '',
      channel: 'quanbu'
    };
    var url = config.getHomePageLayoutUrl();
    var that = this;
    apimanager.request({url: url, 
                        data: params,
                        method: 'GET',
                        success: function(ret) {
                          that.loadPlageyoutDataSuccess(ret);
                        },
                        fail: function() {
                          that.loadingDataFailed();
                        }});
  },
  resetLoadAdDataPrams: function() {
    this.customerData.lastId = 0;
    this.customerData.loadingIdx = 0;
  },
  loadPlageyoutDataSuccess: function(ret) {
    var results = ret['data']['result'];
    var lastestItems;
    var celebrityItems;
    for(let i = 0; i < results.length; i++) {
      let item = results[i];
      if (item['display']['style'] == 'HomeLatestSection') {
        lastestItems = item;
        continue;
      } else if (item['display']['style'] == 'DiscoverySectionScrollable') {
        celebrityItems = item;
        continue;
      }
    }

    for (let i = 0; i < celebrityItems.children.length; i++) {
      let item = celebrityItems.children[i];
      item.display.content.statusString = item.display.content.status==1 ? "尚未开始" : (item.display.content.status==2 ? "活动进行中" : "活动已结束");
      console.log(item); 
    }

    var categoryItems = this.categoryItems();
    var topicItems = this.topicItems();
    var activityItems = this.activityItems();
    console.log("celebrityItems");
    console.log(celebrityItems['children']);
    
    this.setData({
      activityItems: activityItems,
      categoryItems: categoryItems,
      lastestItems: lastestItems['children'][0],
      topicItems: topicItems,
      celebrityItems: celebrityItems
    });

    //加载ad列表信息
    this.loadAdDataWithType(true);
  },
  activityItems: function() {
    return '../../resource/images/banner_intro.jpg';
  },
  categoryItems: function() {
    return [
      {
        imageurl: "../../resource/images/icon_fushi.png",
        title: "服装服饰",
        bannerimage: "banner_fushi.jpg"
      },
      {
        imageurl: "../../resource/images/icon_xiebao.png",
        title: "鞋帽箱包",
        bannerimage: "banner_xiebao.jpg"
      },
      {
        imageurl: "../../resource/images/icon_peishi.png",
        title: "配件配饰",
        bannerimage: "banner_peishi.jpg"
      },
      {
        imageurl: "../../resource/images/icon_jiaju.png",
        title: "家居用品",
        bannerimage: "banner_jiaju.jpg"
      },
      {
        imageurl: "../../resource/images/icon_shuma.png",
        title: "数码产品",
        bannerimage: "banner_shuma.jpg"
      },
      {
        imageurl: "../../resource/images/icon_tushu.png",
        title: "图书音像",
        bannerimage: "banner_tushu.jpg"
      },
      {
        imageurl: "../../resource/images/icon_muying.png",
        title: "母婴用品",
        bannerimage: "banner_muying.jpg"
      },
      {
        imageurl: "../../resource/images/icon_gehu.png",
        title: "个护美妆",
        bannerimage: "banner_gehu.jpg"
      }
    ];
  },
  topicItems: function() { 
    return "../../resource/images/banner_shaidan.jpg";
  },
  loadAdDataWithType: function(isRefresh) {
    var opts = {
      "from" : kPageSize * (this.customerData.loadingIdx + 1),
      "size" : kPageSize,
      "banner": false
    };
    var params = {
      SV: this.customerData.SV,
      id: this.customerData.lastId,
      opts: JSON.stringify(opts)
    };
    var that = this;
    apimanager.request({
      url: config.getAdListUrl(),
      data: params,
      method: 'GET',
      success: function(res) {
        // success
        wx.hideToast();
        that.loadingDataSuccessed(isRefresh, res.data);
      },
      fail: function() {
        // fail
        that.loadingDataFailed();
      },
      complete: function() {
        // complete
        that.loadingDataComplete(isRefresh);
      }
    });
  },
  loadingDataSuccessed(isRefresh ,res) {
    if (res.type != "data") {
      this.loadingDataFailed();
      return;
    }

    //处理加载数据
    if (isRefresh) {
      this.data.items = []
      this.customerData.items = []

      if (this.data.firstloadingData) {
        this.setData({
          firstloadingData: false
        });
      }
    }
    this.customerData.loadingIdx += 1;

    var results = res.result;
    var items = this.data.items;
    for (let key in results) {
      var result = results[key].display;
      if (result.style == "ad_item") {
        result.content.description = result.content.title + result.content.content;
        result.content.city = result.content.region.names.join("|");
        var date = new Date(result.content.createdAt * 1000);
        result.content.date = util.adFormatTime(date);
        result.content.likeCount -= 0;
        result.content.applicationCount -= 0;
        result.content.commentNum -= 0;
        result.style = "adview";
        items.push(result);
        this.customerData.lastId = result.content.id;
      }
    }

    var hasMore = results.length >= kPageSize;
    this.setData({
      items: items,
      hasMore: hasMore
    });
  },
  loadingDataFailed() {
    //如果无数据，加载失败，显示点击重新加载，按钮.
    wx.showToast({
      title: "加载数据失败",
      duration: 2000
    });
    if (this.data.firstloadingData) {
      this.setData({
        loadingDataError: true
      });
    }
  },
  loadingDataComplete(isRefresh) {
    if (isRefresh) {
      wx.stopPullDownRefresh();
    }
    var that = this;
    setTimeout(function() {
        that.customerData.isloadingMore = false;
      }, 1000);
  },
  clickOnBannerIntroView: function() {

  },
  clickOnCategoryView: function(e) {
    var tag = this.data.categoryItems[e.currentTarget.dataset.tag];
    var url = "../zone/zone?keyword=" + tag.title + "&bannerimage=" + tag.bannerimage;
    wx.navigateTo({
      url: url
    });
  },
  clickOnLastestView: function(e) {
    wx.navigateTo({
      url: '../lastestads/lastestads'
    })
  },
  clickOnTopicView: function(e) {

  },
  clickCheckMoreCelebritys: function(e) {

  },
  clickOnCelebrityView: function(e) {

  },
  clickOnAdView: function(e) {
    //点击adView
    var idx = e.currentTarget.id - 0;
    var adInfo = this.data.items.length > idx && this.data.items[idx];
    if (adInfo) {
      this.gotoAdDetailView(adInfo.content);
    }
  },
  gotoAdDetailView: function(adInfo) {
    app.globalData.adInfo = adInfo;
    wx.navigateTo({
      url: '../addetail/addetail'
    });
  }
})