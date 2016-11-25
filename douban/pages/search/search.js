var util = require('../../utils/util.js');

Page({
    data: {
        page: 1,
        count: 20,
        title: '请在此输入搜索内容',
        search: '',
        type: '',
        movies: [],
        loading: false,
        hasMore: true
    },

    loadData: function () {
        var that = this;
        if (!this.data.hasMore) return
        this.setData({
            loading: true
        });
        util.fetchAPI(this.data.type, this.data.page++, this.data.count, this.data.search, function (data) {
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

    search: function (event) {
        if (!event.detail.value) return
        this.setData({
            loading: true,
            search: event.detail.value,
            type: 'search'
        })
        this.loadData();
    }
})