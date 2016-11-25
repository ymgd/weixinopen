Page({
  data:{
    // text:"这是一个页面"
    
      attr:{
                    "title":"关于软件",
                    "body":"版本更新[1.1]：\n 1.通信录授权BUG修复\n 2.提示信息错误修正 \n 3.应用软件图标优化"
                    }
                    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
      //http://mobile.yuyanzhe.me/app/remark.json

       
    //  var params = this.data.params;
    //  if(!params){
    //   params = new Object();
    //   params[versionName] = '1.1';
    //   params['device'] = '0';
    //   params['mac'] = 'F45C899F38F7';
    //   params['mobileCode'] = 'f8c3458cb9ed4c6ab15adbb29e1eab2f';
    //   params['version'] = '2';
    //   params['type'] = 'jvzhi';
    //   params['license'] = '5808896ae4b0d8009b7db789';

    //  }
     
    // var params = new Object();

    // wx.request({
    //   url: 'http://mobile.yuyanzhe.me/app/remark.json',
    //   data: 
    //     params
    //     ,
    //   method:'POST',
    //   header: {
    //       'Content-Type': 'application/json'
    //   },
    //   success: function(res) {
    //     console.log(res.data)
    //   }
// })


  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})