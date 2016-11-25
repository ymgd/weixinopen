Page({
  data: {
    text: "Page request"
  },
  formSubmit: function (e) {
    var formData = e.detail.value;
    console.log(123);
    wx.request({
      url: 'http://127.0.0.1:1212',
      data: {
        a: formData.aNum,
        b: formData.bNum
      },
      method:'POST',
      success: function (res) {
        console.log(res.data)
      },
      fail: function (res) {
        console.log(res);
      }
    });
  }
})