
Page({
  data:{
    // text:"这是一个页面"
    exchangeMoney : ' 1688 , 8888 , 8880',
    contentNavs : [
      {
        leftImage : '../../images/investment3x.png',
        contentText : '项目投资',
        contentDesp : '收益稳定 期限灵活',
        url : '../investment/investment'
      },
      {
        leftImage : '../../images/Acquisitionofdebt3x.png',
        contentText : '债券收购',
        contentDesp : '折翼转让 流动性强',
        url : '../acquisition/acquisition'
      },
      {
        leftImage : '../../images/investment3x.png',
        contentText : '我要借贷',
        contentDesp : '快速借贷 多样偿还',
        url : '../investment/investment'
      }
    ],
    bottomNavs : [
      {
        image : '../../images/investment_manage3x.png',
        contentText : '投资管理',
        url : '../investment/investment'
      },
      {
        image : '../../images/bottom_borrow3x.png',
        contentText : '借款管理',
        url : '../investment/investment'
      },
      {
        image : '../../images/debt_manage3x.png',
        contentText : '债权管理',
        url : '../investment/investment'
      },
      {
        image : '../../images/transaction_record3x.png',
        contentText : '交易记录',
        url : '../investment/investment'
      },
      {
        image : '../../images/score_manage3x.png',
        contentText : '积分管理',
        url : '../investment/investment'
      },
      {
        image : '../../images/autotender3x.png',
        contentText : '自动投标',
        url : '../investment/investment'
      },
    ]
  },

  toUserAccount : function(){
    wx.navigateTo({
      url : '../useraccount/useraccount'
    });
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
});