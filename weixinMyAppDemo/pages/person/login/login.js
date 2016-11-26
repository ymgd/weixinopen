var MD5 = require('../../js/MD5.js');
var app = getApp();
Page({
  data:{
     mobile:"13416157471",
     password:"111111",
     modalHidden:true,
     modelContent:""
  },
  onLoad:function(options){
    var that = this;
    
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
  },
  login:function(){
    var that = this;
    
    if( !this.data.mobile ){
      this.setData({modelContent:"请输入手机号"});
      this.setData({modalHidden:false});
      return;
    }
    if( !this.data.password ){
      this.setData({modelContent:"请输入密码"});
      this.setData({modalHidden:false});
      return;
    }
    //登录
    wx.request({
      url:app.globalData.url.api.login,
      data: {
        mobile: this.data.mobile,
        password: MD5.MD5(this.data.password)
      }, 
      success: function(res) {
        console.log(res.data);
        if(res.data.errcode==1&&res.data.token){
          app.globalData.userInfo.token = res.data.token;
          wx.navigateBack();
        }
        else{
          that.setData({modelContent:res.data.errmsg});
          that.setData({modalHidden:false});
        }
      }
    });
  },
  inputMobile:function(e){
    this.data.mobile =  e.detail.value;
  },
  inputPassword:function(e){
    this.data.password =  e.detail.value;
  },
  modalConfirm:function(){
    this.setData({modalHidden:true});
  }
});