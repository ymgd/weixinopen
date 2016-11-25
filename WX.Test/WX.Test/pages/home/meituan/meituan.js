var networkTool=require('../../../pages/tool/networkRequestTool.js')
var page = 0;
Page({
    data:{
        items:[],
        isShowLoadMoreAnimation: false,
        isShowLoadMoreButton: 'hidden',
        loadMoreDataTitle:'加载更多数据中...'
        
    },
    onLoad: function(options){
       
    },
    onPullDownRefresh: function() {
        this.setData({
            items:[]
        })
        page = 0;
        this.requestData();
    },
    onShow:function(){
        this.requestData();
    },
    onReachBottom: function() {
        page++;
        this.requestData();
  },
  requestData: function(){
      var that = this;
         networkTool.getMeiTuanData(page).then(function(e){
            wx.stopPullDownRefresh({ })
            that.setData({
                items:that.data.items.concat(e.data.data),
                isShowLoadMoreAnimation: e.data.data.length > 0 ? true : false,
                loadMoreDataTitle:e.data.data.length > 0 ? "加载更多数据中..." : "没有更多数据了",
                isShowLoadMoreButton: that.data.items.length > 0 ? 'visible' : 'hidden'
            })
        }, function(e){
            console.log('数据失败了o')
        })
  }
})