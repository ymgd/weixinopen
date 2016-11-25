//index.js
var roles = require("../../js/roles.js");
var configs = require("../../js/configs.js");
//获取应用实例
var app = getApp();
Page({
  data: {
    logo: "../../images/werewolf.jpg",
    title: "狼人杀",
    array: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    index: 0,
    config: configs[8]
  },
  onLoad: function () {
    app.globalData.gameNumber = 8,
    app.globalData.gameConfig = configs[8]
  },
  gameNumberChange: function (e) {
    var index = e.detail.value;
    var array = this.data.array;
    this.setData({
      index: index,
      config: configs[array[index]]
    });
  },
  startGame: function(e) {
    var index = this.data.index;
    var array = this.data.array;
    var number = array[index];
    var config = this.data.config;
    app.globalData.gameNumber = number;
    app.globalData.gameConfig = config;
    wx.navigateTo({
      url: "../chooseRole/chooseRole"
    });
  }
})