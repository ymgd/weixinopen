var config = require('../../utils/config.js')
var hex = require('../../utils/hex.js')

Page({
    data: {
        poiActivity: {}
    },
    onLoad: function (options) {
        var that = this
        var id = options.id
        var url = config.domain + '/api/activities/' + id
        fetch(url).then(function (response) {
            if (response.status !== 200) {
                console.error('Error: ' + response.statusText)
                return
            }
            response.json().then(function (data) {
                data.poiActivity.poster = hex.getAbsolutePath(data.poiActivity.poster)
                that.setData(data)
            })
        })
    },
    onReady: function () {
        var that = this
        wx.setNavigationBarTitle({
            title: that.data.poiActivity.title || ''
        })
    }
})