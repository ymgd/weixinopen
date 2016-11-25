Page({
  data:{
  
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
  },
   showToast:function(){
      wx.showToast({
        title: '成功',
        icon: 'success', //只支持"success"、"loading"
        duration: 2000,
        success:function(data){
            console.log("success:",data)
        },
        fail:function(error){
            console.log("fail:",error)
        },
        complete:function(data){
            console.log("complete:",data)
        }
    })
  },
  showModal:function(){
      wx.showModal({
        title: '提示',
        content: '这是一个模态弹窗',
        success: function(res) {
            if (res.confirm) {
            console.log('用户点击确定')
            }
        }
    })
  },
  showActionSheet:function(){
     wx.showActionSheet({
        itemList: ['A', 'B', 'C','D','E','数组长度最大为6个'],
        itemColor:"",
        success: function(res) {
            if (!res.cancel) {
            console.log(res.tapIndex)
            }
        },
        fail:function(error){
            console.log("fail:",error)
        },
        complete:function(data){
            console.log("complete:",data)
        }
    })
  }
 
  
})