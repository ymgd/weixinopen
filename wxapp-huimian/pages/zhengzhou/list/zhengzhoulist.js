//news.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '郑州',            //title
    hidden: false,            //加载提示
    zhengzhouList:[]          //轮播图
  },
  //事件处理函数，跳转到详情页
  bindViewTap: function(event) {
    wx.navigateTo({
      url: '../info/zhengzhouinfo'
    })
  },
  //页面加载监听，页面准备好后执行===在此处获取newss数据
  onLoad: function (options) {
    console.log('news===加载数据--'+options.type);
    var self = this;
    this.getNews();
  },
  //加载数据
  getNews:function(){
      var that = this;
      that.setData({
        hidden: false
      });
      //http://huimian.app.china.com/NewsServlet.do?processID=getNewsList&Page=1&PageSize=20&Type=1
      wx.request({
        url: 'http://huimian.app.china.com/NewsServlet.do',
        data: {
           processID:'getNewsList',
           Type:4
        },
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
          var data = res.data;//接口返回的数据
          //console.log("接口返回的数据="+data);
          var zhengzhouList = data.Data;
          //赋值
          that.setData({
            zhengzhouList:zhengzhouList
          })
          setTimeout(function () {
            that.setData({
              hidden: true
            });
          }, 300);
        }
      })
  },
  turnToTag:function(event){
    console.log("newsjs="+event);
    app.globalData.tagJS.turnToTag(event);
  },
  //下拉触发
  lower: function(e) {
    //this.getNews();  
  }

})
