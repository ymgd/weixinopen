//s_list_tasks.js
//获取应用实例
var app = getApp()
Page({
  data: {
    tasks: [
      {
      time: "2016-10-01 08:00:00",
      details: "背诵课文《观沧海》"
    }, {
      time: "2016-10-01 08:00:00",
      details: "背诵课文《闻王昌龄左迁龙标遥有此寄》"
    }, {
      time: "2016-10-01 08:00:00",
      details: "背诵课文《次北固山下》"
    }, {
      time: "2016-10-01 08:00:00",
      details: "背诵课文《天净沙 秋思》"
    }
    ]
 },
  //事件处理函数
  answer: function() {
    wx.navigateTo({
      url: '../s_answer/s_answer'
    })
  },

  onLoad: function () {
  }

})
