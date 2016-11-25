var util = require('../utils/util.js');
var api = require('./api.js');

var app = getApp();

function requestData(url, data, successCallback, errorCallback, completeCallback) {
    if (app.debug) {
        console.log('requestData url: ', url);
    }
    wx.request({
        //必需
        url: url,
        data: data,
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
            if (res.statusCode == 200)
                util.isFunction(successCallback) && successCallback(res);
            else
                util.isFunction(errorCallback) && errorCallback();
        },
        fail: function(res) {
            util.isFunction(errorCallback) && errorCallback();
        },
        complete: function(res) {
            util.isFunction(completeCallback) && completeCallback();
        }
    });
}

function getNewsLatest(successCallback, errorCallback, completeCallback) {
	requestData(api.getLatestNews(),{},successCallback,errorCallback,completeCallback);
}

function getBeforeNews( date, successCallback, errorCallback, completeCallback ) {
	requestData(api.getBeforeNews(date),{},successCallback,errorCallback,completeCallback);
}

function getNewsDetail( newsId, successCallback, errorCallback, completeCallback ) {
    requestData( api.getNewsDetail( newsId ), {}, successCallback, errorCallback, completeCallback );
}

function getTheme( successCallback, errorCallback, completeCallback ) {
    requestData( api.getTheme(), {}, successCallback, errorCallback, completeCallback );
}

function getThemeStories( themeId, successCallback, errorCallback, completeCallback ) {
    requestData( api.getThemeStories( themeId ), {}, successCallback, errorCallback, completeCallback );
}

function getStoryShortComments( storyId, successCallback, errorCallback, completeCallback ) {
    requestData( api.getStoryShortComments( storyId ), {}, successCallback, errorCallback, completeCallback );
}

function getStoryLongComments( storyId, successCallback, errorCallback, completeCallback ) {
    requestData( api.getStoryLongComments( storyId ), {}, successCallback, errorCallback, completeCallback );
}

function getStoryExtraInfo( storyId, successCallback, errorCallback, completeCallback ) {
    requestData( api.getStoryExtraInfo( storyId ), {}, successCallback, errorCallback, completeCallback );
}

function getSplashCover( size, successCallback, errorCallback, completeCallback ) {
    requestData( api.getSplashCover( size ), {}, successCallback, errorCallback, completeCallback );
}

module.exports = {
    getNewsLatest: getNewsLatest,
    getBeforeNews: getBeforeNews,
    getNewsDetail: getNewsDetail,
    getTheme: getTheme,
    getStoryExtraInfo: getStoryExtraInfo,
    getThemeStories: getThemeStories,
    getStoryLongComments: getStoryLongComments,
    getStoryShortComments: getStoryShortComments,
    getSplashCover: getSplashCover
};