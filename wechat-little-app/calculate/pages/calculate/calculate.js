Page({
  data:{
    // text:"这是一个页面"
    id1:"back",
    id2:"clear",
    id3:"negative",
    id4:"+",
    id5:"9",
    id6:"8",
    id7:"7",
    id8:"-",
    id9:"6",
    id10:"5",
    id11:"4",
    id12:"×",
    id13:"3",
    id14:"2",
    id15:"1",
    id16:"÷",
    id17:"0",
    id18:".",
    id19:"history",
    id20:"=",
    screenData:"0",
    lastIsOperator:false
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
  clickButton:function(event){
      console.log(event.target.id);
      var sd = this.data.screenData;
      var data;
      if(sd == 0){
          data = event.target.id;
      }else{
          data = sd + event.target.id;
      }
      this.setData({screenData:data});
  },
  
  history:function(){
  wx.navigateTo({
      url:'../list/list'
  })
  }


})