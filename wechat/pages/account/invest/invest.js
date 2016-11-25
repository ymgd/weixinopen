var app =getApp()
Page({
  data:{
    "text":"投资记录",
    investList:[],
    scrollTop : 0
  },
  onLoad:function(e){
    var that = this;
    //   console.log(that);
      wx.request({
      url: 'https://www.phyt88.com/v2/member/get_invest_project_list.jso?startTime=0&endTime=2524579200&status=0&refundType=0&pageSize=5&pageIndex=1',
      data:"",
      method:"POST",
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        // console.log(res.data.investRecordOutput.rows);
        // console.log(res)
        // that.setData({
        //     investList:res.data.rows,
        //   })  
      }
    }),
    wx.getSystemInfo({
        success:function(res){
            console.info(res.windowHeight);
            that.setData({
                scrollHeight:res.windowHeight
            });
        }
    });
  },
  change:function(){
    console.log(123)
  },
  bindDownLoad:function(){
    console.log("滑动到了底部了")
  },
  scroll:function(event){
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    console.log("开始滑动了")
     this.setData({
         scrollTop : event.detail.scrollTop
     });
  },
})