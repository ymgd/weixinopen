var app = getApp();
Page({
  data:{
    dynamics:[//动态

    ]
  },
  onLoad:function(options){
    console.log('onLoad social')
    var that = this;
    wx.showNavigationBarLoading();
    wx.request({
      url:app.globalData.url.api.socialHome,
      success: function(res) {
        console.log(res.data);
        //首页顶部的数据
        if(res.data.list){
          var len =res.data.list.length,dynamics=[];
          for(var i=0;i<len;i++){
            var dynamic = res.data.list[i];
            dynamic.commtime = app.formatShowTime(new Date(dynamic.commtime*1000));
            dynamic.photosStr = JSON.stringify(dynamic.photos);
            dynamics[dynamics.length] = dynamic;
          }
          that.data.dynamics=dynamics;
        }
        wx.hideNavigationBarLoading();
      }
    });
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
  previewSocialImage:function(event){
     var dataSet = event.currentTarget.dataset;
    if(dataSet){
      if(dataSet.photos){
        var photos = JSON.parse(dataSet.photos);
        var photosUrlList = [],len=photos.length;
        for(var i=0;i<len;i++){
          var photo = photos[i];
          photosUrlList[i] = photo.image?photo.image:photo.thumb;
        }
        if(photosUrlList.length>0){
          console.log(photosUrlList);
          wx.previewImage({
            current:photosUrlList[dataSet.currentItemSeq], // 当前显示图片的http链接
            urls:photosUrlList, // 需要预览的图片http链接列表
            success:function(){
              console.log("success");
            },
            fail:function(){
              console.log("fail");
            },
            complete:function(){
              console.log("complete");
            }
          });
        }
      }
    }
  }
});