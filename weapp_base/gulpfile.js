const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
const runSequence = require('run-sequence');
const watchPath = require('gulp-watch-path');
const combiner = require('stream-combiner2');

// load all gulp plugins
const plugins = gulpLoadPlugins();
const env = process.env.NODE_ENV || 'development';
const isProduction = () => env === 'production';
// px to rpx
// const pattern = new RegExp('(?<!r)px', 'g');

function getMapsDir() {
    if (isProduction) {
        return 'maps';
    }
    return '.';
}

function handleError(err) {
    console.log('\n');
    console.log('Error!');
    console.log('fileName: ' + err.fileName);
    console.log('lineNumber: ' + err.loc.line);
    console.log('message: ' + err.message);
    console.log('plugin: ' + err.plugin);
    console.log('\n');
}

/**
 * Clean distribution directory
 */
gulp.task('clean', del.bind(null, ['dist/*']));

function compileJs(src, dist) {
    return gulp.src(src || ['src/**/*.js'])
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel())
        .pipe(plugins.if(isProduction, plugins.uglify()))
        .pipe(plugins.sourcemaps.write(getMapsDir()))
        .pipe(gulp.dest(dist || 'dist'));
}

/**
 * Compile js source to distribution directory
 */
gulp.task('compile:js', () => {
    return compileJs();
});

function compileTs(src, dist) {
    // const tsProject = ts.createProject('tsconfig.json')
    return gulp.src(src || ['src/**/*.ts'])
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.typescript())
        // .pipe(tsProject)
        .pipe(plugins.if(isProduction, plugins.uglify()))
        .pipe(plugins.sourcemaps.write(getMapsDir()))
        .pipe(gulp.dest(dist || 'dist'));
}

/**
 * Compile typescript source to distribution directory
 */
gulp.task('compile:ts', () => {
    return compileTs();
});

/**
 * Compile scss source to distribution directory
 * replace px to rpx
 */
gulp.task('compile:scss', () => {
    return gulp.src(['src/**/*.scss'])
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass())
        .on('error', plugins.sass.logError)
        .pipe(plugins.if(isProduction, plugins.cssnano({
            compatibility: '*'
        })))
        .pipe(plugins.rename({
            extname: '.wxss'
        }))
        .pipe(plugins.replace('rpx', 'px'))
        .pipe(plugins.replace('px', 'rpx'))
        .pipe(plugins.sourcemaps.write(getMapsDir()))
        .pipe(gulp.dest('dist'));
});

/**
 * Compile json source to distribution directory
 */
gulp.task('compile:json', () => {
    return gulp.src(['src/**/*.json'])
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.jsonminify())
        .pipe(plugins.sourcemaps.write(getMapsDir()))
        .pipe(gulp.dest('dist'));
});

/**
 * Compile img source to distribution directory
 */
gulp.task('compile:img', () => {
    return gulp.src(['src/**/*.{jpg,jpeg,png,gif}'])
        .pipe(plugins.imagemin())
        .pipe(gulp.dest('dist'));
});

/**
 * Compile source to distribution directory
 */
gulp.task('compile', ['clean'], next => {
    runSequence([
        'compile:js',
        'compile:ts',
        'compile:json',
        'compile:img',
        'compile:scss'
    ], next);
});

const exclude = [
    '!*.md',
    '!src/**/*.js',
    '!src/**/*.scss',
    '!src/**/*.{jpe?g,png,gif}'
];

/**
 * Copy extras to distribution directory
 */
gulp.task('extras', [], () => {
    return gulp.src([
        'src/**/*.*',
    ].concat(exclude))
        .pipe(gulp.dest('dist'))
});

/**
 * copy wxml to dist
 */
gulp.task('copy:wxml', () => {
    return gulp.src([
        'src/**/*.wxml'
    ])
    // .pipe(plugins.replace('<div', '<view'))
    // .pipe(plugins.replace('</div>', '</view>'))
    // .pipe(plugins.replace('repeat', 'wx:for-items'))
    // .pipe(plugins.replace('onclick', 'bindtap'))
        .pipe(gulp.dest('dist'));
});

/**
 * copy wxss to dist
 */
gulp.task('copy:wxss', () => {
    return gulp.src([
        'src/**/*.wxss'
    ])
        .pipe(plugins.replace('rpx', 'px'))
        .pipe(plugins.replace('px', 'rpx'))
        .pipe(plugins.replace('pt', 'px'))
        .pipe(gulp.dest('dist'));
});

/**
 * Build
 */
gulp.task('build', [], next => runSequence(['compile', 'extras'], next));

/**
 * Watch source change
 */
gulp.task('watch', ['build'], () => {

    gulp.watch('src/**/*.js', (event) => {
        let paths = watchPath(event, 'src', 'dist');
        compileJs(paths.srcPath, paths.distDir)
    });
    gulp.watch('src/**/*.ts', (event) => {
        let paths = watchPath(event, 'src', 'dist');
        compileTs(paths.srcPath, paths.distDir)
    });
    gulp.watch('src/**/*.json', ['compile:json']);
    gulp.watch('src/**/*.{jpe?g,png,gif}', ['compile:img']);
    gulp.watch('src/**/*.wxml', ['copy:wxml']);
    gulp.watch('src/**/*.wxss', ['copy:wxss']);
    gulp.watch('src/**/*.scss', ['compile:scss']);
});

/**
 * Default task
 */
gulp.task('default', ['watch']);