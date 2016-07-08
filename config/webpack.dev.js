var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  // TODO: This is broken currently, un-comment when fixed
  // https://github.com/webpack/webpack/issues/2145
  //devtool: 'cheap-module-eval-source-map',
  devtool: 'cheap-module-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(process.env.ENV)
      }
    })
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    inline: true,
    progress: true,
    port: '8080'
  }
})
