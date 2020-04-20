const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map', //inline-source-map
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ContentObserver',
    }),
  ],
  devServer: {
    contentBase: './dist',
  }
});