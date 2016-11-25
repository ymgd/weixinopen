const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./base')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const developmentConf = merge(baseConfig, {
  output: {
    path: path.resolve(__dirname, '../'),
    publicPath: '',
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.(png|jpg|jpeg|gif|svg|eot|woff|ttf)$/,
      loader: 'url?limit=10000&name=images/[name].[ext]',
    }]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    progress: true,
    colors: true,
    proxy: {},
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.LoaderOptionsPlugin({
      vue: {
        postcss: [
          require('autoprefixer')({
            browsers: ['> 0%']
          }),
          require('precss')(),
        ],
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor_vue.js',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
    }),
  ],
});

module.exports = developmentConf;
