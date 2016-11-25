var util = require('../../utils/util.js')
Page({
    onLoad: function() {
        this.loadCollections()
    },
    onShow: function() {
        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                })
            }
        })
    },
    data: {
        collections: [],
        modalHidden: true,
        rankTypes: ['最热', '最新'],
        rankType: '最热',
        page: 0,
        loading: false,
        canLoadMore: true
    },
    selectRankType: function(e) {
        wx.showToast({
            title: '加载中',
            icon: 'loading'
        })
        this.setData({
            rankType: this.data.rankTypes[e.detail.value],
            collections: [],
            page: 0
        })
        this.loadCollections()
    },
    collectionRequest: function() {
        var rankType = util.collectionRankTypeMap(this.data.rankType)
        return `http://collection-set.ms.xitu.io/v1/homeCollectionSet?page=${this.data.page}&recommend=true&rankType=${rankType}`
    },
    loadCollections: function() {
        if (this.data.loading) return
        this.setData({
            loading: true
        })
        var self = this
        wx.request({
            url: this.collectionRequest(),
            success: function(res) {
                self.afterLoading(true)
                var data = res.data
                if (data.m == 'success') {
                    var collections = self.data.collections.concat(data.d)
                    self.setData({
                        collections: collections,
                        canLoadMore: data.d.length != 0
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
        this.setData({
            loading: false
        })
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
    },
    loadMore: function() {
        this.setData({
          page: this.data.page + 1
        })
        this.loadCollections()
    }
})
