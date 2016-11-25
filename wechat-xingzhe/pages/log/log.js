Page({
  data: {
    waypoints: [],
    wp: []
  },
  onLoad: function() {
    // 页面加载（一个页面只会调用一次）
    console.log("onLoad");
  },

  onShow: function() {
    // 页面显示（每次打开页面都会调用一次）
    let _this = this;

    wx.getStorage({
      key: 'waypoints',
      success: function(res) {
          console.log(res.data);
          _this.setData({
            waypoints: res.data
          })
      } 
    })

     wx.getStorage({
      key: 'wp',
      success: function(res) {
          console.log(res.data);
          _this.setData({
            wp: res.data
          })
      } 
    })

  },


});





