const AV = require( '../../utils/leancloud.js' );
AV.init( {
  appId: "GEkVRhKfRqKLuM3aGyYI8dhP-gzGzoHsz",
  appKey: "vNUdRqi1y96IavDkoX2weFEy",
});

var app = getApp()

Page( {
  data: {
    toastHidden: true,
    modalHidden:true,
    errinfo:null
  },
  formSubmit: function( e ) {
    var that=this;
    var user = new AV.User();
    console.log(e.detail.value.username)
    //  检查用户名
    if(e.detail.value.username== ''){
      that.setData({
        modalHidden:false,
        errinfo:"没有填写用户名！"
      })
      return;
    };
    //  检查密码
    if(e.detail.value.password== ''){
      that.setData({
        modalHidden:false,
        errinfo:"没有填写密码！"
      })
      return;
    }
    //  用户登陆
    user.setUsername( e.detail.value.username );
    user.setPassword( e.detail.value.password );
    user.setEmail( e.detail.value.username + "@qq.com" );
    user.signUp().then( function( loginedUser ) {
      if(loginedUser.id != null){
        that.setData({
          toastHidden:false
        }),
        wx.redirectTo({
          url:'../login/login'
        })
      }else{
      }
    }, ( function( error ) {
    }));
  },
  resetModal:function(){
    var that=this;
    that.setData({
        modalHidden:true,
        errinfo:null
      })
  }
})