//down.js
var util = require('../../utils/util.js')
Page({
  data: {
    navTab: ["降价", "活动", "车有惠","我的报名","",""],
    currentNavtab: "0"
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    //this.refresh();
  },
  switchTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  }
});
