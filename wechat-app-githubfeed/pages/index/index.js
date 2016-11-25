const app = getApp();
import services from '../../utils/services';
import util from '../../utils/util'
import helpers from '../helpers/index';

Page({
  data: {
    items: [],
    page: 1
  },

  onLoad() {
    const user = wx.getStorageSync('user');

    console.log('#user#', user);
    if (!user) {
      wx.navigateTo({
        url: '../auth/onboard/onboard'
      });
    }
    this.refreshData();
  },

  onPullDownRefresh() {
    this.refreshData();
  },

  _reloadUrl() {
    const basic_url = 'https://api.github.com/users/uniquexiaobai/received_events?page=';

    return basic_url + this.data.page;
  },

  _initData() {
    this.setData({
      items: [],
      page: 1
    });
  },

  fetchEventsData(url) {
    services.fetch(url).then(res => {
      res.data.forEach(item => {
        item.type = helpers.formateActionType(item.type);
        item.created_at = util.timesAgo(item.created_at);
      });
      this.setData({
        items: this.data.items.concat(res.data)
      });
      this.hideLoadingToast();
    });
  },

  loadMoreData() {
    this.showLoadingToast();
    this.setData({
      page: ++this.data.page
    });
    this.fetchEventsData(this._reloadUrl());
  },

  refreshData() {
    this.showLoadingToast();
    this._initData();
    this.fetchEventsData(this._reloadUrl());
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
