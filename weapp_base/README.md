## 微信小程序开发骨架 ##

*推荐开发工具：WebStorm*

### 项目特点 ###

- 开发阶段与生产阶段分离。
- 自动化生成新页面所需文件并添加到配置中。
- 以`Standard Code Style`校验全部的`js`和`json`文件。
- 开发阶段`json`配置文件可以有注释，方便备注。
- 代码中集成部分文档内容，减少查文档的时间。
- 开发阶段可以使用`scss`完成样式编码。
- 借助`babel`自动进行`ES2015`特性转换，放心使用新特性。
- 开发阶段可使用Typescript
- Source Map支持
- 开发阶段可以直接使用px代替rpx


### 目录文件介绍 ###
1. *src* 源文件目录
2. *.eslintrc*
	介绍：[http://www.tuicool.com/articles/7JZZJzn](http://www.tuicool.com/articles/7JZZJzn)
3. *gulpfile.js*
	介绍：[http://www.ydcss.com/archives/18](http://www.ydcss.com/archives/18 "gulp配置")
4. *jsconfig.json*
	介绍：[https://go.microsoft.com/fwlink/?LinkId=759670](https://go.microsoft.com/fwlink/?LinkId=759670)
5. *package.json*
	介绍：[http://www.ydcss.com/archives/18](http://www.ydcss.com/archives/18 "gulp配置")
6. *tsconfig.json*
	介绍：[http://www.tslang.cn/docs/handbook/tsconfig-json.html](http://www.tslang.cn/docs/handbook/tsconfig-json.html "tsconfig")


### NPM安装 ###
教程：[http://www.ydcss.com/archives/18](http://www.ydcss.com/archives/18 "gulp详细入门教程")
*网速要给力呀*


### 使用 ###

1.开发阶段

启动监视
$ `npm run watch`

可以通过任意开发工具完成`src`下的编码，`gulp`会监视项目根目录下`src`文件夹，当文件变化自动编译

通过`微信Web开放者工具`打开项目根目录下`dist`文件夹，预览~


2.生产阶段

执行如下命令

启动编译
$ `npm run build`

生产阶段的代码会经过压缩处理，最终输出到`dist`下。

同样可以通过`微信Web开放者工具`测试。