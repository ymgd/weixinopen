//写文章

import API  from "../../data/api";
import Util from "../../utils/util";



Page({
  data: { 
    title : "",
    content : "",
    selectImg : ""
  },
    
 
  onLoad: function (query) {
    this.query = query;
    console.log("load..");
  }, 
   
  onReady : function(){
   
  },
  
  onSelectCoverImg : function(){
      var that = this;
      wx.chooseImage({
        count: 1, 
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res){
            let tempFilePaths = res.tempFilePaths;
            that.setData({
                selectImg : tempFilePaths
            })
          // success
        }
      })

  },
  onSubmitPost : function(){
      console.log(this.data.title);

      if(!this.data.title){
        Util.UI.toast("请输入标题!");
        return;
      }
 
      // if(!this.data.content){
      //   Util.UI.toast("请输入内容!");
      //   return;
      // }
           
      wx.showModal({
        title : "提示",
        content : "确定发表这篇文章吗?",
         success: function(res) {
          if (res.confirm) {
            
            wx.redirectTo({
              url : "../index/index"
            });
          }
        }
      });
  },

  bindKeyTitle : function(e){
    this.setData({
      title: e.detail.value
    });
  },

  bindKeyDesc : function(e){
        console.log( e.detail.value);
        this.setData({
           content: e.detail.value
        });
  },
  onForwardColumn : function(){
      wx.navigateTo({
        url : "../column/column"
      });
  }
  
})
