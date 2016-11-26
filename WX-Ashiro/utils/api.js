'use strict';
var HOST_URI = 'https://h.nimingban.com/Api';

var GET_LIST = '/getForumList';
var GET_ITEMS = '/showf/';
var GET_ITEMS_DETAIL = '/thread?';


module.exports = {
    getList: function () {
        return HOST_URI + GET_LIST;
    },
    getItems: function (listId, pageId) {
        return HOST_URI + GET_ITEMS +'id/'+ listId + '/page/' + pageId;
    },
    getItemDetail: function (itemId, pageId) {
        return HOST_URI + GET_ITEMS_DETAIL +'id='+ itemId + '&page=' + pageId;
    }
};