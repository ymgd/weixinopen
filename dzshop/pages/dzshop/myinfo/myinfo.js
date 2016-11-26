Page({
  data: {
   headimg:"/images/dezelogo.png",
   toast2Hidden:true,
    info:{
     name:"18770813402",
     sex:"保密"
   },
      email:"",
      qqnum:"",
      weixin:""
   },

  onLoad: function () {

  },
  saveqq:function(e){
    this.setData({
      qqnum:e.detail.value
    })
  },
  savewx:function(e){
    this.setData({
      weixin:e.detail.value
    })
  },
  saveem:function(e){
    this.setData({
      email:e.detail.value
    })
  },
  saveinfo:function(){
      this.setData({
        toast2Hidden:false
      })
  },
  toast2Change:function(){
    this.setData({
      toast2Hidden:true
    })
  }
})
