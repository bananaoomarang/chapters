'use strict';

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var sourcemaps  = require('gulp-sourcemaps');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var watchify    = require('watchify');
var browserify  = require('browserify');
var sass        = require('gulp-sass');
var react       = require('gulp-react')
var browserSync = require('browser-sync');
var async       = require('async');
var server      = require('./server');

var reload      = browserSync.reload;

var paths = {
  js: ['src/js/*'],
  jsx: ['src/jsx/*'],
  sass: ['src/sass/*.scss'],
  html: ['src/html/*'],
  src: ['public/index.html', 'public/bundle.js', 'public/style/css/*.css']
};

var watchifyArgs = {
  cache: {}, 
  packageCache: {}, 
  fullPaths: true,
  debug: true
};

var bundler = watchify(browserify('./src/js/index.js', watchifyArgs));

function compileJS() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./')) 
    .pipe(gulp.dest('public'));
}

gulp.task('js', compileJS);
bundler.on('update', compileJS);

gulp.task('jsx', function compileJSX () {
  gulp.src(paths.jsx)
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(react())
    .pipe(gulp.dest('src/js'));
});

gulp.task('html', function copyHTML () {
  gulp.src(paths.html)
    .pipe(gulp.dest('public'));
});

gulp.task('sass', function compileSass() {
  gulp.src('src/sass/*.scss')
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/style/css'));
});

gulp.task('serve', function serveDemo() {
  async.series([
    function startHapiServer (done) {
      server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);

        done();
      });
    },
    function startBrowserSyncProxy (done) {
      browserSync({
        proxy: 'http://localhost:8888'
      });

      done();
    }
  ]);
});

gulp.task('watch', function watchFiles() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.jsx, ['jsx']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.src, reload);
});

gulp.task('default', ['html', 'jsx', 'js', 'sass', 'serve', 'watch']);
