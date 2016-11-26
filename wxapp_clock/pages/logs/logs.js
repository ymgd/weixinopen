//logs.js
var util = require('../../utils/util.js')

let mmssArr = util.generateTimeArr(60);
let hhArr = util.generateTimeArr(12);
let interval = null;

Page({
  data: {
    hh: 0,
    mm: 0,
    ss: 0,
    hhArr: hhArr,
    mmArr: mmssArr,
    ssArr: mmssArr,
    timeInSecond: 0,
    displayTime: '00:00:00',
    time: 0,
    screenStyle: 'container-countdown',
    screenText: '倒计时',
    alarmSrc: '../../assets/beep.mp3',
  },

hhBindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      hh: e.detail.value
    })
  },

mmBindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
        mm: e.detail.value
    })
},

ssBindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
        ss: e.detail.value
    })
},

  onStartHandler(){
      if((!interval)&&(this.data.timeInSecond!=0)){
          this.setData({screenStyle: 'container-countdown'});
          this.setData({screenText: '倒计时'})
          this.setData({
                action: {
                    method: 'pause'
                }
            })
          interval = setInterval(()=>{
          this.setData({
              timeInSecond: this.data.timeInSecond-1
          })
          this.setData({
                //timeInSecond: util.getTotalSeconds(this.data.hh, this.data.mm, this.data.ss),
                displayTime: util.getHHSSMM(this.data.timeInSecond)
            })
        if(this.data.timeInSecond<=0){
            clearInterval(interval);
            interval = null;
            this.setData({screenStyle: 'time-up-container'});
            this.setData({screenText: '时间到!!!'})

            this.setData({
                action: {
                    method: 'play'
                }
            })
        }
      }, 1000)
      }else{
          console.log('interval', interval)
      }
      
  },

  onStopHandler(){
      this.setData({screenStyle: 'container-countdown'});
      this.setData({screenText: '倒计时'})
      this.setData({
            action: {
                method: 'pause'
            }
        })
      if(interval){
        clearInterval(interval);
        interval = null;
        this.setData({
          timeInSecond: util.getTotalSeconds(this.data.hh, this.data.mm, this.data.ss),
          //displayTime: util.getHHSSMM(this.data.timeInSecond)
        });
        this.setData({
            //timeInSecond: util.getTotalSeconds(this.data.hh, this.data.mm, this.data.ss),
            displayTime: util.getHHSSMM(this.data.timeInSecond)
        })
      }
  },

  onSetHandler(){
      //console.log(this.data)
      console.log(util.getHHSSMM(this.data.timeInSecond))
      this.setData({
          timeInSecond: util.getTotalSeconds(this.data.hh, this.data.mm, this.data.ss),
          //displayTime: util.getHHSSMM(this.data.timeInSecond)
      });
      this.setData({
          //timeInSecond: util.getTotalSeconds(this.data.hh, this.data.mm, this.data.ss),
          displayTime: util.getHHSSMM(this.data.timeInSecond)
      })
    console.log(this.data)
  },

  onHHChange(e){
      var value = e.detail.value
      if(!isNaN(value)){
          this.setData({
              hh: value
          })
      }
  },

  onMMChange(e){
      var value = e.detail.value
      if(!isNaN(value)){
          this.setData({
              mm: value
          })
      }
  },

  onSSChange(e){
      var value = e.detail.value
      if(!isNaN(value)){
          this.setData({
              ss: value
          })
      }
  }
})
