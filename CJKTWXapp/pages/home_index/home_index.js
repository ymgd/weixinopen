var app = getApp()  
var functions = require('../functions.js')
var url = 'http://api.cjkt.com/package/detail?id=40'
Page({  
  data: {  
       courses: [],
      imgUrls: [  
       {  
          link:'/pages/index/index',  
          url:'http://m.cjkt.com/static/images/m/banner2.jpg'   
       },{  
          link:'/pages/logs/logs',  
          url:'http://m.cjkt.com/static/images/m/banner3.jpg'   
       },{  
          link:'/pages/test/test',  
          url:'http://m.cjkt.com/static/images/m/banner4.jpg'   
       }  ,{  
          link:'/pages/test/test',  
          url:'http://m.cjkt.com/static/images/640.jpg'   
       }  
    ],  
    currentTab:0,
    indicatorDots: true,  
    autoplay: true,  
    interval: 2000,  
    duration: 1000,  
    userInfo: {},
    subject_icons:[
        {
            image:'chinese.png',
            desc:'语文',
            color:'#FDBA2D'
        },{
            image:'english.png',
            desc:'英语',
            color:'#ff4351'
        },{
            image:'physics.png',
            desc:'物理',
            color:'#38a3e2'
        },{
            image:'chemistry.png',
       	    desc:'化学',
            color:'#6e45fa'
        }, {
            image:'chinese.png',
            desc:'数学',
            color:'#73d429'
        },{
            image:'english.png',
            desc:'高中数学',
            color:'#834dc6'
        },{
            image:'physics.png',
            desc:'套餐',
            color:'#3ec8d5'
        },{
            image:'chemistry.png',
       	    desc:'作业',
            color:'#f787bb'
        }
    ]
  },  
 onLoad: function (params) {
      console.log(123);
    var that = this;
      functions.fetchFilms.call(that, url, function(data){
        that.setData({
          showLoading: false
        })
      })
      if(params.time!= 1){
          wx.redirectTo({
          url: '../home_index/home_index?time=1'
      })
    } 
  },
  swiperChange: function(e) {
    console.log('swiper发生切换事件，携带value值为：', e.detail.current)
     var that = this;  
    that.setData( { currentTab: e.detail.current });
  },
  /** 
   * 点击tab切换 
   */  
  swichNav: function( e ) {  
  
    var that = this;  
  console.log('dianjile：', e.target.dataset.current)
    if( this.data.currentTab === e.target.dataset.current ) {  
      return false;  
    } else {  
      that.setData( {  
        currentTab: e.target.dataset.current  
      })  
    }  
  }  
})  