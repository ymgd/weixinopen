/**
 * 这只是一个示例，真正用到地图场景生成的是在后台
 */

var mimeCnt = 10;
var col = row = 6;
// 地图场景数据
var data = [];

// 生成雷的主入口
function genMimeArr() {
    var tmpCnt = mimeCnt,
        mimeMap = {}; // 辅助判断各格子的状态
    
    // 初始化数据
    for (var r = 0; r < row; r ++) {
        data[r] = []; // 每一行都是一个数组 
        for (var c = 0; c < col; c ++) {
            data[r][c] = 0;
        }
    }
    // 生成雷
    while(tmpCnt > 0) {
        var randX = getRandPos(col), // x => col
            randY = getRandPos(row), // y => row
            key = randY+'-'+randX;
        if(!mimeMap[key]) {
            mimeMap[key] = 1;
            data[randY][randX] = -1; // 用负数来表示这里是雷
            tmpCnt --;
        }
    }
    // 扫描雷附近的格子
    for (var r = 0; r < row; r ++) {
        for (var c = 0; c < col; c ++) {
            if(data[r][c] < 0) {
                increaseArround(r,c);
            }
        }
    }
    console.log(data);
    return data;
}
function getRandPos(max) {
    return Math.floor(Math.random()*10000)%max;
}

function increaseArround(r, c) {
    // upper row, current row, and the lower row
    for (var k = 1; k > -2; k --) { // 1, 0, -1
        var rr = r-k; // tmp row
        for (var i = c-1; i < c+2; i ++) {
            var cc = i; // tmp col
            if (cc >= 0 && cc < col     // 约束列
                && rr >= 0 && rr < row  // 约束行
                && !(rr===r&&cc===c)    // 不是当前这一格
                && data[rr][cc] >= 0) { // 且不是雷
                data[rr][cc] ++;
            }
        }
    }
}

// genMimeArr();

module.exports = genMimeArr;