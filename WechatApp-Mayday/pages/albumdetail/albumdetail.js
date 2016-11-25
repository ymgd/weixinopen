var Constant = require('../../utils/constant.js');
var Util = require('../../utils/util.js');

Page({
    OnItemClick: function (event) {
        var index = event.target.dataset.index;
        wx.setStorageSync('lyric', this.data.list[index]);
        wx.navigateTo({url: '../lyric/lyric?index=' + index});
    },
    onLoad: function (options) {
        this.setData({
            id: options.id,
            name: options.name
        });

        Util.requestData({
            url: Constant.ALBUM_DETAIL,
            data: {
                id: this.data.id
            },
            success: (res)=> {
                this.setData({
                    list: res
                });
            }
        });
    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: this.data.name
        })
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
})
