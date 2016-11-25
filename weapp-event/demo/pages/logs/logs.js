//logs.js
var util = require('../../utils/util.js')
var event = require('../../utils/event.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  },
  onBtnPress: function() {
    event.emit('DataChanged', 'Log-Page-Btn-Press');
    wx.navigateBack();
  }
})