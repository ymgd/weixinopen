import * as util from '../../utils/utils';

interface LogsPageData {
    logs: string[];
}

interface LogsPage extends IPage {
}

class LogsPage {

    public get data(): LogsPageData {
        return {
            logs: []
        }
    }

    public onLoad(): void {
        let logs: string[] = wx.getStorageSync('logs') || [];
        logs = logs.map(log => {
            return util.formatTime(new Date(log));
        });

        this.setData({
            logs: logs
        });
    }
}

Page(new LogsPage());
