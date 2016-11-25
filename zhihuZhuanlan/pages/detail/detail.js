//index.js
//获取应用实例

import API  from "../../data/api";
import Util from "../../utils/util";

let  pageInex = 1;

Page({
  data: { 
    commentList : [],
    barInfo : {
      comment : {"name" : '热门评论'},
      recommend : {"name" : "推荐阅读"}
    },
    detail : {},
    isLoadMore : false,
    isEnd : false
  },
   
 
  onLoad: function (query) {
    this.query = query;
    console.log("load..");
  }, 
   
  onReady : function(){
    pageInex = 1;
    this.loadDetail();
    this.loadComment();   
    console.log("ready..");
  },

  onReachBottom : function(e,a){
      //加载更多
      if(!this.data.isEnd && !this.data.isLoadMore){
          this.loadComment();
      }
      
  },
  
  onForwardColumn : function(){
      wx.navigateTo({
        url : "../column/column"
      });
  },

  onPreImage : function(e){
      let src = e.currentTarget.dataset.imgSrc;
      Util.UI.preImage(src);
  },


  loadDetail : function(){
    let Config = getApp().Config;
      //获得文章详情  
      API.getPostDetailBySlug(this.query.slug)
        .then((res)=>{
                console.log("res- POST>",res.data[0]);    
                let data = res.data[0];
                if(data.targetPost.publishedTime){
                   let pTime = new Date(data.targetPost.publishedTime);
                   data.targetPost.publishedTime = `${pTime.getMonth()+1}月${pTime.getDate()}日`;
                }

                if(data.targetPost.titleImage){
                  data.targetPost.titleImage =  Util.string.urlToHttp(data.targetPost.titleImage);
                }  

                if(data.targetPost.author.avatar){
                   data.targetPost.author.avatar.src =   Util.string.urlToHttp(data.targetPost.author.avatar.template.replace("{id}_{size}", data.targetPost.author.avatar.id+"_xl"));
                }                
                this.setData({
                  detail : data
                });
                // wx.setNavigationBarTitle({
                //   title: data.sourceColumn.name
                // })

          });  
    
  },

  loadComment : function(){
      this.setData({
        isLoadMore : true
      });

      let Config = getApp().Config;
      let offset = (pageInex - 1 )* Config.POST_DETAIL.COMMENT.LIMIT;

      console.log("offset..",offset);
      //获得文章评论
      API.getPostCommentsBySlug(this.query.slug,Config.POST_DETAIL.COMMENT.LIMIT,offset)
        .then((res)=>{
            console.log("res- POST>",res);
            if(res.data.length <=0){
              this.setData({
                isLoadMore : false,
                isEnd : true
              });
              return;
            }

              
            let data = res.data.map((d)=>{ 
                      d.author.avatar.src =  Util.string.urlToHttp(d.author.avatar.template.replace("{id}_{size}",d.author.avatar.id+"_xl"));
                      if(d.createdTime){
                            let pTime = new Date(d.createdTime);
                            d.createdTime = `${pTime.getMonth()+1}月${pTime.getDate()}日`;
                        }
                      return d;
                });
                          
                this.data.commentList = this.data.commentList.concat(data);   
                this.setData({
                  commentList : this.data.commentList,
                  isLoadMore : false
                });

                pageInex++;
          });  

  }
  
})
