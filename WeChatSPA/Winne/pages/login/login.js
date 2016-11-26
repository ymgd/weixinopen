//login.js

var app = getApp()

Page({
  data:{
    // text:"这是一个页面"
    toast:true,
    remind:""
  },
  onLoad:function(){
    // 页面初始化 options为页面跳转所带来的参数
    if(app.globalData.userInfo != null){
      wx.redirectTo({
        url: '../index/index'
      })
    }
  },
  onUnload:function(){
    // 页面关闭
    this.setData({
        username:"",
        password:""
    })
  },
  onSubmit:function(e){
     // console.log(e.detail.value)
     var that=this
     wx.request({
         url:"https://romeo.wang/login.php",
         data:e.detail.value,
         success:function(res){
            if(res.data.errcode == 0){
                res.data.login = 1
                app.globalData.userInfo=res.data
                wx.redirectTo({
                    url:'../index/index'
                })
            }else{
                //console.log(res.data)
                that.setData({
                    remind:res.data.errmsg
                })
            }
         },
         fail:function(){
             this.setData({
                 remind:'登陆失败，请重试1'
             })
         }
     })
  },
  onToast:function(){
      this.setData({
          toast:true
      })
  },
  wxLogin:function(){
    //调用登录接口
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            res.userInfo.login = 0
            app.globalData.userInfo=res.userInfo
            console.log(app.globalData.userInfo)
            wx.redirectTo({
                url:'../index/index'
            })
          }
        })
      }
    })
  }
})