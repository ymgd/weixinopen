//sdf.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中...',
    userName: '',
    renderData: {}
  },

  onLoad: function(){
    var _this = this;
    if(!app._user.xs.xm || !app._user.xs.xh){
      app.showErrorModal('未绑定帐号');
      _this.setData({
        remind: '未绑定帐号'
      });
      return false;
    }
    if(!app._user.xs.room){
      app.showErrorModal('未完善寝室信息');
      _this.setData({
        remind: '未完善寝室信息'
      });
      return false;
    }
    _this.setData({
      userName: app._user.xs.xm,
      userYkth: app._user.xs.ykth,
    });
    // 发送请求
    wx.request({
      url: app._server + '/api/get_elec.php', 
      data: app._user.xs.room,
      success: function(res) {
        if(res.data.status == 200){
          var info = res.data.data;
          _this.setData({
            'renderData': info,
            'renderData.room_name': info.room.split('-').join('栋'),
            'renderData.last_time': info.record_time.split(' ')[0],
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
      }
    });
  }
});