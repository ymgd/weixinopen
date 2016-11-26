module.exports = function(msg, page) { // page -> index page
    var app = getApp();

    msg = JSON.parse(msg);
    var type = msg.data && msg.data.type || 
        msg.errMsg && msg.errMsg.type;
    if (type === 'dig') { // 挖金子操作
        if (msg.errCode == 0) {
            var result = msg.data.answer,
                x = msg.data.x,
                y = msg.data.y;
            if (result < 0) { // 挖到金子了
                app.decreaseCount();
                var leftGolds = page.data.leftGolds,
                    score = page.data.score;
                if (msg.data.isMe) {
                    score ++;
                }
                page.setData({
                    leftGolds: --leftGolds,
                    score: score
                });
            }
            // 把相应的格子翻出来
            page.setData({
              ['mimeMap[' + y + '][' + x + ']']: result,
            });
        }
    }
    else if (type === 'create') { // 创建或进入房间
        if(msg.errCode == 0) {
            var mimeMap = msg.data.map;
            app.updateMap(mimeMap);         // 地图场景
            app.setCount(msg.data.count);   // 金子个数
            page.setData({
              mimeMap: mimeMap,
              leftGolds: msg.data.count     // app.getCount()
            });
        }
        else {
            wx.navigateBack();
        }
    }
    else if (type === 'over') { // 游戏结束
        if(msg.errCode == 0) {
            app.setMyScore(msg.data.score);
            wx.navigateTo({
                url: '../gameover/gameover'
            });
        }
    }
}
