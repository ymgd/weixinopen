const app = getApp();
import services from '../../utils/services';

Page({
  data: {
    languageArray: ['All Languages', 'C', 'CSS', 'Go', 'HTML', 'Java', 'JavaScript', 'Lua', 'Objective-C', 'Perl', 'PHP', 'Python', 'R', 'Ruby', 'Scala', 'Shell', 'Swift'],
    languageIndex: 0,
    tabArray: ['Daily', 'Weekly', 'Monthly'],
    tabIndex: 0
  },

  onLoad() {
    this.refreshData();
  },

  onPullDownRefresh() {
    this.refreshData();
  },

   _reloadUrl() {
    const basic_url = 'http://trending.codehub-app.com/v2/trending?since=';

    // locationIndex may be 0 or '0'
    if (this.data.languageIndex == 0) {
      return basic_url + this.data.tabArray[this.data.tabIndex].toLowerCase();
    }
    return `${basic_url}${this.data.tabArray[this.data.tabIndex].toLowerCase()}&language=${this.data.languageArray[this.data.languageIndex].toLowerCase()}`;
  },

  handleLanguagePickerChange(e) {
    this.showLoadingToast();
    this.setData({
      languageIndex: e.detail.value
    });
    this.fetchReposData(this._reloadUrl());
  },

  handleTabPickerChange(e) {
    this.showLoadingToast();
    this.setData({
      tabIndex: e.detail.value
    });
    this.fetchReposData(this._reloadUrl());
  },

  fetchReposData(url) {
    services.fetch(url).then(res => {
      if (res.data) {
        this.setData({
          items: res.data
        });
      }
      this.hideLoadingToast();
    });
  },

  refreshData() {
    this.showLoadingToast();
    this.fetchReposData(this._reloadUrl());
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
