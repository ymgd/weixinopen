//news.js
//获取应用实例
var app = getApp()
Page({
  data: {
      ballotId:'',
      ballotInfo:{},
      errorMsg:''
  },
  //页面加载监听===在此处获取newss数据
  onLoad : function (options) {
    console.log('radioId'+options.ballotId);
    //http://huimian.app.china.com/client/VoteInfoAction.do?processID=getVoteItemList&ballotId=81&page=1&pageSize=100
    var that = this;
    that.setData({
         ballotId:options.ballotId
    })
    wx.request({
      url: 'http://huimian.app.china.com/client/VoteInfoAction.do',
      data: {
        processID:'getVoteItemList',
        ballotId:that.data.ballotId,
        page:1,
        pageSize:100
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        var ballotInfo = res.data;//接口返回的数据
        console.log("新闻详细数据=="+ballotInfo.toString());
        //赋值
        that.setData({
          ballotInfo:ballotInfo
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
