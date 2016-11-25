Page({
    data: {
        goodslist: [{
            imgUrl: 'http://www.laojiupd.com/mobile/themes/default/img/rmtj.jpg',
            name: '热卖推荐'
        }, {
            imgUrl: 'http://www.laojiupd.com/mobile/themes/default/img/jdtz.jpg',
            name: '经典套装'
        }, {
            imgUrl: 'http://www.laojiupd.com/mobile/themes/default/img/zxth.jpg',
            name: '整箱特惠'
        }, {
            imgUrl: 'http://www.laojiupd.com/mobile/themes/default/img/mjtj.jpg',
            name: '美酒推荐 '
        }, {
            imgUrl: 'http://www.laojiupd.com/mobile/themes/default/img/sqdmj.jpg',
            name: '十七大名酒 '
        }, {
            imgUrl: 'http://www.laojiupd.com/mobile/themes/default/img/dfmj.jpg',
            name: '地方名酒'
        }],
        listhidden: true,
        ishidden1:"flex",
        ishidden2:"none",
        ishidden3:"none"
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
    },
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    },
    tagList: function(e) {
        this.setData({
            ishidden1:"none",
            ishidden2:"none",
            ishidden3:"none",
            [e.target.id]:"flex"
        })
    }

})
