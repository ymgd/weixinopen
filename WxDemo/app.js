App({
    onLaunch: function() {
        // 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.globalData.systemInfo = res;
            }
        });
        this.getUserInfo();
    },
    getUserInfo: function(cb) {
        var that = this;
        if (this.globalData.userInfo) {
            typeof cb == 'function' && cb(this.globalData.userInfo);
        } else {
            wx.login({
                success: function() {
                    wx.getUserInfo({
                        success: function(res) {
                            that.globalData.userInfo = res.userInfo;
                            typeof cb == 'function' && cb(that.globalData.userInfo);
                        }
                    });
                }
            });
        }
    },
    onShow: function() {
        // 当小程序启动，或从后台进入前台显示
    },
    onHide: function() {
        // 当小程序从前台进入后台
    },
    globalData:{
        systemInfo:{},
        userInfo:null,
        menstruationInfo: null,
        selectedLocalPhotos:[]
    }
})