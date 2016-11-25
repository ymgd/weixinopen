'use strict'

const API_URL = 'https://api.douban.com/v2/movie';

const API_KEY = '0df993c66c0c636e29ecbb5344252a4a';

function _obj2uri(parameters) {
  return Object.keys(parameters).map(function(k) {
    return encodeURIComponent(k) + "=" + encodeURIComponent(parameters[k]);
  }).join('&');
}

/**
 *
 * @param type        类型，例如：'coming_soon'
 * @param params      参数
 * @returns {Promise} 包含抓取任务的Promise
 */
function http(type, params) {
  return new Promise((resolve, reject) => {
    console.log(`${API_URL}/${type}`);
    wx.request({
      url: `${API_URL}/${type}`,
      data: Object.assign({ apikey: API_KEY }, params),
      header: {'Content-Type': 'application/json'},
      success: (res) => resolve(res.data),
      fail: reject
    });
  });
}

/**
 *
 * @param type   类型，例如：'coming_soon'
 * @param page   页码
 * @param count  页条数
 * @param search 搜索关键词
 */
function find (type, page=1, count = 20, search = '') {
  const params = {
    start: (page - 1) * count,
    count: count
  }
  if(search) {
    if(typeof(search) === 'object') {
      return http(type, Object.assign(params, search));
    }else {
      console.error("The fourth parameter must be an Object type!");
      return;
    }
  }else {
    return http(type, params);
  }
}

/**
 * 获取单条类型的数据
 * @param  电影ID
 * @return 包含抓取任务的Promise
 */
function findOne(id) {
  return http('subject/' + id);
}

module.exports = {
  find,
  findOne
};