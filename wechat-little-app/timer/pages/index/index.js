Page({
    leftMove:0,
    rightMove:0,

  data:{
    // text:"这是一个页面"
    actionSheetHidden: true,
    actionSheetItems: [],
    title:"",
    desc:"",
    voice:0,
    leftAnimationData:{},
    rightAnimationData:{},
    leftTime:0,
    rightTime:0,
    src:'/assets/sound/countdown.mp3'
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    
    var configs = wx.getStorageSync('configs');
    var actionSheetItems = [];
    var first = true;
    for(var i in configs){
      var config = configs[i];
      if(config.state){
        if(first){
          var desc = config.desc.replace(/@/g,config.time+"秒");
          this.setData({title:config.name,desc:desc,leftTime:config.time,rightTime:config.time,voice:config.voice});
          first = false;
        }
        actionSheetItems.push({name:config.name,id:config.id});
      }
    }

   this.setData({actionSheetItems:actionSheetItems});

  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  actionSheetTap: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindItemTap:function(e){
     this.leftStop();
     this.rightStop();
    // console.log(e);
    var id =e.target.id;
    var configs = wx.getStorageSync('configs');
    var config = configs[id];
    var desc = config.desc.replace(/@/g,config.time+"秒");
    this.setData({title:config.name,desc:desc,actionSheetHidden:true,leftTime:config.time,rightTime:config.time,voice:config.voice});
  },

  //左边点击停止
  leftStop:function(){
      
      clearInterval(this.leftInterval);

      this.leftInterval = 0;

      this.audioPause();
    
  },
    //右边点击停止
  rightStop:function(){
      
      clearInterval(this.rightInterval);

      this.rightInterval = 0;

      this.audioPause();
    
  },
  // 左边按钮的点击
  leftStart : function(){

   this.rightStop();

    if(this.leftInterval&&this.leftInterval!=0){
          this.leftStop();
          return;
        }
    
      var animation = wx.createAnimation({
        duration:1000,
        timingFunction:'ease'
      })

      animation.rotate(this.leftMove += 100).step();
      this.setData({
        leftAnimationData:animation.export()
      })


      var page = this;
     var leftInterval = setInterval(function(){
        if(page.data.leftTime <= 0){
                page.leftStop();
                return;
              }
              //判断时间
              if(page.data.leftTime <= page.data.voice){
               page.audioPlay();
              }

          animation.rotate(page.leftMove += 100).step();
                page.setData({
                  leftAnimationData:animation.export()
                });
      page.setData({leftTime:page.data.leftTime-1})
      },1000);//每个一秒 执行一次

      this.leftInterval = leftInterval;

  },
   // 右边按钮的点击
  rightStart : function(){

     this.leftStop();
      if(this.rightInterval&&this.rightInterval!=0){
          this.rightStop();
          return;
        }

      var animation = wx.createAnimation({
        duration:1000,
        timingFunction:'ease'
      })

      animation.rotate(this.rightMove += 100).step();
      this.setData({
        rightAnimationData:animation.export()
      })

      var page = this;
     var rightInterval = setInterval(function(){

       if(page.data.rightTime <= 0){
         page.rightStop();
         return;
       }
              //判断时间
              if(page.data.rightTime <= page.data.voice){
               page.audioPlay();
              }

          animation.rotate(page.rightMove += 100).step();
                page.setData({
                  rightAnimationData:animation.export()
                });
     page.setData({rightTime:page.data.rightTime-1})
      },1000);//每个一秒 执行一次

      this.rightInterval = rightInterval;
  },
  audioPlay: function () {
    this.setData({
      action: {
        method: 'play'
      }
    })
  },
  audioPause: function () {
    this.setData({
      action: {
        method: 'pause'
      }
    })
  }
})