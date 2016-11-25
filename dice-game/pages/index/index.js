//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '',
    userInfo: {}
  },
  //进入游戏
  goGame: function() {
    wx.navigateTo({
      url: '../game/game'
    })
  },
  //进入排行榜
  goToRank: function() {
    wx.navigateTo({
      url: '../rank/rank'
    })
  },
  //处理emoji表情
  killEmoji: function(text) {
    return text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
  },
  //登陆
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      userInfo.nickName = that.killEmoji(userInfo.nickName);
      if(!userInfo.nickName) {
        userInfo.nickName = 'Emoji';
      }
      wx.setStorageSync('userInfo', {name: userInfo.nickName, score: 10000})
      //更新数据
      that.setData({
        userInfo:userInfo,
        motto: '欢迎您，' + userInfo.nickName
      })
    })
  }
})
