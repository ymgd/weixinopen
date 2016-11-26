Page({
  data:{
    //按钮设置参数
    titleColor : 'rgb(50,170,50)',  //标题按钮背景颜色
    titleHeight:100,                //标题高度，单位为rpx
    fontColor:'black',              //未选中字体颜色
    selectedFontColor : 'red',      //已选中字体颜色
    //指示器设置参数
    indicatorColor : 'red',         //指示条颜色
    bgColor : 'white',              //指示条背景颜色
    indicatorHeight:10,             //指示器高度，单位为rpx
    
    fontSizeL:15,                   //正常按钮字体，单位px,默认15
    fontSizeS:13,                   //缩小后按钮字体，单位px,标题数大于5自动缩小为13
    thresholdCount : 5,             //字体变化的数组数量临界点，默认为5组

    //在这个数组中按照格式增加和减少标题的数量               
    titles:[
                {
                  name:'标题一'
                },
                {
                  name:'标题二'
                },
                {
                  name:'标题三'
                },
                {
                  name:'标题四'
                }
            ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

      //计算按钮宽度
      this.computeWidth();
      //初始化指示器，默认第一个按钮选中
      this.defaultIndicator(0);
      //大于一定数量标题，字体设置为13号（默认）进行自适应
      var count = this.data.titles.length;
      var thresholdCount = this.data.thresholdCount;
      if(count > thresholdCount){
        this.setData({
          fontSize : this.data.fontSizeS
        })
      }else{
        this.setData({
          fontSize : this.data.fontSizeL
        })
      }
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
  //标题点击事件
  titleClick:function(e){
    var index = e.currentTarget.id;
    //全部设置为true
    this.defaultIndicator(index);
    //以下输入点击事件代码
  },
  //计算按钮宽度
  computeWidth:function(){
      var page = this;
      var count = this.data.titles.length;
      //获取屏幕宽度
      wx.getSystemInfo({
          success: function(res) {
            var divideWidth = 100 / count;
              page.setData({
                width : res.windowWidth,
                divideWidth : divideWidth
              })
          }
      })
  },
  //初始化指示器
  defaultIndicator : function(index){
      //全部设置为true
      var titles = this.data.titles;
      for (var i=0;i<titles.length;i++){
        titles[i].color = this.data.bgColor;
        titles[i].fontColor = this.data.fontColor;
      }
        titles[index].color = this.data.indicatorColor;
        titles[index].fontColor = this.data.selectedFontColor;
        this.setData({
        titles : titles
      })
  }
})