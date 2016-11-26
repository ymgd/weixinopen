Page({
  data:{
    text:"借款人",
    info : {},
    opacityFlag : false,
    animationData : {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var data = JSON.parse(options.data);
    this.setData({
      info : data
    });
  },
  onReady:function(){
    // 页面渲染完成
    var rate = this.data.info.interestrate;
    console.log(rate);

    var ctx = wx.createContext();
    this.drawCircle(ctx , 'rate' , rate/100);
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
    console.log('hide')
  },
  onUnload:function(){
    // 页面关闭
    console.log('unload')
  },

  //关闭投标页面.
  onTenderCloseClick : function(){
    this.setData({
      opacityFlag : false 
    });

    var animation = wx.createAnimation({
      duration:400,
      timingFunction:"ease",
    })

    //this.animation = animation

    animation.translateY('100%').step();

    this.setData({
      animationData:animation.export()
    })
  },

  onCancelTap : function(){
    this.onTenderCloseClick();
  },

  //返回
  onBackClick : function(){
    // wx.navigateTo({
    //   url : '../investment/investment'
    // });
    wx.navigateBack();
  },

  //点击投标跳转到投标页面
  onTenderClick : function(){
    this.setData({
      opacityFlag : true 
    });


    var animation = wx.createAnimation({
      duration:400,
      timingFunction:"ease",
    })

    //this.animation = animation

    animation.translateY('-70%').step();

    this.setData({
      animationData:animation.export()
    })
  },



  //画圆
  drawCircle : function(ctx , canvasId , radian){

    //先用用#cba064颜色画一部分
    ctx.beginPath();
    ctx.setFillStyle("#cba064");
    ctx.setStrokeStyle('#cba064') ;
    var start = Math.PI * 0.5 ; 
    var end = Math.PI * 2 * radian ;
    ctx.arc(30 , 30 , 26 , start , end);
    ctx.setLineWidth(2);
    ctx.fillText(radian * 100 , 10, 35);
    ctx.fillText("%" , 35 , 35);
    
    ctx.stroke();

    //再用用#eeeeee画另外一部分
    ctx.beginPath();
    ctx.setStrokeStyle('#eeeeee');
    ctx.arc(30 , 30 , 26 , start + end , Math.PI * 2 * (1-radian) );
    
    ctx.stroke();

    //动作实装到画板
    
    wx.drawCanvas({
      canvasId: canvasId,
      actions: ctx.getActions()
    })

    
  }
})