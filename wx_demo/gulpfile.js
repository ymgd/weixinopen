// 引入gulp
var gulp = require('gulp');
// 只操作有过修改的文件
var changed = require('gulp-changed');
var replace = require('gulp-replace');
var less = require('gulp-less');
var rename = require("gulp-rename");
var babel = require('gulp-babel');
var async4wx = require('./gulp-async4wx');

// wxml,json处理
gulp.task('copy', function() {
    return gulp.src(['src/**/*.wxml', 'src/**/*.json'])
        .pipe(changed('dist'))
        .pipe(gulp.dest('dist'));
});


//less处理
gulp.task('less', function() {
    return gulp.src('src/**/*.less')
        .pipe(changed('dist'))
        .pipe(less())
        .pipe(rename({
            extname: ".wxss"
        }))
        .pipe(gulp.dest('dist')); //将会在src/css下生成index.css
});

// es6处理
gulp.task('babel', function() {
    return gulp.src('src/**/*.js')
        .pipe(changed('dist'))
        .pipe(babel({
            presets: ['es2015', 'stage-0']
        }))
        .pipe(async4wx({
            root: __dirname,
            entry: './src/app.js'
        }))
        .pipe(gulp.dest('dist'));
});

// 各种npm库
gulp.task('npm', function() {
    //Promise
    gulp.src('./node_modules/es6-promise-polyfill/promise.js')
        .pipe(rename({
            dirname: "npm/promise",
            basename: "index",
        }))
        .pipe(gulp.dest('dist'));
    //babel-runtime
    gulp.src('./node_modules/regenerator-runtime/runtime.js')
        //这里要手动引用Promise
        .pipe(replace(/^([\s\S])/g, "var Promise = global['Promise'];\n$1"))
        .pipe(rename({
            dirname: "npm/regenerator-runtime",
            basename: "index",
        }))
        .pipe(gulp.dest('dist'));
    //co
    gulp.src('./node_modules/co/index.js')
        //这里要手动引用Promise
        .pipe(replace(/^([\s\S])/g, "var Promise = global['Promise'];\n$1"))
        .pipe(rename({
            dirname: "npm/co",
        }))
        .pipe(gulp.dest('dist'));
});

// 监听任务
gulp.task('watch', function() {
    gulp.watch(['src/**/*.wxml', 'src/**/*.json'], ['copy']);
    gulp.watch('src/**/*.less', ['less']);
    gulp.watch('src/**/*.js', ['babel']);
});

//构建
gulp.task('build', ['copy', 'less', 'babel', 'npm']);

// 默认任务
gulp.task('default', ['watch', 'build']);