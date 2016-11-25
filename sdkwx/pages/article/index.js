var app = getApp()
Page({
  data: {
    data: ''
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://sdk.cn/api/article/juhe', //仅为示例，并非真实的接口地址
      data: {
        key: 'ceb51082d5d933af12b374d058369867' ,
        count: 6,
        sort_time: 1
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
        that.setData({
          data:res.data
        })
      }
    })
  }
})