

function allPropos(obj){
    var props = [];
    for(var p in odj){
        if(typeof(obj[p] == "function")){}
        else{
            props.push({key: p, value: odj[p]});
        }
    }
    return props;
}
Page({
  data:{
   
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
   console.log("room onload");
   console.log(options);

   var that = this;
   if(options.data != null){

   }else{
   wx.request({
     url: 'http://open.douyucdn.cn/api/RoomApi/live/',
     data: {},
 //    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     header: {
         'Content-Type':'application/json'
     }, // 设置请求的 header
     success: function(res){
       // success
       console.log("Success  !!!");
       if(res.data.error == 0){
           console.debug("search ok");
           let roomlist = res.data.data;
           that.setData({roomlist: roomlist});
       }else{

       }
     },
     fail: function() {
       // fail
       console.log("fail !!!");
     },
     complete: function() {
       // complete
     }
   })}
  },
  onReady:function(){
    // 页面渲染完成
    String3
  },
  onShow:function(){
    // 页面显示

  },
  onHide:function(){
    // 页面隐藏
    String5
  },
  onUnload:function(){
    // 页面关闭
    String6
  }
})