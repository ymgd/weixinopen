var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

var webpackConfig = {
    resolve: {
        root: path.resolve(__dirname),
        extensions: ['', '.js', '.less']
    },
    entry: [
        './src/index.js'
    ],
    output: {
        path: './Client',
        filename: 'app.js',
        //打包lib
        library: 'App',
        // 打包类型
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")},
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    plugins: ['lodash','transform-runtime','add-module-exports','transform-remove-strict-mode'],
                    presets: ['es2015', 'stage-0']
                }
            },
            { test: /\.png$/, loader: "url-loader?mimetype=image/png&limit=102400" },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEVELOPMENT__: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin("app.wxss"),
    ]
};

module.exports = webpackConfig;
