// hotest.js
var Api = require('../../utils/api.js');
var View = require('../../utils/view.js');
var Menu = require('../../utils/menu.js');

var Render = require('../../utils/render.js');
var KEY = require('../../utils/storage_key.js');


var APP = getApp()
var GLOBAL_PAGE
Page({
  data: {
    pageName: "public",

    displayLoading: true,
    keyword:"老司机", //搜索关键字
    // emoticon: [],
    hotLabel:["金馆长","我想静静","意外","疼！"],  
    hidden: false,
    //点击弹出菜单
    displayMenu:false,

    //控制菜单上架
    MENU_TYPE:Render.menu.TYPE,
    menuType:"-1",
    menuWidth:0,
    menuHeight:0,

    // 手机设备信息，均已rpx为标准
    windowWidth:0,
    windowHeight:0,

    //页面渲染数据
    emoticon:[],
    category:[],

    //touch选择对象
    selectEmoticon:{id:"",name:"",img_url:""}, //预备编辑的图片
    selectCategory:{id:"",name:""},
  },

  /** Page:public 基础事件
   * 1、wxml的catchtap全触发eventBase
   * 2、eventDisplay:执行view的显示/隐藏
   * 3、eventListen:根据data-actiondata-action，确定执行的事件
   */
  eventBase:function(e){
    GLOBAL_PAGE.eventListen(e)
    GLOBAL_PAGE.eventDisplay(e.currentTarget.dataset.action)
  },

  /**
   * 触发view的隐藏显示
   */
  eventDisplay:function(action){
    var _display = {
      "onMenu":function(){ View.Switch.On("displayMenu") },
      "btnSearch":function(){ View.Switch.Off("displayMenu") },
      "btnShortcut":function(){ View.Switch.Off("displayMenu") },
      // "btnShare":function(){ View.Switch.Off("displayMenu") },
      // "menuCollect":function(){ View.Switch.Off("displayMenu") },
      "all":function(){ GLOBAL_PAGE.setData({menuType:0}) }, //公共透明遮罩
    }
    if (_display.hasOwnProperty(action))
      _display[action]()
    View.Switch.Work() //触发效果
  },
  eventListen:function(e){

    var _eventDict = {
      "onMenu":GLOBAL_PAGE.onMenu,
      "btnSearch":GLOBAL_PAGE.searchBtn,
      "btnShortcut":GLOBAL_PAGE.searchShortcut,
      "menuShare":GLOBAL_PAGE.menuShare,
      "menuCollect": GLOBAL_PAGE.menuCollect,
    }
    if (_eventDict.hasOwnProperty(e.currentTarget.dataset.action))
      _eventDict[e.currentTarget.dataset.action](e) 
  },


  inputBlur:function(e){
      var value = e.detail.value
      GLOBAL_PAGE.setData({keyword:value})
  },


  /**
   * 1 根据keyword，搜索
   */
  searchBtn:function(){
    var _keyword = GLOBAL_PAGE.data.keyword
    var url = Api.imgQuery() 
    // var session = wx.getStorageSync(KEY.session) 
    var session = "ds9"
    //获取表情列表
     wx.request({
        url: url, //仅为示例，并非真实的接口地址
        method:"GET",
        data: {
          session: session,
          category_id: '1',
          category_name: _keyword,
        },
        success: function(res) {
          var object = res.data
          GLOBAL_PAGE.renderEmoticon(object.img_list)
        }
      })
  },

  /** 2 点击Shortcut按钮，触发search搜索，
   * 更新keyword
   */
  searchShortcut:function(e){
    
    GLOBAL_PAGE.setData({
      keyword:e.currentTarget.dataset.keyword
    })
    GLOBAL_PAGE.searchBtn();

  },

  /** 3 点击表情，悬浮菜单
   */
  onMenu: function(e) {
      GLOBAL_PAGE.setData({
        selectEmoticon:{
          id: e.currentTarget.dataset.id, 
          img_url:e.currentTarget.dataset.img_url,
          category_id:e.currentTarget.dataset.category_id,
          size:e.currentTarget.dataset.size,
          static_url:e.currentTarget.dataset.static_url,
          }
      })

      
      // 显示缩略图
      GLOBAL_PAGE.setData({
          menuType: e.currentTarget.dataset.menu_type
      })
  },

  // 4 图片分享
  menuShare:function(){
    Menu.Option.Share( GLOBAL_PAGE.data.selectEmoticon )
  },

  /**
   * 5 菜单收藏按钮，可以收藏多张
   * 跳转到Page：private时，onShow方法一齐显示
   */
  menuCollect:function(){
      wx.request({
          url: Api.imgAdd() , 
          method:"GET",
          data: {
            session: wx.getStorageSync(KEY.session),
            img_id: GLOBAL_PAGE.data.selectEmoticon.id,
          },
          success: function(res) {
             console.log("collect success:",res.data)
              var object = res.data
              if (object.status == "true")
              {
                  //收藏成功
                  var e = wx.getStorageSync(KEY.emoticon)
                  e.push(object.img)
                  wx.setStorageSync(KEY.emoticon,e)

                  wx.showToast({
                      title: '收藏成功',
                      icon: 'success',
                      duration: 700
                  })
              }
          },
          fail:function(res){
            console.log("collect fail:",res.data)
          }
      })
  },

  onLoad: function () {
    GLOBAL_PAGE = this
    //1 page初始化高宽
    console.log("width:" , APP.globalData.windowWidth)
    console.log("height:" , APP.globalData.windowHeight - 48)
    GLOBAL_PAGE.setData({
      windowWidth:APP.globalData.windowWidth,
      windowHeight:APP.globalData.windowHeight - 48,
    })

    //测试初始化表情
    // GLOBAL_PAGE.initTest()
    GLOBAL_PAGE.searchBtn()

    //初始化关键字
    // GLOBAL_PAGE.setData({hotLabel:["默认目录","管理的哈哈","特技","疼"]})
    GLOBAL_PAGE.setData({hotLabel:["老司机","管理的哈哈","特技","疼","意外"]})
    

    var that = this;
    // 300ms后，隐藏loading
    setTimeout(function() {
        View.Switch.Off("displayLoading")
        View.Switch.Work()
    }, 300)
  },

  onHide:function(){
    View.Switch.OffAll()
    View.Switch.Work()
  },

  onShow: function() {
    var _view = {
      displayLoading:this.data.displayLoading,
      displayMenu:this.data.displayMenu,
    }
    View.Switch.Init(this,_view)
    View.Switch.Work()
  },

  onReady:function(){
  },

 
  
  renderEmoticon:function(emoticon){
    Render.emoticon(GLOBAL_PAGE,emoticon)
  },

  //图片加载完毕
  bindloadVertical:function(e){
    Render.menu.vertical(GLOBAL_PAGE,e)

  },
  bindloadHorizontal:function(e){    
    Render.menu.horizontal(GLOBAL_PAGE,e)
  },
})
