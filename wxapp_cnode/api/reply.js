var request = require('../utils/util').request;
var cnodeApiURI = require('../config/api').cnodeApiURI;

/**
 * [replies 新建评论]
 * @param  {[String]} options.accesstoken [description]
 * @param  {[String]} options.topic_id    [description]
 * @param  {[String]} options.content     [description]
 * @param  {String} options.reply_id    }            [description]
 * @return {[Promise]}                     [description]
 */
function replies({ accesstoken, topic_id, content, reply_id } = {}) {
  var promise = new Promise(function(resolve, reject) {
    request({
      method: 'POST',
      data: {
        accesstoken: accesstoken,
        reply_id: reply_id,
        content: content
      },
      url: `${cnodeApiURI}/topic/${topic_id}/replies`,
    }).then(function(res) {
      resolve(res);
    }, function(res) {
      reject(res);
    });
  });
  return promise;
}

/**
 * [ups 为评论点赞]
 * @param  {[String]} options.accesstoken [description]
 * @param  {String} options.reply_id    }            [description]
 * @return {[Promise]}                     [description]
 */
function ups({ accesstoken, reply_id } = {}) {
  var promise = new Promise(function(resolve, reject) {
    request({
      method: 'POST',
      data: {
        accesstoken: accesstoken
      },
      url: `${cnodeApiURI}/reply/${reply_id}/ups`,
    }).then(function(res) {
      resolve(res);
    }, function(res) {
      reject(res);
    });
  });
  return promise;
}
module.exports = {
  replies: replies,
  ups: ups,
}
