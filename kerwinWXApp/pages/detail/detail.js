Page({
  data: {
    film: {},
    options: null,
    isHidden:false
  },
  onReady: function(){
    var _this = this
    wx.setNavigationBarTitle({
      title: _this.data.options.title
    })
    
    setTimeout(function() {
         _this.getData();
    }, 2000);
  },
  onLoad: function (options) {
    
    this.data.options = options;
  },
  getData:function(){
    var _this = this;
    wx.request({
      url:"http://localhost/kerwinMock/detail.json",
      success:function(result){
        console.log(result);
         _this.setData({
          film: result.data,
          isHidden:true
        })
      }
    })
  }
})
