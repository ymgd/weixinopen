var path          = require('path');
var gulp          = require('gulp');
var watch         = require('gulp-watch');


var named         = require('vinyl-named');
var rename        = require('gulp-rename');




var src = {
  images: './src/**/*.{png,jpg,jpeg}',
  js: './src/**/*.js',
  wxss: './src/**/*.wxss',
  wxml: './src/**/*.wxml',
  json: './src/**/*.json'
};


var distPath = './dist/';

// dev 调试代码
gulp.task('dev', function() {
  console.log(111111);
  gulp.start('json')
})

// build 构建代码
gulp.task('build', function() {
  console.log('build');
})


// watch 文件变化

// 监听json文件变化
gulp.task('json', function() {
  watch([src.json]).on('change', function () {
    json();
  });
})

// 监听图片变化
gulp.task('images', function() {
  watch([src.images])
    .on('change', function() {
      images()
    })
    .on('add', function() {
      images()
    })
})
// 监听wxml变化
gulp.tast('wxml', function() {
  watch([src.images]).on('change', function(e) {

    })
});


/**********************
 * 操作fun
 *********************/

function wxml() {
  gulp.src(src.wxml)
    .pipe(gulp.dist(distPath));
}

function images() {
  gulp.src(src.json)
    .pipe(gulp.dest(distPath));
}

function json() {
  gulp.src(src.json)
    .pipe(gulp.dest(distPath))
}