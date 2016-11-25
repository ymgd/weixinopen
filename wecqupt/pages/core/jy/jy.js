//jy.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中...',
    jyData: []
  },
  onLoad: function() {
    this.getData();
  },
  onPullDownRefresh: function(){
    this.getData();
  },
  getData: function() {
    var _this = this;
    if(!app._user.xs.xh || !app._user.xs.xm){
      app.showErrorModal('未绑定');
      _this.setData({
        remind: '未绑定'
      });
      return false;
    }
    app.showLoadToast();
    wx.request({
      url: app._server + "/api/get_booklist.php",
      data: {
        yktID: app._user.xs.ykth
      },
      success: function(res) {
        if(res.data.status === 200) {
          _this.setData({
            jyData: res.data.data,
            remind: ''
          });
        }else{
          app.showErrorModal(res.data.message);
          _this.setData({
            remind: res.data.message
          });
        }
      },
      fail: function(res) {
        app.showErrorModal(res.errMsg);
        _this.setData({
          remind: '网络错误'
        });
      },
      complete: function() {
        wx.hideToast();
        wx.stopPullDownRefresh();
      }
    });
  }
 
});