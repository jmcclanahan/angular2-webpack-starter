var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    app: helpers.root('src/main.ts'),
    vendor: helpers.root('src/vendor.ts'),
    polyfills: helpers.root('src/polyfills.ts')
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  module: {

    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts'
      },
      {
        test: /\.html$/,
        loader: 'html',
        exclude: [helpers.root('src/index.html')]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'polyfills', 'manifest'],
      minChunks: Infinity
    }),

    new HtmlWebpackPlugin({
      template: helpers.root('src/index.html'),
      chunksSortMode: 'dependency'
    })
  ]
};
