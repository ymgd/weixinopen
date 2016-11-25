Page({
  data:{
    title:'button'
  },
  onLoad:function(options){
      //上个界面传过来的数据options.title
    console.log(options.title);
    wx.setNavigationBarTitle({
        title: options.title
    });
    this.setData({
        title:options.title
    })
  },
  onReady:function(){
    
  },
  onShow:function(){
   
  },
  onHide:function(){
   
  },
  onUnload:function(){
   
  }
})