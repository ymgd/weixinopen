
var page = {
  data:{
    src : "../../res/flash.png",
    animationData : {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
      // 页面渲染完成
      var that = this,duration = 1500;
      var animation = wx.createAnimation({
          duration: duration,
      });

      //step() 方法表示一组动画的结束
      animation.scale(2).rotate(360).step();
      animation.scale(1).step();
  
      this.setData({
          animationData : animation.export()
      });

      var timestamp = new Date().getTime();
      setTimeout(function(){
        wx.redirectTo({
          url: '../index/index?time='+timestamp
        })
      },duration*2.5);

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
};

Page(page);