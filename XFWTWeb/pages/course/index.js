
//  不要在 onLaunch 的时候调用 getCurrentPage()此时 page 还没有生成。 
// getCurrentPage是获取当前页面的实例对象。

Page({
  
    data:{

// 1.菜单栏数据
  menuItems:[
      {
       courseName:'实体课程',
       id:'0'
    },
      {
       courseName:'在线直播',
       id:'1'
    },
      {
       courseName:'上门家教',
       id:'2'
    }
  ],

  courseTitle:"Vip1对1辅导",
  courseGrade:"一年级",
  coursePay:"￥100/小时",
  courseCount:"x 2",
  courseOrderid:"订单号:108975240",
  coursePrice:"总价：￥200",

// 2.列表
  lists:[0,1,2],

    // 3.item数据
    image:"../../image/0713head.png",
    interval: 3000,
    duration: 1200,
    color: 'light-gray',
     currentMenuID : '0',
     currentPage:0,
   },


// 3.点击菜单栏
tapMenuItem:function(e){

   let id = e.currentTarget.id
   this.setData({
     currentMenuID:id,
     currentPage:id
    })
},

// 滑动改变当前页面
changeCurrentPage:function(e){
 

   let id = e.detail.current
   this.setData({
     currentMenuID:id,

    })
},

})



 