var eventbus = require("js/EventBus.js");

//app.js
App({
  onLaunch: function () {
    this.initSocket();
    eventbus.addEventListener("locationUpdate", function (event, location) {
      var message = {
        type: "update",
        name: this.globalData.name,
        room: this.globalData.room,
        x: location.x,
        y: location.y,
        w: location.w,
        h: location.h,
        column: location.column,
        row: location.row,
        index: location.index
      };
      if (this.isSocketOpen) {
        wx.sendSocketMessage({
          data: JSON.stringify(message)
        });
      }
    }, this);
  },
  globalData: {
    gameNumber: 8,
    gameConfig: {},
    name: "曾我部",
    room: 1,
  },
  initSocket: function () {
    wx.connectSocket({
      url: "ws://localhost:8080"
    });
    wx.onSocketOpen(function (res) {
      var initPlayer = {
        type: "init",
        room: this.globalData.room,
        name: this.globalData.name
      };
      wx.sendSocketMessage({
        data: JSON.stringify(initPlayer)
      });
      this.isSocketOpen = true;
    }.bind(this));
    wx.onSocketMessage(function (res) {
      var data = JSON.parse(res.data);
      var type = data.type;
      eventbus.dispatch(type, this, data);
    }.bind(this));
    wx.onSocketError(function (res) {
      this.isSocketOpen = false;
    }.bind(this));
    wx.onSocketClose(function (res) {
      this.isSocketOpen = false;
    }.bind(this));
  }
})