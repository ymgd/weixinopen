//news.js
//获取应用实例
var app = getApp()
Page({
  data: {
      RadioId:'',
      radioInfo:{},
      errorMsg:''
  },
  //页面加载监听===在此处获取newss数据
  onLoad : function (options) {
    console.log('radioId'+options.radioId);
    //http://huimian.app.china.com/getLiveProgram?RadioId=1
    var that = this;
    that.setData({
         RadioId:options.radioId
    })
    wx.request({
      url: 'http://huimian.app.china.com/getLiveProgram',
      data: {
         RadioId:that.data.RadioId
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        var radioInfo = res.data;//接口返回的数据
        console.log("新闻详细数据=="+radioInfo.toString());
        //赋值
        that.setData({
          radioInfo:radioInfo
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
