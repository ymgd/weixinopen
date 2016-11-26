//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    console.log("onLaunch");
  },
  onShow:function(){
    console.log("onshow");
  },
  onHide:function(){
    console.log("onhide");
  },
  globalData:{
    userInfo:null
  }
})