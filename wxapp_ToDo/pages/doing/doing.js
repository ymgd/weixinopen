Page({
  data: {
    wisdoms: [
      '你热爱生命吗？那么别浪费时间，因为时间是构成生命的材料。',
      '炫耀什么，说明内心缺少什么。',
      '丈夫志四海，万里犹比邻。',
      '再牛的梦想，也抵不住你傻瓜似的坚持。',
      '知而好问，然后能才。'
    ],
    wisdom: '',
    animateLeft: {},
    animateRight: {},
    tdTitle: '',
    time: '开始',
    timeTotal: 0
  },
  onShow: function() {
    var wisdoms = this.data.wisdoms;
    var index = Math.floor(Math.random()*wisdoms.length);
    var time = Number(wx.getStorageSync('todoTime'));
    var name = wx.getStorageSync('todoName');
    this.setData({
      wisdom: wisdoms[index],
      timeTotal: time,
      tdTitle: name
    })
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    });
    this.animation = animation;
    setTimeout(function () {
      animation.rotate(45).step();
      this.setData({
        animateRight: animation.export()
      })
    }.bind(this), 1000)
    
    setTimeout(function () {
      animation.rotate(45).step();
      this.setData({
        animateLeft: animation.export()
      })
    }.bind(this), 2000)

    setTimeout(this.countDown.bind(this), 3000);
  },
  // 倒计时控制函数
  countDown: function() {
    var time = this.data.timeTotal
    var second = time * 60;
    this.changeCD(second);
  },
  changeCD: function(t) {
    setTimeout(function () {
      t --;
      var branch = 0, second = t % 60;
      if (t >= 60) {
        branch = Math.floor(t / 60);
      }
      branch = branch < 10 ? '0'+branch : ''+branch;
      second = second < 10 ? '0'+second : ''+second;
      this.setData({
        time: branch+':'+second
      })
      var total = this.data.timeTotal * 60;
      var animation = this.animation;
      if (t > total/2) {
        animation.rotate(45-(total - t)/total*360).step()
        this.setData({
          animateLeft: animation.export()
        })  
      } else {
        animation.rotate(-135).step();
        this.setData({
          animateLeft: animation.export()
        })
        animation.rotate(45-(total/2 - t)/total*360).step();
        this.setData({
          animateRight: animation.export()
        })
      }

      if (t > 0) {
        this.changeCD(t);
      } else {
        this.setData({
          time: '结束'
        })
      }
    }.bind(this), 1000);
  }
})