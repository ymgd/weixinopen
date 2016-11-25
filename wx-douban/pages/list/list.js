var fn = require('../../functions.js');
var app = getApp();
Page({
    data: {
        data: [],
        fail: false,
        loadingHidden: false
    },
    onLoad: function(options){
        var that = this;
        that.setData({
            tag: options.tag,
            start: options.start,
            count: options.count
        });
        that.loadMore();
    },
    loadMore: function(){
        var that = this;
        var tag = that.data.tag,
            start = that.data.start,
            count = that.data.count,
            total = that.data.total;
        if(start>=total){
            //没有更多数据
            that.setData({
                loadingHidden: true,
                loading: false
            });
        }else{
            //加载数据
            if(that.data.loading){
                return false;
            }
            that.setData({
                loadingHidden: false,
                loading: true
            });
            fn.getApiData("search", {
                tag: tag,
                start: start,
                count: count
            }, function(res){
                if(res.statusCode == 200){
                    that.setData({
                        pageTitle: res.data.title,
                        data: that.data.data.concat(res.data.subjects),
                        start: res.data.start + res.data.count,
                        total: res.data.total,
                        loading: false
                    });
                    if(that.data.start>=that.data.total){
                        //没有更多数据
                        that.setData({
                            loadingHidden: true
                        });
                    }
                    wx.setNavigationBarTitle({
                        title: that.data.pageTitle
                    });
                }else{
                    that.setData({
                        fail: true,
                        data: res.errMsg
                    });
                }
                that.setData({
                    pageLoadingHide: true
                });
            }, function(){
                that.setData({
                    fail: true,
                    data: "请求失败",
                    pageLoadingHide: true
                });
            });
        }
        
    }
});