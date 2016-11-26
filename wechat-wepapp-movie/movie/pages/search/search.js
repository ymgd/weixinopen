var subjectUtil = require('../../utils/subjectUtil.js');
Page({
  data:{
    inputVal: "",
    movies:[],//api数据
    hidden: true,//loading显示
    modalHidden: true,//输入值为空提示框显示
    mlHidden: true//查找不到数据，提示框显示
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
  bindKeyinput: function(e){//获取输入框字符
    console.log(e);
    this.setData({
      inputVal: e.detail.value
    })
  },
  search: function(){
    if(this.data.inputVal==""){//如果输入值为空时，弹出提示框并返回
      this.setData({modalHidden: false});
      return;
    }
    this.setData({hidden:false})//查找数据时显示loading
    var page = this;
    wx.request({//请求搜索api
      url: "https://api.douban.com/v2/movie//search?q="+ page.data.inputVal,
      header:{
        "Content-Type": "application/json"
      },
      success: function(res){
        console.log(res);
        var subjects = res.data.subjects
        if(subjects.length==0){//如果搜索不到电影，弹出提示框并返回
          page.setData({hidden: true, mlHidden:false});
          return;
        }
        subjectUtil.processSubjects(subjects)//模板化调用函数
        page.setData({
          movies: subjects,
          hidden: true,
        })

      }
    })
  },
  hideModal: function(){
    this.setData({modalHidden:true})
  },
  hModal: function(){
    this.setData({mlHidden:true})
  },
  detail: function(e){
    getApp().detail(e);
  }
})