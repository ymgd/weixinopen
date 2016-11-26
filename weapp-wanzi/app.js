//app.js
App({
    onLaunch: function() {
    },
    globalData: {
        winH: 0,
        winW: 0,
        pages: {
            index: null
        }
    },
    initWinWH: function() {
        var sysInfo = wx.getSystemInfoSync();
        this.globalData.winH = sysInfo.windowHeight;
        this.globalData.winW = sysInfo.windowWidth;
    },
    getWinH: function(){
        if (!this.globalData.winH) {
            this.initWinWH();
        }
        return this.globalData.winH;
    },
    getWinW: function(){
        if (!this.globalData.winW) {
            this.initWinWH();
        }
        return this.globalData.winW;
    },
    getPage: function(name) {
        return this.globalData.pages[name];
    },
    setPage: function(name, page) {
        this.globalData.pages[name] = page;
    }
})