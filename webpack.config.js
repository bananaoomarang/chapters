var webpack = require('webpack');
var prodCfg = require('./webpack.prod.config.js');

Object.assign = require('object-assign');

module.exports = Object.assign(prodCfg, {
  entry:  [
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/only-dev-server',
    './client'
  ],
  module: {
    loaders: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules|axios/,
        loaders: ['react-hot', 'babel']
      },
      {
        test:   /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test:   /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__:      process.env.NODE_ENV !== 'production',
      __DEVTOOLS__: false
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '*': 'http://localhost:3000'
    }
  }
});
