const API_BASE = 'http://www.movetechx.com/quye/';
const PIC_BASE = "http://www.movetechx.com/upload/";

const API_SPLASH = API_BASE + 'api/startup'
const API_ActivityList = API_BASE + 'api/activity/query'

/**
 * 获取启动界面封面
 * @param {string} size 图片尺寸 格式：width*height
 * @return {string}
 */
function getSplashCover() {
    /*
        {
            "returnCode": "200",
            "returnDesc": "处理成功",
            "advertisements": [
                {
                    "title": "启动广告",
                    "picture": "13540403073/201511/DSC02034.JPG",
                    "url": null,
                    "startTime": "2016-05-19 11:01:00",
                    "endTime": "2016-05-19 11:01:00"
                }
            ]
        }

    */
    return API_SPLASH;
}

function getActivityList() {
	return API_ActivityList;
}

module.exports = {
    getSplashCover: getSplashCover,
    getActivityList: getActivityList
};
