Page({
  data:{
    expressNum:'',
    expressCom: [
      ['圆通','中通','申通','韵达','顺丰'],
      ['yuantong','zhongtong','shentong','yunda','shunfeng']
    ],
    index: 0,
    expressInfo:[]
  },
  input:function(e){
    console.log(e.detail.value);
    this.setData({
      expressNum:e.detail.value
    });
  },
  catchPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  showInfo:function(){
    var that=this;
      wx.request({
        url:"http://www.kuaidi100.com/query",
        data:{
          postid:that.data.expressNum,
          type:that.data.expressCom[1][that.data.index]
        },
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
          that.setData({
            expressInfo:res.data.data
          });
          console.log(res.data)
        }
      })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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