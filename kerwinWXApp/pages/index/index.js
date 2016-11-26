Page({
  data:{
    text:"Page index",
    theaterssubjects:[],
    comingsubjects:[],
    isTheatersHiddenLoading:false,
    isComingHiddenLoading:false,
    currentIndex:0
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    var _this =this;
    setTimeout(function(){
       _this.sendTheatersRequest();
    },2000);
  },

  sendTheatersRequest:function(){
    var _this =this;
    wx.request({
      url:"http://localhost/kerwinMock/theaters.json",
      success:function(result){
        console.log(result);
        _this.setData({
          theaterssubjects:result.data.subjects,
          isTheatersHiddenLoading:true
        })
      }
    })
  },

  sendComingSoonRequest:function(){
    var _this =this;
    wx.request({
      url:"http://localhost/kerwinMock/coming_soon.json",
      success:function(result){
        console.log(result);
        _this.setData({
          comingsubjects:result.data.subjects,
          isComingHiddenLoading:true
        })
      }
    })
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
  handleUpperEvent:function(){
    this.setData({
      isTheatersHiddenLoading:false
    })
    var _this =this;
    setTimeout(function() {
      _this.sendTheatersRequest();
    }, 2000);
  },

  handleComingUpperEvent:function(){
    this.setData({
      isComingHiddenLoading:false
    })
    var _this =this;
    setTimeout(function() {
      _this.sendComingSoonRequest();
    }, 2000);
  },

  handleSwiperChange:function(ev){
    var _this = this;
    if(this.data.comingsubjects.length==0){
      setTimeout(function(){
        _this.sendComingSoonRequest();
      },2000);
    }
    this.setData({
        currentIndex:ev.detail.current
      })

  },
  handleNavEvent:function(ev){
    this.setData({
      currentIndex:ev.target.dataset.index
    })
  },
  handleItemClick:function(ev){
      wx.navigateTo({
        url:"../detail/detail?id="+ev.currentTarget.dataset.id+"&title="+ev.currentTarget.dataset.title
      })
  }
})