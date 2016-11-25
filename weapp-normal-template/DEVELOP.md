# DEVELOP

## node

node v6.9.1

```
$ npm install -g node-gyp
```

## Eslint

安装 npm 依赖

```
export PKG=eslint-config-airbnb-base;
npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG"
```

配置 [.eslintrc](.eslintrc)

## Gulp

安装 npm 依赖

```
$ npm install --save-dev gulp gulp-imagemin imagemin-pngquant gulp-changed gulp-rename gulp-sass del gulp-plumber run-sequence gulp-require-modules
```

配置 [gulpfile.js](gulpfile.js)
