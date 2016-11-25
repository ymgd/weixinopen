Page({
  data:{
    info:[
                {
                  title:"利息总额",
                  detail:"300.0"
                },
                {
                  title:"剩余本金",
                  detail:"10000.0"
                },
                {
                  title:"贷款期限",
                  detail:"2016-05-16至2016-05-16"
                }
              
              ],

     name: '还款计划',
      dateList: [
          {
            date: '2016-05-16',
            amount: '930.0'
          }, 
          
          {
            date: '2016-05-16',
            amount: '0.0'
          }
          
          ],
      opened: false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
    title: '还款计划详情'
})
  },
  onReady:function(){
    // 页面渲染完成
    String3
  },
  onShow:function(){
    // 页面显示
    String4
  },
  onHide:function(){
    // 页面隐藏
    String5
  },
  onUnload:function(){
    // 页面关闭
    String6
  },
  tapMenu: function (e) {
     
     //取出每一个元素
      var opened = this.data.opened; 
      opened = !opened
      this.setData({opened:opened})
      
      console.log(changeData)
    
  }

})