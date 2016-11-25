import 'es6-promise/auto';
import wx, { app } from 'wxappy';

@app
export default class {
  data = {}
  getUserInfo() {
    if (this.data.user) {
      return Promise.resolve(this.data.user);
    }
    return wx
    .login() 
    .then(wx.getUserInfo)
    .then(({ userInfo }) => {
      this.data.user = userInfo;
      return this.data.user;
    });
  }
}
