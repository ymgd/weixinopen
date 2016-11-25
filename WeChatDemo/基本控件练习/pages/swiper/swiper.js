var app = getApp();
Page({
  data:{
    indicatordos:true,
    autoplay:true,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'http://imgsrc.baidu.com/forum/pic/item/1080fc8b87d6277f026c80b428381f30e824fc46.jpg',
      'http://imgsrc.baidu.com/forum/pic/item/2eadcbef76094b366ac0bf0da3cc7cd98c109d84.jpg',
      'http://img1.tgbusdata.cn/v2/thumb/jpg/MGNlNiw3MzAsNzMwLDQsMSwxLC0xLDAscms1MA==/u/olpic.tgbusdata.cn/uploads/allimg/130124/62-130124160054.jpg'
    ],
    vertical:true,
  },
  
  displaychange:function(event){
      console.log(event.detail.current);//输出来当前swiper-item的index
   },

  changeautodisplay:function(){
    this.setData({
      autoplay:!this.data.autoplay//设置是否自动播放
  })
  },
  changeindicator:function(){
    this.setData({
  indicatordos:!this.data.indicatordos//隐藏图片那个点
})
  },
  changevertical:function(){
    this.setData({//设置水平方向
      vertical:!this.data.vertical
    })
  }

})
