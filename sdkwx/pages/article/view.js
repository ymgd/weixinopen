
const util = require( '../../utils/util.js' );
var WxParse = require('../../wxParse/wxParse.js');
var Util = require('../../utils/util.js');
Page({
  data: {
    article: '',
    wxParseData:[]
  },
  onLoad: function (params) {
    console.log('onLoad')
    //添加测试html；增加一个video标签
    var html = '';

    var that = this;
    console.log(that.__route__);
    wx.request({
      url: 'https://sdk.cn/api/article/wxarticleview',
      data: {
        id: params.id
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data.article);
        var article = res.data.article;
        WxParse.wxParse('html',article.description,that);
        that.setData({
          article:article
        })
      }
    })

  },
  wxParseImageLoad: function(e){
    
  },
  wxParseImgTap: function(e){
    var that = this
    WxParse.wxParseImgTap(e,that)
  }
})