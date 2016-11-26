微信小程序会话管理 - 客户端
=============================

微信的网络请求接口 `wx.request()` 没有携带 Cookies，这让传统基于 Cookies 实现的会话管理不再适用。为了让处理微信小程序的服务能够识别会话，我们推出了 `weapp-session`。

`weapp-session` 使用自定义 Header 来传递微信小程序内用户信息，在服务内可以直接获取用户在微信的身份。

本客户端需要配合[服务器代码](https://github.com/CFETeam/weapp-session)使用。

客户端的使用比较简单，提供了一个和 `wx.request` 参数一样的方法：

```js
const request = require('./lib/session-request.js');

request({
    url: 'https://www.mydomain.com/myapi',
    success(data) {
        console.log(data);
    }
});
```

具体使用可以参照 `pages/example/example.js` 的代码。

> 要使用本客户端，需要至少引用 `lib` 目录下的 `co.js`、`promisify.js` 以及 `session-request.js`。