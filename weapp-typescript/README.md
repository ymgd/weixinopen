# weapp - typescript

这是一个演示如何使用TypeScript编写微信小程序的demo。

![code](https://cloud.githubusercontent.com/assets/7069719/19881866/4276db58-a044-11e6-8d96-e14210ffe1cf.gif)

## 如何运行

1.下载tsc

	npm install tsc -g

2.编译

	tsc -w

tsc会在ts文件目录下生成同名js文件。 `-w` 参数表示开启自动编译。



## API定义文件

typings文件夹中添加了用于自动提示的api定义文件 [weapp.d.ts](./typings/weapp.d.ts)

建议使用 [VSCode](http://code.visualstudio.com) 或者 [EgretWing](http://egret.com/products/wing.html) 编码，将得到更好的编码体验。

