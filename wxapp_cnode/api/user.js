var request = require('../utils/util').request;
var cnodeApiURI = require('../config/api').cnodeApiURI;

/**
 * [detail description]
 * @param  {[String]} loginname [description]
 * @return {[Promise]}           [description]
 */
function detail(loginname) {
  var promise = new Promise(function(resolve, reject) {
    request({
      method: 'GET',
      url: `${cnodeApiURI}/user/${loginname}`,
    }).then(function(res) {
      resolve(res);
    }, function(res) {
      reject(res);
    });
  });
  return promise;
}

/**
 * [auth 验证accessToken的正确性]
 * @param  {[String]} accesstoken [description]
 * @return {[Promise]}             [description]
 */
function auth(accesstoken) {
  var promise = new Promise(function(resolve, reject) {
    request({
      method: 'POST',
      data: {
        accesstoken: accesstoken
      },
      url: `${cnodeApiURI}/accesstoken`,
    }).then(function(res) {
      resolve(res);
    }, function(res) {
      reject(res);
    });
  });
  return promise;
}

module.exports = {
  detail: detail,
  auth: auth,
}
