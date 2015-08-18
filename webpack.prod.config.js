var webpack = require('webpack');
var path    = require('path');

var outDirectory = (process.env.NODE_ENV === 'production') ?
  'dist' :
  'build';

module.exports = {
  entry: [
    './client'
  ],
  output: {
    path:       path.join(__dirname, outDirectory),
    publicPath: '/assets/',
    filename:   'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions:         ['', '.js', '.jsx', '.css', '.scss']
  },
  module: {
    loaders: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
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
    new webpack.DefinePlugin({
      __DEV__:      process.env.NODE_ENV !== 'production',
      __DEVTOOLS__: false
    })
  ],
};
