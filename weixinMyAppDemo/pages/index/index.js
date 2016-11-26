//index.js
//获取应用实例
var app = getApp();
function loadData(that,completeCallBack){
  wx.showNavigationBarLoading();
  wx.request({
    url:app.globalData.url.api.home,
    success: function(res) {
      console.log(res.data);
      //首页顶部的数据
      if(res.data.topAds){
        var len = res.data.topAds.length,imgUrls=[];
        for(var i=0;i<len;i++){
          imgUrls[i] = res.data.topAds[i].logo;
        }
        that.data.swiper.imgUrls=imgUrls;
      }
      //顶部下面的数据
      if(res.data.matchs){
        var len =res.data.matchs.length,matchsFirst=[],matchsSecond=[],matchsLast=[];
        for(var i=0;i<len;i++){
          var match = res.data.matchs[i];
          var sportBTime = new Date(match.sportBTime);
          match.sportBTime = (sportBTime.getMonth()+1)+"-"+sportBTime.getDay();
          var sportETime = new Date(match.sportETime);
          match.sportETime = (sportETime.getMonth()+1)+"-"+sportETime.getDay();
          if(!match.sportPic){//设置默认图片
            match.sportPic = "../images/normal.jpg";
          }
          if(match.dataType==0){
            matchsFirst[matchsFirst.length] = match;
          }
          else if(match.dataType==1){
            matchsSecond[matchsSecond.length] = match;
          }
          else if(match.dataType==2){
            matchsLast[matchsLast.length] = match;
          }
        }
        that.data.matchsFirst=matchsFirst;
        that.data.matchsSecond=matchsSecond;
        that.data.matchsLast=matchsLast;
      }
      wx.hideNavigationBarLoading();
      if(typeof completeCallBack == "function")completeCallBack();
    }
  });
    
  }
Page({
  data: {
    swiper: {//顶部轮播
      indicatorDots:true,
      autoplay:true,
      interval:5000,
      duration:1000,
      imgUrls:[
          "http://preview.quanjing.com/top014/top-663618.jpg",
          "http://preview.quanjing.com/top019/top-747622.jpg"
      ]
    },
    matchsFirst:[//通栏上面的赛事

    ],
    matchsSecond:[//通栏的赛事

    ],
    matchsLast:[//通栏下面的赛事

    ]
  },
  onPullDownRefresh: function () {
     loadData(this,function(){
      wx.stopPullDownRefresh({
        complete: function (res) {
          console.log(res, new Date())
        }
      });
    });  
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    loadData(this);  
  } 
})
