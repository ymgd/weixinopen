Page({
  data:{
    tabItems : [
      {
        text: '综合',
        selected : true 
      },
      {
        text: '利率' ,
        upflag : false ,
        downflag : false ,
        selected : false 
      },
      {
        text: '期限' ,
        upflag : false ,
        downflag : false ,
        selected : false 
      },
      {
        text: '金额' ,
        upflag : false ,
        downflag : false ,
        selected : false 
      },
      {
        text: '进度',
        upflag : false ,
        downflag : false ,
        selected : false 
      }
    ],
    contentItems : [
      {
        name : '海峡车易贷',
        borrowMoney : '130,000,000' ,
        interestrate :11.30,
        repaymentType : '按月到期还款',
        borrowTerm : 12,
        borrowUnit : '月',
        recommend : true,
        remaining : '32,500,000',
        remainingPercent : 1.00
      },
      {
        name : '安徽车易贷',
        borrowMoney : '1,000,000' ,
        interestrate :9.30,
        repaymentType : '按天计息到期还款',
        borrowTerm : 9,
        borrowUnit : '月',
        recommend : true,
        remaining : '500,000',
        remainingPercent : 0.50
      },
      {
        name : '贵州保信贷',
        borrowMoney : '130,000,000' ,
        interestrate :11.30,
        repaymentType : '按天一次性还款',
        borrowTerm : 30,
        borrowUnit : '天',
        recommend : true,
        remaining : '32,500,000',
        remainingPercent : 0.70
      },
      {
        name : '典当事业部房易贷',
        borrowMoney : '130,000,000' ,
        interestrate :11.30,
        repaymentType : '按天一次性还款',
        borrowTerm : 24,
        borrowUnit : '月',
        recommend : false,
        remaining : '32,500,000',
        remainingPercent : 0.60
      },
      {
        name : '海峡车易贷',
        borrowMoney : '130,000,000' ,
        interestrate :19.00,
        repaymentType : '按月到期还款',
        borrowTerm : 12,
        borrowUnit : '月',
        recommend : true,
        remaining : '9,750,000',
        remainingPercent : 0.25
      },

    ]
  },

  ctx : {} ,
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    
   
  },
  onShow:function(){
    // 页面显示
    var ctx = wx.createContext();

    this.ctx = ctx ;
    var me = this;
    me.data.contentItems.map(function(item , index){
      me.drawCircle(ctx , 'canvasId-' + index , item.remainingPercent);
    });
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },


  //事件区

  onItemClick : function(e){
    var index = e.currentTarget.dataset.index;

    var data = this.data.contentItems[index];

    var str = JSON.stringify(data);

    wx.navigateTo({
      url : "../investmentdetail/investmentdetail?data=" + str
    });
  },


  orderClick : function(e){
    //console.log(e);
    var index = e.currentTarget.dataset.index;

    var data = this.data.tabItems;

    var me = this ;

    data.map(function(item , i){
      if(index == i) {

        if(item.selected){
          item.upflag = !item.upflag;
          item.downflag = !item.downflag;
        }else{
          item.selected = true ;
          item.upflag = true;
          item.downflag = false;
        }
        
      }else{
        item.selected = false ;
        item.upflag = false ;
        item.downflag = false ;
      }
    })
    this.setData({
      tabItems : data
    });

    var arr = this.data.contentItems ;
    this.arrSort(arr , index);


    var me = this ;


    arr.map(function(item , i){
      me.drawCircle(me.ctx , 'canvasId-' + i , item.remainingPercent);
    })

    this.setData({
      contentItems : arr 
    })

  },

  arrSort : function(arr ,index){

    if(index == 0 ){
      return ;
    }

    var prop = '' ;
    
    if(index == "1" ){
      prop = 'interestrate';
    }else if(index == "2" ){
      prop = 'borrowTerm' ; 
    }else if(index == "3" ){
      prop = 'borrowMoney' ;
    }else if(index == "4" ){
      prop = 'remainingPercent'
    }

    var me = this ;

    if(index == 2 ){
      arr.sort(function(a , b ){
        return me.data.tabItems[index].upflag == true ? ( a.borrowUnit == '月'  ? a.borrowTerm * 30 : a.borrowTerm ) >  ( b.borrowUnit == '月'  ? b.borrowTerm * 30 : b.borrowTerm )
        : ( a.borrowUnit == '月'  ? a.borrowTerm * 30 : a.borrowTerm ) <  ( b.borrowUnit == '月'  ? b.borrowTerm * 30 : b.borrowTerm )
      })

      return ;
    }

    arr.sort(function(a , b){
      return me.data.tabItems[index].upflag == true ? a[prop] > b[prop] : a[prop] < b[prop];
    
    })
  },



  //画圆~
  drawCircle : function(ctx , canvasId , radian){

    //先用用#cba064颜色画一部分
    ctx.beginPath();
    ctx.setFillStyle("#cba064");
    ctx.setStrokeStyle('#cba064') ;
    var start = Math.PI * 0.5 ; 
    var end = Math.PI * 2 * radian ;
    ctx.arc(17 , 17 , 16 , start , end);
    ctx.setLineWidth(2);
    ctx.fillText(radian * 100 , 5, 22);
    ctx.fillText("%" , 24 , 22);
    
    ctx.stroke();

    //再用用#eeeeee画另外一部分
    ctx.beginPath();
    ctx.setStrokeStyle('#eeeeee');
    ctx.arc(17 , 17 , 16 , start + end , Math.PI * 2 * (1-radian) );
    
    ctx.stroke();

    //动作实装到画板
    
    wx.drawCanvas({
      canvasId: canvasId,
      actions: ctx.getActions()
    })

    
  }
})