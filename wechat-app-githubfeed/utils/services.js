export default {
  fetch(url) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'GET',
        data: {},
        header: {
          'Accept': 'application/json'
        },
        success: resolve,
        fail: reject
      });
    });
  }
};
