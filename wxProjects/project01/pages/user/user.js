var app = getApp();
Page({
  data:{
    username:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log("user onload...");
    var userInfo = app.globalData.userInfo;
    console.log("user onUnload...",!userInfo);
    if(!userInfo){
      wx.redirectTo({
        url: '../login/login'
        })
    }else{
      this.setData({username:userInfo.username});
    }
  },
  onReady:function(){
    // 页面渲染完成
    
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    console.log("log onUnload...");

    
  }
})