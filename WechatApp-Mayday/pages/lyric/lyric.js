Page({
    data: {
        lyric: null,
    },
    onLoad: function (options) {
        let theLyric = wx.getStorageSync('lyric');
        this.setData({
            lyric: theLyric
        });

    },
    onReady: function () {
        // 页面渲染完成
        wx.setNavigationBarTitle({
            title: this.data.lyric.name
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
