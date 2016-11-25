var util = require('../../utils/util.js');

Page({
    data: {
        title: '',
        type: '',
        loading: true,
        hasMore: true,
        page: 1,
        count: 20,
        movies: [],
    },

    loadData: function () {
        var that = this;
        if (!this.data.hasMore) return
        this.setData({
            loading: true
        });
        util.fetchAPI(this.data.type, this.data.page++, this.data.count, '', function (data) {
            if (data.subjects.length) {
                that.setData({
                    movies: that.data.movies.concat(data.subjects),
                    loading: false
                });
            } else {
                that.setData({
                    hasMore: false,
                    loading: false
                });
            }
        });
    },

    onLoad: function (params) {
        this.data.type = params.type;
        this.data.title = params.title;
        this.loadData();
    },

    onReady: function () {
        wx.setNavigationBarTitle({
            title: this.data.title
        });
    }
})