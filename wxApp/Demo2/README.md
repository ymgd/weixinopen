# 一、小程序项目目录结构--page（2）

微信小程序开发QQ群：589408404

在微信小程序中，可自由的组织代码结构，并不一定限制于官方Demo提供的`pages`路径。

在本Demo中，将从0开始到创建页面，演示一个小页面是如何跑起来的。就以这个小Demo为例吧：

> 插播，这里放一个小Demo吧

![demo](demo.gif)

项目目录结构：

	├── README.md
	├── app.js
	├── app.json
	├── demo.gif
	└── pages
	    └── index
	        ├── index.js
	        ├── index.wxml
	        └── index.wxss

很简单的结构，下面就说说它是如何工作的。

### 第一步，建立入口文件（注册程序）

首先，我们需要一个`app.js`文件，该文件是项目的入口文件，必须要有，并且其必须要声明执行`App()`方法来初始化小程序。

所以，该文件的代码很简单，只需声明一下就可以了：

	// app.js
	App()

是不是很简单，当然了，在`Demo1`里也提到过，app里可以干的事有很多，并且可以管理整个app的声明周期，大致就像这样：

	App({
	  // 小程序初始化后执行
	  onLaunch: function () {
	    console.log('App Launch')
	  },
	  // 小程序启动，或者从后台进入前台时触发
	  onShow: function () {
	    console.log('App Show')
	  },
	  // 小程序从前台进入到后台时触发
	  onHide: function () {
	    console.log('App Hide')
	  }
	})

**前台、后台**定义： 当用户点击左上角关闭，或者按了设备 Home 键离开微信，小程序并没有正在的销毁，而是进入了后台；当再次启动微信或再次打开小程序，又会从后台进入前台。

只有当小程序进入后台一定时间，或者系统资源占用过高，才会被真正的销毁。

### 第二步、设置主页的路径

第二步就是和`app.js`同级的`app.json`文件，该文件负责项目的全局配置，这里只说如何设置页面路径。

代码如下：

	{
		"pages": [
			"pages/index/index"
		]
	}

> 注意，这是一个json文件，必须用双引号把属性名扩起来。

这一句也比较简单，`pages`参数的第一项便是项目的主页路径。我们这个Demo只有一个页面，所以设置一个就Ok了。

`"pages/index/index"`，这也对应着上面本Demo的文件路径，可以对照着看一下。需要注意的是，不用在index后面添加`.js`后缀名，因为一个页面只有一个入口js文件，小程序会自动的寻找其他依赖（index.wxml、index.wxss、index.json）。

### 第三步、注册页面

好，我们在与`app.js`同级目录下建立`pages`文件夹，然后在该文件夹下创建`index`文件夹，之后在该文件夹下创建`index.js`文件。

注册页面需要用到`Page()`方法，只需一句：

	// index.js
	Page()

其实这就OK啦，页面已经注册完毕。那我们如何看到页面效果呢，这就需要展示一些东西啦，在该文件夹下创建`index.wxml`文件，然后添加一句：

	<view>hello world!</view>

这个时候，编译一下，就能看到效果啦。当然了，也可以添加`index.wxss`为该页面添加样式。

不过，一个页面需要一些参数和一些数据，这个时候修改一下就OK啦：

	// index.js
	Page({
		data: {
			text: 'hello world'
		}
	})
	
	// index.wxml
	<view>{{text}}</view>

这个时候，重新预览页面，会发现没什么变化，但是，我们已经可以从js中输出数据啦。小程序提供了自动的数据绑定，用起来很方便。

### 四、总结一下

问：把小程序跑起来需要几步？

答：3步

	// 1. app.js
	App();
	
	// 2. app.json
	{
		"pages": [
			"pages/index/index"
		]
	}

	// 3. index.js
	Page();

