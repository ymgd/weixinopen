Page({
  data:{
      msg:"",
      picUrl:"",
      sourceTypeName:["相册","相机","相册或相机"],
      sourceType:[['album'],['camera'],['album', 'camera']],
      sourceTypeIndex:2,
      sizeTypeName:["原图","缩略图","原图或缩略图"],
      sizeType:[['original'],['compressed'],['original', 'compressed']],
      sizeTypeIndex:2,
      countType:[1,2,3,4,5,6,7,8,9],
      countIndex:8,
      imgList:[]
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
  bindSourceType:function(event){
    //   console.log(event);
      this.setData({sourceTypeIndex:event.detail.value});
  },
  bindSizeType:function(event){
    //   console.log(event);
      this.setData({sizeTypeIndex:event.detail.value});
  },
  bindCount:function(event){
      // console.log(event.detail.value);
      this.setData({countIndex:event.detail.value});
  },
  /**
   * 选择图片
   */
   chooseImage:function(){
        // console.log("cho:",this.data.sourceType[this.data.sourceTypeIndex]);
        var that = this;
        wx.chooseImage({
        count: this.data.countType[this.data.countIndex], // 默认9
        sizeType: this.data.sizeType[this.data.sizeTypeIndex], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: this.data.sourceType[this.data.sourceTypeIndex], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            that.setData({imgList:res.tempFilePaths});
            // 获取图片信息
              wx.getImageInfo({
                src: res.tempFilePaths[0],
                success: function (res) {
                  console.log("图片宽：",res.width)
                  console.log("图片高：",res.height)
                }
              })


        },
        fail:function(error){
             console.log("接口调用失败的回调函数")
        },complete:function(e){
            console.log("complete:接口调用结束的回调函数（调用成功、失败都会执行）");
        }
        })

   },
   /**
    * 预览图片
    */
   previewImage:function(e){
    
       wx.previewImage({
        current: e.target.dataset.src, // 当前显示图片的http链接
        urls: this.data.imgList// 需要预览的图片http链接列表
        })
   }

})