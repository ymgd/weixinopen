//index.js
//获取应用实例
var app = getApp()
Page( {
  data: {
    //向模板传入数据
    // 轮播
    index_index_scroll_tmpl: {
      images: [
        'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
        'https://hamlet.b0.upaiyun.com/1609/23150/4cc74e62833e4cdaaec79f3a2ef256e5.jpg!/fwfh/640x352/quality/80',
        'https://hamlet.b0.upaiyun.com/1609/23150/4cc74e62833e4cdaaec79f3a2ef256e5.jpg!/fwfh/640x352/quality/80',
        'https://hamlet.b0.upaiyun.com/1609/20180/934270f1be264c63bfaf85b37e545928.jpg!/fwfh/640x352/quality/80',
        'https://hamlet.b0.upaiyun.com/1609/20171/77f7a3c93fd641bf95150501ef9a7cad.jpg!/fwfh/640x352/quality/80',
        'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
        'https://hamlet.b0.upaiyun.com/1609/23171/70065cf9e45d46729ca51dec55d5f650.jpg!/fwfh/640x352/quality/80'
      ],
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 3000,
      duration: 1200
    },
    // nav
    index_index_navs_tmpl: {
      navs: [
        {
          image: 'https://m.youcai.xin/static/img/gravida.png',
          text: '孕妇'
        }, {
          image: 'https://m.youcai.xin/static/img/confinement.png',
          text: '月子'
        }, {
          image: 'https://m.youcai.xin/static/img/baby.png',
          text: '幼儿'
        }, {
          image: 'https://m.youcai.xin/static/img/old.png',
          text: '老人'
        }
      ]
    },
    
    // item
    index_index_items_tmpl: {
      items: [
        {image: 'https://hamlet.b0.upaiyun.com/1609/22111/fe8765fa7f2f48cd87760c10ddd20ae6.jpg'},
        {image: 'https://hamlet.b0.upaiyun.com/1609/22111/84439174cad04497beda3a076663beb4.jpg'},
        {image: 'https://hamlet.b0.upaiyun.com/1609/22111/1987d8eb8b1748368b7f2382332c9718.jpg'},
        {image: 'https://hamlet.b0.upaiyun.com/1609/22111/fe8765fa7f2f48cd87760c10ddd20ae6.jpg'},
        {image: 'https://hamlet.b0.upaiyun.com/1609/22111/fe8765fa7f2f48cd87760c10ddd20ae6.jpg'},
        {image: 'https://hamlet.b0.upaiyun.com/1609/22111/fe8765fa7f2f48cd87760c10ddd20ae6.jpg'},
        {image: 'https://hamlet.b0.upaiyun.com/1609/22111/fe8765fa7f2f48cd87760c10ddd20ae6.jpg'},
        {image: 'https://hamlet.b0.upaiyun.com/1609/22111/fe8765fa7f2f48cd87760c10ddd20ae6.jpg'}
      ]
    }
    
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo( {
      url: '../logs/logs'
    })
  },
  swiperchange: function(e) {
    //FIXME: 当前页码
    //console.log(e.detail.current)
  },

  onLoad: function() {
    console.log( 'onLoad' )
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })
  },
  go: function(event) {
    wx.navigateTo({
      url: '../list/index?type=' + event.currentTarget.dataset.type
    })
  }
})
