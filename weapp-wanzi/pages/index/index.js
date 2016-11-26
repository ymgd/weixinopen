
var areaListCtl = require('../../controller/areaList.js');
//获取应用实例
var app = getApp();
Page({
    data: {
        winH: 0,
        loading: false,
        items: []
    },
    curPage: 1,
    cntPerPage: 20, // 每次加载多少个
    lastId: '559214260814a',

    onLoad: function() {
        app.setPage('index', this);

        areaListCtl.check2fetch2render();
        this.setData({
            winH: app.getWinH()
        });
    },

    // 下拉刷新时触发
    onPullDownRefresh: function() {
        console.log('pulling down');
        var isPrepend = true; // 往前加
        this.prependCnt --;
        areaListCtl.check2fetch2render(isPrepend, this.prependList);
    },
});