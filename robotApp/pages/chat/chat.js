Page({
  data:{
    message:[],
    inputMsg:"",
    scrollTop:0
  },
  onLoad:function(options){
    var message = wx.getStorageSync('message');
    var top = message.length * 100;
    this.setData({
      message:message || [],
      scrollTop:top
    })
    
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onUnload:function(){
    wx.setStorageSync('message',this.data.message);
  },
  inputMsg:function(e){
   this.setData({
     inputMsg:e.detail.value
   })
  },
  sendMessage:function(e){
    this.setData({
     inputMsg:e.detail.value.input
   })
    var that = this;
    if(this.data.inputMsg != ""){
      var msg = {type:0,src:"http://www.tuling123.com/resources/web/v4/img/personalCen/icon40.png",content:this.data.inputMsg};
      //发送信息
      this.setMessage(msg);
      //回复
      wx.request({
        url:"http://www.tuling123.com/openapi/api",
        header:{"Content-type":"application/json"},
        data:{key:"fa7f4d06b0a24b479d29ea0a01672350",info:msg.content},
        success:function(data){
          var reply = {type:1,src:"http://www.tuling123.com/resources/web/v4/img/personalCen/icon40.png",content:data.data.text};
          that.setMessage(reply);
          that.setData({
            scrollTop:that.data.scrollTop+300
          })
        }
      })
    }
  },
  setMessage:function(msg){
    var msgList = this.data.message;
    msgList.push(msg);
    this.setData({
      message:msgList,
      inputMsg:"",
    })
  }
})