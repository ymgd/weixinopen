//index.js
//获取应用实例
var app = getApp()
var tools=require('tools.js')
Page({
  data: {
    sd:'0',
    num1:0,
    action:0,
    sign:''
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '计算器'
    })
  },
  //事件处理函数
  btn1: function() {
   tools.setNum(this,'1')
  },
  btn2: function() {
    tools.setNum(this,'2')
  },
  btn3: function() {
    tools.setNum(this,'3')
  },
  btn4: function() {
    tools.setNum(this,'4')
  },
  btn5: function() {
    tools.setNum(this,'5')
  },
  btn6: function() {
    tools.setNum(this,'6')
  },
  btn7: function() {
    tools.setNum(this,'7')
  },
  btn8: function() {
    tools.setNum(this,'8')
  },
  btn9: function() {
    tools.setNum(this,'9')
  },
  btn0: function() {
    tools.setNum(this,'0')
  },
  btn_point: function() {
    tools.setPoint(this)
  },
  btn_plus: function() {
    tools.plus(this)
  },
  btn_minus: function() {
    tools.minus(this)
  },
  btn_times: function() {
    tools.times(this)
  },
  btn_divide: function() {
    tools.divide(this)
  },
  btn_equal: function() {
    tools.equal(this)
  },
   btn_back: function() {
    tools.back(this)
  },

  btn_clean: function() {
    tools.clean(this)
  }
  
  
})
