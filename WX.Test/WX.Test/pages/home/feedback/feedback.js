var inputView;
Page({
    data:{
        chatMessages:[
       {title:'你好，在吗', type:0},
       {title:'发神经发房间卡福建按附件发送卡房间爱开房间爱开始放假甲方；架飞机撒开了房间爱思考路附近空记录卡是否健康是垃圾发送；可垃圾分类', type:1},
       {title:'发掘书法及付款链接发空间发生及罚款是房间爱十分骄傲；失联飞机啊；失联飞机啊沙发沙发沙发沙发', type:0}
    ]
    },
    bindInput: function(e){
        inputView = e;
    },
    sendMessage:function(e){
        var newMessages =  this.data.chatMessages.concat({title:inputView.detail.value, type:1});
        this.setData({
            chatMessages : newMessages
        })
    }
})