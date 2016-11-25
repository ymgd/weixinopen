import wx from 'labrador';
import List from '../../components/list/list';
import Title from '../../components/title/title';
import Counter from '../../components/counter/counter';

export default class Index extends wx.Component {
  data = {
    userInfo: {},
    mottoTitle: 'Hello World',
    count: 0
  };

  children = {
    list: new List(),
    motto: new Title({ text: '@mottoTitle', hello: '@mottoTitle' }),
    counter: new Counter({ count: '@count', onChange: '#handleCountChange' })
  };

  handleCountChange(count) {
    this.setData({ count });
  }

  //事件处理函数
  handleViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  }

  async onLoad() {
    try {
      //调用应用实例的方法获取全局数据
      let userInfo = await wx.app.getUserInfo();
      //更新数据
      this.setData({ userInfo });
      this.update();
    } catch (error) {
      console.error(error.stack);
    }
  }

  onReady() {
    this.setData('mottoTitle', 'Labrador');
  }
}
