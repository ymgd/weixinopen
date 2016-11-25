# 一、小程序项目目录结构-app（1）

微信小程序开发QQ群：589408404

该项目的目录结构即为小程序的基本目录结构，一般形式如下：

    ├── app.js    // 小程序逻辑
    ├── app.json  // 小程序公共配置
    ├── app.wxss  // 小程序公共样式表
    ├── pages     // 用于存放页面模块
    │   ├── index
    │   │   ├── index.js
    │   │   ├── index.json
    │   │   ├── index.wxml
    │   │   └── index.wxss
    │   ├── logs
    │   │   ├── logs.js
    │   │   ├── logs.json
    │   │   ├── logs.wxml
    │   │   └── logs.wxss
    │   └── main
    │       ├── main.js
    │       ├── main.wxml
    │       └── main.wxss

其中：`app.js`、`app.json`、`app.wxss`是项目的主体文件，这三个文件必须放到项目的根目录下，微信小程序会读取这些文件，并生成小程序实例。

## 1、主体文件

### app.js

`app.js`是项目的入口文件，在该组件中可以监听小程序的生命周期，声明全局变量、提供公共API，以及就像在例子中看到的同步的存取本地数据等等。

    // app.js
    // 创建小程序
    App({

      // 小程序的生命周期
      onLaunch: function () {
        console.log('App Launch');
      },
      onShow: function () {
        console.log('App Show');
      },
      onHide: function () {
        console.log('App Hide');
      },

      // 提供一些公共方法
      getUserInfo: function () {
        wx.login({
          // ...
        })
      },
      // 获取位置信息
      getLocation: funtion () {
        wx.getLocation({
          // ...
        });
      },

      // 全局变量
      globalData: {
        userInfo: null
      }
    })

### app.json

`app.json`是对小程序的全局配置，主要配置：决定页面文件的路径、窗口表现、设置网络超时时间、设置多tab等。

其中`pages`中的第一项是项目的首页地址，该地址只写项目模块就行了，小程序会自动寻找同名的依赖。

| 属性 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| pages | StringArray | 是 | 设置页面路径 |
| window | Object | 否 | 设置默认页面的窗口表现 |
| tabBar | Object | 否 | 设置底部tab的表现 |
| networkTimeout | Object | 否 | 设置网络超时时间 |
| debug | Boolean | 否 | 设置是否开启debug模式 |

以下是一个包含了所有配置选项的简单配置`app.json`：

	{
	  "pages": [
	    "page/index/index",
	    "page/logs/index"
	  ],
	  "window": {
	    "navigationBarTitleText": "Demo"
	  },
	  "tabBar": {
	    "list": [{
	      "pagePath": "page/index/index",
	      "text": "首页"
	    }, {
	      "pagePath": "page/logs/logs",
	      "text": "日志"
	    }]
	  },
	  "networkTimeout": {
	    "request": 10000,
	    "downloadFile": 10000
	  },
	  "debug": true
	}

### app.wxss

`app.wxss`为全局样式，定义在全局中的样式会作用在每一个页面，而在page中定义的样式为局部样式，会覆盖和全局样式中 **选择器** 相同的样式。

`.wxss`的样式写法和普通的样式写法基本相同，通过在页面元素上添加`class`，然后书写样式即可：

	/**app.wxss**/
	.container {
	  height: 100%;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: space-between;
	  padding: 200rpx 0;
	  box-sizing: border-box;
	}

在`.wxss`中，相比于css，这里有两个拓展的属性：`rpx尺寸单位`与`@import样式导入`。

`rpx`是`responsive pixel`的缩写，代表着根据屏幕进行自适应，微信小程序规定屏幕宽度为`750rpx`，比如在iphone6上，屏幕宽度为375px，共有750个物理像素，则`750rpx = 375px = 750物理像素`，则`1rpx = 0.5px = 1物理像素`。

另外，在样式表中，可以这样导入样式：

	/** 公告wxss文件 **/
	.small-p{
	  padding:5px;
	}

	/** app.wxss **/
	@import "common.wxss";
	.middle-p:{
	  padding:15px;
	}

> 在.wxss中，同样可以使用rem进行页面布局，微信小程序规定屏幕宽度为`20rem`，1rem = (750/20)rpx。

另外，除了这种外联的写法，也可以写内联样式：

	<view style="color:{{color}};" />

但是注意，除非动态输出样式才可以这样写，其他情况不要这样写，否则会影响加载速度。
