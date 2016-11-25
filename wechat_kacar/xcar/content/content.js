//获取新闻
var app = getApp()
Page({
  data: {
    smryHeight:"4.5rem",
    bookInfo:[],
    art_id: ''
  },
  extendBox:function(){
    if(this.data.smryHeight=="4.5rem"){
      this.setData({smryHeight:"auto"});
    }else{
      this.setData({smryHeight:"4.5rem"});
    }   
  },
  onLoad: function (options) {
    console.log(options)
    var that = this
    //调用应用实例的方法获取全局数据
    that.setData({
        art_id:options.id
      });
    wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 5000
        });
    wx.request({
      url: 'https://api.douban.com/v2/book/'+options.id,
      success: function(res){
        // success
        that.setData({bookInfo:res.data});
      }
    });
  },
  onReady:function(){
    // 页面渲染完成
    wx.hideToast();
  },
})


