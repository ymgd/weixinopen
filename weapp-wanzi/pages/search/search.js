
var searchCtl = require('../../controller/searchCtl.js');
// 获取应用实例
var app = getApp();
Page({

    data: {
        winH: 0,
        items: []
    },

    onLoad: function() {
        app.setPage('search', this);

        // 设置高度
        this.setData({
            winH: app.getWinH()
        });

        searchCtl.renderSearchPage();
    },

    searchTxtChanged: function(event) {
        var txt = event.detail.value;
    }
});
