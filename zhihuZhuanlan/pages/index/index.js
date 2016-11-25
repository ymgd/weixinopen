//index.js
//获取应用实例

import Util from "../../utils/util";
import API  from "../../data/api";

Page({
  data: {
    columnList : [],
    postList : [],
    barInfo : {
      column : {"name" : '专栏·发现'},
      post   : {"name" : "文章·发现"}
    }
  }, 
  

  onLoad: function () {
    var that = this; 

  

  }, 
   
  onReady : function(){
    console.log("ready..");

      this.loadPost();
    this.loadColumn();
  },

  //下拉刷新
  onPullDownRefresh : function(){
      setTimeout(()=>{
         wx.stopPullDownRefresh();
      },2000);
  },
  
   //事件处理函数
  onChangeData: function(event) {
    Util.UI.loading(true);
   let type = event.target.dataset.btnType;
   switch(type){
     case "column":
        this.loadColumn();
        break;
      case "post":
        this.loadPost();
        break;
        default:
      break;
   }
  },
 
 onBindError : function(e){
   console.log("ddd..-->",e);
 },

 bindload : function(e){
   console.log("ddd..-->",e);
 },
  onForwardColumn : function(event){ 
      wx.navigateTo({
        url : "../column/column?slug="+ event.currentTarget.dataset.slug
      });
  },

   onForwardEditPost : function(event){ 
      wx.navigateTo({
        url : "../edit/edit"
      });
  },

  loadColumn : function(){
     let Config = getApp().Config;
//获得推荐栏目列表
    API.getRecommendColumns(Config.HOME.COLUMN.LIMIT,Config.HOME.COLUMN.OFFSET)
      .then((res)=>{
               console.log("res->",res);
               let data = res.data.map((d)=>{
                  d.avatar.src = Util.string.urlToHttp(d.avatar.template.replace("{id}_{size}",d.avatar.id+"_xl"));
                  return d;
              });
              console.log("渲染数据..",data);
              this.setData({
                "columnList": data
              });

               Util.UI.loading(false);
                
        });  

  },

  loadPost : function(){
  let Config = getApp().Config;
    //获得推荐文章列表    
    API.getRecommendPosts(Config.HOME.POST.LIMIT,Config.HOME.POST.OFFSET)
      .then((res)=>{
              console.log("res- POST>",res);

              let data = res.data.map((d)=>{
                  d.image_url = Util.string.urlToHttp(d.image_url);
                  return d;
              });

              this.setData({
                postList : data
              });

               Util.UI.loading(false);
        });  
    
  }
})
