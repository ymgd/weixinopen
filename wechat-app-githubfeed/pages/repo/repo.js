import services from '../../utils/services';

Page({
  onLoad(options) {
    this.showLoadingToast();
    this.setData({
      repo_full_name: options.repo_full_name
    });
    this.fetchRepoData(this._reloadUrl());
  },

  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.repo_full_name
    });
  },

  _reloadUrl() {
    const basic_url = 'https://api.github.com/repos/';

    return basic_url + this.data.repo_full_name;
  },

  fetchRepoData(url) {
    services.fetch(url).then(res => {
      this.setData({
        repo: res.data
      });
      this.hideLoadingToast();
    });
  },

  showLoadingToast() {
    wx.showToast({
      title: '玩命加载中...',
      icon: 'loading', 
      duration: 10000
    });
  },

  hideLoadingToast() {
    wx.hideToast();
  }
});
