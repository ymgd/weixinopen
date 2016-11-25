 var selectImageTool = require('../tool/networkRequestTool.js');
 var cellTypes = ['cell_message', 'cell_acticity', 'cell_noLine', 'cell_backFeed', "cell_meituan"]
 var actionSheetItems = ['相机', '相册'];
 Page({
   data:{ 
     viewTitle:'哈哈哈哈',   
     userInfo:{avatarUrl:'/resource/images/collection.png',nickName:'陈志超'},
     items:[
          {title:'收藏',imageUrl:'/resource/images/collection.png', navigatePage:'detail', pageMessage:'收藏'},
          {title:'夜间', imageUrl:'/resource/images/eve.png', classes:'two_side', navigatePage:'detail', pageMessage:'夜间'},
          {title:'设置', imageUrl:'/resource/images/set.png', navigatePage:'detail', pageMessage:'设置'}],
     cells:[
            {title:'消息通知', imageUrl: '/resource/images/rightjian.png', cellType:cellTypes[0], navigatePage:'detail', pageMessage:'消息通知'},
            {title:'活动', imageUrl: '/resource/images/rightjian.png', cellType:cellTypes[1], navigatePage:'detail', pageMessage:'活动'},
            {title:'段子', imageUrl: '/resource/images/rightjian.png', cellType:cellTypes[2], navigatePage:'funny/funny', pageMessage:'离线'},
            {title:'反馈', imageUrl: '/resource/images/rightjian.png', cellType:cellTypes[3], navigatePage:'feedback/feedback', pageMessage:'反馈'},
            {title:'美团', imageUrl: '/resource/images/rightjian.png', cellType:cellTypes[3], navigatePage:'meituan/meituan', pageMessage:'美团'}
            ],
     actionSheetHidden: true,
     actionSheetItems: actionSheetItems
   },
    onLoad:function(options){
    var that = this;
    var app = getApp();
    app.getUserInfo(function(userInfo){
        console.log(userInfo);
        //设置用户信息
        that.setData({
            userInfo:userInfo
        })
    });

  },

  onPullDownRefresh: function() {
    
  },
  userIconClicked: function(e){ //用户头像被点击
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange: function(e) { //
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetClicked: function(e){ //选取图片
      this.setData({
          actionSheetHidden: !this.data.actionSheetHidden
      })
      var itemStr = e.currentTarget.dataset.actionsheetitemstr;
      selectImageTool.selectImageWithType(itemStr);
  },




  // cellClicked: function(e){
  //     console.log(e.currentTarget.dataset.celltype);
  //     var cellType = e.currentTarget.dataset.celltype;
  //     if (cellType === cellTypes[0]){

  //     }else if(cellType === cellTypes[1]){

  //     }else if(cellType === cellTypes[2]){

  //     }else{

  //     }

  // }
 })