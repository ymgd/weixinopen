# 微信小程序代码压缩器

当你的微信小程序编译包大小超过 1024kb 时，不要急着砍模块，我觉得它还能再挽救一下。

![](http://7xs51s.com1.z0.glb.clouddn.com/wxac.png)


### 做了些什么

1. 压缩 js/json/wxml/wxss 文件；
2. 优化 jpg/gif/png/svg 文件；
3. 没了。


### 目录说明

./src 为开发目录

./dist 为编译目录


### 开始使用

* 安装依赖：
```
cd /yourPath
npm i
```

* 开发模式：
```
npm run dev
```

* 上线或测试模式：
```
npm run build
```


### 说明

微信小程序调试工具内的项目目录请指向 ./dist ，并在开发时执行 npm run dev ，此时工具将会监测 ./src 目录的改动并同步到 ./dist 中，此时的代码都是未编译的。

当开发完成需要真机预览或打包上传时，请执行 npm run build，执行完成后， ./dist 目录内的文件将被压缩优化。
