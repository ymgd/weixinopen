"use strict";

var Promise = global.Promise;
var regeneratorRuntime = global.regeneratorRuntime;
var co = global.co;

//logs.js
var util = require('../../utils/util.js');
Page({
  data: {
    logs: []
  },
  onLoad: function onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log));
      })
    });
  }
});