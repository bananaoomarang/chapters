var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var prodCfg = require('./webpack.prod.config.js');

Object.assign = require('object-assign');

module.exports = function (app) {
  const config = Object.assign(prodCfg, {
    entry:  [
      'webpack-hot-middleware/client',
      './client'
    ],
    module: {
      loaders: [
        {
          test:    /\.jsx?$/,
          exclude: /node_modules|axios/,
          loader: 'babel',
          query:   {
            stage:   0,
            plugins: ['react-transform'],
            extra:   {
              'react-transform': {
                transforms: [{
                  transform: 'react-transform-hmr',
                  imports:   ['react'],
                  locals:    ['module']
                }]
              }
            }
          }
        },
        {
          test:   /\.scss$/,
          loader: 'style!css!sass'
        },
        {
          test:   /\.css$/,
          loader: 'style!css'
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000'
        }
      ]
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        __DEV__:      process.env.NODE_ENV !== 'production',
        __DEVTOOLS__: false
      })
    ],
    devtool: 'inline-source-map'
  });

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: false, publicPath: prodCfg.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}
