# wxapp-startkit
微信小程序 StartKit (Gulp + Babel + Sass)

[![Build Status](https://travis-ci.org/zarknight/wxapp-startkit.svg?branch=master)](https://travis-ci.org/zarknight/wxapp-startkit)
[![Dependency Status](https://david-dm.org/zarknight/wxapp-startkit.svg)](https://david-dm.org/zarknight/wxapp-startkit)
[![devDependency Status](https://david-dm.org/zarknight/wxapp-startkit/dev-status.svg)](https://david-dm.org/zarknight/wxapp-startkit#info=devDependencies)

* 使用ES6(ES2015)提供的语法进行开发，构建时用Babel进行转译
* 使用SASS作为样式表预处理器
* 编译后的代码进行了压缩优化，并生成必要的Source Map文件

#### 待完善的功能:
目前微信小程序框架在模块系统方面存在一些问题，导致当前很多成熟的ES6功能填充库，工具库(如lodash, underscore)没有办法直接顺利运行。
当前本StartKit中使用bluebird作为Promise实现库，待小程序框架本身解决问题后，理想情况下可以使用babel-polyfill来作为ES6填充库。

#### 微信小程序开发视频教程:
* [微信小程序开发-初探篇](http://v.youku.com/v_show/id_XMTc2ODA0Nzc4OA==.html)
* [微信小程序开发-框架篇1](http://v.youku.com/v_show/id_XMTc3NDQ2MjQ3Mg==.html)
* [微信小程序开发-框架篇2 WXML](http://v.youku.com/v_show/id_XMTc3NzE3Mjk4MA==.html)
* [微信小程序开发-框架篇3 事件机制](http://v.youku.com/v_show/id_XMTc4MzY4Njk5Ng==.html)
* [微信小程序开发-实例篇 法律手册](http://v.youku.com/v_show/id_XMTgyNzc3ODU2OA==.html)
* ...

#### 微信小程序开发文章教程:
* [访问我的简书](http://www.jianshu.com/users/d0dea96b2432)

#### 微信小程序开发群
* QQ群号: 511389428

#### 下载代码
    git clone https://github.com/zarknight/wxapp-startkit.git
    
#### 安装依赖库
    npm install

#### 开发模式（监听文件改动并进行实时编译）
    gulp

#### 清空输出目录并编译
    gulp build:clean
    
#### 编译一个生产版本(代码压缩优化)
    gulp build:prod

#### 许可

MIT &copy; [zarknight](http://github.com/zarknight)