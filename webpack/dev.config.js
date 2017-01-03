const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./common.config');


// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = webpackMerge(webpackCommon, {

  devtool: 'inline-source-map',

  entry: {
    'app': ['react-hot-loader/patch',
      './src/renderer/index.js'
    ],
    'vendor': './src/vendor.js'
  },

  output: {

    path: path.resolve(__dirname, '../static/dist'),

    filename: '[name].js',

    // sourceMapFilename: '[name].map',

    // chunkFilename: '[id]-chunk.js',

    publicPath: '/'

  },

  module: {

    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            'css-loader?modules&localIdentName=[name]__[local]&minimize&sourceMap&importLoaders=2',
            'postcss-loader',
            // 'sass-loader?outputStyle=expanded&sourceMap&sourceMapContents'
          ]
        })
      }
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: ['babel-loader']
      // },
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: 'style-loader'
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         importLoaders: 2,
      //         modules: true,
      //         localIdentName: '[name]__[local]'
      //       }
      //     },
      //     {
      //       loader: 'postcss-loader'
      //     },
      //   ]
      // }
    ]

  },

  plugins: [

    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../static/index.html'),
      // favicon: path.resolve(__dirname, '../static/favicon.ico')
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    host: 'localhost',
    port: 3000,
    // open: true,
    hot: true,
    stats: { chunks: false },
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
  },
  performance: {
    hints: false
  }

});
