//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        imgUrls: [
            'http://www.laojiupd.com/mobile/data/attached/images/c07b8fb63f441b8f643b2ce73fb110a1.jpg',
            'http://www.laojiupd.com/mobile/data/attached/images/b5c77db628cd5e42638a14e8f7f84e1e.jpg',
            'http://www.laojiupd.com/mobile/data/attached/images/2b24cf91c72b50931e29b45744bb1d25.jpg',
            'http://www.laojiupd.com/mobile/data/attached/images/92899b9da05c31a85ec1aa81cd4dfcd6.jpg',
            'http://www.laojiupd.com/mobile/data/attached/images/d2120a32bfafd24a081fd81676906b14.jpg',
            'http://www.laojiupd.com/mobile/data/attached/images/e5c8c51bc661aa74eb7c3c4089864180.jpg',
            'http://www.laojiupd.com/mobile/data/attached/images/ece9a3d7d48f73e3fea34802824dae7f.jpg',
            'http://www.laojiupd.com/mobile/data/attached/images/b6dd6f7f80bc5c33eaeca19d19365759.jpg',
            'http://www.laojiupd.com/mobile/data/attached/images/c07b8fb63f441b8f643b2ce73fb110a1.jpg',
            'http://www.laojiupd.com/mobile/data/attached/images/b5c77db628cd5e42638a14e8f7f84e1e.jpg'
        ],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
        navs: [{
            imgUrl: "http://www.laojiupd.com/mobile/themes/default/img/index_mybj.png",
            name: "名优白酒"
        }, {
            imgUrl: "http://www.laojiupd.com/mobile/themes/default/img/index_cnlj.png",
            name: "陈年老酒"
        }, {
            imgUrl: "http://www.laojiupd.com/mobile/themes/default/img/index_ptj.png",
            name: "葡萄酒"
        }, {
            imgUrl: "http://www.laojiupd.com/mobile/themes/default/img/index_zxth.png",
            name: "整箱特惠"
        }, {
            imgUrl: "http://www.laojiupd.com/mobile/themes/default/img/index_zjtj.png",
            name: "专家推荐"
        }, {
            imgUrl: "http://www.laojiupd.com/mobile/themes/default/img/index_gz.png",
            name: "估值"
        }, {
            imgUrl: "http://www.laojiupd.com/mobile/themes/default/img/index_jm.png",
            name: "寄卖"
        }, {
            imgUrl: "http://www.laojiupd.com/mobile/themes/default/img/index_pm.png",
            name: "拍卖"
        }, {
            imgUrl: "http://www.laojiupd.com/mobile/themes/default/img/index_tg.png",
            name: "团购"
        }, {
            imgUrl: "http://www.laojiupd.com/mobile/themes/default/img/index_lb.png",
            name: "领宝"
        }],
        titlist: ['新品上市，五粮液锦上添花！', '盛世华章，欢度国庆！'],
        indicatorDots2: false,
        vertical2: true,
        autoplay2: true,
        interval2: 3000,
        duration2: 500,
        goodslist: [],
        toastHidden:true
    },
    onLoad: function(options) {
        var that = this;
        wx.request({
            url: 'http://tccpc.xyz/weixin-laojiu/mock/goosList.json',
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                that.setData({
                    goodslist:res.data
                })
            },
            fail:function(err){
                console.log(err)
            }
        })
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
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../content/app'
        })
    },
    toastChange:function(){
       this.setData({
           toastHidden:true
       })
   },
   addcart:function(e){
       this.setData({
            toastHidden:false
        });
        for (var i in this.data.goodslist){
            if(this.data.goodslist[i].id == e.target.id){
                this.data.goodslist[i].count = 1;
                var arr = wx.getStorageSync('cart') || [];
                if(arr.length>0){
                    for(var j in arr){
                        if(arr[j].id == e.target.id){
                            arr[j].count = arr[j].count + 1;
                            try {
                                wx.setStorageSync('cart', arr)
                            } catch (e) {
                                console.log(e)
                            }
                            return;
                        }
                    }
                    arr.push(this.data.goodslist[i]);
                }else{
                    arr.push(this.data.goodslist[i]);
                }
                try {
                    wx.setStorageSync('cart', arr)
                    return;
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
})
