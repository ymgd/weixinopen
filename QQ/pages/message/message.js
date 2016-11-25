
/**
 * 消息功能界面
 * 
 */
var util = require("../../utils/util.js");
var db   = require("../../utils/db.js");
Page({
  data:{
      messages:[]
  },
  onLoad:function(options){
      this.setData({
            messages: [{
                title:'QQ助手',
                xtype:'qq_assistant',
                userId  : '', 
                content :'1个群消息',
                icon    : 'http://easyicon.net/api/resizeApi.php?id=1186233&size=72',
                time    : 1476755443000,
                msgCount: 1
            },{
                title:'QQ看点',
                xtype:'qq_kandian',
                userId  : '',
                content :'JavaScript学习总结',
                icon    : 'http://easyicon.net/api/resizeApi.php?id=1186903&size=72',
                time    : 1476755443000,
                msgCount: 0
            },{
                xtype:'qq_user',
                userId  : '6',
                content :'小伙子来中南海上班吧！为国效力！我看好你。',
                time    : 1476755443000,
                msgCount: 2
            },{
                xtype:'qq_user',
                userId  : '5',
                content :'小伙子来中南海上班吧！为国效力！我看好你。',
                time    : 1476755443000,
                msgCount: 3
            },{
                xtype:'qq_user',
                userId  : '4',
                content :'小伙子来中南海上班吧！为国效力！我看好你。',
                
                time    : 1476755443000,
                msgCount: 0
            },{
                xtype:'qq_user',
                userId  : '3',
                content :'小伙子来中南海上班吧！为国效力！我看好你。',
                time    : 1476755443000,
                msgCount: 0
            },{
                xtype:'qq_user',
                userId  : '2',
                content :'小伙子来中南海上班吧！为国效力！我看好你。',
                time    : 1476755443000,
                msgCount: 0
            },{
                xtype:'qq_user',
                userId  : '1',
                content :'小伙子来中南海上班吧！为国效力！我看好你。',
                time    : 1476755443000,
                msgCount: 0
            }].map(function (message) {
                message.time     = util.formatTime(new Date(message.time));
                if(message.userId){
                    var user = db.findUserById(message.userId) || {};
                    message.title = user.userName;
                    message.icon  = user.head;
                }
                //message.msgCount = message.msgCount > 99 ? '99+': message.msgCount;
                return message;
            })
        })
  }

  ,handerSearch : function(){

  }
  ,onItemClickListener : function(e){
      var data = e.currentTarget.dataset,xtype = data.xtype;
      if(xtype == 'qq_user'){
          wx.navigateTo({url : "../module/singlechat/singlechat?userId=" + data.id});
      }
  }
})