Page({
  data:{
    picture:"../../../images/1.jpg"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var that = this;
    // 页面显示
   setTimeout(function(){
    wx.redirectTo({
      url: '../ad/ad'
    })
   },3000)
     
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})