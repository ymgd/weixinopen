//index.js
var storyboard = require("../../engine/storyboard.js");
var history = require("../../engine/history.js");
var util = require("../../utils/util.js");
var player = require("../../js/player.js");
var eventbus = require("../../js/EventBus.js");

//获取应用实例
var app = getApp()
Page({
  data: {
    sun: "../../images/sun.png",
    moon: "../../images/moon.png",
    sunLogo: "../../images/sun-logo.png",
    moonLogo: "../../images/moon-logo.png",
    clawmark: "../../images/clawmark.png",
    isDay: true,
    animationData: {},
    storyboard: {},
    viewShown: "",
    touchingTime: "day",
    historyEvents: [],
    players: player.players,
    playerStubs: [],
    currentPlayerIndex: 4,
    currentPlayerAnimationData: {},
    biggerAnimationData: {},
    originAnimationData: {},
    boardAnimationData: {},
    clawAnimationData: {},
    markingPlayerIndex: -1,
    markedPlayerIndex: -1
  },
  angle: 0,
  intervalId: -1,
  timeoutId: -1,
  scaleToBigger: true,
  windowWidth: 0,
  pxRatio: 1,
  locationX: 0,
  locationY: 0,
  players: [],
  isSocketOpen: false,
  touchHistory: function (e) {
    if (this.timeoutId != -1) {
      clearTimeout(this.timeoutId);
    }
    var index = e.target.dataset.historyIndex;
    var historyItem = this.data.storyboard.history[index];
    this.setData({
      viewShown: "view-shown",
      touchingTime: historyItem.time,
      historyEvents: historyItem.events
    });
  },
  touchHistoryEnd: function (e) {
    var that = this;
    this.timeoutId = setTimeout(function () {
      that.setData({
        viewShown: ""
      });
    }, 1000);
  },
  onLoad: function () {
    var playerStubs = [];
    var stubNumber = 4 - player.players.length % 4;
    for (var i = 0; i < stubNumber; i++) {
      playerStubs.push(i);
    }
    storyboard.history = storyboard.history.reverse();
    this.setData({
      storyboard: storyboard,
      playerStubs: playerStubs
    });
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        this.windowWidth = windowWidth;
        var windowHeight = res.windowHeight;
        this.windowHeight = windowHeight;
        this.pxRatio = 750 / windowWidth;
      }.bind(this)
    })
    eventbus.addEventListener("roomLocationUpdate", function (event, data) {
      this.players = data.players;
      this.updateCanvas();
    }, this);
    eventbus.addEventListener("roomPlayerMarked", function(event, data) {
      this.setData({
        markedPlayerIndex: data.markedPlayerIndex
      });
      this.setMarked();
    }, this);
    this.players.push({ name: app.globalData.name });
  },
  setMarked: function() {
      var clawAnimation = wx.createAnimation({
        duration: 2000,
        timingFunction: 'ease'
      });
      clawAnimation.translate(-80 / this.pxRatio, 160 / this.pxRatio).step();
      this.setData({
        clawAnimationData: clawAnimation.export()
      });
  },
  updateCanvas: function () {
    var context = wx.createContext();
    for (var i = 0; i < this.players.length; i++) {
      var player = this.players[i];
      var x, y;
      if (player.name == app.globalData.name) {
        x = this.locationX;
        y = this.locationY;
      } else {
        var ratio = this.windowWidth / player.w;
        x = player.x * ratio;
        y = player.y * ratio;
      }
      context.setFillStyle("#ff0000");
      context.drawImage("../../images/paw.png", x - 15, y - 15, 30, 30);
      context.fillText(player.name, x - 15, y - 15);
    }
    wx.drawCanvas({
      canvasId: "wolf-ground",
      actions: context.getActions()
    });
  },
  onShow: function () {
    // var that = this;
    // this.intervalId = setInterval(function() {
    //   that.timeAfterTime();
    // }, 2000);
    var biggerAnimation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease"
    });
    biggerAnimation.scale(1.4, 1.4).step();
    this.data.biggerAnimationData = biggerAnimation.export();

    var originAnimation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease"
    });
    originAnimation.scale(1, 1).step();
    this.data.originAnimationData = originAnimation.export();
    // setInterval(function() {
    //   var currentPlayerIndex = this.data.currentPlayerIndex;
    //   this.setData({
    //     currentPlayerIndex : (currentPlayerIndex < this.data.players.length - 1 ? currentPlayerIndex + 1 : 0)
    //   });
    // }.bind(this), 4000);
    // setInterval(function () {
    //   if (this.scaleToBigger) {
    //     this.setData({
    //       currentPlayerAnimationData: this.data.biggerAnimationData
    //     });
    //   } else {
    //     this.setData({
    //       currentPlayerAnimationData: this.data.originAnimationData
    //     });
    //   }
    //   this.scaleToBigger = !this.scaleToBigger;
    // }.bind(this), 1000);
  },
  onHide: function () {
    clearInterval(this.intervalId);
  },
  timeAfterTime: function () {
    this.angle = this.angle + 180;
    if (this.data.isDay) {
      var animation = wx.createAnimation({
        duration: 2000,
        timingFunction: 'ease'
      });
      animation.rotate(this.angle).step();
      var boardAnimation = wx.createAnimation({
        duration: 2000,
        timingFunction: "ease"
      });
      boardAnimation.backgroundColor("#808080").step();
      this.setData({
        animationData: animation.export(),
        boardAnimationData: boardAnimation.export(),
        isDay: !this.data.isDay
      });
    } else {
      var animation = wx.createAnimation({
        duration: 2000,
        timingFunction: 'ease'
      });
      var boardAnimation = wx.createAnimation({
        duration: 2000,
        timingFunction: "ease"
      });
      boardAnimation.backgroundColor("#ffffff").step();
      animation.rotate(this.angle).step();
      this.setData({
        animationData: animation.export(),
        boardAnimationData: boardAnimation.export(),
        isDay: !this.data.isDay
      });
    }
  },
  canvastouchstart: function (e) {
    e.touches.forEach(function (item) {
      this.updateLocation(item);
    }.bind(this));
  },
  canvastouchend: function (e) {
    e.touches.forEach(function (item) {
      this.updateLocation(item);
    }.bind(this));
  },
  canvastouchmove: function (e) {
    e.touches.forEach(function (item) {
      this.updateLocation(item);
    }.bind(this));
  },
  updateLocation: function (touch) {
    var x = touch.clientX;
    var y = touch.clientY - 160 / this.pxRatio;
    var context = wx.createContext();
    this.locationX = x;
    this.locationY = y;
    this.updateCanvas();

    var columnWidth = this.windowWidth / 4;
    var column = Math.floor(x / columnWidth);
    var hSpace = 68 / 2 / this.pxRatio;
    var hCenter = column * columnWidth + columnWidth / 2;
    column = column > 3 ? 3 : column;
    var canvasY = y - (80 / this.pxRatio);
    var playerHeightInCanvas = 160 / this.pxRatio;
    var row = Math.floor(canvasY / playerHeightInCanvas);
    var topSpace = 68 / 2 / this.pxRatio;
    var bottomSpace = topSpace * 1.5; //命中文字的范围适当放宽一点
    var center = row * playerHeightInCanvas + playerHeightInCanvas / 2;

    var markingPlayerIndex = row * 4 + column;
    // TODO 测试的时候不做markingPlayerIndex和players长度的检查
    if (true || markingPlayerIndex < this.players.length) {
      if (center - topSpace <= canvasY && canvasY <= center + bottomSpace &&
        hCenter - hSpace <= x && x <= hCenter + hSpace) {
        this.setData({
          markingPlayerIndex: row * 4 + column
        });
      } else {
        this.setData({
          markingPlayerIndex: -1
        });
      }
    } else {
      markingPlayerIndex = -1;
    }


    var location = {
      x: x,
      y: y,
      w: this.windowWidth,
      h: this.windowHeight,
      column: column,
      row: row,
      index: markingPlayerIndex
    };
    eventbus.dispatch("locationUpdate", this, location);
  }
})
