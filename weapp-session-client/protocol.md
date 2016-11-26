# SDK 开发协议

1、首次发起请求时携带请求头，其中`X-WX-Code`是调用`wx.login`接口时获取的`code`值，`X-WX-RawData`和`X-WX-Signature`分别是调用`wx.getUserInfo`接口时获取的`rawData`和`signature`。

```js
header: {
    'X-WX-Code': 'code',
    'X-WX-RawData': 'rawData',
    'X-WX-Signature': 'signature',
}
```

2、后续请求只需携带首次请求时保存的`code`作为请求。

```js
header: {
    'X-WX-Code': 'code',
}
```

3、异常处理

异常错误均以`json`格式返回数据，数据格式如下：

```
{
    'F2C224D4-2BCE-4C64-AF9F-A6D872000D1A': 1,
    'reason'?: 'xxx',
    'error': {
        'name': 'xxx',
        'message': 'xxx',
        'detail'?: 'xxx',
    },
}
```

其中`F2C224D4-2BCE-4C64-AF9F-A6D872000D1A`是约定的唯一标识 ID，`reason`标记异常的原因，`error`包含错误的详细信息。

目前定义的`reason`有：

- `ERR_SESSION_EXPIRED`： 在`session`中未找到`code`对应的`wxUserInfo`，这里需要生成新的`code`和`signature`更新`session`(非首次请求触发有可能触发该异常)
- `ERR_SESSION_KEY_EXCHANGE_FAILED`： `code`换取`session_key`失败（首次请求有可能触发该异常）
- `ERR_UNTRUSTED_RAW_DATA`： 不可信的`rawData`，有可能是伪造的`rawData`或`signature`（首次请求有可能触发该异常）
