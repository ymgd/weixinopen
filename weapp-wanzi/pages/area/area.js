
var areaDetailCtl = require('../../controller/areaDetailCtl.js'),
    searchCtl = require('../../controller/searchCtl.js'),
	util = require('../../common/util.js'),
	conf = require('../../conf/conf.js');
// 获取应用实例
var app = getApp();
var initDateStr = '选择日期',
    noDemands = '无要求',
    today = util.getDate();
    
Page({

    data: {
        winH: 0,
        base: {},
        items: {},
        guideCnt: 0,
        hasMore: true,
        today: today,
        endDateStart: today,
        // date
        startDate: initDateStr,
        endDate: initDateStr,
        walkOpts: [ // 徒步向导
            noDemands,
            '徒步向导'
        ],
        carOpts: [ // 带车向导
            noDemands,
            '五座车包车',
            '七座车包车',
            '九座车及以上包车'
        ],
        flyOpts: [ // 接送机
            noDemands,
            '徒步接送机', 
            '五座车接送机',
            '七座车接送机',
            '九座车及以上接送机',
        ],
        filters: [0,0,0], // walk, car, fly
        bannerPrefix: conf.areaImgPrefix
    },
    countryId: 0,
    areaId: 0,
    optsValue: [
        {1:1},
        {1:2, 2:5, 3:6},
        {1:3, 2:4, 3:7, 4:8}
    ],

    onLoad: function(options) {
        app.setPage('area', this);
        this.countryId = options.cid;
        this.areaId = options.aid;

        // 设置高度
        this.setData({
            winH: app.getWinH()
        });

        // 渲染顶部
        searchCtl.renderDetailTop(this.countryId, this.areaId,
            ()=> { // 拿到基础数据后回调
                wx.setNavigationBarTitle({
                    title: this.data.base && this.data.base.nameCn || '地区详情'
                });
            });
        // 渲染详细列表
        var id = this.areaId || this.countryId;
        areaDetailCtl.firstRenderList(id);
    },
    onReachBottom: function() {
        if (this.data.hasMore) {
            areaDetailCtl.renderMore();
        }
    },
    startDateChanged: function(event) {
        var value = event.detail.value,
            endDate = this.data.endDate;
        if (endDate === initDateStr) {
            endDate = value;
        }
        this.setData({
            startDate: value,
            endDate: endDate,
            endDateStart: value
        });
        this.filterList(); // 不为0时才发请求
    },
    endDateChanged: function(event) {
        var value = event.detail.value;
        this.setData({
            endDate: value
        });
    },
    walkPicked: function(event) {
        var value = parseInt(event.detail.value);
        this.setData({
            filters: [value, 0, 0]
        });
        value && this.filterList(this.optsValue[0][value]); // 不为0时才发请求
    },
    carPicked: function(event) {
        var value = parseInt(event.detail.value);
        this.setData({
            filters: [0, value, 0]
        });
        value && this.filterList(this.optsValue[1][value]);
    },
    flyPicked: function(event) {
        var value = parseInt(event.detail.value);
        this.setData({
            filters: [0, 0, value]
        });
        value && this.filterList(this.optsValue[2][value]);
    },
    filterList: function(sp) {
        var opt = {};
        sp && (opt.sp = sp);
        if (this.data.startDate != initDateStr) {
            opt.start = this.data.startDate;
            opt.end = this.data.endDate;
        }
        areaDetailCtl.renderFilter(opt);
    }
});
