//index.js
//获取应用实例
var app = getApp();
let pageData={
  //页面的初始数据
  data: {
    motto: 'Hello World(点我吧！)',
    array:[{msg:1},{msg:2}],
    userInfo: {}
  },
 //---------------------------以上是初始化页面数据------------
  //页面加载时,只调用一次
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      //console.log(userInfo);
      that.setData({
        userInfo:userInfo
      })
    })
  }
}
//action-sheet
pageData.showActionSheet=function(e){
    wx.showActionSheet({
                itemList:['A','B','C'],//选项
                //成功回调
                success:function(res){
                    if(!res.cancel){
                        console.log(res.tapIndex)//返回0,1,2
                    }else{
                        console.log(res);//返回{errMsg:'showActionSheet:ok',cancel:true}
                    }
                },
                //字体颜色，默认值为下面这个
                itemColor:'#000000',//默认为这个
                //接口调用失败
                fail:function(){

                },
                //接口调用成功或者结束都执行
                complete:function(){

                }
            })
}
//modal
pageData.showModal=function(e){
    wx.showModal({
        title:'提示',
        content:'我是一个模态框',
        showCancel:true,
        cancelText:'我是取消',//最多4个字符【可以不写，默认值为取消】
        cancelColor:'#000000',//默认值为为 #000000
        confirmText:'我是确定',//默认值为确定
        confirmColor:'#000000',//默认值为#3cc51f
        //接口调用成功，并且res.confirm为为true时说明点击了确定，反之是取消
        success:function(res){
            if(res.confirm){
                console.log('用户点击确定');
            }
        },
        //接口调用失败
        fail:function(){

        },
        //成功或失败
        complete:function(){

        }
    })
}
//toast
pageData.toastSuccess=function(){
    wx.showToast({
        title:'成功',
        icon:'success',
        //几秒种后消失
        duration:2000
    })
}
pageData.toastLoading=function(){
    wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000   
    })
    setTimeout(function(){
        wx.hideToast()
    },2000);
}
Page(pageData);

