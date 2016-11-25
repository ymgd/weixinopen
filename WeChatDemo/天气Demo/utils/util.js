function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  checkrepeat: checkrepeat,
  addCity: addCity
}
var storeage = "citylist";

function checkrepeat(city) {
  wx.getStorage({
    key: storeage,
    success: function (res) {
      // success
      return res.data.indexOf(city) > -1;
    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
}

function addCity(city) {
  wx.getStorage({
    key: storeage,
    success: function (res) {
      // success
      if (res.data.indexOf(city) <= -1) {
        var list = res.data;
        list.push(city);
        wx.setStorage({
          key: storeage,
          data: list,
          success: function (res) {
            // success
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
      }
    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
}


