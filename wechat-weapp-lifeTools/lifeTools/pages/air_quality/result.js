Page({
  data:{
  	//主要污染物有可能没有,默认值无
    core:"无"
  },
  onLoad:function(options){
    console.log("result");
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    this.setData(options);

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
  }
})