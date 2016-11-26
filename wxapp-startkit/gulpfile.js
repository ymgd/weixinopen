const gulp = require('gulp')
const del = require('del')
const runSequence = require('run-sequence')
const $ = require('gulp-load-plugins')()

let prod = false

// -------------------- Lint ---------------------------

gulp.task('eslint', () => {
  return gulp.src(['./src/**/*.js'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError())
})

gulp.task('jsonlint', () => {
  return gulp.src(['./src/**/*.json'])
    .pipe($.jsonlint())
    .pipe($.jsonlint.reporter())
    .pipe($.jsonlint.failAfterError())
})

// -------------------- JSON Files ----------------------

gulp.task('json', ['jsonlint'], () => {
  return gulp.src('./src/**/*.json')
    .pipe($.if(prod, $.jsonminify()))
    .pipe(gulp.dest('./dist'))
})

gulp.task('json:watch', () => {
  gulp.watch('./src/**/*.json', ['json'])
})

// -------------------- Image Assets ---------------------

gulp.task('assets:images', () => {
  return gulp.src('./src/assets/images/**')
  // .pipe($.if(prod, $.imagemin()))
    .pipe(gulp.dest('./dist/assets/images'))
})

gulp.task('assets:images:watch', () => {
  gulp.watch('./src/assets/images/**', ['assets:images'])
})

// -------------------- Other Assets ---------------------

gulp.task('assets:extras', () => {
  return gulp.src([
    './src/assets/**',
    '!./src/assets/images/**'
  ]).pipe(gulp.dest('./dist/assets'))
})

gulp.task('assets:extras:watch', () => {
  gulp.watch([
    './src/assets/**',
    '!./src/assets/images/**'
  ], ['assets:extras'])
})

gulp.task('libs', () => {
  return gulp.src('./libs/**/*.js').pipe(gulp.dest('./dist/libs'))
})

gulp.task('libs:watch', () => {
  gulp.watch('./libs/**/*.js', ['libs'])
})

// -------------------- Image Files ---------------------

gulp.task('templates', () => {
  return gulp.src('./src/**/*.wxml')
    .pipe($.if(prod, $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('./dist'))
})

gulp.task('templates:watch', () => {
  gulp.watch('./src/**/*.wxml', ['templates'])
})

// -------------------- SCSS Files ----------------------

gulp.task('styles', () => {
  return gulp.src('./src/**/*.wxss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.if(prod, $.cssnano()))
    .pipe($.extReplace('.wxss'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('styles:watch', () => {
  gulp.watch('./src/**/*.wxss', ['styles'])
})

// -------------------- JS Files ------------------------

gulp.task('scripts', ['eslint'], () => {
  return gulp.src('./src/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.if(prod, $.uglify()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('scripts:watch', () => {
  gulp.watch('./src/**/*.js', ['scripts'])
})

// ------------------------------------------------------

gulp.task('clean', () => {
  return del(['./dist/**'])
})

gulp.task('build', [
  'json',
  'assets:images',
  'assets:extras',
  'libs',
  'templates',
  'styles',
  'scripts'
])

gulp.task('watch', [
  'json:watch',
  'assets:images:watch',
  'assets:extras:watch',
  'libs:watch',
  'templates:watch',
  'styles:watch',
  'scripts:watch'
])


gulp.task('build:clean', (callback) => {
  runSequence('clean', 'build', callback)
})

gulp.task('watch:clean', (callback) => {
  runSequence('build:clean', 'watch', callback)
})

gulp.task('build:prod', (callback) => {
  prod = true
  runSequence('build:clean', callback)
})

gulp.task('default', ['watch:clean'])
