# wilddog-weapp
----

野狗微信小程序客户SDK

## 配置
微信小程序平台不同于web平台，它是一个封闭的平台。对于所有的资源使用微信都有严格的限制。所以，在微信小程序中使用野狗之前需要做一些额外的配置，除此之外，你可以像在其他开放平台一样使用野狗。

#### 配置域名白名单

首先，如果想使用野狗数据同步功能和登陆认证的功能你需要在微信小程序管理后台配置域名白名单。路径是 设置>开发设置>服务器配置。由于微信给开发者设置了很多限制，每月只能修改3次，所以修改的时候一定要慎重。为了简化配置，你自需要增加2个域名到白名单：

* socket合法域名 `wss://s-dalwx-nss-1.wilddogio.com`
* request合法域名 `https://auth.wilddog.com`

#### 配置AppId和AppSecret

如果你想使用微信的用户账号来认证(`auth.signInWeapp(opt_callback)`)，那么你还需要在野狗的管理后台配置微信的AppId 和AppSecret。
你可以在 设置>开发设置>开发者ID 中找到AppId 和AppSecret。之后在野狗后台中打开微信小程序登陆授权开关，并且将Appid 和AppSecret传入即可。

## 将野狗sdk引入到微信小程序中

1. 将wilddog-weapp-all.js 直接放到微信小程序的项目中
2. 使用commonjs引入

```js
var wilddog = require('wilddog-weapp-all')
```
3. 初始化

```js
var config = {
    syncURL: 'https://<WD-APPID>.wilddogio.com',
    authDomain: '<WD-APPID.wilddog.com>'
}
wilddog.initializeApp(config)
```




## API

微信小程序平台与一般的开放平台不同之一是它有默认的用户，所以我们提供了一个可以使用一个api进行auth的方法：

#### auth.signInWeapp(opt_callback)

* opt_callback: function(err,user) 可选回调函数，认证成功后被调用，如果认证过程一切正常`err`为`null`,user是一个包含用户`id`和`provider`等信息的对象。否则 `err` 是一个Error对象，user为null

return Promise 对象

```js
var config = {
    syncURL: 'https://<WD-APPID>.wilddogio.com',
    authDomain: '<WD-APPID>.wilddog.com'
}
wilddog.initializeApp(config)
wilddog.auth().signInWeapp(function(err,user){
    // do your logic
})

//或者使用Promise

wilddog.auth().signInWeapp().then(function(user){

}).catch(function(err){

})

```
#### ref.bindAsArray(page,varName)

将一个reference或query 与page.data中某个Array绑定，绑定后这个reference指向的数据发生任何变化都将实时同步到绑定到的变量上，从而实时同步到页面。使用bindAsArray 相当于已经监听了 所有 child_* 事件。

bindAsArray 可以很方便列表展示

* page 小程序的page对象
* varName 与页面绑定的变量名

例子

app.js

```js
var config = {
    syncURL: 'https://<WD-APPID>.wilddogio.com',
    authDomain: '<WD-APPID.wilddog.com>'
}
App({
    onLaunch:function () {
        wilddog.initializeApp(config)
        this.todoRef = wilddog.sync().ref('todo').orderByPriority().limitToFirst(20)
    }
})
```

page (假设是 index)

index.js
```
var app = getApp()
Page({
    ...
    onLoad: function () {
        app.todoRef.bindAsArray(this,'todo')
    }
    ...
})
```

index.wxml

```html
...
<view wx:for = "{{todo}}">{{item[".key"]}}-{{item[".value"]}}--{{item[".priority"]}}</view>
...
```

** 注意： **
数据绑定的过程中，野狗数据与微信小程序的数据是一一对应的，但形式发生了变化

```json
{
    "1234": "hello",
    "1235": "hello again"
}
```
会映射如下 Array

```json
[
    {
        ".key": "1234",
        ".value": "hello",
        ".priority": null
    },
    {
        ".key": "1235",
        ".value": "hello again",
        ".priority": null
    }
]
```

#### ref.bindAsObject(page,varName)

与bindAsArray 类似，不过是绑定到一个Object，而不是Array。
bindAsObject 可以很方便的展示结构化数据，比如某种配置信息。

index.js
```
var app = getApp()
Page({
    ...
    onLoad: function () {
        app.userInfoRef.bindAsObject(this,'userInfo')//userInfoRef 在app中提供，在这个例子中不再重复出现
    }
    ...
})
```

index.wxml

```html
<view>
    userName: {{userInfo[".value"]["userName"]}}
</view>

```

在这里，同样数据会发生映射
比如原始数据：

```json
key: "1234"
value:{
    "userName": "Jack"
}

```
将会被映射为：

```json
{
    ".key": "1234",
    ".value": {
        "userName": "Jack"
    },
    ".priority": null
}

```

#### ref.unbind(page,varName)

取消数据绑定


完整的API请参考 [Sync API](https://docs.wilddog.com/api/sync/web/api.html) 和 [Auth API](https://docs.wilddog.com/api/auth/web/Auth.html)

更多信息请移步[野狗官方文档](https://docs.wilddog.com)

如果遇到问题或有余力解答别人的问题可以到[野狗开发者社区](https://forum.wilddog.com) **注意：现在正在小规模测试**
