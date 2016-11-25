# wxappy
小程序helper

## install 
```shell
npm i --save wxappy
```

## usage
```js
//  app.js
import appy, { app } from 'wxappy';

@app
export default class {
  data = {}
  getUserInfo() {
    if (this.data.user) {
      return Promise.resolve(this.data.user);
    }
    return appy
    .getUserInfo()
    .then(({ userInfo }) => {
      this.data.user = userInfo;
      return this.data.user;
    });
  }
}
```

```js
//  pages/index/index.js
import appy, { page } from 'wxappy';

@page
export default class Index {
  constructor() {
    this.data = {
      user: {},
      button: {
        type: 'primary',
        name: 'Toast',
        onTap: 'onTap',
      },
    };
  }
  onTap() {
    appy.showToast({
      title: `Hello ${this.data.user.nickName}`,
      icon: 'success',
    });
  }
  onLoad() {
    appy.app
    .getUserInfo()
    .then((user) => {
      this.setData({ user });
    });
  }
}
```
