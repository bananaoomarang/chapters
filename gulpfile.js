'use strict';

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var sourcemaps  = require('gulp-sourcemaps');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var watchify    = require('watchify');
var browserify  = require('browserify');
var reactify    = require('reactify');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync').create();
var server      = require('chapters-server');

var reload      = browserSync.reload;

var paths = {
  js:   ['src/*.js', 'src/stores/**', 'src/actions/**', 'src/lib/**', 'src/components/**'],
  sass: ['src/sass/*.scss', 'src/sass/**/*.scss'],
  html: ['src/html/*'],
  src:  ['public/index.html', 'public/style/css/*.css']
};

gulp.task('html', function copyHTML () {
  gulp.src(paths.html)
    .pipe(gulp.dest('public'));
});

var watchifyArgs = {
  cache:        {},
  packageCache: {},
  fullPaths:    true,
  debug:        true,
  extensions:   ['.jsx', '.js']
};

gulp.task('watchify', function () {
  var bundler = watchify(browserify('./src/index.js', watchifyArgs));

  function rebundle (cb) {
    return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('public', cb))
      .pipe(reload( { stream: true } ));
  }

  bundler
    .transform(reactify)
    .on('update', rebundle);

    return rebundle();
});

gulp.task('sass', function compileSass() {
  gulp.src('src/sass/*.scss')
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/style/css'));
});

gulp.task('startHapi', function startHapiServer(done) {
  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);

    done();
  });
});

gulp.task('serve', ['watchify', 'startHapi'], function serveDemo() {
  browserSync.init({
    proxy: 'http://localhost:8888'
  });
});

gulp.task('watch', function watchFiles() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, ['html']);

  gulp.watch(paths.src, reload);
});

gulp.task('default', [
  'html',             // Move html from src tree
  'sass',             // Compile sass -> css
  'watchify',         // Start watchify
  'serve',            // Serve using browserSync
  'watch'             // Watch relavant files in src tree for changes
]);
