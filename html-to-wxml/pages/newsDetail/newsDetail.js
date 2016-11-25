var appInstance = getApp();//获取全局变量
var R_htmlToWxml = require('../../util/htmlToWxml.js');//引入公共方法
var R_util = require('../../util/util.js');//引入公共方法
Page({
    data:{
        scrollHeight:0,
        newsData: {}
    },
    getNewsDetail:function () {
        var that = this;
        wx.request({
            url: appInstance.globalData.newsHref + 'getNews?action=DiscNewsContent&type=4&id=1478677877_1406730_1_9',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                var data = res.data;
                if (data.ret == 0) {
                    var newsDetail = JSON.parse(data.content);
                    newsDetail.content =  R_htmlToWxml.html2json(newsDetail.sContent);
                    newsDetail.time = R_util.timeShow(newsDetail.iTime*1000);
                    console.log(newsDetail);
                    that.setData({
                        newsData:newsDetail
                    })
                } else {
                    console.log("数据拉取失败");
                }
            },
            fail: function (error) {
                console.log("数据拉取失败");
            }
        })
    },
    stockClick:function (e) {
        var secCode = e.currentTarget.dataset.seccode;
        var secName = e.currentTarget.dataset.secname;
        console.log("stockClick:"+secCode+";secName:"+secName);
    },
    imageLoad:function (e) {
        var width = e.detail.width;
        var height = e.detail.height;
        var windowWidth = wx.getSystemInfoSync().windowWidth-30;
        var picHeight = (height/width)*windowWidth;
        var index = e.currentTarget.dataset.index;
        this.data.newsData.content[index].attr.height = picHeight;
        this.setData({
            newsData:this.data.newsData
        });
    },
    onLoad: function (options) {
        this.getNewsDetail();
        // 开始加载页面
        console.log("onLoad")
    },
    onShow: function () {
        // 页面显示
        console.log("onShow")
    },
    onReady: function () {
        // 页面渲染完成
        console.log("onReady")
    },
    onHide: function () {
        // 页面隐藏
        console.log("onHide")
    },
    onUnload: function () {
        // 页面关闭
        console.log("onUnload")
    },
})
