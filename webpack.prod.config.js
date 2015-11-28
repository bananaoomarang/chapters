var webpack = require('webpack');

module.exports = {
  entry: [
    './client'
  ],
  output: {
    path:       __dirname + '/dist',
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
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'  }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__:      process.env.NODE_ENV !== 'production',
      __DEVTOOLS__: false
    })
  ],
};
