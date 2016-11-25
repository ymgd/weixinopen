
var WxEmoji = require('../../WxEmojiView/WxEmojiView.js');
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    WxEmojiData: "hello test! :00: :01: :02: _03_ /04 🍉"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
    var that = this
    WxEmoji.buildTextObjs(that,that.data.WxEmojiData);
  }
})
