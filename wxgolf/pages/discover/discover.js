
const app = getApp()
Page({
  data:{
    // text:"这是一个页面"
    // array:[{
    //   mode: 'aspectFill',
    //   text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来'
    // }],
    // src: '../../images/game_bg.png'
  },
  imageError: function(e) {
    console.log('image3发生error事件，携带值为', e.detail.errMsg)
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
  }
})
// Page({
//   data: {
//     array: [
//     //   {
//     //   mode: 'scaleToFill',
//     //   text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
//     // }, {
//     //   mode: 'aspectFit',
//     //   text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来'
//     // }, {
//     //   mode: 'aspectFill',
//     //   text: 'aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来'
//     // }, {
//     //   mode: 'top',
//     //   text: 'top：不缩放图片，只显示图片的顶部区域'
//     // }, {
//     //   mode: 'bottom',
//     //   text: 'bottom：不缩放图片，只显示图片的底部区域'
//     // }, {
//     //   mode: 'center',
//     //   text: 'center：不缩放图片，只显示图片的中间区域'
//     // }, {
//     //   mode: 'left',
//     //   text: 'left：不缩放图片，只显示图片的左边区域'
//     // }, {
//     //   mode: 'right',
//     //   text: 'right：不缩放图片，只显示图片的右边边区域'
//     // }, {
//     //   mode: 'top left',
//     //   text: 'top left：不缩放图片，只显示图片的左上边区域'
//     // }, {
//     //   mode: 'top right',
//     //   text: 'top right：不缩放图片，只显示图片的右上边区域'
//     // }, {
//     //   mode: 'bottom left',
//     //   text: 'bottom left：不缩放图片，只显示图片的左下边区域'
//     // }, {
//     //   mode: 'bottom right',
//     //   text: 'bottom right：不缩放图片，只显示图片的右下边区域'
//     // }
//     {
//       mode: 'aspectFit',
//       text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来'
//     }
//     ],
//     src: '../images/game_bg.png'
//   },
//   imageError: function(e) {
//     console.log('image3发生error事件，携带值为', e.detail.errMsg)
//   }
// })