// 拿到全局应用程序实例
const app = getApp()

// 创建一个页面对象用于控制页面的逻辑
Page({
  data: {
    title: '加载中...',
    piggys: [],
    loading: true,
  },

  onLoad () {
    //调用应用实例的方法获取全局数据
      //更新数据
      data = new Object();
      data['title'] = "正在参加的存钱罐";
      data['piggys'] = '';
      data['loading'] = false;

      this.setData({ title: data.title, piggys: data.piggys, loading: false })
      // wx.setNavigationBarTitle({ title: this.data.title + ' « 电影 « 豆瓣' })

      
  }
})