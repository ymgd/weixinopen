Page({
  data:{
    id:0,
    message:''
  },
  onLoad:function(options){
    var that = this;
    if(options.id != null) {
      this.setData({id:options.id+"detial"})
      const detialUri = 'http://www.tngou.net/api/' + 'info/show?id=' + options.id
      wx.request({
          url: detialUri,
          data: {},
          header: {
              'Content-Type': 'application/json'
          },
          success: function(res) {
              console.log(res.data.message)
              that.setData({message:res.data.message})
              // var date = new Date(1477108880000);
              // var Y,M,D,h,m,s;
              // Y = date.getFullYear() + '-';
              // M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
              // D = date.getDate() + ' ';
              // h = date.getHours() + ':';
              // m = date.getMinutes() + ':';
              // s = date.getSeconds();
              // console.log(Y+M+D+h+m+s);
          }
      })
    }
    if(options.info != null) {
      that.setData({message:options.info})
    }
  },
  onReady:function(){
  },
  onShow:function(){
  },
  onHide:function(){
  },
  onUnload:function(){

  }
})