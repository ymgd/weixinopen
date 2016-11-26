var app = getApp();
Page({
  data:{
    userInfo:{},
    loginToUrl:"login/login"
  },
  onLoad:function(options){
    var that = this;
    //获得用户信息
    /*
    app.getUserInfo(function(userInfo){
      console.log(userInfo);
       that.setData({
        userInfo:userInfo
      });
    });
    */
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var that = this;
    app.getUserInfo(function(userInfo){
      console.log(userInfo);
      that.setData({
        userInfo:userInfo
      });
      //如果已登录 点击头像跳转到个人信息页 否则到登录页 
      if(userInfo.has){
        that.setData({
          loginToUrl:"personInfo/personInfo"
        });
      }
      else{
        that.setData({
          loginToUrl:"login/login"
        });
      }
    });
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
});