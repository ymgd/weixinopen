var requests = require('../../requests/request.js');

Page({
    data: {
        splash: {},
        screenHeight: 0,
        screenWidth: 0
    },
    onLoad: function(options) {
        var _this = this;
        wx.getSystemInfo({
            success: function(res) {
                _this.setData({
                    screenWidth: res.windowWidth,
                    screenHeight: res.windowHeight
                });
            },
            fail: function(res) {

            },
            complete: function(res) {

            }
        });
    },
    onReady: function() {
        var _this = this;
        var size = this.data.screenWidth + '*' + this.data.screenHeight;
        requests.getSplashCover(size, (res) => {
            console.log(res);
            res.data.img = res.data.img.replace("pic1", "pic4");
            res.data.img = res.data.img.replace("pic2", "pic4");
            _this.setData({ splash: res.data });
        }, null, () => {
            toIndexPage.call(_this);
        })
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
        url: '../index/index'
      });
    }, 2000 );
}
