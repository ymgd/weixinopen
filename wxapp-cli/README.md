
## 前言

> 不久前我们一直所期待的应（xiao）用（cheng）号（xu）终于诞生了，但微信制造了一系列的封闭环境，在内测版中，我们看见了开发其实是十分不便利的。为了能提升咱们的工作效率，小手架由此而生 --- wxapp

## wxapp介绍

#### 优势

1.可以在任意IDE中开发

2.可使用ES6或ES5

3.支持sass和less

4.可以同时编写`.html|.wxml`，`.wxss|.scss|.less` 文件，最后都会转换为`.wxml`和`.wxss`

5.编写完任何文件（包括.json）只需要去微信开发者工具中点击重启即可预览

6.NODE_ENV 环境切换 (dev|production)

7.支持eslint (在gulpfile文件打开36行注释即可,下个版本会集成到cli配置选项中)

#### 劣势

1.由于微信封闭的环境内，所以没有`sourcemap`，但这不太影响调试（即使是经过编译后的代码，本人测试了出bug的代码，还是可以从控制台跳到源码的地方）

2.由于微信封闭的环境内，无法实现`reload`或者`hot reload`

> PS: 当然如果你不想写ES6也是完全可以的 在后面统一介绍命令

## 安装

```js
// 安装我们的命令
//mac
sudo npm i -g wxapp
// window
npm i -g wxapp
```

## 使用

```js
// 初始化一个目录结构
wxapp init [project_name]

// 如
wxapp init first-wxapp
```

## DEV

`npm run dev` // 默认启用了ES6模式

`npm run dev-es5` // 不启用ES6模式

```js

--- dist
... // 这里的文件是编译处理过后的，和src目录结构完全相同     
--- src
    |--- image
    |--- pages
        |--- index
            |--- index.js
            |--- index.scss （可直接编写sass）
            |--- index.html (可直接编写html文件)
        |--- logs
            |--- logs.js
            |--- logs.json （json文件也会实时编译）
            |--- logs.wxml （也可直接写wxml文件）
            |--- logs.wxss （也可直接写wxss文件）
    app.js
    app.json
    app.sass
...
```

接着我们只需要打开微信开发者工具，添加项目，那个项目目录指向为`dist`目录即可。
![微信开发者工具](http://7xim8z.com1.z0.glb.clouddn.com/xiaochengxu-1.png)

## NODE_ENV

开发中往往我们需要有`dev`和`pro`环境，根据不同环境下做一些事情，比如HTTP的请求链接

```js
// ES6开发模式下
//  ./src/utils/ajaxurl.js
var server1 = 'https://im.server1.url';
var server2 = 'https://im.server2.url';

var server = null;
        
if(NODE_ENV === 'dev') {
	server = server1;
} else if(NODE_ENV === 'production') {
	server = server2;
}
  
module.exports = server;
```
```js
// ES5开发模式下  
//  ./src/utils/ajaxurl.js
var server1 = 'https://im.server1.url';
var server2 = 'https://im.server2.url';

var server = null;
        
if('NODE_ENV' === 'dev') { // 这里要写字符串，我会替换这里的字符串
	server = server1;
} else if('NODE_ENV' === 'production') {
	server = server2;
}
  
module.exports = server;
```

## Build

`npm run build` // 默认ES6模式 

`npm run build-es5` // 使用ES5编写模式

PS：这里有个坑，由于build会压缩代码，所以如果你用ES5编写，别用promise这样的ES6的代码，uglify压缩不支持。

虽然微信开发者工具用谷歌内核貌似支持部分ES6的代码，但现在也不能保证用户真正使用是否支持。如果使用ES5模式,建议大家写纯纯的ES5

## TODO

我们知道微信希望我们创建4个文件来写page或者组件。所以下一个版本我会写个命令创建这4个文件的template。

- [ ] 一键创建文件

## 后话

> 小程序目前还在内测当中，本人凭着直觉和经验直接做出了这一套脚手架，在测试上可能略有不足。（目前测试了node5和node6版本，window10和mac）。大家有问题可以第一时间给我提issue，我会在一天内给你答复。

> 未来小程序完全公测了，微信可能会把工程化的问题也一并解决了。但是我还是更愿意在喜欢的IDE中编写代码 :)

最后给出github地址：[https://github.com/MeCKodo/wxapp-cli](https://github.com/MeCKodo/wxapp-cli)

