//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
  },
  globalData:{
    userInfo:null
  },
  //自定义随机字符串函数
  randomString:function (len) {
　　len = len || 32;
       //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (var i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
  }
})