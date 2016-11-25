# weixinApp 微信小程序toDoList

## 列表页面

简单的列表页面和数据添加，此时有一些问题

* setData在清除一些用户交互的页面的时候有些问题。
* inputA 是一个输入框，当我提交数据的时候，需要清除表单的数据，setData不能清除很好的清除。



## 添加数据
使用**wx.setStorageSync(KEY,DATA)**.
```javascript
try {
    wx.setStorageSync('key', 'value')
} catch (e) {
}

```

## 删除数据
使用 **wx.removeStorageSync(KEY)**
```javascript
try {
  wx.removeStorageSync('key')
} catch (e) {
  // Do something when catch error
}

```


## 详情页面
此时用到路由机制
```html
<navigator url="/test/logs" >
	查看
</navigator>
```

## 模块化的测试
utils下的文件都是使用模块化的测试代码。

## 使用了一些ES语法

请查看**/utils/test.js**,实现了类似汉字转拼音的效果。
```javascript
var res = test.getFullChars('中国');
```


## 微信wx.request

>wx.request发起的是https请求。**一个微信小程序，同时只能有5个网络请求连接。**

在测试wx.request的时候.

* wx.request  post传参数，开发者服务器取不到参数

```php
// 在php内嵌入此句也不适合。
header('Access-Control-Allow-Origin:*');
// 可能要在nginx 服务器上配置一些参数，可以让微信小程序调用
```
* 基本上get是没有问题的。（url各种带参数是没有问题的）
* 其他的API没有测试,用的不多,如果有需要再进行测试。
```javascript
var count = 0
var maxRequest = 100
var getRequest = function(){

	wx.request({
		// 此域名必需要配置
		url: 'https://test.com/t/wxRes', //仅为示例，并非真实的接口地址
		success: function(res) {
			count++
			if(count < maxRequest){
				getRequest()
			} 
		},
		fail: function(res){
			console.log(res)
		}
	})
}
// https请求 
for(var i = 0; i< 5;i++){
	getRequest()
}
// 如果直接for10次的话，肯定有错误。这里只能for5次
```
我在测试的时候发现一个问题。post数据的时候一直不成功。经过查看文档得出结论。
需要加一段代码



```javascript

// log.js

// 头部
	header: {  
     "Content-Type": "application/x-www-form-urlencoded"  
	},  
// 这样的数据是取不到值的。要把参数转化为这个形式才ok, **id=1234444&name=adasdadad**

var postData = {
	id: 1234444,
	name: 'qidongyou'
};
postData = util.json2Form(postData);

// util.js
function json2Form(json) {  
    var str = [];  
    for(var p in json){  
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));  
    }  
    return str.join("&");  
}

module.exports = {
  json2Form: json2Form
}

```
## 测试结果

**wx.getImageInfo**取远程图片元信息是有问题的。*https://36dong.com/assets/images/index/box.png*，在本地测试是没有问题。

![](http://7xkol0.com1.z0.glb.clouddn.com/wx-getImageInfo-error)

> **download Image fail**


## 坑点
* 本地没资源不无法通过css获取。可以使用网络图片，或者base64
* app.json文件下的pages配置不能重复
* 宽高设置百分比无效果
* this与that：this.setData报错
* post 请求数据
* 修改域名配置的时候有bug. 重启项目
* 


## 其他相关文章

* [官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/?t=20161107)
* [测试工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html?t=20161107)
* [segmentfault相关文档](https://segmentfault.com/a/1190000007003240)
* [post参考文档](http://blog.csdn.net/qq_31383345/article/details/52839482)
* [查找问题相关网站](https://segmentfault.com/u/dongyou)

## 我的公众号

![](http://7xkol0.com1.z0.glb.clouddn.com/qrcode_258)




