var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  htmlLoader: {
    minimize: false // workaround for ng2
  },

  plugins: [
    // stops the build if there is any error
    new webpack.NoErrorsPlugin(),
    // detects identical (and nearly identical) files and removes them from the output
    new webpack.optimize.DedupePlugin(),
    // minifies the bundles
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      }
    }),
    // extracts embedded css as external files, adding cache-busting hash to the filename.
    new ExtractTextPlugin('[name].[hash].css'),
    // use to define environment variables that we can reference within our application
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(process.env.ENV)
      }
    })
  ]
});
