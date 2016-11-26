//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //	滑动动画时长1s
    
    navItems:[
      {
        name:'挂失查询',
        url:'loss',
        isSplot:true,
      },
      {
        name:'信息查询',
        url:'info',
         isSplot:true,
      },
      {
        name:'泄露查询',
        url:'leak',
        isSplot:true,
      },
      {
        name:'手机号码查询',
        url:'telephone',
        isSplot:true,
      }, 
      {
        name:'天气查询',
        url:'air_quality',
        isSplot:true,
      },
      {
        name:'待开发',
        url:'bill'
      }
    ]

  },
  onLoad: function () {
    console.log('=========onLoad========')
    
  }
    
})
