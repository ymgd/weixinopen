
var app = getApp(),currentPage = 1;
const URL = "http://apis.baidu.com/showapi_open_bus/channel_news/search_news";

Page({
  data:{
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    toView: "",
    loadingHidden:true,
    renderData:[],
  },
  onLoad:function(options){
    this.loadDataFromServer();
  },
  //api读取数据
  loadDataFromServer: function(){
    var that = this;
    that.changeLoadingStatus(false);
    app.req(URL,{
      page : currentPage,
      needContent : 1,
    },{
      header: { apikey: app.globalData.apikey },
      success:function(resp){
        console.log(resp);
        console.log("成功加载页数 "+currentPage);
        var tempData = resp.data.showapi_res_body.pagebean.contentlist;
        var toViewId = currentPage % 2 == 0 ? "top-id" : "top-id2"; //需要改变值页面才会重新渲染
        that.setData({
           //renderData: that.data.renderData.concat(tempData),  合并数组容易超出长度,无法做到无限加载
           renderData: tempData,
           toView: toViewId,
        });
        that.changeLoadingStatus(true);
      }
    });

  },
  //加载上一页或者下拉刷新
  refresh:function(e){
      currentPage = currentPage > 1 ? --currentPage : 1;
      this.loadDataFromServer();
  },
  //加载下一页
  loadMore:function(e){
      ++currentPage;
      this.loadDataFromServer();
  },
  //改变loading状态
  changeLoadingStatus: function(bool){
    this.setData({
      loadingHidden: bool
    });
  },
  onReady:function(){
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: '列表'
    });
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
});