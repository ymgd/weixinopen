var websocket = require('../../websocket/connect.js');
var net = require('../../common/net.js');
var msgReceived = require('../../websocket/msgHandler.js');

var app = getApp();

Page({
    data: {
        mimeMap: null, 
        leftGolds: 0, // 总共有多少金子
        score: 0,     // 我的得分
        roomNo: 0     // 房间号
    },
    x: 0, // 用户点中的列
    y: 0, // 用户点中的行
    onLoad: function () {
        var roomNo = app.getRoomNo();
        this.setData({
            roomNo: roomNo
        });
        // test
        // websocket.send('before connection');

        if (!websocket.socketOpened) {
            // setMsgReceiveCallback 
            websocket.setReceiveCallback(msgReceived, this);
            // connect to the websocket 
            websocket.connect();
            websocket.send({
              type: 'create'
            });
        }
        else {
            websocket.send({
              type: 'create',
              no: roomNo
            });
        }
    },
    digGold: function(event) { // 不直接判断，而把坐标传给后台判断
        // 被开过的就不管了
        if (event.target.dataset.value < 9) {
          return;
        }

        // 取到这格的坐标
        this.x = parseInt(event.target.dataset.x);
        this.y = parseInt(event.target.dataset.y);
        console.log(this.x, this.y);
        // 上报坐标
        this.reportMyChoice();
    },

    reportMyChoice: function() {
        var roomNo = app.getRoomNo();
        websocket.send({
            type: 'dig',
            x: this.x,
            y: this.y,
            no: roomNo
        });
    },
});
