//获取应用实例
var app = getApp()
Page({
  data: {
      NewsId:'',
      CategoryId:'',
      newsinfo :{
        
      },
      errorMsg:''
  },
  //页面加载监听===在此处获取newss数据
  onLoad : function (options) {
    console.log('news===详细信息');
    console.log('news===options.newsId'+options.newsId);
    //http://huimian.app.china.com/NewsServlet.do?processID=getNewsInfo&NewsId=1029174
    var that = this;
    that.setData({
         NewsId:options.newsId
    })
    wx.request({
      url: 'http://huimian.app.china.com/NewsServlet.do',
      data: {
         processID:'getNewsInfo',
         NewsId: that.data.NewsId ,
         CategoryId: that.data.CategoryId 
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        var newsinfo = res.data;//接口返回的数据
        console.log("新闻详细数据=="+newsinfo);
        //赋值
        that.setData({
          newsinfo:newsinfo
        })
      },
      fail:function(res){
        console.log("接口调用失败="+res);
        that.setData({
          errorMsg:errorMsg
        })
      }
    })
  }
})
