//webpack.config.js
var path = require('path');
var webpack = require('webpack');
module.exports = {
 entry: './client/index.js',
 output: {
  path: path.join(__dirname, 'client'),
  filename: 'bundle.js'
 },
 module: {
  rules: [{
   test: /.jsx?$/,
   loader: ['babel-loader',],
   exclude: /node_modules/,
  },
  {
   test: /\.css$/,
   loader: "style-loader!css-loader"
  },
  {
    test: /\.mp4$/,
    loader: "url?limit=10000&mimetype=video/mp4"
  },
  {
    test: /\.mp3$/,
    loader: "url?limit=10000&mimetype=audio/mp3"
  }]
 },
 devServer: {
    watchContentBase: true,
    hot: false,
    inline: false
 }
}