Page({
  data: {
    // text:"这是一个页面"
    array: [],
    hide: false,
    latitude: '',
    longitude: '',
    speed: '',
    accuracy: '',
    networkType: '',
    model: '',
    pixelRatio: '',
    windowWidth: '',
    windowHeight: '',
    language: '',
    version: '',
    //数据缓存 保存数据变量
    texta: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '当前页面'
    })
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../user/user'
    })
  },
  downloadFile: function () {
    // wx.downloadFile({
    //   url: 'http://m2.quanjing.com/2m/alamyrf005/b1fw89.jpg', //仅为示例，并非真实的资源
    //   success: function(res) {
    //     console.log(res)
    //     wx.saveFile({
    //       tempFilePath: res.tempFilePath,
    //       success: function(res) {
    //         console.log(res)
    //       }
    //     })
    //   }
    // })
  },
  listenerButtonupolFile: function () {
    var that = this;
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          array: tempFilePaths,
          hide: true,
        })
        // wx.previewImage({
        //     urls: tempFilePaths // 需要预览的图片http链接列表
        // })
      }
    })
  },
  previewImage: function () {
    wx.previewImage({
      urls: this.data['array'] // 需要预览的图片http链接列表
    })
  },
  previewmap: function () {
    //  wx.getLocation({
    //   type: 'wgs84',
    //   success: function(res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     var speed = res.speed
    //     var accuracy = res.accuracy
    //     that.setData({
    //       latitude:latitude,
    //       longitude:longitude,
    //       speed:speed,
    //       accuracy:accuracy
    //     })
    //   }
    // })
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  },
  getNetworkType: function () {
    var that = this;
    wx.getNetworkType({
      success: function (res) {
        that.setData({
          networkType: res.networkType
        })
      }
    })
  },
  getSystemInfo: function () {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          model: res.model,
          pixelRatio: res.pixelRatio,
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          language: res.language,
          version: res.version,
        })
      }
    })
  },
  makePhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '10086' //仅为示例，并非真实的电话号码
    })
  },
  setStoragebindinput: function (e) {
    this.setData({
      texta: e.detail.value
    })
  },
  setStorage: function (e) {
    var that = this;
    console.log(this.data.texta)
    wx.setStorage({
      key: "key",
      data: that.data.texta
    })
    setTimeout(function () {
      wx.getStorage({
        key: 'key',
        success: function (res) {
          console.log(res.data)
        }
      })
    },1000)
  },
  onReachBottom: function() {
    wx.showToast({
  title: '成功',
  icon: 'success',
  duration: 2000
})
    // Do something when page reach bottom.
  }
})
