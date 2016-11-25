Page({
  data: {
    photoList: [],
    showIndex: 0,
  },
  onLoad: function(options) {
    // Do some initialize when page load.
    var selectedPhotoList = getApp().globalData.selectedLocalPhotos;
    this.setData({
      showIndex: options.index,
      selectedPhotos: selectedPhotoList
    });
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
  onImageLoad: function(event) {
    var obj = event.detail;
    console.log(obj);
  }
})