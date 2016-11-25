import MensInfoMgr from '../../utils/mensInfoMgr.js';
var mensInfoMgr = MensInfoMgr.getInstance();

Page({
  data: {
      daysRange: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
      selectedIndex: -1,
      selectedValue: -1
  },

  onLoad: function(options) {
    var that = this;
    mensInfoMgr.loadData(
        function(info) {
            that.setData({
              selectedValue: info.cycle
            });
        },
        function() {
            that.setData({
              selectedIndex: -1,
              selectedValue: -1
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
           selectedIndex: parseInt(e.detail.value),         
           selectedValue: this.data.daysRange[e.detail.value]
       });
       mensInfoMgr.cycle = this.data.selectedValue;
       mensInfoMgr.saveData();
  }
})