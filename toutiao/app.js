//app.js
App({
  onLaunch: function () {
    this.getUserInfo();
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          })
        }
      });
    }
  },
  //封装的数据请求类
  req: function(url,data,param){
    var requestData = {
      url: url,
      data: typeof data == 'object' ? data : {},
      method: typeof param.method == 'string' && param.method.length > 0 ? param.method.toUpperCase() : 'GET',
      header: typeof param.header == 'object' ? param.header : {},
      success: function(res) {
      	typeof param.success == 'function' && param.success(res);
      },
      fail: function(res){
        typeof param.fail == 'function' && param.fail(res);
      },
      complete: function(res){
        typeof param.complete == 'function' && param.complete(res);
      }
    };
    wx.request(requestData);
  },
  globalData:{
    userInfo:null,
    apikey:"fff06fa785edae6f8c44d759645ee028",
  }
})