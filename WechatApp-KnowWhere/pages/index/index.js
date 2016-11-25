//index.js
//获取应用实例
var apiUtils = require('../../utils/apiUtils')
var types = require('../../utils/constant').MAIN_TYPE
var app = getApp()
Page({
  data: {
    tabs: ["那荐", "那展", "那言", "那书"],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0,
    swiper: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    zhanxun: {
      page: 1,
      limit: 5
    },
    exhibition: {
      page: 1,
      limit: 5
    },
    book: {
      page: 1,
      limit: 5
    },
    content: {
      page: 1,
      limit: 5
    },
    zhanxunData: [],
    exhibitionData: [],
    bookData: [],
    contentData: [],
  },
  //根据类型进入不同页面
  click: function (e) {
    console.log(JSON.stringify(e))
    console.log(e.currentTarget.dataset.type)
    var objectId = e.currentTarget.dataset.id
    var url = ''
    switch (e.currentTarget.dataset.type) {
      case types.zhanxun:
        url = '../main_page/zhanxun/index'
        break;
      case types.exhibition:
        url = '../main_page/exhibition/index'
        break;
      case types.book:
        url = '../main_page/book/index'
        break;
      case types.content:
        url = '../main_page/content/index'
        break;
    }
    // var url = ''
    wx.navigateTo({
      url: url + '?id=' + objectId
    })
  },
  exhibition_item_click: function (e) {
    console.log(e)
  }
  ,
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - res.sliderWidth) / 2
        });
      }
    });
    this.request_slide_image()
    this.request_discover_data()
    this.request_exhibition_data()
    
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '知亦行',
      success: function (res) {
        console.log(res)
      }
    })
  }
  ,
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if(e.currentTarget.id==2&&this.data.contentData.length==0){
      this.request_book_content_data('content')
      console.log('content')
    }

     if(e.currentTarget.id==3&&this.data.bookData.length==0){
      this.request_book_content_data('book')
       console.log('book')
    }

  },
  //以下为scrollview
  lower: function (e) {
    console.log('滚动到底部了')
    console.log(e)
    var zhanxun = this.data.zhanxun;
    zhanxun.page = zhanxun.page + 1;
    this.setData({
      zhanxun: zhanxun,
    })
    this.request_discover_data()
  },
  exhibition_lower: function (e) {
    console.log('滚动到底部了')
    console.log(e)
    var exhibition = this.data.exhibition;
    exhibition.page = exhibition.page + 1;
    this.setData({
      exhibition: exhibition,
    })
    this.request_exhibition_data()
  },
  content_lower: function (e) {
    console.log('滚动到底部了')
    console.log(e)
    var content = this.data.content;
    content.page = content.page + 1;
    this.setData({
      content: content,
    })
    this.request_book_content_data('content')
  },
  book_lower: function (e) {
    console.log('滚动到底部了')
    console.log(e)
    var book = this.data.book;
    book.page = book.page + 1;
    this.setData({
      book: book,
    })
    this.request_book_content_data('book')
  }
  ,
  request_slide_image: function () {
    var that = this;
    apiUtils.AJAX(apiUtils.API_V2 + "slider", function (res) {
      console.log(res)
      if (!res.data.status) {
        return;
      }
      that.setData({
        swiper: res.data.results
      })
    })
  },
  request_discover_data: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.showNavigationBarLoading()
    var that = this;
    apiUtils.AJAX(apiUtils.API_V1 + "discover" + "?page=" + this.data.zhanxun.page + "&limit=" + this.data.zhanxun.limit, function (res) {
      console.log(res.data)
      wx.hideToast()
      wx.hideNavigationBarLoading()
      that.setData({
        zhanxunData: that.data.zhanxunData.concat(res.data.results)
      })
    })
  },
  request_exhibition_data: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.showNavigationBarLoading()
    var that = this;
    apiUtils.AJAX(apiUtils.API_V1 + "exhibition/recommend" + "?page=" + this.data.exhibition.page + "&limit=" + this.data.exhibition.limit, function (res) {
      console.log(res.data)
      wx.hideToast()
      wx.hideNavigationBarLoading()
      that.setData({
        exhibitionData: that.data.exhibitionData.concat(res.data.results)
      })
    })
  },
  request_book_content_data: function (type) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.showNavigationBarLoading()
    var that = this;
    apiUtils.AJAX(apiUtils.API_V1 + "archives" + "?page=" + this.data.exhibition.page + "&limit=" + this.data.exhibition.limit + "&type=" + type, function (res) {
      console.log(res.data)
      wx.hideToast()
      wx.hideNavigationBarLoading()
      if (type == 'book') {
        that.setData({
          bookData: that.data.bookData.concat(res.data.results)
        })
      }else{
        that.setData({
          contentData: that.data.contentData.concat(res.data.results)
        })
      }
    })
  }
  ,
  //以上为scrollview
  error: function (e) {
    console.log(e)
  }
}
)
