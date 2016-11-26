var getData = require("getMovies.js");
var getNextData = require("getNextMovies.js");
Page({
    data: {
        // text:"这是一个页面"
        title: "",
        //banner参数设置
        bannerItems: [],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
        //列表设置
        pageTitle: "",
        hideLoading: false,
        tabTitles: [],
        bodyHeight: 0,
        lineWidth: 0,
        lineLeft: 0,
        currentPage: 0,
        tabPages: [],
        //分页数据
        citys: ["上海", "杭州", "深圳", "南京", "重庆"],//用城市来分页（没办法接口原因）
        pageIndex: 0,//当前的页数
        hasNext: true,//是否有下页
        hideFooter: true,
        //搜索
        hotSearch: "源代码",
        t: 'success'


    },

    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        var that = this;
        wx.showToast({
            title: '加载中...',
            icon: 'loading',
            duration: 10000

        })
        getData.getMovies(that, "北京");

        wx.getSystemInfo({
            success: function (res) {
                var height = res.windowHeight;
                that.setData({
                    bodyHeight: height
                })
            }
        })

    },
    onMenuClick: function (event) {
        wx.navigateTo({
            url: "../index/index"
        })

    },
    onSearchClick: function (event) {
        var that = this;
        wx.navigateTo({
            url: "../search/search?hotSearch=" + that.data.hotSearch
        })

    },
    onBannerClick: function (event) {
        console.log("banner", event.currentTarget.dataset.name);
        wx.navigateTo({
            url: "../detail/detail?mName=" + event.currentTarget.dataset.name
        });
    },
    onListItemClick: function (event) {
        console.log("banner", event.currentTarget.dataset.name);
        wx.navigateTo({
            url: "../detail/detail?mName=" + event.currentTarget.dataset.name
        });
    },
    onPageChange: function (event) {

        var cPage = event.detail.current;
        var tabLength = this.data.tabTitles.length;
        var lineLeft = cPage * (100 / tabLength)
        var data = {lineLeft: lineLeft};
        console.log(event);
        for (var i = 0; i < tabLength; i++) {
            data['tabTitles[' + i + '].bColor'] = "#000000";
        }
        data['tabTitles[' + cPage + '].bColor'] = '#24B0FC';
        this.setData(data);


    },
    onTitleClick: function (event) {

        var index = event.currentTarget.dataset.index;
        this.setData({
            currentPage: index
        })


    },
    onScroolBottom: function (event) {

        var that = this;
        that.setData({
            hideFooter: false
        })
        if (that.data.pageIndex < that.data.citys.length) {
            getNextData.getNextMovies(that, that.data.citys[that.data.pageIndex])
        } else {
            that.setData({
                hasNext: false
            })
        }

    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
})
