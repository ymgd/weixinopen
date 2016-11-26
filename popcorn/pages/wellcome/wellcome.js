//wellcome.js
//获取应用实例
var app = getApp()
var strbody = '感谢使用爆米花\n看看有哪些好剧值得您抱着爆米花来消磨时间。。。';

Page({
  data:{
    // text:"这是一个页面"
    bodytext:strbody
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
  enter:function(){
    wx.redirectTo({
      url: '../home/home'
    })
  }
})