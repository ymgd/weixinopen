
var api=require('../../utils/api.js')
Page({
  data:{
    systemInfo:{},
    _api:{},
    navbar:['推荐','最新'],
    currentNavbar:0,
    list:[],
    hot_last_id:0,
    latest_list: [],
    latest_last_id: 0,
  },
  onLoad:function(options){
    var that=this;
    wx.getSystemInfo({
    success: function(res) {
       console.log(res)
    that.setData({
      systemInfo:res
    })
    that.setData({
      _api:api
    })
    that.pullUpLoad()
  }
})
},
  onReady:function(){
    // 页面渲染完成
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
  onPullDownRefreash:function(){
   console.log("onPullDownRefreash");
  },
  /**
  * Item 点击事件
  */
   onItemClick: function (e) {
    var targetUrl = api.PAGE_WORK
    if (e.currentTarget.dataset.rowId != null)
      targetUrl = targetUrl + '?rowId=' + e.currentTarget.dataset.rowId
    wx.navigateTo({
      url: targetUrl
    })
  },

  /**
   * Tab切换
   */

  swichNav:function(e){
   this.setData({
      currentNavbar:e.currentTarget.dataset.idx,
   })
    console.log(e.currentTarget.dataset.idx)
    if(e.currentTarget.dataset.idx ==1&&this.data.latest_list.length ==0){
        this.pullUpLoadLatest();
    }
    
  },
  /**
   * 新作数据
   */
  pullUpLoadLatest: function () {
    wx.showNavigationBarLoading()
    api.get(api.HOST_IOS + api.LATEST + '?last_id=' + this.data.latest_last_id)
      .then(res => {
        this.setData({
          latest_list: this.data.latest_list.concat(res.data.list),
          latest_last_id: this.data.latest_last_id
        })
        wx.hideNavigationBarLoading()
      })
  },

   /**
   * scroll-view滚动到底部，触发的事件
   * http://ios1.artand.cn/discover/work/hot??last_id=0
   */
  
  pullUpLoad:function(e){
    console.log("scroll-view滚动到底部，触发的事件")
    wx.showNavigationBarLoading()
    api.get(api.HOST_IOS + api.HOT + '?last_id=' + this.data.hot_last_id)
     .then(res=>{
       this.setData({
          //合并操作
          list:this.data.list.concat(res.data.list),
          hot_last_id: this.data.hot_last_id+res.data.list.length
       })
       wx.hideNavigationBarLoading()
     })
  }
     
})
