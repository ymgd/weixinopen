//news.js
//获取应用实例
var app = getApp()
Page({
  data: {
      ballotId:'',
      ballotInfo:{},
      errorMsg:'',
      toastHidden:true,
      toastIcon:'success',
      toastMsg:''
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
  },
  //点击
  primary:function(event){
    var that = this;
    var voteid = event.currentTarget.dataset.voteid;

    
    //投票请求
    wx.request({
      url: 'http://huimian.app.china.com/client/VoteInfoAction.do',
      data: {
        processID:'addVoteInfo',
        voteId:voteid,
        userid:'000'
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        var voteInfo = res.data;//接口返回的数据
        var status = voteInfo.status;
        var msg = voteInfo.message;
        var icon = 'success';
        if (status=='success') {
          //手动+1
          var index = event.currentTarget.dataset.index;
          var totalpoint = that.data.ballotInfo.data[index].totalpoint;
          totalpoint = parseInt(totalpoint) +1;
          var newballotInfo = that.data.ballotInfo;
          newballotInfo.data[index].totalpoint = totalpoint;
          that.setData({
               ballotInfo:newballotInfo
          })

        }else{
          icon = 'clear';
        }
        //赋值
        that.setData({
          toastIcon:icon,
          toastHidden:false,
          toastMsg:msg
        })
      },
      fail:function(res){
        console.log("接口调用失败="+res);
        //赋值
        var icon = 'clear';
        var msg ='请求错误';
        that.setData({
          toastIcon:icon,
          toastHidden:false,
          toastMsg:msg
        })
      }
    })

  },
  //toast延迟触发
  hiddenToast:function(){
      this.setData({
        toastHidden:true,
      })
  }
})
