# wx-movies-demo
小程序开源项目--影讯
> 最近微信的小程序也是火的的不行，毕竟那潜在的8亿用户影响还是巨大的。想起了小程序刚开始时传爆朋友圈的那张长截图。哈哈，博主本身就是Android开发，现在也研究了一段时间的小程序，现在把学习中的成果和经验分享一下。

## 先来张效果图吧
> 项目的数据是使用的在聚合数据上申请的影视资讯接口。
**好吧，图片上传失败，效果图请移步[博客](http://www.jianshu.com/p/dcd47b43117e)**

![影讯](http://7xvvky.com1.z0.glb.clouddn.com/blog/wx/wx-movies-demo.gif)


## 资源链接
> 分享一下学习中用到的工具和资料，建议大家先了解微信的官方文档，没有js和css开发经验的同学可以上[W3School](http://www.w3school.com.cn/jsref/jsref_obj_string.asp)了解一些基本的语法(博主也是边写demo边上网站查询的)。界面设计可以学习下flex布局，有点像Android中的线性布局,但更强大一点。弹窗效果可以了解一下css中的定位。

[官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/index.html)
[开发工具下载](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=1475052055457)
[官方Demo源码下载](https://mp.weixin.qq.com/debug/wxadoc/dev/demo/demo.zip?t=1475052046827)
[设计指南](https://mp.weixin.qq.com/debug/wxadoc/design/index.html)
[flex布局介绍](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

## 项目中遇到的问题
> 这里主要记录一下博主开发中遇到的一些问题，很多都是一些细节，开发中多注意一点。

### js代码的引入
> 引入模块化的js代码使用的是相对目录，`../`类似于`cd ..`返回上一层目录

```javascript
var netUtils = require('../../../utils/netUtils.js')
```

### 事件的响应处理和传值

[事件详解介绍](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/event.html?t=1475052055756)
####  事件列表

| 类型      |     触发条件 |  
| :-------- | --------:| 
| touchstart    |   手指触摸 | 
| touchmove    |   手指触摸后移动 | 
| touchcancel    |   手指触摸动作被打断，如来电提醒，弹窗 | 
| touchend    |   手指触摸动作结束 | 
| tap    |  手指触摸后离开 | 
| longtap    |   手指触摸后，超过350ms再离开 | 

#### 事件分类

| 事件      |     声明方法 |   作用   |
| :-------- | --------:| :------: |
| 冒泡事件    |   bind+事件 |  当一个组件上的事件被触发后，该事件会向父节点传递  |
| 非冒泡事件    |   catch+事件 |  当一个组件上的事件被触发后，该事件不会向父节点传递  |


### data的数据设置 
> 1. 直接修改 this.data 无效，无法改变页面的状态，还会造成数据不一致。
> 2. 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。

```
that.setData({
                categoryList: that.data.categoryList.concat(categoryList),
                hideLoading: true,
                isLoadingMore:false
            })
```

### 控件使用问题

| 控件      |     注意点 |   
| :-------- | --------:| 
| scroll-view    |   如果纵向滑动，请设置固定高度 |  field3  |
|swiper|swiper只识别swiper-item，其他控件将忽略||

### 动态style设置
> 在.wxss中写style时属性之间注意使用`；`分隔

```
style="color:{{item.bColor}}; width: {{lineWidth}}%"
```
