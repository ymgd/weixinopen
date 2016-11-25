Page({
  data:{
      animationData:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 1000,
        timingFunction: "ease",
        delay: 0
    })
    this.animation = animation
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
 
  rotate:function(){
    
    this.animation.rotate(45).step()
     this.setData({
      animationData: this.animation.export()
    })
  },
   scale:function(){
    this.animation.scale(2,2).step()
     this.setData({
      animationData: this.animation.export()
    })
  },
  translate:function(){
    this.animation.translate(100, 0)
    .step({ duration: 3000 })
     this.setData({
      animationData: this.animation.export()
    })
  },
  skew:function(){
    this.animation.skew(30, 10)
    .step({ duration: 500 })
     this.setData({
      animationData: this.animation.export()
    })
  },
  all:function(){
    this.animation.rotate(45).scale(2, 2)
    .translate(100, 0).skew(30, 10)
    .step({ duration: 1000 })
    this.setData({
      animationData: this.animation.export()
    })
  }
  ,
  reset:function(){
    this.animation.rotate(0).scale(1)
    .translate(0).skew(0).step({ duration: 1000 })
    this.setData({
      animationData: this.animation.export()
    
    })
  }
  
})