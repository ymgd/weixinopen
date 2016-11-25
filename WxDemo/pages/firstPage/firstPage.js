Page({
  data: {
    photoList: []
  },
  onLoad: function(options) {
    // Do some initialize when page load.
  },
  onReady: function() {
    // Do something when page ready.
  },
  onShow: function() {
    // wx.navigateTo({
    //   url: '../profilePage/profilePage',
    //   success: function(res){
    //     // success
    //   },
    //   fail: function() {
    //     // fail
    //   },
    //   complete: function() {
    //     // complete
    //   }
    // })
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
  refreshListPage: function(filePathList) {
    var windowWidth = getApp().globalData.systemInfo.windowWidth;
    var itemCountEachRow = 4;
	  var margin = 2;
    var itemSize = (windowWidth - itemCountEachRow * 2 * margin) / itemCountEachRow;
    this.setData({
	    photoList: filePathList,
    	itemSize: itemSize,
      margin: margin
    });

    getApp().globalData.selectedLocalPhotos = filePathList;
  },
  // Event handler.
  onAddLocalPhoto: function() {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        that.refreshListPage(res.tempFilePaths);
      },
      fail: function() {
        console.log('chooseImage fail');
      }
    });
  },
  onTapImage: function(e) {
    console.log(e.target);
    var index = e.target.dataset.index;
    wx.navigateTo({
      url: "../imageDetailPage/imageDetailPage?index=" + index
    });
  }
})