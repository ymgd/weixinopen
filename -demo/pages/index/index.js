Page({
  data:{
    // text:"这是一个页面"
     imgUrls: [
      '../../../images/swipbackground.png',
      '../../../images/swipbackground.png',
      '../../../images/swipbackground.png'
    ],
    autoplay: true,
    interval: 3000,
    duration: 1000,
    indicatorDots:"true",
    position:"../../../images/position.png",
    address:"传感网信息服...",
    arror:"../../../images/arror2.png",
    searchbutton:"../../../images/searchbutton.png",
    search:"搜索",
    details:[{imgurl:"../../../images/detail1.png",text:"美食"},
             {imgurl:"../../../images/detail2.png",text:"超市"},
             {imgurl:"../../../images/detail3.png",text:"鲜果购"},
             {imgurl:"../../../images/detail4.png",text:"下午茶"},
             {imgurl:"../../../images/detail5.png",text:"正餐优选"},
             {imgurl:"../../../images/detail6.png",text:"美团专送"},
             {imgurl:"../../../images/detail7.png",text:"家常菜"},
             {imgurl:"../../../images/detail8.png",text:"精选小吃"}],
    leftpicture:"../../../images/leftpicture.png",
    righttoppicture:"../../../images/right-toppicture.png",
    rightbottomleft:"../../../images/right-bottom-left.png",
    rightbottomright:"../../../images/right-bottom-right.png"
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