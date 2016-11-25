Page({
    data: {
        hidden: true,
        lists: [{
            imgUrl: "http://img.alicdn.com/imgextra/i3/TB1jquENpXXXXXOXFXXXXXXXXXX_!!0-item_pic.jpg",
            text: "20161013第四十六期",
            title: "从小培养孩子独立自主的能力",
            selling: "热卖中"
        },{
            imgUrl: "http://service.ipinbb.com:8080/ImageService/GetImage?imageName=800--800__group1__$$M00$$00$$35$$CgoSrFf92aqAZuS1AAD8G_1ckwE719.jpg",
            text: "20161013第四十五期",
            title: "宝宝不爱吃饭怎么办",
            selling: "热卖中"
        },{
            imgUrl: "http://service.ipinbb.com:8080/ImageService/GetImage?imageName=400--400__group1__$$M00$$00$$31$$CgqAy1fPzLuAGufOAADgIufXFN8825.jpg",
            text: "20160929第四十四期",
            title: "如何提高孩子写作能力？",
            selling: "热卖中"
        },{
            imgUrl: "http://img.alicdn.com/imgextra/i4/2634245589/TB2dLtwiVXXXXaTXpXXXXXXXXXX_!!2634245589.jpg",
            text: "20160927第四十三期",
            title: "小奶瓶，大讲究",
            selling: "热卖中"
        },{
            imgUrl: "http://service.ipinbb.com:8080/ImageService/GetImage?imageName=750--1016__group1__$$M00$$00$$32$$CgoSrFfYyLmAA37tAASmEuSRudY969.jpg",
            text: "20160922第四十二期",
            title: "聪明宝宝的第一本书",
            selling: "热卖中"
        },{
            imgUrl: "https://img.alicdn.com/bao/uploaded/i3/TB1LZX7LXXXXXXgXVXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg",
            text: "20160920第四十一期",
            title: "宝宝爱画画，家长要注意！",
            selling: "售罄"
        },{
            imgUrl: "http://img.alicdn.com/imgextra/i4/2634245589/TB2dLtwiVXXXXaTXpXXXXXXXXXX_!!2634245589.jpg",
            text: "20160927第四十三期",
            title: "小奶瓶，大讲究",
            selling: "热卖中"
        },{
            imgUrl: "http://service.ipinbb.com:8080/ImageService/GetImage?imageName=750--1016__group1__$$M00$$00$$32$$CgoSrFfYyLmAA37tAASmEuSRudY969.jpg",
            text: "20160922第四十二期",
            title: "聪明宝宝的第一本书",
            selling: "热卖中"
        },{
            imgUrl: "https://img.alicdn.com/bao/uploaded/i3/TB1LZX7LXXXXXXgXVXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg",
            text: "20160920第四十一期",
            title: "宝宝爱画画，家长要注意！",
            selling: "售罄"
        }]
    },
    loadingChange: function () {
        this.setData({
            hidden: true
        })
    },
    loadList: function(e) {
        console.log("scroll bottom!!!")
        this.setData({
            hidden: false
        })

        var that = this
        setTimeout(function () {
            that.setData({
                hidden: true
            })
        }, 1000)
    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: '妈妈说'
        })
    }
})