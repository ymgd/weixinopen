var util = require('../../utils/util.js');

Page({
    data: {
        title: '',
        loading: true,
        movie: {}
    },

    onLoad(params) {
        var that = this;
        util.detail(params.id, function (data) {
            that.setData({
                title: data.title,
                movie: data,
                loading: false
            })
        });
    },

    onReady() {
        wx.setNavigationBarTitle({
            title: this.data.title
        })
    }
})