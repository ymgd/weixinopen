//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
  },
  //getUser函数，在index中调用
  getUser: function(success_cb, fail_cb) {
    var _this = this;
    _this.showLoadToast();
    //登录
    wx.login({
      success: function(res){
        if(res.code){
          //调用函数获取微信用户信息
          _this.getUserInfo(function(info){
            _this._user.wx = info.userInfo;
            //发送code与微信用户信息，获取学生数据
            wx.request({
              method: 'POST',
              url: _this._server + '/api/users/get_info.php',
              data: {
                code: res.code,
                key: info.encryptedData,
                iv: info.iv
              },
              success: function(res){
                if(res.data.status){
                  var data = JSON.parse(_this.util.base64.decode(res.data.data));
                  console.log(data);
                  _this._user.is_bind = data.is_bind;
                  _this._user.wx.openid = data.openid;
                  _this._user.xs = data.student;
                  _this._time = data.time;
                  _this._t = data['\x74\x6f\x6b\x65\x6e'];
                  if(!data.is_bind){
                    wx.navigateTo({
                      url: '/pages/more/login'
                    });
                  }
                  //成功回调函数
                  typeof success_cb == "function" && success_cb();
                }else{
                  //失败回调函数
                  typeof fail_cb == "function" && fail_cb(res.data.message);
                }
              },
              fail: function(res){
                //失败回调函数
                typeof fail_cb == "function" && fail_cb(res.errMsg);
              },
              complete: function(){
                wx.hideToast();
              }
            });
          });
        }
      }
    });
  },
  getUserInfo: function(cb){
    //获取微信用户信息
    wx.getUserInfo({
      success: function(res){
        typeof cb == "function" && cb(res);
      }
    });
  },
  showErrorModal: function(content){
    wx.showModal({
      title: '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  },
  showLoadToast: function(title, duration){
    wx.showToast({
      title: title || '加载中',
      icon: 'loading',
      duration: duration || 10000
    });
  },
  util: require('./utils/util'),
  key: function(data){ return this.util.key(data) },
  _server: 'https://we.cqu.pt',
  _user: {
    //微信数据
    wx: {},
    //学生数据
    xs: {}
  },
  _time: {} //当前学期周数
});