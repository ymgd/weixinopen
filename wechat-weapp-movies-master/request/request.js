/**
 * Created by LLhon on 2016/10/19.
 */
var app = getApp();

function fetchApi(url, params) {
    //if (app.debug) {
        //console.log('request---------url:' + url);
    //}
    return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                method: "GET",
                data: Object.assign({}, params),
                header: {'Content-Type': 'application/json'},
                success: function (res) {
                    console.log('request success');
                    //if (app.debug) {
                        //console.log('response---------data:' + res);
                    //}
                    if (res == null) {
                        return;
                    }
                    if (res.statusCode == 200) {
                        if (res.data == null) {
                            console.log('request data == null');
                            return;
                        }
                        resolve(res.data);
                    } else {
                        reject
                    }
                },
                fail: function () {
                    reject
                },
                complete: function () {
                    console.log('request complete');
                }
            });
    });
}


//module.exports.requestBannerData = requestBannerData
//module.exports.requestMoviesListData = requestMoviesListData
//module.exports.requestMovieDetailData = requestMovieDetailData
//module.exports.requestInTheatersData = requestInTheatersData
//module.exports.requestLeadWorksData = requestLeadWorksData

module.exports = {
    fetchApi
}