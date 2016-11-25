const app = getApp();
import util from '../../../utils/util';
import helpers from '../../helpers/auth';

Page({
  data: {
    avatar_url: '',
    error_msg_hidden: true
  },

  onLoad() {
    this.setData({
      avatar_url: '/images/onboard/octocat.png'
    });
  },

  handleOnboardSubmit(e) {
    const name = e.detail.value.username;

    helpers.findUserByName(name, result => {
      if (result) {
        const user = { username: name, avatar_url: result };

        wx.setStorageSync('user', user);
        wx.navigateTo({
          url: '../../index/index'
        });
      } else {
        this.setData({
          avatar_url: '/images/onboard/octocat.png',
          error_msg_hidden: false
        });
      }
    });
  },

  handleInputChange: util.debounce(isUserExisted, 1000)
});

function isUserExisted(e) {
  const name = e.detail.value;

  helpers.findUserByName(name, result => {
    if (result) {
      app.getCurrentPage().setData({
        avatar_url: result,
        error_msg_hidden: true
      });
    } else {
      app.getCurrentPage().setData({
        avatar_url: '/images/onboard/octocat.png',
        error_msg_hidden: false
      });
    }
  });
};
