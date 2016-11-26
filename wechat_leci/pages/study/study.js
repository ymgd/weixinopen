//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
      yijinxing:"99",
      shengyu:"220",
      modalday:"99",
      modalHidden2:""
  },

  onLoad: function (e) {
    // console.log('onLoad')
    // wx.navigateTo({
    //     url: "../welcom/welcom"
    // })
    // var context=wx.createContext();
   //  context.setStrokeStyle("#25d416");
   //  context.setLineWidth(3);
   //  context.arc(100, 100, 60, 0.8* Math.PI, 1.4* Math.PI, false)
   //  // context.rect(0, 0, 200, 200);
   //  context.stroke();
   //  wx.drawCanvas({
   //   canvasId: 'dayscanvas',
   //   actions: context.getActions() //获取绘图动作数组
   // })
var that = this
setTimeout(function() {
    that.setData({
        modalHidden2:"true"
    });
}, 1000);


 }
})
