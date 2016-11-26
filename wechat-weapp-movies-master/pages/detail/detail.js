/**
 * Created by LLhon on 2016/10/20.
 */
var app = getApp();

var that = {};

Page({
    data: {
        id: '',
        title: '',
        screenHeight: 0,
        imgContainerWidth: 0,
        tabNormalColor: 'white',
        tabSelectedColor: 'black',
        img: '',
        summary: '',
        cast: '',
        works: [],
        detailData: {},
        isSelectedSummary: true,
        isSelectedPhotos: false,
        isSelectedRelated: false
    },
    onLoad: function (options) {
        console.log(options);
        var _this = this;
        that = _this;
        this.setData({
            id: options.id,
            title: options.title
        });
        wx.showToast({
            title: 'loading.....',
            icon: 'loading'
        });
        wx.getSystemInfo({
            success: function (res) {
                _this.setData({
                    screenHeight: res.windowHeight
                })
            }
        })
        initData(_this);
    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: this.data.title
        });
        wx.hideToast();
    },
    onShow: function () {
        console.log('Detail onShow');
    },
    onHide: function () {
        
    },
    onUnload: function () {
        
    },
    onClickSummary: function () {
        this.setData({
            isSelectedSummary: true,
            isSelectedPhotos: false,
            isSelectedRelated: false
        })
    },
    onClickPhotos: function () {
        this.setData({
            isSelectedSummary: false,
            isSelectedPhotos: true,
            isSelectedRelated: false
        })
    },
    onClickRelated: function () {
        this.setData({
            isSelectedSummary: false,
            isSelectedPhotos: false,
            isSelectedRelated: true
        })
    },
    horizontalScrollChange: function(e) {
        console.log('scroll.....');
    },
    onClickItemListener: function(e) {
        wx.redirectTo({
            url: 'detail?id=' + e.currentTarget.dataset.id + "&title=" + e.currentTarget.dataset.title
        })
    },
    onClickImg: function(e) {
        wx.navigateTo({
            url: '../gallery/gallery?url=' + e.currentTarget.dataset.url
        })
    }
})

function requestMovieDetail(result) {
    return app.request.fetchApi(app.api.getMovieDetailUrl(result), {});
}

function requestLeadWorks(result) {
    console.log(result);
    var tempData = {};
    
    that.setData({
        img: result.images.large,
        summary: result.summary,
        cast: result.casts[0].name
    })
    return app.request.fetchApi(app.api.getLeadWorksUrl(result.casts[0].id), {start: 0, count: 10});
}

function initData(_this) {
    new Promise((resolve, reject) => {
        resolve(_this.data.id);
    })
    .then(requestMovieDetail)
    .then(requestLeadWorks)
    .then(function(result) {
        console.log(result);
        var imgs = [];
        //var avatar = data.avatars.small; //头像
        //var name_en = data['name_en']; //英文名
        //var mobile_url = data['mobile_url']; //链接

        //for...in  可以把一个对象的所有属性依次循环出来.
        //eg: for(var key in obj)  //key 得到的为属性名.
        //for...in 对Array的循环得到的的key是字符串类型的索引而不是Number类型的索引.
        //具有Iterable类型的集合或数组可以用for...of语句来循环遍历.
        for(var i=0; i<result.works.length; i++) {
            imgs.push({id: result.works[i].subject.id, img: result.works[i].subject.images.medium, title: result.works[i].subject.title});
        }

        var maxWidth = 128 * imgs.length + 20 * imgs.length;
        
        _this.setData({
            works: imgs,
            imgContainerWidth: maxWidth
        })
    })
    .catch(function(reason){
        console.log('fail:' + reason);
    });
}

function bindData(data, tempData, ...rest) {
    //注意:　JavaScript函数允许传入任意个参数而不影响调用．
    //关键字arguments只在函数内部起作用,类似于Array但又不是Array,可以用于获取调用者传入的所有参数.
    //关键字rest可用于获取除函数已定义的参数之外的所有参数．eg: bindData(．．．)中定义的的data,tempData之外的参数．　调用者者bindData([], [], 1, 2, 3);
    for (let i=0; i<arguments.length; i++) {
        arguments[i];
    }
    var img_value = data.images.large;
    var summary_value = data.summary;
    var year_value = data.year;
    var shareUrl_value = data.share_url;
    tempData = {img: img_value, summary: summary_value, year: year_value, share: shareUrl_value};
}

function bindToWorks(work){
    var workId = work.subject.id;
    
}
