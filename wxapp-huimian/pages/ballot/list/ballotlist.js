
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '直播列表',        //title
    hidden: false,            //加载提示
    page: 1,                  //当前页码
    ballotList:[]
  },
  //事件处理函数，跳转到详情页
  bindViewTap: function(event) {
    var ballotype = event.currentTarget.dataset.ballotype;
    var ballotId = event.currentTarget.dataset.ballotid;
    var url = '../info/ballotinfo';
    if(ballotype==1){
      url = '../toupiao/toupiao?ballotId='+ballotId;
      console.log('投票');
    }else if(ballotype==2){
      url = '../xuanchuan/xuanchuan?ballotId='+ballotId;
      console.log('宣传');
    }else if(ballotype==3){
      url = '../canyu/canyu?ballotId='+ballotId;
      console.log('参与');
    }else if(ballotype==4){
      console.log('外联');
    }else{
      console.log('其他');
    }
    wx.navigateTo({
      url: url
    })
  },
  //页面加载监听，页面准备好后执行===在此处获取newss数据
  onLoad: function () {
    console.log('news===加载数据');
    var self = this;
    this.getNews({page: self.data.page});
  },
  //加载数据
  getNews:function(data){
      var that = this;
      that.setData({
        hidden: false
      });
      if (!data) data = {};
      if (!data.page) data.page = 1;
      if (data.page === 1) {
        that.setData({
          radioList:[]
        });
      }
      //http://huimian.app.china.com/NewsServlet.do?processID=getNewsList&Page=1&PageSize=1&Type=5
      wx.request({
        url: 'http://huimian.app.china.com/NewsServlet.do',
        data: {
           processID:'getNewsList',
           Page: data.page ,
           PageSize: '20',
           Type:5
        },
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
          var data = res.data;//接口返回的数据
          //console.log("接口返回的数据="+data);
          var ballotList = data.Data;
          //赋值
          that.setData({
            ballotList: that.data.ballotList.concat(res.data.Data.map(function (item) {
              return item;
            }))
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
    var self = this;
    self.setData({
      page: self.data.page + 1
    });
    this.getNews({page: self.data.page});  
  }

})
