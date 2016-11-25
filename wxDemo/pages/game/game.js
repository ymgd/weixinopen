//index.js
//获取应用实例
let app = getApp()
Page({
  data: {
    num: 0,
    state: true
  },
  onLoad() {
    
  },
  random(){
      this.setData({
          num:Math.ceil(Math.random()*100)
      })
  },
  timer: {},
  handleBtnClick(e){
      if(this.data.state){
          this.timer = setInterval(this.random, 20);
      }
      else{
          clearInterval(this.timer);
      }
      this.setData({
          state: !this.data.state
      })
  }
})
