### 微信小程序通过 Data 构建页面

首先看下 Page 生命周期图, 这张图来自于微信小程序的官方文档。


![page life](/images/mina-lifecycle.png)

截取 `onReady` 到 `onHide` 之间的图:

![render-send-data](/images/render-send-data.png)

从截图中我们可以看到在微信小程序的生命周期中，它大部分时间干的事情是 `AppSerivce Thread` 向 `View Thread` 发送数据, 然后 `View Thread` 接收数据,进行渲染, 最后生成页面。
这个和我们经常在浏览器端使用的面向 DOM 的编程有很大的区别，在 `DOM` 编程中我们使用 `jquery` 之类的库或者 api 直接操作 `DOM` 元素来构建页面, 
比如: `$('.a').addClass('foo')`。在微信小程序中没有 `DOM` 这一概念, 我们没有办法通过操作 `DOM` 元素来构建微信小程序的页面。

### 微信小程序和 Rails 程序的相似之处

Rails 程序

![client-rails.png](/images/client-rails.png)

> 在 Rails 程序中，客户端的请求 (request) 会到达对应的 `Controller` 实例，然后由这个 `Controller` 实例中的对应的 `action` 来处理请求,
> 处理后的数据会通过 `render` 方法响应给客户端。


微信小程序

![view-appservice.png](/images/view-appservice.png)

> 在微信小程序中，`View` 对象发送事件 (event) 到对应的 `Page` 对象中，然后由这个 `Page` 对象中的对应的 `event_handler` 来处理事件,
> 处理后的数据会通过 `setData` 方法响应给 `View`对象。

### 微信小程序练习预览

代码在 [https://github.com/baya/weui-base-guide-practice](https://github.com/baya/weui-base-guide-practice), 一共有 36 个页面，欢迎下载玩耍。

首页:

![weiui-index](/images/weiui-index.png)

表单错误页面:

![weiui-form-error](/images/weiui-form-error.png)

列表页面:

![weiui-list](/images/weiui-list.png)

搜索中页面:

![weiui-searching](/images/weiui-searching.png)
