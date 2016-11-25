Page({
  data:{
    // text:"这是一个页面"
    list:[]
  },
  tapName: function(event) {
    console.log(event.currentTarget.id)
    wx.navigateTo({
      url:'../detial/detial?id=' + event.currentTarget.id,
      id:event.currentTarget.id
    })
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    const healthUri = 'http://www.tngou.net/api/' + options.type + '?id=3&rows=10'
    wx.request({
        url: 'http://www.tngou.net/api/info/list?id=3&rows=10',
        data: {},
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
            that.setData({list: res.data.tngou})
            console.log(res.data.tngou[0])
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