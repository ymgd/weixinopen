//获取应用实例
var app = getApp()
Page({
  data: {
    imgPath: '',
    imgPaths: [],
    imgIndex: 0,
    imgLength: 0,
    showed: false,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  onLoad: function (options) {
    var that = this
    var imgInfo = JSON.parse(options.imgInfo)
    that.setData({
        imgPath: imgInfo.imgPath,
        imgPaths: imgInfo.imgPaths,
        imgIndex: Number(imgInfo.imgIndex),
        imgLength: imgInfo.imgPaths.length
    })
    try {
      wx.setStorageSync('imgPaths', [that.data.imgPaths,false])
    } 
    catch (e) {    
      }
  },
  //显示或者隐藏上方图片(图片详情，删除图片)
  changeShowed: function(){
    var that = this
    that.setData({
      showed: !(that.data.showed)
    })
  },

  //删除图片
  deleteImg: function(event){
    var that = this
    console.log(event) 
    var index = event.currentTarget.dataset.index
    //删除预览界面中图片
    that.data.imgPaths.splice(index, 1)
    that.setData({
      imgPaths: that.data.imgPaths,
      imgLength: that.data.imgLength - 1
    })
    //删除发布界面中图片
    try {
      wx.setStorageSync('imgPaths', [that.data.imgPaths,true])
    } 
    catch (e) {    
      }
  }


})