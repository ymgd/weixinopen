
var WxEmoji = require('../../WxEmojiView/WxEmojiView.js');
//index.js
//获取应用实例
var temTextArea;
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    testText:"00:01:02:03"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
    var that = this
    WxEmoji.bindThis(this);
    
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
  },
  WxEmojiTextareaFocus:function(e) {
    var that = this;
    WxEmoji.WxEmojiTextareaFocus(that,e);
    
  },
  WxEmojiTextareaBlur:function(e){
    var that = this;
    WxEmoji.WxEmojiTextareaBlur(that,e);
  },
  wxPreEmojiTap: function(e){
    var that = this;
    WxEmoji.wxPreEmojiTap(that,e);
  },
  testBlur: function(e){
    var temObjs = {};
    var that = this;
    temObjs.showWxEmojiChooseView = 1;
    temObjs.textAreaText = e.detail.value;
    
    that.setData({
      WxEmojiObjs:temObjs
    });
  }
})
