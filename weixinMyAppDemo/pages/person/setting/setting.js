var app = getApp();
Page({
  data:{
   
   userInfo:{},
   modalContent:"",
   modalHidden:true,
   loadingHidden:true
  },
  onLoad:function(options){
    var that = this;
    app.getUserInfo(function(userInfo){
      console.log(userInfo);
       that.setData({
        userInfo:userInfo
      });
    });
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
  loginOut:function(){
    var that = this;
    that.setData({
      modalHidden:false
    });
  },
  modalConfim:function(){
    var that = this;
    that.setData({
      modalHidden:true,
      loadingHidden:false
    });
    wx.request({
      url:app.globalData.url.api.loginOut,
      data: {
        token: this.data.userInfo.token 
      }, 
      success: function(res) {
        console.log(res.data);
        if(res.data.errcode==0){
          app.globalData.userInfo = {has:false};
          wx.setStorage({
            key:"userInfo",
            data:{has:false}
          });
          wx.navigateBack();
        }
        else{
          that.setData({modelContent:res.data.errmsg});
          that.setData({modalHidden:false});
        }
      }
    });
  },
  modalCancel:function(){
    var that = this;
    that.setData({
      modalHidden:true
    });
  },
});