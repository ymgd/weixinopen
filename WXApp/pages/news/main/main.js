Page({
    data: {
        nav: [{
            name: "首页",
            index: 0,
            mark: false
        }, {
            name: "热点",
            index: 1,
            mark: false
        }, {
            name: "本地",
            index: 2,
            mark: false
        }, {
            name: "科技",
            index: 3,
            mark: false
        }],
        current: 0,
        indexList: [],
        secondList: [],
        thirdList: [],
        fouthList: [],

        loadingHidden: false,
        refreshHidden: true,
        loadmoreHidden: true,
        scrollTop: 1,
        swiper: {
            indicatorDots: false,
            autoplay: false,
            interval: 0,
            duration: 300
        },
        banner: {
            indicatorDots: true,
            autoplay: true,
            interval: 3000,
            duration: 300,
            current: 0,
            items: ['http://m.360buyimg.com/mobilecms/s720x322_jfs/t3328/180/50572133/113561/29d91abc/57fcfbceN2f66c184.jpg!q70.jpg', 'http://img13.360buyimg.com/da/jfs/t3670/80/38120139/154526/13800b09/57fcb332N2b477c1f.jpg', 'http:////m.360buyimg.com/mobilecms/s720x322_jfs/t3235/134/3966940829/100978/fa598928/57fcbc73N577929df.jpg!q70.jpg']
        }
    },

    onLoad: function() {
        var that = this;
        wx.request({
            url: 'http://localhost/mock/list0.json',
            // url: 'http://felixlu.bceapp.com/list.php',
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log(res.data);
                setTimeout(function() {
                    that.setData({
                        indexList: res.data,
                        loadingHidden: true
                    });
                }, 1500);
            },
            fail: function(error) {
                console.log(error);
            }
        });

    },

    actionToupper: function() {
        var that = this;
        this.setData({
            refreshHidden: false
        });
        wx.request({
            url: 'http://localhost/mock/refresh.json',
            success: function(res) {
                setTimeout(function() {
                    that.setData({
                        list: res.data.concat(that.data.list),
                        refreshHidden: true,
                        scrollTop: 1
                    });
                }, 1500);
            }
        });
    },

    onPullDownRefresh: function() {
        console.log(0);
    },

    actionTolower: function() {
        var that = this;
        this.setData({
            loadmoreHidden: false
        });
        wx.request({
            url: 'http://localhost/mock/more.json',
            success: function(res) {
                setTimeout(function() {
                    that.setData({
                        list: that.data.list.concat(res.data),
                        loadmoreHidden: true,
                        scrollTop: 1
                    });
                }, 1500);
            }
        });
    },

    switchSlider: function(event) {
        this.setData({
            current: event.target.dataset.index
        })
    },

    changeSlider: function(event) {
        var that = this;
        var current = event.detail.current;
        this.setData({
            current: current,
            loadingHidden: true
        });
        if (!that.data.nav[current].mark) {
            that.setData({
                loadingHidden: false
            });
            wx.request({
                url: 'http://localhost/mock/list' + current + '.json',
                // url: 'http://felixlu.bceapp.com/list.php',
                header: {
                    'Content-Type': 'application/json'
                },
                success: function(res) {
                    var newList = that.data.nav[current].list;
                    setTimeout(function() {
                        switch (current) {
                            case 1:
                                that.setData({
                                    secondList: res.data,
                                    loadingHidden: true
                                });
                                break;
                            case 2:
                                that.setData({
                                    thirdList: res.data,
                                    loadingHidden: true
                                });
                                break;
                            case 3:
                                that.setData({
                                    fouthList: res.data,
                                    loadingHidden: true
                                });
                                break;
                        }

                    }, 1500);
                },
                fail: function(error) {
                    console.log(error);
                }
            });
            that.data.nav[current].mark = true;
        }
        console.log(that.data.nav[current].mark);


    }
});
