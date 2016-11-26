
var GuideCtl = require('../../controller/guideCtl.js'),
	util = require('../../common/util.js'),
	conf = require('../../conf/conf.js');
// 获取应用实例
var app = getApp();
    
Page({

    data: {
        guide: {},
        verifiedImgH: 0,
        imgBase: conf.imgPrefix,
    },

    onLoad: function(options) {
        app.setPage('guide', this);
        this.guideId = options.id; // '569397a4a624f'; // 

        // 设置高度
        this.setData({
            winH: app.getWinH()
        });

        // 加载数据
        var guideCtl = new GuideCtl(this.guideId);
        guideCtl.render();
    },

    verifiedImgLoaded: function(event) {
        var width = event.detail.width,
            height = event.detail.height;
        var h = app.getWinW()*1.0/width*height; 
        this.setData({
            verifiedImgH: h
        });
    }
});
