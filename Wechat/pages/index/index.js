//index.js
var countdown = require("./countdown.js");
Page({
  data: {},
  onReady:function(e){
    var context = wx.createContext()
      , loopTime = 60;
    countdown.init(loopTime,context);
  }
})
