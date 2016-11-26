Page({
  data:{
    text:"Page photoDetail"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    console.log("从上一个页面传过的参数--"+options.id);
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
    console.log("页面被销毁");
  }
})