module.exports = (function() {
    var webSocketUrl = 'ws://123.56.85.164:18080/websocket',
        socketOpened = false, // 标记websocket是否已经打开
        socketMsgQueue = [],
        connCallback = null,
        msgReceived = {};

    function connect(callback) { // 发起链接
        var app = getApp(),
            roomNo = app.getRoomNo();
        wx.connectSocket({
            url: webSocketUrl + '?no=' + roomNo
        });
        connCallback = callback;
    }

    function initEvent() { // 初始化一些webSocket事件
        wx.onSocketOpen(function(res){ // webSocket打开事件处理
            socketOpened = true;
            console.log('websocket opened.');
            // 处理一下没发出去的消息
            while(socketMsgQueue.length > 0) {
                var msg = socketMsgQueue.pop();
                sendSocketMessage(msg);
            }
            // sendSocketMessage('after');
            
            // connection callback
            connCallback && connCallback.call(null);
        });
        wx.onSocketMessage(function(res) { // 收到服务器消息时的处理
            console.log('received msg: ' + res.data);
            msgReceived.callback && msgReceived.callback.call(null, res.data, ...msgReceived.params);
        });
        wx.onSocketError(function(res){ // 链接出错时的处理
            console.log('webSocket fail');
        });
    }

    function sendSocketMessage(msg) {
        if (typeof(msg) === 'object') {
            msg = JSON.stringify(msg);
        }
        if (socketOpened) {
            wx.sendSocketMessage({
                data:msg
            });
        } else { // 发送的时候，链接还没建立 
            socketMsgQueue.push(msg);
        }
    }

    function setReceiveCallback(callback, ...params) {
        if (callback) {
            msgReceived.callback = callback;
            msgReceived.params = params;
        }
    }

    function init() {
        initEvent();
    }

    init();
    return {
        connect: connect,
        send: sendSocketMessage,
        setReceiveCallback: setReceiveCallback,
        socketOpened: socketOpened
    };
})();
