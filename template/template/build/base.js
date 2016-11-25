const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/main.js'),
    vendor: [
      'vue',
      'vue-router'
    ],
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.min.js'
    },
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: "style-loader",
        loader: "css-loader!postcss-loader"
      })
    }]
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],

}
