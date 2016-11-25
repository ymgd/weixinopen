var config = require('../../../config/config.js');
var errcodes = require('../../../data/ErrCodes.js');

function MusicHelper() { }



MusicHelper.prototype.requestMusicList = function (type, from, size, cb) {
  wx.request({
    url: config.baiduMusicApi,
    data: {
      "method": "baidu.ting.billboard.billList",
      "type": type,
      "size": size,
      "offset": from
    },
    header: {
      'Content-Type': 'application/json',
      'apikey': config.baiduApiKey,
    },
    success: function (res) {
      console.log(res.data)
      if (cb) {
        if (res.data) {
          cb(errcodes.ret_ok, res.data);
        }
        else {
          cb(errcodes.err_common);
        }

      }
    },
    fail: function () {
      if (cb) {
        cb(errcodes.err_common);
      }
    },
  })
};



module.exports = MusicHelper;