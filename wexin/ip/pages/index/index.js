//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    userInfo: {},
    ip:null,
    ipInfo:null,
  },


  // 获取获取输入框的值，并命名为ip
  input : function(e){
    // console.log(e)
    this.setData({ip:e.detail.value})
  },

  // 点击按钮请求API获取数据，并把数据赋值到paga.data,传到前端渲染
  btnClick : function(){
    console.log(this.data.ip)
    var that = this;
    //app.getIpInfo(this.data.ip,function(data){      // 调用app.js中定义的对象(回调)函数
    util.getIpInfo(this.data.ip,function(data){       // 调用util中定义的回调函数
        console.log(data)
        that.setData({ipInfo:data.data})  
    }); 
  },
 
 
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
