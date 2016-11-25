//获取应用实例
var app = getApp()
Page({
  data: {
    opacity:0.3,
    splash: {},
    screenHeight: 0,
    screenWidth: 0
  },
 
  onLoad: function () {
    var _this = this;
    wx.getSystemInfo( {
      success: function( res ) {
        _this.setData( {
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
        });
      }
    });
  },
  onReady: function() {
    var splash = {text:"小程序学习-启动页跳转", img:"../../images/splash.jpg"}
    this.setData({splash:splash});
    toIndexPage();
    scaleAlpha.call(this);
  },
  onShow: function() {
  },
  onHide: function() {
  },
  onUnload: function() {
  }
})

/**
 * 定时控制图片透明度
 */
function scaleAlpha() {
  var _this = this;
  var timer = setInterval(function () {
        _this.setData({opacity: _this.data.opacity + 0.01});
        if (_this.data.opacity >= 1) {
            clearInterval(timer);
        }
    }, 15);
}

/**
 * 跳转到首页
 */
function toIndexPage() {
  setTimeout( function() {
    wx.redirectTo( {
      url: '../index/index'
    });
  }, 2500);
}