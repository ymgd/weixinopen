Page({
  leftAngle: 0,
  rightAngle: 0,
  leftInterval: 0,
  data:{
    // text:"这是一个页面"
    configs: {},
    actionSheetItems: [],
    actionSheetHidden: true,
    title: "",
    desc: "",
    percentage: 10,
    leftAnimationData: {},
    rightAnimationData: {},
    leftBtnText: "开始",
    rightBtnText: "开始",
    leftTime: 60,
    rightTime: 60,
    leftColor: 'green',
    rightColor: 'green',
    leftWarn: 0,
    rightWarn: 0,

    warnSrc: '/assets/sound/countdown.mp3',
    alarmSrc: '/assets/sound/alarm.wav'

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      configs: wx.getStorageSync('configs')
    })
    
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    this.setData({
      configs: wx.getStorageSync('configs')
    });
    console.log(wx.getStorageSync('configs'))
    var actionSheetItems = [];
    var configs = wx.getStorageSync('configs');
    var first = true;
    for(key in configs){
      if(configs[key].isActive){
        if(first){
          var rawDesc = configs[key].desc;
          var newDesc = rawDesc.replace(/@/g, configs[key].duration+'秒')
          this.setData({
            title: configs[key].name,
            desc: newDesc,
            leftTime: configs[key].duration,
            rightTime: configs[key].duration,
            leftWarn: configs[key].notificationTime,
            rightWarn: configs[key].notificationTime
          });
          first = false;
        }
        actionSheetItems.push({
          name: configs[key].name,
          id: configs[key].id
        })
      }
    }
    this.setData({
      actionSheetItems: actionSheetItems
    });
    //create animation
    var animation = wx.createAnimation({
      duration: 1000,
        timingFunction: 'ease',
    })

    this.leftAnimation = this.rightAnimation = animation;
    // this.rightAnimation = animation;

  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  actionSheetTap(){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange(){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });    
  },
  bindItemTap:function(e){
    this.leftStop();
    this.rightStop();
    var configs = wx.getStorageSync('configs');
    for(key in configs){
      
      if(configs[key].id == e.target.id){
        var rawDesc = configs[key].desc;
        var newDesc = rawDesc.replace(/@/g, configs[key].duration+'秒')
        this.setData({
          title: configs[key].name,
          desc: newDesc,
          leftTime: configs[key].duration,
          rightTime: configs[key].duration,
          leftWarn: configs[key].notificationTime,
          rightWarn: configs[key].notificationTime
        });
      }
    }

    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  leftBtnPressHandler(){
    this.leftStart();
  },

  rightBtnPressHandler(){
    this.rightStart();
  },

  leftStop(){
    clearInterval(this.leftInterval);
    this.leftInterval = 0;
    this.audioPause();
    this.setData({
      leftBtnText: "开始"
    })
  },

  leftStart(){
    if(this.leftInterval&&this.leftInterval!=0){
      this.leftStop();
      this.alarmAudioPause();
    }else{
      this.rightStop();
      this.setData({
        leftBtnText: "停止"
      })
      this.leftAnimation.rotate(this.leftAngle+=30).step()
      this.setData({
        leftAnimationData:this.leftAnimation.export()
      })
      this.leftInterval = setInterval(()=>{
        this.leftAnimation.rotate(this.leftAngle+=30).step()
        this.setData({
          leftAnimationData:this.leftAnimation.export(),
        });
        if(this.data.leftTime<= this.data.leftWarn){
          this.setData({
            leftColor: 'orange'
          });
          this.audioPlay();
        }

        if(this.data.leftTime<=0){
          this.leftStop();
          this.setData({
            leftColor: 'red'
          });

          this.alarmAudioPlay();
        }else{
          this.setData({
            leftTime: this.data.leftTime-1
          })
        }
      }, 1000)
    }
  },

  rightStop(){
    this.audioPause();
    clearInterval(this.rightinterval);
    this.rightinterval = 0;
    this.setData({
      rightBtnText: "开始"
    })
  },

  rightStart(){
    if(this.rightinterval&&this.rightinterval!=0){
      this.rightStop();
      this.alarmAudioPause();
    }else{
      this.leftStop()
      this.setData({
        rightBtnText: "停止"
      })
      this.rightinterval = setInterval(()=>{
        this.rightAnimation.rotate(this.rightAngle+=30).step()
        this.setData({
          rightAnimationData:this.rightAnimation.export()
        });

        if(this.data.rightTime<= this.data.rightWarn){
          this.setData({
            rightColor: 'orange'
          });
          this.audioPlay();
        }

        if(this.data.rightTime<=0){
          this.rightStop();
          this.setData({
            rightColor: 'red'
          });
          this.alarmAudioPlay();
          
        }else{
          this.setData({
            rightTime: this.data.rightTime-1
          })
        }

      }, 1000)
    }
  },

  audioPlay() {
    this.setData({
      warnAction: {
        method: 'play'
      }
    })
  },
  audioPause() {
    this.setData({
      warnAction: {
        method: 'pause'
      }
    })
  },

  alarmAudioPlay() {
    this.setData({
      alarmAction: {
        method: 'play'
      }
    })
  },
  alarmAudioPause() {
    this.setData({
      alarmAction: {
        method: 'pause'
      }
    })
  },
})