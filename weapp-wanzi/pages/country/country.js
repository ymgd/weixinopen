
var searchCtl = require('../../controller/searchCtl.js');
// 获取应用实例
var app = getApp();
Page({

    data: {
        winH: 0,
        country: {}
    },

    onLoad: function(options) {
        app.setPage('country', this);
        var countryId = options.id;

        // 设置高度
        this.setData({
            winH: app.getWinH()
        });

        searchCtl.renderCountryPage(countryId);
    }
});
