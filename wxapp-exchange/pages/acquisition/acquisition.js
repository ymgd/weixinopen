Page({
  data:{
    text:"Page acquisition",
    opacityFlag : false ,
    animationData : {} ,
    //tab区数据
    tabItems : [
      {
        text : '综合' ,
        selected : true 
      },
      {
        text : '到期净收益率',
        selected : false ,
        upflag : false ,
        downflag : false 
      },
      {
        text : '剩余期数',
        selected : false ,
        upflag : false ,
        downflag : false 
      }
    ],

    //内容区数据
    contentItems : [
      {
        recommend : true ,
        name : '海峡车易贷',
        totalTransfer : '10,000,000' ,    //转让总额
        dateReturnRate : 11.3,            //到期收益率
        remainingDate : 8 ,               //剩余期数
        originalMoney : '13,000,000',     //原始本金
        originalRate  : 11.3 ,            //原始利率
        totalDate : 12 ,                  //总期数,
        dateUnit : '月'                    //期数单位     
      },
      {
        recommend : true ,
        name : '安徽车易贷',
        totalTransfer : '3,000,000' ,    //转让总额
        dateReturnRate : 9.3,            //到期收益率
        remainingDate : 12 ,               //剩余期数
        originalMoney : '6,000,000',     //原始本金
        originalRate  : 9.3 ,            //原始利率
        totalDate : 24  ,                  //总期数       
        dateUnit : '月'                    //期数单位     
      },
      {
        recommend : false ,
        name : '典当事业部房易贷',
        totalTransfer : '700,000' ,       //转让总额
        dateReturnRate : 1.3,            //到期收益率
        remainingDate : 7 ,               //剩余期数
        originalMoney : '1,000,000',     //原始本金
        originalRate  : 1.3 ,            //原始利率
        totalDate : 12 ,                   //总期数      
        dateUnit : '月'                    //期数单位      
      },
      {
        recommend : false ,
        name : '典当事业部房易贷',
        totalTransfer : '700,000' ,    //转让总额
        dateReturnRate : 1.3,            //到期收益率
        remainingDate : 7 ,               //剩余期数
        originalMoney : '1,000,000',     //原始本金
        originalRate  : 1.3 ,            //原始利率
        totalDate : 12  ,                  //总期数       
        dateUnit : '月'                    //期数单位     
      }
    ],

    targetTypes : [
      {
        typeName : '净',
        isSelected : false 
      },
      {
        typeName : '快',
        isSelected : false 
      },
      {
        typeName : '议' ,
        isSelected : false 
      },
      {
        typeName : '荐',
        isSelected : false 
      },
      {
        typeName : '秒',
        isSelected : false 
      },
      {
        typeName : '特',
        isSelected : false 
      }

    ]
  },



  //tab切换事件
  onTabChange : function(e){
    var index = e.currentTarget.dataset.index;

    var data = this.data.tabItems;

    data.map(function(item , i){
      if(index == i){

        if(item.selected){
          item.upflag = !item.upflag;
          item.downflag = !item.downflag;
        }else{
          item.selected = true ;
          item.upflag = true ;
          item.downflag = false ;
        }

        
      }else{
        item.selected = false ;
        item.upflag = false ;
        item.downflag = false ;
      }
      
    })

    var contentItems = this.data.contentItems;
    this.arrSort(contentItems , index);

    this.setData({
      tabItems : data,
      contentItems : contentItems
    })
  },


  onContentFilterClick : function(){

    this.setData({
      opacityFlag : true 
    });


    var animation = wx.createAnimation({
      duration:400,
      timingFunction:"ease",
    })

    //this.animation = animation

    animation.translateX('-100%').step();

    this.setData({
      animationData:animation.export()
    })
  },

  onCancelTap : function(){

    var animation = wx.createAnimation({
      duration:400,
      timingFunction:"linear",
    })

    //this.animation = animation

    animation.translateX('100%').step();

    this.setData({
      animationData:animation.export(),
      opacityFlag : false
    })

  },

  onSelected : function(e){
    //获取被点击的按钮下标
    var index = e.currentTarget.dataset.index;

    console.log(index);

    //定义一个变量存储targetTypes数据
    var data = this.data.targetTypes;

    var me = this ;

    data.map(function(item , i){

      
      if(index == i ){

          //多次点击同一个按钮
        if(item.isSelected){
          item.isSelected = !item.isSelected
        }else{
          item.isSelected = true 
        }

        
      }else{
        item.isSelected = false ;
      }
      
    })

    this.setData(
      {
        targetTypes : data
      }
    )

  },

  onTouchMove : function(e){
    console.log(e.detail)
  },

  onFilterSubmit : function(){

    this.setData({
      opacityFlag : false
    });

    var animation = wx.createAnimation({
      duration:400,
      timingFunction:"linear",
    })

    //this.animation = animation

    animation.translateX('100%').step();

    this.setData({
      animationData:animation.export()
    })

  },






  arrSort : function(arr ,index){

    if(index == 0) {
      return ;
    }

    var prop = '' ;
    
    if(index == "1" ){
      prop = 'dateReturnRate';
    }else if(index == "2" ){
      prop = 'remainingDate' ; 
    }

    var me = this ;

    // if(index == 2 ){
    //   arr.sort(function(a , b ){
    //     return me.data.tabItems[index].upflag == true ? ( a.borrowUnit == '月'  ? a.remainingDate * 30 : a.remainingDate ) >  ( b.borrowUnit == '月'  ? b.remainingDate * 30 : b.remainingDate )
    //     : ( a.borrowUnit == '月'  ? a.remainingDate * 30 : a.remainingDate ) <  ( b.borrowUnit == '月'  ? b.remainingDate * 30 : b.remainingDate )
    //   })

    //   return ;
    // }

    arr.sort(function(a , b){
      return me.data.tabItems[index].upflag == true ? a[prop] > b[prop] : a[prop] < b[prop];
    
    })
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
  }
})