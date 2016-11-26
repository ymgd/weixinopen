
var app = getApp();
Page({
  data:{
    newCity:null,
    newAge:null,
    newNick:null,
    newHeader:null,
    userInfo:{},
    toastHidden:true,
    toasttoastContent:"请重试",
    modalHidden:true,
    modelContent:"出错了"
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
    var newCity = wx.getStorageSync("addressNewCity");
    if(newCity){
      this.setData({
        newCity:newCity
      });
      wx.setStorage({
        key:"addressNewCity",
        data:null
      });
    }
    else{
      this.setData({
        newCity:null
      });
    }
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  chooseImage:function(){
    var that = this;
    wx.chooseImage({
      count:1,
      success:function(res){
        console.log(res);
        var userInfo = that.data.userInfo;
        userInfo.headimg = res.tempFilePaths[0];
        that.setData({
          userInfo:userInfo,
          newHeader:res.tempFilePaths[0]
        });
      },
      fail:function(res){
        that.setData({
          toastHidden:false
        });
      }
    });
  },
  toastChange:function(){
    var that = this;
    that.setData({
      toastHidden:true
    });
  },
  changeNick:function(e){
    var value = e.detail.value;
    this.setData({newNick:value});
  },
  changeAge:function(e){
    var value = e.detail.value;
    if(value<0||value>100){
      this.setData({newAge:0});
      this.setData({modelContent:"true"});
    }
    else{
      this.setData({newAge:value});
    }
  },
  modalConfirm:function(){
    this.setData({modalHidden:true});
  },
  savePersonInfo:function(){
    var that = this;
    var data = {};
    data["token"] = app.globalData.userInfo.token;
    if(that.data.newCity){
      data["city"] = that.data.newCity;
    }
    if(that.data.newNick){
      data["nickname"] = that.data.newNick;
    }
    if(that.data.newAge){
      data["age"] = that.data.newAge;
    }
    console.log(data);
    if(that.data.newHeader){//修改了头像  
      wx.uploadFile({
        url: app.globalData.url.api.savePersonInfo,
        filePath: that.data.newHeader,
        name: 'headimg',
        formData:data,
        success: function(res) {
          console.log("uploadFile");
          console.log(res);
          if(res.data){
            var r = JSON.parse(res.data);
            if(r.errcode==0){
              var token = app.globalData.userInfo.token;
              app.clearUserInfo();
              app.globalData.userInfo.token=token;
              wx.navigateBack();
            }
            else{
              that.setData({
                toastHidden:false
              });
            }
          }
          else{
            that.setData({
              toastHidden:false
            });
          }
        }
      });
    }
    else{//没有修改头像
      wx.request({
        url:app.globalData.url.api.savePersonInfo,
        data: data, 
        success: function(res) {
          console.log("request");
          console.log(res.data);
          if(res.data.errcode==0){
            var token = app.globalData.userInfo.token;
            app.clearUserInfo();
            app.globalData.userInfo.token=token;
            wx.navigateBack();
          }
          else{
            that.setData({
              toastHidden:true
            });
          }
        }
      });
    }
    
  }
});