var subjectUtil = require('../../utils/subjectUtil.js');


Page({
  data:{
    // text:"这是一个页面"
    inputVal:"",
    movies:[],
    hidden:true,
    modalHidden : true
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
  bindKeyInput:function(e){
      this.setData({inputVal:e.detail.value});
  },
  search:function(){
    //判断搜索条件不能为空
    if(this.data.inputVal==""){
      this.setData({modalHidden:false})
      return;
    }

    this.setData({hidden:false});
    var page = this;
  wx.request({
    url:'https://api.douban.com/v2/movie/search?q='+page.data.inputVal,
    header:{
      'Content-Type':'application/json'
    },
    success:function(res){
      var subjects = res.data.subjects;
      subjectUtil.processSubjects(subjects);
      page.setData({movies:subjects,hidden:true});
    }
  })

  },

hideModal:function(){
  this.setData({modalHidden:true})
},

//点击电影进入相信界面
 detail:function(e){
   getApp().detail(e)
 }

})