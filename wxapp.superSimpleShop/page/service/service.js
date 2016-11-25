Page({
    "data": {
        "messages": [],
        "inputMessage": '',
    },
    onLoad: function() {
        var that = this;
        wx.connectSocket({
            url: "ws://localhost:9191",
            success(){
                console.log("connection successfully!")
                wx.onSocketOpen(function() {
                    console.log("socket is open!");
                    wx.onSocketMessage(function(received) {
                        var messages = that.data.messages;
                        var msg = {
                            "message": received.data,
                            "from": "server"
                        };
                        messages.push(msg);
                        console.log(messages);
                        that.setData({
                            messages: messages,
                            count: 1
                        });
                        if (received.data.indexOf("此次会话将结束") > -1) {
                            wx.closeSocket();
                            console.log("socket is closed");
                        }
                    })
                })
            },
        });  
    },

    // onShow: function() {
    //     var that = this;
    //     wx.onSocketMessage(function(res) {
    //         console.log(res.data);
    //     });
    // },

    inputMessage: function(e) {
        console.log(e.detail.value);
        this.setData({
            inputMessage: e.detail.value
        });
    },

    sendMessage: function() {
        var that = this;

        wx.sendSocketMessage({
          data: that.data.inputMessage,
          success: function(res){
            console.log("send message " + that.data.inputMessage);
          },
          fail: function() {
            console.log("failed on sending message " + that.data.inputMessage);
          },
          complete: function() {
            console.log("complete sending message");
            console.log(that.data.inputMessage);
          }
        });

        var messages = this.data.messages;
        var msg = {
            "message": this.data.inputMessage,
            "from": "client"
        }
        messages.push(msg);
        this.setData({
            messages: messages,
            inputMessage: ''
        })

    }
});