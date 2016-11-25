const app = getApp()
Page({
  data:{
    // text:"这是一个页面"
    tableTitles:[
      {icon: '../../images/icon_new_account.png', title: '我的账户'},
      {icon: '../../images/menu_list_blue_icon.png', title: '球场订单'},
      {icon: '../../images/commodity_order_icon.png', title: '球具订单'},
      {icon: '../../images/commodity_cart_icon.png', title: '购物车'},
    ]
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