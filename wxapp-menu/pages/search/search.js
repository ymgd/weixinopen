var app = getApp();
Page({
  data:{
    inputVal: '',
    list: []
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  bindKeyInput: function(e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  search: function(e) {
    var page = this;
    wx.request({
      url: 'https://apis.juhe.cn/cook/query?key=' + app.AppKey + '&menu=' + page.data.inputVal,
      data: {},
      method: 'GET',
      success: function(res){
        console.log(res.data);
        var list = res.data.result.data;
        page.setData({list: list})
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
    navToDetail: function(e) {
      var id = e.currentTarget.id;
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + id
      })
    }
})