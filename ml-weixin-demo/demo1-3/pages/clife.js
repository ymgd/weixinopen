
Page({
  data:{
    // text:"这是一个页面"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){

    //// 一、canvas绘图制作  ////
    //使用wx.createContext获取绘图上下文context
    var context = wx.createContext();
    //canvas绘制函数
    strokeContext(context);
   
    console.log(context);

    //调用wx.drawCanvas，通过canvasId指定在哪张画布上绘制，通过actions指定绘制行为
    wx.drawCanvas({
      canvasId: 'scoreCanvas',
      actions: context.getActions() //获取绘图动作数组
    })
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
});

// 首页canvas绘制
function strokeContext(context){//这里没有对仪表盘组件没有进行封装，canvas中的居中有问题
  // 最外层圆弧
    context.beginPath()
    context.setStrokeStyle("#ffffff");
    context.setLineWidth(4)
    // contextcontext.arc(地点x、y坐标，半径，开始角度，结束角度，)
    context.arc(150,150,110,0.9*Math.PI,1.2*Math.PI);
    context.stroke();

  // 内层圆弧
    context.beginPath()
    context.setStrokeStyle("#ffffff");// 颜色只能是6个字母
    context.setLineWidth(12)
    context.arc(150,150,90,0.9*Math.PI,1.2*Math.PI);
    context.stroke();

  // 绘制填充文字
    context.setFontSize(20)
    context.setFillStyle("#ffffff");
    context.beginPath()
    // context.fillText('字符串',x,y为绘制文字的横、纵坐标，maxwidth是显示文字的最大宽度－可选参数)
    // context.strokeText('字符串',x,y为绘制文字的横、纵坐标，maxwidth是显示文字的最大宽度－可选参数)
    context.fillText("信用极好", 112, 180)
    context.stroke()

  // 绘制填充文字
    context.setFontSize(50)
    context.setFillStyle("#ffffff");
    context.beginPath()
    context.fillText("90", 125, 140)
    context.stroke()

  // 绘制填充圆点
    context.beginPath();
    context.setLineWidth(2);
    context.setFillStyle("#f334fe");
    // 控制degree的值，改变圆点的位置
    var degree= 40;
    var x = 150 - Math.cos(degree*Math.PI/180) * 110;
    var y = 150 - Math.sin(degree*Math.PI/180) * 110;
    context.arc(x,y,6,0,2*Math.PI);
    context.fill();
    context.stroke();
}