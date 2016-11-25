const app=getApp();
const request=require("../../utlis/requests");
const utils=require("../../utlis/util");
Page({
  data:{
    // 首页数据
    userInfo:{},
    imgUrls:["../../img/banner1.jpg","../../img/banner2.jpg"],
    count:0
  },
  onLoad:function(options){
    var that=this;
    //获取微信用户信息
    app.getUserInfo(function(user){
      that.setData({userInfo:user});
      console.log("用户信息绑定成功，"+user.nickName)
    });
    //发送数据请求
    request.getBookList("129","",function(res){
       if(res.data.count==0){return;}
      that.setData({bookList:res.data.books,count:that.data.count+res.data.count});
    })
            
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
    request.getBookList("129",{start:that.data.count},function(res){
      if(res.data.count==0){return;}
      that.setData({bookList:that.data.bookList.concat(res.data.books),count:that.data.count+res.data.count});
      wx.hideToast();
    })
  },
  scroll: function(e) {
    console.log("滚了");
    console.log(e)
  },
  touchstartEvt:function(event){
    console.log("触摸开始");
    console.log(event)
  },
  touchmoveEvt:function(event){
    console.log("移动");
    console.log(event)
    var touch=event.touches[0];
    var target=event.target;
  },
  onPullDownRefresh: function(e) {
    // Do something when pull down
    console.log("下拉事件");
  },
  onReady:function(){
    // 页面渲染完成
    wx.hideToast();
  },
  onShow:function(){
    // 页面显示
    console.log("page show.")
  },
  onHide:function(){
    // 页面隐藏
    console.log("page hide.")
  },
  onReachBottom:function(){
    console.log("daodile");
    
  },
  onUnload:function(){
    // 页面关闭
    console.log("page close.")
  }
})