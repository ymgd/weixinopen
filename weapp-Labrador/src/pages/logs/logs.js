import wx from 'labrador';
import { formatTime } from '../../utils/util';

export default class Logs extends wx.Component {
  data = {
    logs: []
  };

  async onLoad() {
    let res = await wx.getStorage({ key: 'logs' });
    let logs = res.data || [];
    this.setData({
      logs: logs.map(log => formatTime(new Date(log)))
    });
  }
}
