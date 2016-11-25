import wx from 'labrador';
import { sleep } from './utils/util';

export default class {
  globalData = {
    userInfo: null
  };

  async onLaunch() {
    //调用API从本地缓存中获取数据
    let res = await wx.getStorage({ key: 'logs' });
    let logs = res.data || [];
    logs.unshift(Date.now());
    await wx.setStorage({ key: 'logs', data: logs });
    this.timer();
  }

  async timer() {
    while (true) {
      console.log('hello');
      await sleep(10000);
    }
  }

  async getUserInfo() {
    if (this.globalData.userInfo) {
      return this.globalData.userInfo;
    }
    await wx.login();
    let res = await wx.getUserInfo();
    this.globalData.userInfo = res.userInfo;
    return res.userInfo;
  }
}
