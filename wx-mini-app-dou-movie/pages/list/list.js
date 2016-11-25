// 获取全局应用程序实例对象
var app = getApp();

// 创建一个页面对象用于控制页面的逻辑
Page({
  data: {
    title: '',
    subtitle: '加载中...',
    type: 'in_theaters',
    loading: true,
    hasMore: true,
    page: 1,
    size: 20,
    movies: []
  },
  onLoad(params) {
    this.data.title = params.title || this.data.title;
    // 类型： in_theaters  coming_soon  us_box
    this.data.type = params.type || this.data.type;
    this.handleLoadMore();
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.title + ' « 电影 « 豆瓣'
    });
  },
  handleLoadMore(e) {
    this.setData({
      loading: true,
      subtitle: '加载中...',
    });
    app.douban.find(this.data.type, this.data.page++, this.data.size)
        .then((data) => {
          if (data.subjects.length) {
            this.setData({
              movies: this.data.movies.concat(data.subjects),
              subtitle: data.title,
              loading: false
            });
          } else {
            this.setData({
              subtitle: data.title,
              hasMore: false,
              loading: false
            });
          }
        });
  }
});
