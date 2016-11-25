# weapp-promise

turn api of weapp to promise 把微信小程序 api 转成 promise. 功能是从 [labrador](https://github.com/maichong/labrador) 提取得到。

## getApp()

```
import * as wx from 'weapp-promise';
const app = wx.app;
```

## promise

```
import * as wx from 'weapp-promise';
async login() {
  await wx.login();
}
```

## Thanks

[labrador](https://github.com/maichong/labrador)
