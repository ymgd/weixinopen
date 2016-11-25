var requests = require( '../../requests/request.js' );

const PIC_BASE = "http://www.movetechx.com/upload/";

Page( {
  data: {
    splash: {},
    splash_pic: '',
    screenHeight: 0,
    screenWidth: 0
  },
  onLoad: function( options ) {
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
    var _this = this;
    var size = this.data.screenWidth + '*' + this.data.screenHeight;
    requests.getSplashCover(( data ) => {
      _this.setData( { 
        splash: data, 
        splash_pic: PIC_BASE + data.advertisements[0].picture
        });
    }, null, () => {
      console.log("getSplashCover complete..")
      toIndexPage.call(_this);
    });
  },
  onShow: function() {
  },
  onHide: function() {
  },
  onUnload: function() {
  }
});

/**
 * 跳转到首页
 */
function toIndexPage() {
  setTimeout( function() {
    wx.redirectTo( {
      url: '../activity/activity'
    });
  }, 4000 );
}