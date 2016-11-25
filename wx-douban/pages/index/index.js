//index.js
var fn = require('../../functions.js');
var app = getApp();
Page({
    data:{
        pageLoadingHide:false,
        banner: {
            loading: true,
            indicatorDots: true,
            autoplay: true,
            interval: 5000,
            duration: 600
        },
        hot: {
            fail: false,
            loading: true,
            data: null
        },
        coming: {
            fail: false,
            loading: true,
            data: null
        }
    },
    goDetail: function(options){
        //跳转到详情
        var id = options.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../detail/detail?id="+id
        });
    },
    onLoad: function(){
        var that = this;
        //焦点图
        fn.getApiData("top250", {start: 0, count: 3}, function(res){
            if(res.statusCode == 200){
                that.setData({
                    "banner.data": res.data.subjects,
                    "banner.loading": false,
                    "banner.fail": false
                });
            }else{
                that.setData({
                    "banner.data": res.errMsg,
                    "banner.loading": false,
                    "banner.fail": true
                });
            }
        });

        //正在热映
        fn.getApiData("in_theaters", {}, function(res){
            if(res.statusCode == 200){
                that.setData({
                    hot: {
                        fail: false,
                        loading: false,
                        data: res.data.subjects
                    }
                });
            }else{
                that.setData({
                    hot: {
                        fail: true,
                        loading: false,
                        data: res.errMsg
                    }
                });
            }
        },function(res){
            that.setData({
                hot: {
                    fail: true,
                    loading: false,
                    data: "请求失败,请刷新重试"
                }
            });
        });
        
        //即将上映
        fn.getApiData("coming_soon", {}, function(res){
            if(res.statusCode == 200){
                that.setData({
                    coming: {
                        loading: false,
                        loading: false,
                        data: res.data.subjects
                    }
                });
            }else{
                that.setData({
                    coming: {
                        fail: true,
                        loading: false,
                        data: res.errMsg
                    }
                });
            }
        },function(res){
            that.setData({
                coming: {
                    fail: true,
                    loading: false,
                    data: "请求失败,请刷新重试"
                }
            });
        });
    },
    onReady: function(){
        //关闭加载提示
        this.setData({
            pageLoadingHide: true
        });
    },
    onPullDownRefresh: function(){
        //下拉刷新操作
        console.log(1);
    }
})
