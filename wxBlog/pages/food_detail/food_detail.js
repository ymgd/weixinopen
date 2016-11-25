//index.js
var nav = require('../../utils/nav.js'); //获取导航的实例
var foodData = require('../../utils/foodDetail_data.js'); //获食物详细信息的实例

Page({
  data: {
    nav:nav.NavF(),
  },
  onLoad: function (options) {
    this.Nav_Init();
    var food = this.requestData(options.id);
    this.page_Init(food);
  },
  page_Init: function(data){
    this.setData({
      food:data
    });
  },
  requestData: function(id){
    var data = foodData.foodData;
    var food;

    for(var i = 0;i < data.length;i++){
      if(id == data[i].id){
        food = data[i];
      }
    }

    return food;
  },
  Nav_Init: function(){
    var thisNav = nav.NavF();
    thisNav.color = "rgb(193, 153, 209)";
    thisNav.navCont[4].border = "5rpx solid #333";
    this.setData({
      nav:thisNav
    });
  }
})