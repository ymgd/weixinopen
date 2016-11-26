Page({
  data:{
    text:"Page home",
    name:"kerwin",
    item:{name:"xiaoming",age:18},
    isCrated:true,
    isHidden:false,
    list:["1111","2222","3333","4444"],
    current:0
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
  handleTapEvent:function(){
    this.setData({
      name:"kerwin修改了",
      "item.age":10
    })
  },
  handleForEvent:function(ev){
    this.setData({
      current:ev.target.dataset.index
    })
  }
})