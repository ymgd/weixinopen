# DemoForWX
https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html?t=20161122
介绍IDE和已知的问题
文件最终都会解析成js
node module只要使用的是jscore引擎支持的对象函数 就可以被支持


1.配置文件的pages 路径要填写对 pages里的内容出错后 是不会报错的 只会不显示  (配置文件)

配置文件含有
(1)pages 设置page的路径
(2)window 设置窗口表现
(3)tabBar 设置页脚按钮
(4)networkTimeout 设置网络超时
(5)debug 调试开关

2.小程序目录下 主要包含一个整体app和多个单页page(展示目录结构)

app是必需的 并且必需含有三个文件(app.js,app,json,app.wxss)

page 含有四个文件(page.js,page,json,page.wxss,page.wxml),其中json这个配置文件 仅仅可以配置window设置窗口表现

3.wx对象是全局的,可以将微信提供的api进行封装做成模块来调用,也可以将一些可以复用的功能进行模块化,简化代码(展示模块目录)

4.注册页面(展示app和pages的代码)
(1)生命周期函数 (简单展示效果)
(2)getApp() 获取app对象实例 (展示app里的全局变量)
(3)初始化数据
(3)绑定事件  <view bindtap="viewTap"> {{text}} </view> bind{事件类型}="事件命名"
Page({
	data:{
		text:'hello world'
	},
	viewTap:function(){
		var that = this; //this函数内部对象 类似PHP的$this
		wx.request({
			url: 'test.php',
			data: {test:1},
			header: {
			  'Content-Type': 'application/json'
			},
			success: function(res) {
				that.setData({
					text : res.msg
				})
			}
		})
	}
})
(4)setData 设置数据 重新渲染
(5)页面路由 页面跳转
wx.navigateTo 页面跳转 保留当前页
wx.redirectTo 页面重定向 关闭当前页
wx.navigateBack 页面返回 界面返回按钮 
(6)getCurrentPages() 获得一个已打开页面的层级对象 里面有路由地址供跳转

5.wxml
(1)基本就是html view这个标签类似于div
(2)模板语法 pass {{}} 双花括号来输出变量
(3)模板 import 类似于discuz的模板机制
(4)在标签内 写 data-名称 的属性 可以在事件中获取属性内容 event.currentTarget.dataset.名称
(5) 可以将登陆注册登陆完成的页面 引入在同一个page内 根据不同状态渲染页面,不使用redirectTo 优化原生的APP体验


6.wxss
基本就是css 选择器什么的 都差不多 不可以使用级联(组件会被影响) 支持新的rpx单位自适应
7.组件和api 
微信相关的接口如支付用户信息授权的使用与公众号开发基本类似


