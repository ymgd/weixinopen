# generator-wxapp

> 微信小程序项目生成器

## Features

- 支持ES6, ES7
- 支持npm
- 使用[wxappy](https://github.com/Jackong/wxappy)支持promise语法
- 使用[postcss](https://github.com/postcss/postcss)
- 使用[css-modules](https://github.com/css-modules/css-modules)防止css全局污染
- 开发模式livereload
- 支持eslint & stylelint
- 使用css, xml还原默认语法提示


## install
```shell
npm i -g generator-wxapp
```

## generate project
```shell
yo wxapp
```

## build (generate `dist` dir for weixin app)
```shell
npm run build
```

## watch for livereload 
```shell
npm run watch
```

## generate page
```shell
yo wxapp:page PAGE_NAME
```

## generate template
```shell
yo wxapp:template TEMPLATE_NAME
```

