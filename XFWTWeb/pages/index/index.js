Page({
  data: {

//1. 轮播图片数据
    imgUrls: [
      '../../image/home_banner1.png',
      '../../image/home_banner2.png',
      '../../image/home_banner3.png'
    ],

//2. 轮播配置
    autoplay:true,
    interval: 3000,
    duration: 1200,
  
  // 3.导航栏
  navs: [
    {
        image: '../../image/home_entity.png',
        text: '实体课程'
      },

       {
        image: '../../image/home_play.png',
        text: '在线直播'
      },

      
       {
        image: '../../image/home_door.png',
        text: '上门家教'
      }
    ],


     // 5.推荐课程
    cell: [
      {
       image:'../../image/0414couser.png',
       title:'新概念英语第1册',
       time:'8月20日 10:00',
       grade:'适合一年级',
       price:'￥100'
    },
      
      {
       image:'../../image/0414couser.png',
       title:'新概念英语第2册',
       time:'8月21日 10:00',
       grade:'适合二年级',
       price:'￥100'
    },
     
      {
       image:'../../image/0414couser.png',
       title:'新概念英语第3册',
       time:'8月22日 10:00',
       grade:'适合三年级',
       price:'￥100'
    },
    {
       image:'../../image/0414couser.png',
       title:'新概念英语第4册',
       time:'8月23日 10:00',
       grade:'适合四年级',
       price:'￥100'
    },
     
      {
       image:'../../image/0414couser.png',
       title:'新概念英语第5册',
       time:'8月24日 10:00',
       grade:'适合五年级',
       price:'￥100'
    }
      ],
 
  
  }

 
})