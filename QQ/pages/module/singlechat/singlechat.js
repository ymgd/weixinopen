/**
 * 聊天主程序
 */
var util = require("../../../utils/util.js");
var db   = require("../../../utils/db.js");
Page({
  data:{
     options   : {},
     chatModes : [
       { icon : '../../../res/image/chat_voice.png'   ,tag : 'voice'},
       { icon : '../../../res/image/chat_video.png'   ,tag : 'video'},
       { icon : '../../../res/image/chat_picture.png' ,tag : 'picture'},
       { icon : '../../../res/image/chat_camera.png'  ,tag : 'camera'},
       { icon : '../../../res/image/chat_hongbao.png' ,tag : 'hongbao'},
       { icon : '../../../res/image/chat_smilling.png',tag : 'smilling'},
       { icon : '../../../res/image/chat_more.png'    ,tag : 'more'}
     ],
     chatMsgs : []
  },
  onLoad:function(options){
    this.setData({ options : options || {} });
  },
  onReady:function(){
    // 页面渲染完成
    var opts = this.data.options,userId = opts.userId,user = db.findUserById(userId),owner = db.findUserById('7');
    wx.setNavigationBarTitle({title: user.userName})

    var that = this,chatMsgs = that.data.chatMsgs || [];

    chatMsgs = chatMsgs.concat([ { text:'你好，我们已经是朋友了。赶紧打个招呼吧吧！', userId : owner.userId },
       { text:'您哪位？', userId : userId , head : user.head},
       { text:'我是' + user.userName, userId : userId , head : user.head},
       { text:'啊啊...', userId : owner.userId },
       { text:'啊啊...', userId : owner.userId },
       { text:'啊啊...', userId : owner.userId },
       { text:'啊啊...', userId : owner.userId },
       { text:'啊啊...', userId : owner.userId }]);
    chatMsgs.map(function(msg){
        msg.isOwner  = (owner.userId == msg.userId);
        msg.head     = db.findUserById(msg.userId)['head'];
        return msg;
    });
    that.setData({ chatMsgs : chatMsgs });

    /*setInterval(function(){
      var msg = {text:'你好（我是自动回复）'};
      msg.isOwner = util.randomInt(1,5)%2 == 0;
      msg.userId  = msg.isOwner ? owner.userId : userId;
      msg.head    = msg.isOwner ? owner.head : user.head;

      var chatMsgs = that.data.chatMsgs;
      chatMsgs.push(msg);
      
      that.setData({ chatMsgs : chatMsgs });

    },util.randomInt(2000,5000));*/



  }

  /**
   * 选择聊天类型
   */
  ,onChatFnItemClick : function(e){
     var data = e.currentTarget.dataset,tag = data.tag;
     console.log(tag);
  }
  /**
   * 发送消息
   */
  ,sendMessage : function(e){
      var that = this,text = e.detail.value,owner = db.findUserById('7');
      //TODO 清除当前输入框值
      if('' == text){ return; }
      var msg  = { text : text, isOwner : true, userId  : owner.userId ,head : owner.head},chatMsgs = that.data.chatMsgs;
      chatMsgs.push(msg);
      that.setData({ chatMsgs : chatMsgs});
  }
  /**
   * 点击聊天区域
   */
  ,onClickContent : function(e){
     var dataset = e.target.dataset,tag = dataset.tag;
     if('head' == tag){
        console.log(db.findUserById(dataset.id));
     }
     //如果键盘开启，则关闭
  }
})
