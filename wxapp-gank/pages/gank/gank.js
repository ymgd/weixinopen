var pageNum = 1;
var totalData = [];
var lock = true;

Page({
  data: {
    gank: [],
    hidden:false,
    display:"none",
    loadMoreText:"加载中",
    animationData:{},
    img:"block"
  },
  onLoad: function () {
    var that = this;
    getList(that,pageNum);
  },
  clickBlock: function(e){
    wx.navigateTo({url:"/pages/single/single?time="+ e.currentTarget.dataset.blockTime});
  },
  loadMore: function(){
    var that = this;
    if(lock){
      that.setData({
        loadMoreText:"加载中"
      });
      that.update();
      getList(that,pageNum);
    }else{
      that.setData({
        loadMoreText:"不要急嘛"
      });
      that.update();
    }
  },
  jmpToSetting: function(){
    // 创建动画
    var animation = wx.createAnimation({
      duration:500,
      timingFunction:"ease-out",
    });
    var that = this;
    that.animation = animation;
    // 放大50倍，降低透明度
    animation.scale(50).opacity(0.3).step();
    // 隐藏 ‘+’
    that.setData({
      img:"none",
      animationData:animation.export()
    });
    // 页面跳转
    setTimeout(function(){
      wx.navigateTo({url:"/pages/setting/setting"});
    },300);
    // 动画复原
    setTimeout(function(){
      animation = wx.createAnimation({
        duration:0,
      });
      that.animation = animation;
      animation.opacity(1).step();
      that.setData({
        img:"block",
        animationData:animation.export()
      })
    },500);
  }
});

function getList(that,pageNo){
  lock = false;
  wx.request({
      url:"http://gank.io/api/history/content/10/" + pageNo,
      header:{
        "Content-Type":"application/json"
      },
      success:function(req){
        var data = req.data;
        pageNum += 1;
        if(data.error == false){
          var re = new RegExp("http://w{2}[^\"]*");
          for(var i = 0;i < data.results.length;i++){
            // 截取时间格式
            data.results[i].publishedAt = data.results[i].publishedAt.split('T')[0];
            // 解析url
            data.results[i].url = data.results[i].content.match(re)[0].replace("//ww","//ws");
            // 删除content
            delete data.results[i].content;
            // 全局变量储存数据
            totalData.push(data.results[i]);
          }
          that.setData({
            gank:totalData,
            hidden:true,
            display:"block",
            loadMoreText:"下滑加载更多"
          });
          that.update();
          lock = true;
        }
      }
    });
}