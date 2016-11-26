Page({
  data:{
    // text:"这是一个页面"
    datas:[],
    currSize:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var index = options.pageIndex;
    var pageSize = 10;
    this.setData({currSize:((index - 1)*pageSize)});
    var endSize = this.data.currSize+pageSize;
    for(var i = this.data.currSize;i<endSize;i++){
      this.data.datas.push("第"+(i+1)+"章");
    }
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
  },clickShowContent:function(event){
    console.log("====="+event.target.id);
     wx.navigateTo({url:"../content/content?data="+event.target.id});
  }
})