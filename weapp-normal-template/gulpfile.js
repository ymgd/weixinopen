const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const del = require('del');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence').use(gulp);
const requireModules = require('gulp-require-modules');
const path = require('path');

const dist_root = './dist';
const src_root = './src';
const src = {
  js: `${src_root}/**/*.{js,es6}`,
  scss: `${src_root}/**/*.scss`,
  json: `${src_root}/**/*.json`,
  images: `${src_root}/**/*.{png,jpg,jpeg,gif}`,
  html: `${src_root}/**/*.html`
};

// compile

function compileJS(filePath, distDir) {
  return gulp.src(filePath)
    .pipe(plumber())
    .pipe(changed(distDir))
    .pipe(requireModules({
      dist: true,
      modulesDirectory: `${dist_root}/weapp_modules`,
      modulesManifestPath: `${dist_root}/require-modules.json`,
      fromDirectory: src_root,
      distDirectory: dist_root
    }))
    .pipe(gulp.dest(distDir))
}

function compileHtml(filePath, distDir) {
  return gulp.src(filePath)
    .pipe(plumber())
    .pipe(changed(distDir))
    .pipe(rename({
      extname: '.wxml'
    }))
    .pipe(gulp.dest(distDir));
}

function compileScss(filePath, distDir) {
  return gulp.src(filePath)
    .pipe(plumber())
    .pipe(changed(distDir))
    .pipe(sass())
    .pipe(rename({
      extname: '.wxss'
    }))
    .pipe(gulp.dest(distDir));
}

function compileJSON(filePath, distDir) {
  return gulp.src(filePath)
    .pipe(plumber())
    .pipe(changed(distDir))
    .pipe(gulp.dest(distDir));
}

function compileImages(filePath, distDir) {
  return gulp.src(filePath)
    .pipe(plumber())
    .pipe(changed(distDir))
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(distDir));
}

// build

gulp.task('build:js', () => {
  compileJS(src.js, dist_root);
});

gulp.task('build:html', () => {
  compileHtml(src.html, dist_root);
});

gulp.task('build:scss', () => {
  compileScss(src.scss, dist_root);
});

gulp.task('build:json', () => {
  compileJSON(src.json, dist_root);
});

gulp.task('build:images', () => {
  compileImages(src.images, dist_root);
});

gulp.task('build', ['build:js', 'build:html', 'build:scss', 'build:json', 'build:images']);

gulp.task('rebuild', () => {
  runSequence('clear', 'build');
});

// watch

gulp.task('watch:js', () => {
  gulp.watch(src.js, (event) => {
    if (event.type !== 'deleted') {
      const filePath = event.path;
      const relate = path.relative(src_root, filePath);
      const dist = path.resolve(dist_root, relate);
      compileJS(filePath, path.dirname(dist));
    }
  })
});

gulp.task('watch:html', () => {
  gulp.watch(src.html, (event) => {
    if (event.type !== 'deleted') {
      const filePath = event.path;
      const relate = path.relative(src_root, filePath);
      const dist = path.resolve(dist_root, relate);
      compileHtml(filePath, path.dirname(dist));
    }
  })
});

gulp.task('watch:scss', () => {
  gulp.watch(src.scss, (event) => {
    if (event.type !== 'deleted') {
      const filePath = event.path;
      const relate = path.relative(src_root, filePath);
      const dist = path.resolve(dist_root, relate);
      compileScss(filePath, path.dirname(dist));
    }
  })
});

gulp.task('watch:json', () => {
  gulp.watch(src.json, (event) => {
    if (event.type !== 'deleted') {
      const filePath = event.path;
      const relate = path.relative(src_root, filePath);
      const dist = path.resolve(dist_root, relate);
      compileJSON(filePath, path.dirname(dist));
    }
  })
});

gulp.task('watch:images', () => {
  gulp.watch(src.images, (event) => {
    if (event.type !== 'deleted') {
      const filePath = event.path;
      const relate = path.relative(src_root, filePath);
      const dist = path.resolve(dist_root, relate);
      compileImages(filePath, path.dirname(dist));
    }
  })
});

gulp.task('watch', ['watch:js', 'watch:html', 'watch:scss', 'watch:json', 'watch:images']);

// clear

gulp.task('clear', () => {
  del(dist_root);
});
