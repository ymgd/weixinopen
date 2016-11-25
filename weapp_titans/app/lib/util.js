/*
 *Created by songroger on Oct.12.2016.
 */
const api = require('api.js');
var inittitle = "沁园春·雪"
var initData = '北国风光，千里冰封，万里雪飘。望长城内外，惟余莽莽；大河上下，顿失滔滔。山舞银蛇，原驰蜡象，欲与天公试比高。须晴日，看红装素裹，分外妖娆。\n\n江山如此多娇，引无数英雄竞折腰。惜秦皇汉武，略输文采；唐宗宋祖，稍逊风骚。一代天骄，成吉思汗，只识弯弓射大雕。俱往矣，数风流人物，还看今朝。'
var extraLine = [];
function loadBunchData(callback) {
    // load Bunch data
    wx.request({
        url: api.getUrl('/random_poem'),
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
            // console.log(res.data)
            callback(res.data)
        },
        fail: function() {
            var res = {};
            res.data = {};
            res.data.title = inittitle;
            res.data.text = initData;
            callback(res.data)
        }
    })

}

function loadPieceData(callback) {
    // load piece data
    wx.request({
        url: api.getUrl('/random_line'),
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
            // console.log(res.data)
            callback(res.data)
        },
        fail: function() {
            var res = {};
            res.data = {};
            res.data.title = inittitle;
            res.data.text = initData;
            callback(res.data)
        }
    })
}


module.exports = {
    // 一维数组转二维数组
    listToMatrix(list, elementsPerSubArray) {
        let matrix = [], i, k;

        for (i = 0, k = -1; i < list.length; i += 1) {
            if (i % elementsPerSubArray === 0) {
                k += 1;
                matrix[k] = [];
            }

            matrix[k].push(list[i]);
        }

        return matrix;
    },

    // 为promise设置简单回调（无论成功或失败都执行）
    always(promise, callback) {
        promise.then(callback, callback);
        return promise;
    },
    loadBunchData: loadBunchData,
    loadPieceData:loadPieceData,
};