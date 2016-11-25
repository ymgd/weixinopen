App({
  getUserInfo:function(cb){
    var that=this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo);
    }
    else{
      //调用登录接口，获取用户信息
      wx.login({
        success:function(){
          wx.getUserInfo({
            success:function(res){
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
                }
          })
     }
    })
    }
  },
  onLaunch: function () {
    var logs=wx.getStorageSync('log')||[];
    var date=new Date(Date.now());
    var loginfo=date.toLocaleString();
    if(logs.length>=10){
      logs.pop();
    }
    logs.unshift(loginfo);
    wx.setStorageSync("log",logs);
    console.log(logs);
  },
  onShow: function () {
    console.log('App 显示了');
  },
  onHide: function () {
    console.log('App 隐藏了')
  },
  globalData:{
    animationData:{},
    userInfo:null,
  }
})