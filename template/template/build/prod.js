const webpack = require('webpack');
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./base')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BaseDir = '';

const productionConf = merge(baseConfig, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: BaseDir + 'js/app.[hash:8].js',
    publicPath: '/',
  },
  stats: {
    children: false
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      loader: "eslint-loader",
      exclude: /node_modules/,
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|eot|woff|ttf)$/,
      loader: 'url?limit=10000&name=' + BaseDir + 'images/[name].[ext]',
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
    new webpack.LoaderOptionsPlugin({
      vue: {
        postcss: [
          require('autoprefixer')({
            browsers: ['> 0%']
          }),
          require('precss')(),
        ],
        css: ExtractTextPlugin.extract({
          loader: "css-loader",
          fallbackLoader: "vue-style-loader"
        }),
      },
      eslint: {
        configFile: '../.eslintrc',
      },
    }),
    new ExtractTextPlugin(BaseDir + 'css/[name].[hash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: BaseDir + 'js/vue.vendor.js',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 自动注入 html
    new HtmlWebpackPlugin({
      filename: BaseDir + 'html/index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true
    }),
    // Gzip
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ]
})

module.exports = productionConf
