
//  不要在 onLaunch 的时候调用 getCurrentPage()此时 page 还没有生成。 
// getCurrentPage是获取当前页面的实例对象。

Page({
  
    data:{

    
picture: "../../image/0414couser.png",
name: "Wong",
       

// 1.菜单栏数据
  items:[
      {
       icon:'../../image/my_order@2x.png',
       text:'我的订单'
    },

    {
        icon:'../../image/my_wallet@2x.png',
       text:'我的钱包',
       arrow:'../../image/0106arrow3x.png'
    },

      {
        icon:'../../image/my_teacher@2x.png',
       text:'我的老师'
    },
    
      {
        icon:'../../image/my_collecte@2x.png',
       text:'我的收藏'
    },
    
      {
        icon:'../../image/my_about@2x.png',
       text:'关于学富'
    },
    
      {
        icon:'../../image/0128award@2x.png',
       text:'我的钱包'
    }
  ],

    }
})
