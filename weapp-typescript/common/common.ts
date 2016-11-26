export interface WeApp extends IApp {
    globalData: {
        userInfo: wx.IData;
    };

    getUserInfo(cb: (info: wx.IData) => void): void;
}