import menus from './resources/json/menus.js'
Page({
  data:{
    text:"Page main",
    background: [
      {
        color:'green',
        sort:1
      }, 
      {
        color:'red',
        sort:2
      },
      {
        color:'yellow',
        sort:3
      }
      ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1200,
    toView: 'blue',
    'menus':menus
  },
  selectMenu:function(event){
    let item = event.currentTarget.dataset
    this.setData({
      toView: item.tag
    })
    // this.data.toView = 'red'
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
  },
  onScroll:function(e){
    console.log(e)
  }
})