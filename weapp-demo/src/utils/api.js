function login () {
  return new Promise((resolve, reject) => {
    wx.login({ success: resolve, fail: reject })
  })
}

function getUserInfo () {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({ success: resolve, fail: reject })
  })
}

const myXhr = {};

/**
 * 封装 Promise Ajax
 * @param  {Obejct} data ajax参数
 * @return {Promise}     返回promise对象
 */
myXhr.ajax = data => new Promise((resolve, reject) => {
    const param = Object.assign({
        success: resolve,
        fail: reject,
    }, data);

    wx.request(param);
});

function isUrlRouter(uri) {
    if(typeof uri === 'string' && !/^https?:\/\//.test(uri))
        return true;
    return false;
}

function getUrl(url) {
    if(isUrlRouter(url))
        return ['https://', 'api.meiyaapp.cn', url].join('');
    return url;
}

String('get, post, put, delete').replace(/\w+/g, (method) => {
    myXhr[method] = (url, data = {}) => {
        url = getUrl(url);
        data.signature = 123456;

        return myXhr.ajax({
            url,
            method,
            data,
            header: {
              'Accept': 'application/json'
            },
        });
    };
});

module.exports = { login, getUserInfo, myXhr }
