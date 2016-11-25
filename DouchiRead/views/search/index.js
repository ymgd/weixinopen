const app=getApp();
const request=require("../../utlis/requests");
Page({
  data:{
    value:"",
    bookList:null,
    count:0
  },
  changeValue:function(e){
    this.setData({value:e.detail.value});
  },
  searchHandel:function(){
    var that=this;
    if(that.data.value.replace(/\s/g,"")){
       that.setData({
            bookList:null
        })
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 10000
        })
        request.searchBook({q:that.data.value},function(res){
            if(res.data.count==0){return;}
            that.setData({bookList:res.data.books,count:that.data.count+res.data.count});
            wx.hideToast();
            console.log(res.data);
        })
    }
    else
    {
      wx.showToast({
        title: '请输入书名',
        icon:"loading"
      })
    }
  },
  toSearch:function(){
    var that=this;
    this.setData({start:0});
    that.searchHandel();
  },
  upper: function(e) {
    console.log("已到顶部");
    console.log(e)
  },
  lower: function(e) {
    console.log("已到低部");
    var that=this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    var sobj=that.data.bookTag ?{tag:that.data.bookTag,start:that.data.count}:{q:that.data.value,start:that.data.count};
    request.searchBook(sobj,function(res){
      if(res.data.count==0){return;}
      that.setData({bookList:that.data.bookList.concat(res.data.books),count:that.data.count+res.data.count});
      wx.hideToast();
    })
  },
  scroll: function(e) {
    console.log("滚");
    console.log(e)
  },
  onPullDownRefresh: function(e) {
    // Do something when pull down
    console.log("下拉事件");
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    if(options.tag){
      that.setData({bookTag:options.tag})
    }
  },
  onReady:function(){
    // 页面渲染完成
    var that=this;
    console.log("渲染了");
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 8000
    })
    if(that.data.bookTag){
       request.searchBook({tag:that.data.bookTag},function(res){
            if(res.data.count==0){return;}
            that.setData({bookList:res.data.books,count:that.data.count+res.data.count});
            console.log(res.data);
            wx.hideToast();          
        })
    }else{
      wx.hideToast();
    }
    
  },
  onShow:function(){
    // 页面显示
    console.log("显示了");
    
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})