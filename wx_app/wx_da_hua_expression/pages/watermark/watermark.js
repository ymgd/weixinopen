// editor.js
// var Api = require('../../utils/api.js');
var app = getApp()
var Menu = require('../../utils/menu.js');
var globle_page
Page({
  data: {
    title: '最热话题',
    hotest: [],
    hidden: false,
    express_ModalHidden:true,
    express_mix:null,
    background:"http://120.27.97.33:91/static/mix/img_word.jpg",
    
    word_mix:"这次是踩死的节奏",
    font_size:"47rpx",
    offsetLeft: "195rpx",
    offsetTop: "425rpx",

    editorSuccess:"",
  },
  // editorSuccess:function (){
  //   var _url = '../private/private?editorSucess=http://alinode-assets.oss-cn-hangzhou.aliyuncs.com/4be39e00-c83b-4f8e-b4e2-76f70b009b1a.jpeg';
  //   // wx.redirectTo({
  //   //   url: _url
  //   // })
  //   app.globalData['editorSuccess']="http://alinode-assets.oss-cn-hangzhou.aliyuncs.com/4be39e00-c83b-4f8e-b4e2-76f70b009b1a.jpeg"
  //   wx.navigateBack( )
  // },

  inputChange: function(e) {
    console.log(e.detail.value)
    var _word = e.detail.value
    globle_page.setData({
      word_mix:_word,
    })
  },
  size_sliderchange: function(e) {
    console.log(e.detail.value)
    var font_size = e.detail.value
    globle_page.setData({
      font_size:font_size + "rpx",
    })
  },
  x_sliderchange: function(e) {
    console.log(e.detail.value)
    var offsetValue = e.detail.value + 128
    globle_page.setData({
      offsetLeft:offsetValue + "rpx",
    })
  },
  y_sliderchange: function(e) {
    var offsetValue = e.detail.value 
    globle_page.setData({
      offsetTop:offsetValue + "rpx",
    })
  },

  /**
   * 根据水印数据(watermarkData)，上传后台合成
   * 成功，打开模态框，显示图片
   * 收藏成功，跳转至private，显示
   */
  editorCreate: function(e) {
    var _word = globle_page.data.word_mix
    var _x = parseInt(globle_page.data.offsetLeft.replace("px,","")) *3 ;
    var _y = parseInt(globle_page.data.offsetTop.replace("px,","")) * 3;
    var watermarkData =  {
        bg_img: 'img_word.jpg' ,
        word: _word,
        size: 100,
        x: _x,
        y:_y
      }
    Menu.Option.EditorWatermark(watermarkData,globle_page.editorSuccess)
  },

  //编辑成功，显示模态框,显示图片
  editorSuccess:function(imgUrl){
    globle_page.setData({
          express_mix:imgUrl,
          editorSuccess:imgUrl,
          express_ModalHidden: false
        })
  },

  //模态框，分享链接
  modalShare: function(e) {
    // app.globalData['editorSuccess']=globle_page.data.editorSuccess
   console.log("modalShare:" + globle_page.data.editorSuccess)
    wx.setStorageSync(
        "pre_editor",
        globle_page.data.editorSuccess
    )
    wx.navigateBack( )
  },
  //模态框，返回编辑
  modalReEditor: function(e) {
    this.setData({
      express_ModalHidden: true
    })
  },

  // 事件处理函数
  redictDetail: function(e) {
    var id = e.currentTarget.id,
      url = '../detail/detail?id=' + id;
      
    wx.navigateTo({
      url: url
    })
  },





  fetchData: function() {
    var that = this;
    wx.request({
      url: Api.getHotestTopic({
        p: null
      }),
      success: function(res) {
        console.log(res);
        that.setData({
          hotest: res.data
        })
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
  },
   onLoad: function (options) {
     
    console.log(options.imgurl)
    this.setData({
      hidden: false,
      background:options.imgurl //更改背景图
    })
    globle_page = this

    var appInstance = getApp()
    console.log(appInstance.globalData)
    // appInstance.setData({aa:321})
    appInstance.globalData.aa = 1
    console.log(appInstance.globalData)
    // this.fetchData();
    // this.fetchExpress()
  },
})