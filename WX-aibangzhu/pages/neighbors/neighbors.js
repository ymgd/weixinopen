Page({
  data:{
    text:"Page neighbor",
    neighbors_authenticated:[
      {
        neighbor_name: "小叮当",
        neighbor_photo: "/image/Default Avatar.png"
      },
      {
        neighbor_name: "小叮当",
        neighbor_photo: "/image/Default Avatar.png"
      }
    ],
    neighbors_recently:[
      {
        neighbor_name: "小叮当",
        neighbor_photo: "/image/Default Avatar.png",
        neighbor_lastchat: "水电费水电费啥"
      },
      {
        neighbor_name: "小叮当",
        neighbor_photo: "/image/Default Avatar.png",
        neighbor_lastchat: "水电费水电费啥"
      }
    ],
    neighbors_all: [
      {
        neighbor_name: "小叮当",
        neighbor_photo: "/image/Default Avatar.png"
      },
      {
        neighbor_name: "小叮当",
        neighbor_photo: "/image/Default Avatar.png"
      }
    ]

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})