var util = require('../../utils/util.js')
Page({
    onLoad: function() {
        this.loadRanking()
    },
    data: {
        rankItems: [],
        modalHidden: true,
        rankTypes: ['原创', '分享', '阅读'],
        currentRankType: '原创'
    },
    changeRankType: function(e) {
        wx.showToast({
            title: '加载中',
            icon: 'loading'
        })
        var rankType = e.currentTarget.dataset.rankType
        this.setData({
            currentRankType: rankType
        })
        this.loadRanking()
    },
    loadRanking: function() {
        var self = this
        var url = util.rankTypeMap(this.data.currentRankType)
        wx.request({
            url: url,
            success: function(res) {
                self.afterLoading(true)
                var data = res.data
                if (data.m == 'ok') {
                    self.setData({
                        rankItems: data.d.filter(function(rankItem) {
                            return rankItem != null
                        })
                    })
                }
            },
            fail: function(res) {
                self.afterLoading()
            }
        })
    },
    afterLoading: function(success) {
        wx.hideToast()
        if (!success) this.modalShow()
    },
    modalHide: function(e) {
        this.setData({
            modalHidden: true
        })
    },
    modalShow: function(e) {
        this.setData({
            modalHidden: false
        })
    }
})
