//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo:{},
    inputValue:"",
    mesArray:[]
  },
  
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '在线聊天'
    })
    var that = this
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function(userInfo){
        //更新数据
        that.setData({
          userInfo:userInfo
        })
      })
  },
  bindKeyInput:function(e){
    this.setData({
      inputValue: e.detail.value,
      inputSign:true
    });
   
  },
  
  sendMes:function(){
    var oriMesArr=this.data.mesArray;
    var newMes=this.data.inputValue;
    if(newMes!=""){
      var myNewMes={
                      mesType:"myItem",
                      mesitem:{
                        userInfo:this.data.userInfo,
                        mes:newMes
                      }
                    };
      oriMesArr.push(myNewMes);
      this.setData({mesArray:oriMesArr});
      this.setData({inputValue: ""});
      
    }
  }


})
