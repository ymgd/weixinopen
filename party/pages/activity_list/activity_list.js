var lbs = require('../../utils/lbs.js')
var config = require('../../utils/config.js')
var hex = require('../../utils/hex.js')

Page({
    data: {
        showLoading: true,
        hasMore: true,
        start: 0,
        pageSize: 5,
        activities: []
    },

    onLoad: function (options) {
        lbs.getCity(city => this.fetchActivities(city, this.data.start, this.data.pageSize))
    },

    viewDetail: function (e) {
        var ds = e.currentTarget.dataset
        wx.navigateTo({
            url: '../activity_detail/activity_detail?id=' + ds.id
        })
    },

    fetchActivities: function (city, start, pageSize) {
        wx.request({
            url: config.domain + '/api/activities',
            data: {
                page: start / pageSize,
                pageSize: pageSize
            },
            method: 'GET',
            success: res => {
                const data = res.data
                if (data.content.length === 0) {
                    this.setData({
                        showLoading: false,
                        hasMore: false
                    })
                } else {
                    data.content.map(function (item) {
                        item.poiActivity.poster = hex.getAbsolutePath(item.poiActivity.poster)
                    })
                    this.setData({
                        showLoading: false,
                        activities: start === 0 ? data.content : this.data.activities.concat(data.content),
                        start: this.data.start + data.content.length
                    })
                }
            }
        })
    }
})