const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const app = require('./src/app.json');

const entry = {
  app: [
    './src/app.js',
  ],
};

app.pages.forEach((page) => {
  entry[page] = [`./src/${page}.js`];
});

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, 'src/'),
    filename: '[name].js',
  },
  plugins: [
    new ExtractTextPlugin('[name].wxss', {
      allChunks: false,
    }),
  ],
  postcss(wp) {
    return [
      precss({
        import: {
          addDependencyTo: wp,
        },
      }),
      autoprefixer,
    ];
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.css?$/,
        loader: ExtractTextPlugin.extract('style', [
          'css?modules&importLoaders=1&localIdentName=[path][name]-[local]-[hash:base64:5]',
          'postcss',
        ], {
          publicPath: '../',
        }),
      },
    ],
  },
};
