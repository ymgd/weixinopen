var utils = require('../../utils/utils.js');
import MensInfoMgr from '../../utils/mensInfoMgr.js';
var mensInfoMgr = MensInfoMgr.getInstance();

Page({
  data: {
      startDate: "0",
      endDate: "0",
      defaultDate: "0",
      localLastMensDate: null
  },
  onLoad: function(options) {
    var that = this;
    mensInfoMgr.loadData(
        function(info) {
            var today = new Date();
            var startDate = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
            var endDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

            that.setData({
              startDate: utils.formatDate(startDate),
              endDate: utils.formatDate(endDate),
              localLastMensDate: info.lastDate ? info.lastDate : utils.formatDate(today)
            });
        },
        function() {
            var today = new Date();
            var startDate = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
            var endDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

            that.setData({
              startDate: utils.formatDate(startDate),
              endDate: utils.formatDate(endDate),
              localLastMensDate: null
            });
        }
    );
  },
  onReady: function() {
    // Do something when page ready.
  },
  onShow: function() {
    // Do something when page show.
    // wx.setNavigationBarTitle = "第1页";
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    // Do something when pull down
  },
  onDateChange: function(e) {
       this.setData({
           localLastMensDate: e.detail.value
       });
       mensInfoMgr.lastDate = e.detail.value;
       mensInfoMgr.saveData();
  }
})