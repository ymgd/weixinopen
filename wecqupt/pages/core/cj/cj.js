//cj.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中...',
    cjInfo : [

    ],
    xqNum : {
      grade: '',
      semester: ''
    },
    xqName : {
      grade: '',
      semester: ''
    }
  },
  onLoad: function(){
    var _this = this;
    if(!app._user.xs.xh || !app._user.xs.xm){
      app.showErrorModal('未绑定');
      _this.setData({
        remind: '未绑定'
      });
      return false;
    }
    _this.setData({
      id: app._user.xs.xh,
      name: app._user.xs.xm
    });
    app.showLoadToast();
    wx.request({
      url: app._server + "/api/get_kscj.php",
      data: {
        xh: app._user.xs.xh,
        sfzh: app._user.xs.sfzh
      },
      success: function(res) {

        if(res.data.status === 200) {
          var _data = res.data.data;

          var term = _data[0].term;
          var xh = _data[0].xh;
          var year = term.slice(0,4);
          var semester = term.slice(4);
          var yearIn = xh.slice(0,4);
          var xqName_grade = changeNum(year - yearIn + 1);
          var xqName_semester = (semester == 1) ? '上' : '下';
          var xqName = {
            grade: xqName_grade,
            semester: xqName_semester,
            term: term
          };
          
          _this.setData({
            cjInfo: _data,
            xqName: xqName,
            remind: ''
          });
        } else {
          app.showErrorModal(res.data.message);
          _this.setData({
            remind: res.data.message
          });
        }

      },

      fail: function(res) {
        app.showErrorModal(res.errMsg);
        _this.setData({
          remind: '网络错误'
        });
      },

      complete: function(){
        wx.hideToast();
      }
    });

    function changeNum(num){  
      var china = new Array('零','一','二','三','四','五','六','七','八','九');  
      var arr = new Array();  
      var n = ''.split.call(num,''); 
      for(var i = 0; i < n.length; i++){  
        arr[i] = china[n[i]];  
      }  
      return arr.join("")  
    }  


  }
});