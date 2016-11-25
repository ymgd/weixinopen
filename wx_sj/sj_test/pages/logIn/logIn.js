var MD5 = require('../md5/md5.js')
var app = getApp()

Page({
  data: {
    focus: false,
    passwordType: true,
    passwordImgUrl: '../../images/登录密码关.png',
    tokenID: '',
  },

  // 修改密码显示方式
  passwordChange: function(){
    var that = this
    if(that.data.passwordType){
      that.setData({
        passwordImgUrl: '../../images/登录密码开.png'
      })
    }
    else{
      that.setData({
        passwordImgUrl: '../../images/登录密码关.png'
      })
    }
    that.setData({
    passwordType:!(that.data.passwordType),
  })
  },

  //登录
  formSubmit: function(e) {
    var that = this
    var requestInfo = {}
    requestInfo['tel'] = e.detail.value.user//获取登录手机号
    requestInfo['password'] = MD5(e.detail.value.password)//获取md5后的登录密码
    app.logIn(
      function(tokenID){
        that.setData({
        tokenID: tokenID
      })
      //更新app全局变量tokenID
      app.updateTokenID(tokenID)
      //将tokenID添加到微信缓存中(同步)
      console.log('4545')
      try {
       wx.setStorageSync('tokenID', tokenID)
      } 
      catch (e) {    
        }
      //登录成功后，跳转到我的默认界面
      wx.redirectTo({
      url: '../userInfo/userInfo?tokenID=' + tokenID
    })
      },
      requestInfo
    )
  },
})