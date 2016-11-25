Page({
  data:{
      
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