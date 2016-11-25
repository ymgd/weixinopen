Page({
  data: {
    nowPer: 30,               // 当前比例
    zeroRotate: -135,         // 
    duration: 500,            // 动画时长
    timingFunction: 'linear'  // 线性
  },
  onShow: function(){
    // 默认动画配置
    this.config = {
      duration: this.data.duration,
      timingFunction: this.data.timingFunction
    }

    // 初始化动画
    var animation = wx.createAnimation(this.config);

    // 初始化动画内容
    this.animation = animation;
    this.setData({
      animationDataRight: this.data.zeroRotate
    });

    setTimeout(function () {
      this.setData({
        animationDataRight: this.animation.rotate(this.data.zeroRotate + this.data.nowPer * 3.6).step().export()
      });
    }.bind( this ), 1000);
  },

  // 点击slider时触发
  startAnimate: function ( e ) {
    var diffRotate, speed, duration;
    var oldValue = this.data.nowPer;
    var value = e.detail.value;
    this.setData({
      nowPer: value
    });

    // 从大于50的值切换到小于50的数时，让右边的图形延迟触发，并保持和之前的速度进行动画
    if ( oldValue < 50 && value > 50 ) {
      diffRotate = ( 50 - oldValue ) * 3.6;
      speed = Math.floor(this.data.duration / diffRotate);
      duration = ( value - 50 ) * 3.6 * speed;
    }

    // 从小于50的值切换到大于50的数时，让左边的图形延迟触发，并保持和之前的速度进行动画
    if ( oldValue > 50 && value < 50 ) {
      diffRotate = ( oldValue - 50 ) * 3.6;
      speed = Math.floor(this.data.duration / diffRotate);
      duration = ( 50 - value ) * 3.6 * speed;
    }

    // 旋转的角度
    var rotate = value * 3.6;
    
    // 当旋转的角度小于180度，此时需要将左边隐藏
    if ( rotate <= 180 ) {
      this.setData({
        // 为了实现连续动画，这里进行了延迟与匀速处理
        animationDataRight: this.animation.rotate( this.data.zeroRotate + rotate ).step({delay: this.data.duration, duration: duration}).export(),
        animationDataLeft: this.animation.rotate( this.data.zeroRotate ).step().export()
      })
    } else {
      this.setData({
        animationDataRight: this.animation.rotate( 45 ).step().export(),
        animationDataLeft: this.animation.rotate( rotate - 180 + this.data.zeroRotate ).step({delay: this.data.duration, duration: duration}).export()
      })
    }
  }
})