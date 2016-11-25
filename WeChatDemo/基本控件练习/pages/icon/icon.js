
Page({
  data: {
    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconType: [
      'success', 'info', 'warn', 'waiting', 'safe_success', 'safe_warn',
      'success_circle', 'success_no_circle', 'waiting_circle', 'circle', 'download',
      'info_circle', 'cancel', 'search', 'clear'
    ],
    width:6,
    showinfo:true,
    percent:30,
    active:true,
  },
  changeWidth:function(){
      this.setData({
          width:this.rand() ? this.data.width-1:this.data.width+1 
      })
      console.log(this.data.width);
  },
  changeShowInfo:function(){
      this.setData({
          showinfo:!this.data.showinfo
      })
  },
  changepercent:function(){
      this.setData({
          percent:this.rand() ? this.data.percent-1:this.data.percent+1 
      })
  },
  changeactive:function(){
    this.setData({  
          active:!this.data.active
      })
  },
  switch1Change:function(e){
      console.log("switch的状态:"+e.detail.value);
  },
  rand:function(){
      var number1 = Math.random();
      number1 = Math.floor(number1*10);
      return number1%2==1;
  }
})