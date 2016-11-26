import {WeApp} from '../../common/common';

const app: WeApp = getApp() as WeApp;

interface IndexPageData {
    motto: string;
    userInfo: wx.IData;
}

interface IndexPage extends IPage {
}

class IndexPage {

    public get data(): IndexPageData {
        return {
            motto: 'Hello World',
            userInfo: {}
        }
    }

    public bindViewTap(): void {
        wx.navigateTo({
            url: '../logs/logs'
        });
    }

    public onLoad(): void {
        console.log('onLoad');
        app.getUserInfo(info => {
            this.setData({
                userInfo: info
            });
        });
    }
}

Page(new IndexPage());
