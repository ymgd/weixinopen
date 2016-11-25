//获取应用实例
var app = getApp()
var textCount = '加载了了0次'
Page({
  data:{
    count:0,
    text: textCount,
    loadingstatus: false,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log("onLoad");
    
  },
  onReady:function(){
    // 页面渲染完成
    console.log("onReady");
  },
  onShow:function(){
    // 页面显示
    console.log("onShow");
  },
  onHide:function(){
    // 页面隐藏
    console.log("onHide");
  },
  onUnload:function(){
    // 页面关闭
    console.log("onUnload");
  },
  button1click: function(){
   var that = this;
   that.data.count++;
   that.setData({
       text:'加载了'+that.data.count+'次',
       loadingstatus:that.data.count%2 == 0 ? true:false,
   })
  },
})