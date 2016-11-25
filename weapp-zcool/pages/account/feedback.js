
Page({
  data: {
  },
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '意见反馈'
    })
  },
  formSubmit: function(event) {
    console.log(event);
    var textarea = event.detail.value.textarea;
    if (textarea && textarea !== '') {
      wx.showToast({
        title: '感谢您的反馈',
        icon: 'success'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入您的反馈内容',
        showCancel: false
      })
    }
  }
});