var request = require('../utils/util').request;
var cnodeApiURI = require('../config/api').cnodeApiURI;

/**
 * [getTopics 主题首页]
 * @param  {Number} options.page  [第几页]
 * @param  {Number} options.limit [分页数量]
 * @param  {String} options.tab   [栏目]
 * @return {[Object]}               [栏目数据]
 */
function getTopics({ page = 1, limit = 20, tab = 'all', mdrender = false } = {}) {
  var promise = new Promise(function(resolve, reject) {
    request({
      method: 'GET',
      data: {
        page: page,
        limit: limit,
        tab: tab,
        mdrender: mdrender,
      },
      url: `${cnodeApiURI}/topics`,
      showLoading: false,
    }).then(function(res) {
      resolve(res);
    }, function(res) {
      reject(res);
    });
  });
  return promise;
}

/**
 * [getTopic 主题详情]
 * @param  {[String]} id [description]
 * @return {[Promise]}    [description]
 */
function getTopic({ id = null, mdrender = false } = {}) {
  var promise = new Promise(function(resolve, reject) {
    request({
      method: 'GET',
      data: {
        mdrender: mdrender
      },
      url: `${cnodeApiURI}/topic/${id}`,
    }).then(function(res) {
      resolve(res);
    }, function(res) {
      reject(res);
    });
  });
  return promise;
}

/**
 * [postTopics 新建主题]
 * @param  {[String]} options.accesstoken [description]
 * @param  {[String]} options.title       [description]
 * @param  {String} options.tab         [description]
 * @param  {Object} options.content     }            [description]
 * @return {[Promise]}                     [description]
 */
function addTopics({ accesstoken, title, tab, content } = {}) {
  var promise = new Promise(function(resolve, reject) {
    request({
      method: 'POST',
      data: {
        accesstoken: accesstoken,
        title: title,
        tab: tab,
        content: content
      },
      url: `${cnodeApiURI}/topics`,
    }).then(function(res) {
      resolve(res);
    }, function(res) {
      reject(res);
    });
  });
  return promise;
}

/**
 * [updateTopics 编辑主题]
 * @param  {[String]} options.accesstoken [description]
 * @param  {[String]} options.topic_id    [description]
 * @param  {[String]} options.title       [description]
 * @param  {[String]} options.tab         [description]
 * @param  {Object} options.content     }            [description]
 * @return {[Promise]}                     [description]
 */
function updateTopics({ accesstoken, topic_id, title, tab, content } = {}) {
  var promise = new Promise(function(resolve, reject) {
    request({
      method: 'POST',
      data: {
        accesstoken: accesstoken,
        title: title,
        tab: tab,
        content: content
      },
      url: `${cnodeApiURI}/topics`,
    }).then(function(res) {
      resolve(res);
    }, function(res) {
      reject(res);
    });
  });
  return promise;
}


module.exports = {
  getTopics: getTopics,
  getTopic: getTopic,
  addTopics: addTopics,
  updateTopics: updateTopics,
}
