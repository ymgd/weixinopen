const app = getApp();
import services from '../../utils/services';

Page({
  data: {
    locationArray: ['All Countries', 'Australia', 'China', 'Canada', 'France', 'Germany', 'India', 'Japan', 'UK', 'USA'],
    locationIndex: 2,
    languageArray: ['All Languages', 'ActionScript', 'C', 'C#', 'C++', 'Clojure', 'CoffeeScript', 'CSS', 'Go', 'Haskell', 'HTML', 'Java', 'JavaScript', 'Lua', 'Matlab', 'Objective-C', 'Objective-C++', 'Perl', 'PHP', 'Python', 'R', 'Ruby', 'Scala', 'Shell', 'Swift', 'TeX', 'VimL'],
    languageIndex: 0,
    items: [],
    page: 1,
    incomplete_results: false
  },

  onLoad() {
    this.refreshData();
  },

  onPullDownRefresh() {
    this.refreshData();
  },

  _reloadUrl() {
    const basic_url = 'https://api.github.com/search/users?q=';

    // locationIndex may be 0 or '0'
    if (this.data.locationIndex == 0) {
      return `${basic_url}language:${this.data.languageArray[this.data.languageIndex]}&sort=followers&page=${this.data.page}`;
    }
    if (this.data.languageIndex == 0) {
      return `${basic_url}location:${this.data.locationArray[this.data.locationIndex]}&sort=followers&page=${this.data.page}`;
    }
    return `${basic_url}location:${this.data.locationArray[this.data.locationIndex]}+language:${this.data.languageArray[this.data.languageIndex]}&sort=followers&page=${this.data.page}`;
  },

  _initData() {
    this.setData({
      items: [],
      page: 1,
      incomplete_results: false
    });
  },

  fetchUsersData(url) {
    services.fetch(url).then(res => {
      if (res.data.items) {
        this.setData({
          items: this.data.items.concat(res.data.items),
          page: 1,
          incomplete_results: res.data.incomplete_results
        });
      }
      this.hideLoadingToast();
    });
  },

  handleLocationPickerChange(e) {
    if (this.data.languageIndex || e.detail.value) {
      this.showLoadingToast();
      this.setData({
        locationIndex: e.detail.value
      });
      this._initData();
      this.fetchUsersData(this._reloadUrl());
    }
  },

  handleLanguagePickerChange(e) {
    if (this.data.locationIndex || e.detail.value) {
      this.showLoadingToast();
      this.setData({
        languageIndex: e.detail.value
      });
      this._initData();
      this.fetchUsersData(this._reloadUrl());
    }
  },

  loadMoreData() {
    if (this.data.incomplete_results) return;
    this.showLoadingToast();
    this.setData({
      page: ++this.data.page
    });
    this.fetchUsersData(this._reloadUrl());
  },

  refreshData() {
    this.showLoadingToast();
    this._initData();
    this.fetchUsersData(this._reloadUrl());
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
