var HOST_URI = 'https://testerhome.com/api/v3/';

var GET_TOPICS = '/topics';
var GET_TOPIC_BY_ID = '/topics/';
var GET_TOPIC_ADS = 'ads/toutiao.json';
var GET_TOPIC_REPLIES = '/replies.json'

function obj2uri (obj) {
    return Object.keys(obj).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
    }).join('&');
}

module.exports = {
    // 获取列表数据
    getTopics: function (obj) {
        return HOST_URI + GET_TOPICS + '?' + obj2uri(obj);
    },
    // 获取内容页数据
    getTopicByID: function (id) {
        return HOST_URI + GET_TOPIC_BY_ID + id + '.json';
    },
    getTopicAds: function() {
        return HOST_URI + GET_TOPIC_ADS; 
    },
    getTopicReplies: function(id, obj) {
        return HOST_URI + GET_TOPIC_BY_ID + id + GET_TOPIC_REPLIES + '?' + obj2uri(obj);
    }
};