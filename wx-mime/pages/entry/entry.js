var net = require('../../common/net.js');
// require('../../res/socket.io.js');

var app = getApp();
// console.log(io);

Page({
  data: {
    roomNo: 0
  },
  startGame: function() {
      var roomNo = this.data.roomNo;
      if(!roomNo) {
          console.error('请填写房间号');
          return;
      }
      app.setRoomNo(roomNo);  // 房间号
      // 切换页面
      wx.navigateTo({
          url: '../index/index'
      });
      /*net.post({
          url: 'http://localhost:8080/room',
          data: {
              no: roomNo,
          },
          success: function(rsp) {
              // console.log(rsp, typeof(rsp));
              if(rsp.errCode == 0) {
              	var mimeMap = rsp.data.map;
                app.updateMap(mimeMap);         // 地图场景
                app.setCount(rsp.data.count);   // 金子的个数
              }
          },
          fail: function(err) {
              console.error('fail: ' + err);
          }
      });*/
  },
  roomNoChanged: function(event) {
      this.setData({
          roomNo: event.detail.value
      });
  },
});
