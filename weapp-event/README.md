# 如何在微信小程序里面实现跨页面通信？ #

我们在处理业务需求的时候，常常会遇到一些情况，在二级或者三级页面进行某些操作或者变更后，需要将结果通知到上级页面去。比如：
- 选择了某些配置项，点击保存后，外部页面能够立即变更
- 在上传头像页面，上传完毕后，外部页面的头像能够立即显示为新头像。

所以，这个时候就涉及到如何在页面之间通信的问题了。
跨页面通信进一步说其实就是一个程序内部的事件通知机制问题，在其他平台或者OS上都一些相应的实现，比如:
- iOS SDK自带的 NotificationCenter
- Android 平台著名的第三方库 EventBus

目前微信小程序官方SDK还没有提供 Event API 来帮助开发者实现页面间通信，所以我们今天来看看，自己如何实现这样一个简单的小工具。

## 开始前先打个广告 ##
强烈推荐我司出品的好用到违反广告法的助眠软件——云梦

“云梦”可以使你保持良好作息规律，将生物钟调节到最佳状态，令生活工作增强动力，保持效率的同时心情舒畅。

只能用好评如潮来形如这款软件了，[点此立即下载](http://dj.soundario.com/download.php)

![](https://github.com/danneyyang/weapp-event/blob/master/img/dc1.jpeg)
![](https://github.com/danneyyang/weapp-event/blob/master/img/dc2.jpeg)
![](https://github.com/danneyyang/weapp-event/blob/master/img/dc3.jpeg)
![](https://github.com/danneyyang/weapp-event/blob/master/img/dc4.jpeg)

说到这里就不得不说“云梦”的微信小程序版本了，在小程序开始公测后，我们也在第一时间将“云梦”的基本功能移植到了小程序平台上。
整个过程相当顺利，除了小程序的IDE还不是太稳定外，基本上没啥大问题。
开发过程和React-Native基本相似，大概一天时间就搞定了。


## Quick And Dirty ##
我们知道，在小程序里面一个页面的变化，是通过调用 setData 函数来实现的。所以想做到在二级页面里让一级页面产生变化，最 Quick And Dirty 的做法就是把一级页面的 this 传入到二级页面去，这样我们在二级页面调用 page1.setData(…) 就可以立即引发外部的变化。

但是这并不是一个好的方案，不仅产生了页面的耦合，而且也并不能处理复杂的数据逻辑，因为二级页面不并清楚也不应该关心一级页面想怎么处理当前数据。所以二级页面只应该把变更后的数据通知给一级页面即可，至于一级页面是想刷新界面，还是想本地存储或者发起网络通信，别人都不需知晓了。

## 简单的Callback ##
如果只是想把数据通知给外部页面，那应该怎么做呢？
我们来看看第二个方案，如果想产生一个通知，这里就需要用到 callback 机制了。
即关心数据变化的页面，注册一个 callback 函数到一个公共的地方；而数据变更者在变更数据后，将新的数据放入同一个公共的地方；在放入数据时，同时调用这个 callback 函数，让 callback 函数实现者接收到这个变化。

哪这个公共的地方在哪里呢？
第一反应就是 app.js 里面，因为小程序提供了一个 API 叫做 getApp()，让 page 初始化时，可以通过以下代码：
```js
var app = getApp()
```
来获取 app 实例，从而实现全局的数据共享，并且微信也很贴心的在 Demo 代码里面留了一个 globalData 字段，以暗示开发者这里是可以用来存储全局数据的。

```js
App({
    ...
    globalData:{
        userInfo:null
    }
    ...
})
```

基于 app.js 方案的伪代码如下：

```js
//app.js
App({
    addListener: function(callback) {
        this.callback = callback;
    },

    setChangedData: function(data) {
        this.data = data;
        if(this.callback != null) {
            this.callback(data);
        }
    }
})
```

然后我们在一级页面的 onLoad中 调用 addListener：

```js
//page1.js
var app = getApp()
Page({
    onLoad: function () {
        app.addListener(function(changedData) {
            that.setData({
                data: changedData
            });
        });
    }
})
```

在二级页面数据变更的地方调用：

```js
//page2.js
var app = getApp()
Page({
    onBtnPress: function() {
        app.setChangedData('page2-data');
    }
})
```

## 一个基本合格的方案 ##

以上就是跨页面通信的最基本原理，不过这也是一个很 dirty 的方案，因为上面的代码只能支持一种 Event 的通知，而且也不能针对这个 Event 添加多个监听者（比如有多个页面需要同时知道某数据变更）。
让我们来看看一个基本合格的 Event 管理器应该具备怎样的能力？
- 支持多种 Event 的通知
- 支持对某一 Event 可以添加多个监听者
- 支持对某一 Event 可以移除某一监听者
- 将 Event 的存储和管理放在一个单独模块中，可以被所有文件全局引用

根据以上的描述，我们来设计一个新的 Event 模块，对应上面的能力，它应该具有如下三个函数：
- on 函数，用来向管理器中添加一个 Event 的 Callback，且每一个 Event 必须有全局唯一的 EventName，函数内部通过一个数组来保存同一 Event 的多个 Callback
- remove 函数，用来向管理器移除一个 Event 的 Callback
- emit 函数，用来触发一个 Event

我们在小程序的 utils 目录中，新建一个 event.js 文件，来作为一个独立的模块，伪代码如下:

```js
//event.js
var events = {};

function on(name, callback) {
    var callbacks = events[name];
    addToCallbacks(callbacks, callback);
}

function remove(name, callback) {
    var callbacks = events[name];
    removeFromCallbacks(callbacks, callback);
}

function emit(name, data) {
    var callbacks = events[name];
    emitToEveryCallback(callbacks, data);
}

exports.on = on;
exports.remove = remove;
exports.emit = emit;
```

我们来看看在一二级页面应该如何来使用这个 Event 模块

在二级页面中触发事件：

```js
//page2.js
var event = require('../../utils/event.js');
Page({
    onBtnPress: function() {
        event.emit('DataChanged', 'page2-data');
    }
});
```

在一级页面的 onLoad 中监听事件，onUnload 中取消监听：

```js
//page1.js
var event = require('../../utils/event.js');
Page({
    onLoad: function() {
        var that = this;
        event.on('DataChanged', function(changedData) {
            that.setData({
                data: changedData
            });
        });
    },

    onUnload: function() {
        event.remove('DataChanged', ...);
    }
});
```

咦，似乎哪里不对？

remove 需要接受两个参数，第一个是 EventName，第二个是 Callback，但是我们的 Callback 以匿名函数的方式写在了 event.on(...) 的调用语句里面

好吧，那我们不得不修改一下语句的调用方式：

```js
//page1.js
var event = require('../../utils/event.js');
Page({
    onDataChanged: function(changedData) {
        this.setData({
            data: changedData
        })
    },

    onLoad: function() {
        event.on('DataChanged', this.onDataChanged);
    },

    onUnload: function() {
        event.remove('DataChanged', this.onDataChanged);
    }
});
```

这样就 OK 了么？NO NO NO NO

熟悉 Javascript this 这个大坑的朋友们一定会知道，在 onDataChanged 这个函数中调用的 this 并不是我们 Page 中的那个 this，所以根本不可能调用到 this.setData(....)，于是我们用 bind 大法稍微调整一下：

```js
onLoad: function() {
    event.on('DataChanged', this.onDataChanged.bind(this));
}

onUnload: function() {
    event.remove('DataChanged', this.onDataChanged.bind(this));
}
```

现在OK了么？NO NO NO NO！如果大伙敲代码试试，就会发现依然还是不行！

因为

```js
this.onDataChanged.bind(this)
``` 
会产生一个新的匿名函数，即 bind的 返回值是一个函数，那么在 onLoad 和 onUnload 里面，各自调用了 bind 大法，从而产生了各自的匿名函数，也就是说 event.remove(...) 塞进去的那个函数，并不是 event.on(...) 塞进去的那个函数，这样就造成了 remove 时无法正确匹配。removeFromCallbacks 的伪代码大致如下：

```js
function removeFromCallbacks(callbacks, callback) {
    var newCallbacks = [];
    for(var item in callbacks) {
        if(item != callback) {
            newCallbacks.push(item);
        }
    }
    return newCallbacks;
}
```

所以我们会发现 remove 传入的 callback 永远无法在 callbacks 数组中被匹配到，从而也就无法正确移除了。

## 最终的代码实现 ##

当 EventName + Callback 无法唯一决定需要移除的监听者时，那么自然想到的就是再增加一个 key 值，我们可以用Page自身的某个特性来做 key，比如 page name ，新的 remove 原型如下：

```js
function remove(eventName, pageName, callback);
```

pageName 是一个字符串，如果开发者不能做到全局内 page name 唯一的话（比如开发者一不小心写错了），那就可能会出现后来监听者冲掉前面监听者的情况，从而造成无法收到通知的 bug。
所以这里看起来还是用 page 的 this 做 key 比较靠谱，修改后的函数原型如下：

```js
function on(name, self, callback);

function remove(name, self, callback);
```

让我们来看看内部具体怎么实现。以下是一个完整的 on 函数实现：

```js
function on(name, self, callback) {
    var tuple = [self, callback];
    var callbacks = events[name];
    if (Array.isArray(callbacks)) {
        callbacks.push(tuple);
    }
    else {
        events[name] = [tuple];
    }
}
```

- 第二行我们将 self (即 page 的 this)和 callback 合并成一个 tuple
- 第三行从 events 容器中，取出该 EventName 下的监听者数组 callbacks
- 如果该数组存在，则将 tuple 加入数组；如果不存在，则新建一个数组。

remove的完整实现：

```js
function remove(name, self) {
    var callbacks = events[name];
    if (Array.isArray(callbacks)) {
        events[name] = callbacks.filter((tuple) => {
            return tuple[0] != self;
        });
    }
}
```

- 第二行从 events 容器中，取出该 EventName 下的监听者数组 callbacks
- 如果 callbacks 不存在，则直接返回
- 如果存在，则调用 callbacks.filter(fn) 方法

*filter 方法的含义是通过 fn 来决定是否过滤掉 callbacks 中的每一个项。fn 返回 true 则保留，fn 返回 false 则过滤掉。所以我们调用 callbacks.filter(fn) 后，callbacks 中的每一个 tuple 都会被依次判定。*

fn的定义为：

```js
(tuple) => { 
    return tuple[0] != self; 
}
```
tuple 中的第一个元素 self 和 remove 传入的 self 相比较，如果不相等则返回 true 被保留，如果相等则返回 false 被过滤掉。
callbacks.filter(fn) 会返回一个新的数组，然后重新写入 events[name]，最终达到移除callbacks中某一项的逻辑。

最后再来看看emit的实现：

```js
function emit(name, data) {
    var callbacks = events[name];
    if (Array.isArray(callbacks)) {
        callbacks.map((tuple) => {
            var self = tuple[0];
            var callback = tuple[1];
            callback.call(self, data);
        });
    }
}
```

- 第二行从 events 容器中，取出该 EventName 下的监听者数组 callbacks
- 如果 callbacks 不存在，则直接返回
- 如果存在，则调用 callbacks.map(fn) 方法

*和 filter 的用法类似，map 函数的作用相当于 for 循环，依次取出 callbacks 中的每一个项，然后对其执行 fn(tuple)，从其名字就可以看出 map 就是映射变换的意思，将 item 变换为另外一种东西，这个映射关系就是fn。*

fn 的定义为：

```js
(tuple) => {
    var self = tuple[0];
    var callback = tuple[1];
    callback.call(self, data);
}
```

对传入的 tuple，分别取出 self 和 callback，然后调用 Javascript 的 call大法：

```js
fn.call(this, args)
```
从而最终实现调用到监听者的目的。

讲到这里就基本上差不多了，因为 Event 模块持有了 Page 的 this，所以一定要在 Page 的 Unload 函数中调用 event.remove(…)，不然会造成内存泄露。

## 源代码 ##
event.js 的完整源代码和Demo请见 <https://github.com/danneyyang/weapp-event>
