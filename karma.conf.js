var webpackConfig = require(__dirname + '/webpack.config');

module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine', 'es5-shim'],
    files: [
      './shared/**/*-test.js'
    ],
    preprocessors: {
      './shared/**/*-test.js': ['webpack', 'sourcemap']
    },
    webpack: {
      resolve: webpackConfig.resolve,
      module: webpackConfig.module
    },
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['progress'],
    port: 1337,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
