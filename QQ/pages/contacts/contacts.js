/**
 * 联系人功能界面
 */
var db   = require("../../utils/db.js");
var util = require("../../utils/util.js");
Page({
  data:{
     fristRowList   : [],
     seconedRowList : [],
     thirdRowList   : []
  },
  onLoad:function(options){
    


  },
  onReady: function(){

    var list = [
          { title : '特别关心', onlineNum : 2, trigger : 'close', children: [
              { userId : '11', online : false, signature : '早晨起来，阳光射了我一脸'},
              { userId : '9' , online : false, signature : '今天天气不错，好像自己就是阳光.'},
              { userId : '12', online : false, signature : '马旦，楼上你别跑！'},
              { userId : '13', online : true , signature : '看来有好戏看了'},
              { userId : '8' , online : true , signature : '吃瓜群众坐等琼瑶大戏～'}
          ] },
          { title : '常用群聊' , onlineNum : 0, trigger : 'close', children : []}
        ];
    this.setData({ fristRowList : list.map(function(item){
        var children = item.children,child,user;
        for(var i=0,len = children.length;i<len;i++){
           child = children[i];
           user  = db.findUserById(child.userId) || {};
           //util.copyTo(user,child);
           child.title = user['userName']; child.head  = user['head'];
        }
        return item;
    }) });
  }

  ,handerSearch : function(e){
    
  }
  ,onFriendItemClick   : function(e){
     var dataset = e.currentTarget.dataset,id = dataset.id;
     if(typeof id == 'undefined'){ return; }
     //暂跳转至聊天功能界面
     wx.navigateTo({url : "../module/singlechat/singlechat?userId=" + id});
  }
  ,onFristRowItemClick : function(e){
     var dataset = e.currentTarget.dataset,index = parseInt(dataset.index);
     var list = this.data.fristRowList,item = list[index];
     item.trigger = item.trigger == 'close' ? 'open' : 'close';
     this.setData({ fristRowList : list });
  }
})