'use strict';

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var sourcemaps  = require('gulp-sourcemaps');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var watchify    = require('watchify');
var browserify  = require('browserify');
var sass        = require('gulp-sass');
var react       = require('gulp-react');
var browserSync = require('browser-sync');
var async       = require('async');
var server      = require('chapters-server');

var reload      = browserSync.reload;

var paths = {
  js:   ['src/*.js', 'src/stores/*.js', 'src/actions/*.js', 'src/lib/*.js'],
  jsx:  ['src/components/**'],
  sass: ['src/sass/*.scss'],
  html: ['src/html/*'],
  src:  ['public/index.html', 'public/bundle.js', 'public/style/css/*.css']
};

gulp.task('html', function copyHTML () {
  gulp.src(paths.html)
    .pipe(gulp.dest('public'));
});

gulp.task('jsx', function compileJSX () {
  gulp.src(paths.jsx)
    .on('error', gutil.log.bind(gutil, 'JSX Error'))
    .pipe(react())
    .pipe(gulp.dest('build/js'));
});

gulp.task('moveJs', function copyJs () {

  paths.js.forEach(function (path) {

    // Do I look like a give a shit?
    var outputPath = path.split('/').length > 2 ? ['build', 'js', path.split('/')[1]].join('/') : ['build', 'js'].join('/');

    gulp.src(path)
      .pipe(gulp.dest(outputPath));
  });


});

var watchifyArgs = {
  cache:        {},
  packageCache: {},
  fullPaths:    true,
  debug:        true
};

var bundler = watchify(browserify('./build/js/index.js', watchifyArgs));

function compileJS() {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public'));
}

gulp.task('compileJs', compileJS);
bundler.on('update', compileJS);

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
  gulp.watch(paths.jsx, ['jsx']);
  gulp.watch(paths.js, ['moveJs']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.src, reload);
});

gulp.task('default', [
  'html',      // Move html from src tree
  'jsx',       // Compile jsx files
  'moveJs',    // Move rest of JS into same tree
  'compileJs', // Browserify bundle it
  'sass',      // Compile sass -> css
  'serve',     // Serve using browserSync
  'watch'      // Watch relavant files in src tree for changes
]);
