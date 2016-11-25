var app = getApp();

Page({
    data: {

    },
    onLoad: function() {
        wx.setNavigationBarTitle({
            title: '我的活动'
        });
        var _this = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            wx.request({
                url: app.globalData.domain + 'api/wxapp/my/' + userInfo.nickName,
                success: function(res) {
                    _this.setData({
                        allActivity: res.data
                    });
                }
            });
        });
    }
});