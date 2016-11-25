Page({
    data: {
        title: ''
    },
    //事件处理函数
    onLoad: function (options) {
        var that = this

        //playingList
        // wx.request({
        //     url: 'http://json.bmbstack.com/cinemaList',
        //     method: 'GET',
        //     data: {},
        //     header: {
        //         'Accept': 'application/json'
        //     },
        //     success: function(res) {
        // console.log(res.data)
        that.data.items = [
            {
                "title": "中影国际影城北京丰台千禧街店",
                "subTitle": "靛厂路千禧购物街4号楼F1-F3",
                "tag": "Dolby Atmos",
                "price": "￥32.9起"
            },
            {
                "title": "SFC上影（房山缤纷城店）",
                "subTitle": "黄辛庄路口绿地缤纷城三层",
                "tag": "老夫老妻",
                "price": "￥34起"
            },
            {
                "title": "CGV星星影城(北京颐堤港店)",
                "subTitle": "酒仙桥路18号四、五层",
                "tag": "情侣",
                "price": "￥56起"
            },
            {
                "title": "SFC上影（北京大兴龙湖店）",
                "subTitle": "永兴路7号院1号楼3F-Z2",
                "tag": "IMAX",
                "price": "￥34起"
            },
            {
                "title": "CGV星星影城(北京奥体店)",
                "subTitle": "湖景东路11号新奥广场B1-B2楼",
                "tag": "4DX",
                "price": "￥46起"
            },
            {
                "title": "CGV星聚汇影城(北京清河店)",
                "subTitle": "中街68号华润五彩城东区7层",
                "tag": "小鲜肉",
                "price": "￥56起"
            },
            {
                "title": "SFC上影（房山缤纷城店）",
                "subTitle": "黄辛庄路口绿地缤纷城三层",
                "tag": "韩范儿",
                "price": "￥34起"
            },
            {
                "title": "SFC上影（房山缤纷城店）",
                "subTitle": "黄辛庄路口绿地缤纷城三层",
                "tag": "老腊肉",
                "price": "￥34起"
            },
            {
                "title": "SFC上影（房山缤纷城店）",
                "subTitle": "黄辛庄路口绿地缤纷城三层",
                "tag": "嫩牛肉",
                "price": "￥34起"
            }
        ]
        //     }
        // })
    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: '电影院'
        })
    },
})
