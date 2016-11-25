const gulp = require('gulp');
const webpack = require('webpack-stream');
const rename = require('gulp-rename');
const del = require('del');

const config = require('./webpack.config');

const dist = 'dist';

gulp.task('clean', () => del([dist]));

gulp.task('webpack', () => {
  return gulp.src(['src/**/*.js'], { base: 'src' })
  .pipe(webpack(config))
  .pipe(gulp.dest(dist));
});

gulp.task('json', () => {
  return gulp.src(['src/**/*.json'], { base: 'src' })
  .pipe(gulp.dest(dist));
});

gulp.task('assets', () => {
  return gulp.src(['src/assets/**/*'], { base: 'src' })
  .pipe(gulp.dest(dist));
});

gulp.task('xml', () => {
  return gulp.src('src/**/*.xml', { base: 'src' })
  .pipe(rename({
    extname: '.wxml',
  }))
  .pipe(gulp.dest(dist));
});

gulp.task('watch', ['build'], () => {
  gulp.watch('src/**/*.{js,css}', ['webpack']);
  gulp.watch('src/**/*.json', ['json']);
  gulp.watch('src/**/*.xml', ['xml']);
  gulp.watch('src/assets/**/*', ['assets']);
});

gulp.task('build', ['webpack', 'json', 'xml', 'assets']);
