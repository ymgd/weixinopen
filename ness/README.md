<h1>NESS</h1>
> 在微信小程序中使用 cssnext.

![alt tag](http://i.imgur.com/XkvxMWx.gif)


<h3>为何使用 cssnext 而不用 scss, less?</h3> 
> 类似于 babel, cssnext 也是一款转译器, 根据目前仍处于草案阶段、未被浏览器实现的标准把代码转译成符合目前浏览器实现的 CSS。
支持大部分 sass、less 等特性，例如 css 变量, nest等，优点在于以后浏览器全面支持后，可以直接去掉 cssnext转译器，而不用改变任何代码。

详细了解cssnext: http://cssnext.io/

<h2>Usage</h2>
1.必要安装:
```
$ npm install postcss-cli ness-tool postcss -g
```

2.按需安装:
```
//按需安装相关 postcss 插件
//例如需要 custom-properties 特性的就安装此插件
//详细特性列表: http://cssnext.io/features/
例如:
$ cnpm i postcss-import postcss-discard-comments postcss-custom-properties postcss-nesting -g
```

3.terminal前往至微信小程序项目的根目录, 使用: 
```
//首次运行需要设置 plugin , 请带参数, 如: ness -u xxx 或 ness --use xxx, 如:
$ ness -u postcss-import -u postcss-discard-comments -u postcss-custom-properties -u postcss-nesting
//以后仅需在目录执行 ness 命令即可
```

4.详细参数:
``` 
ness [--use|-u] plugin
  -u, --use           postcss 插件名称 (可以多个插件一起使用)
  -v, --version       显示版本
  -h, --help          显示帮助
```

todo:
- 增加 options 配置参数