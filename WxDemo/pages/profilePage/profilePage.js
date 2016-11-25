var app = getApp();
import MensInfoMgr from '../../utils/mensInfoMgr.js';
var mensInfoMgr = MensInfoMgr.getInstance();

Page({
  data: {
    mensInfo: {}
  },
  onLoad: function(options) {
    var that = this;
    mensInfoMgr.loadData(
        function(info) {
            that.setData({
                mensInfo: info
            });
        },
        function() {
            console.log("***************");
        }
    );
  },
  onReady: function() {
    // Do something when page ready.
  },
  onShow: function() {
    this.setData({
      mensInfo: mensInfoMgr  
    });
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
  // Event handler.
  // 上次月经日期
  onTouchLastMenstruationCell: function() {
    wx.navigateTo({url: "../settingLastDayPage/settingLastDayPage"});
  },

  // 经期长度
  onTouchMenstruationDaysCell: function() {
      wx.navigateTo({url: "../settingNumberOfDays/settingNumberOfDays"});
  },

  // 周期长度 两次月经开始日期间隔天数
  onTouchMenstruationCycleCell: function() {
      wx.navigateTo({url: "../settingMensCycle/settingMensCycle"});
  }
})