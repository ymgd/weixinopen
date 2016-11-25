var app = getApp();
var util = require('../../utils/util.js')
Page({
  data:{
   username:"",
   password:"",
   errorMsg:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
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
/**
 * 验证用户名 和 密码 测试
 */
  validateUser:function(userMsg){
    var username = userMsg.username,
        password = userMsg.password,
        errorMsg = "",
        flag = false;
    if(util.isEmptyValue(username) || util.isEmptyValue(password)){
        errorMsg = "用户名和密码不能为空";
        flag = false;
    }else{
        errorMsg = "";
        flag = true;
    }
    this.setData({errorMsg:errorMsg})
    return flag;
  },
  /**
   * 获取用户名值
   */
  getUserName:function(event){
    var username = event.detail.value;
    this.setData({username:username});
  },
 /**
   * 获取密码值
   */
  getPassword:function(event){
    var password = event.detail.value;
    this.setData({password:password});
  },
 /**
   * 点击登录，跳转用户中心
   */
  login:function(event){
    var userInfor  = {
      username:this.data.username,
      password:this.data.password
    };

    var flag = this.validateUser(userInfor);
    if(flag){
      app.globalData.userInfo = {
        username:this.data.username,
        password:this.data.password
      }
      wx.redirectTo({
        url: '../user/user'
      })
    }
    

  }

})