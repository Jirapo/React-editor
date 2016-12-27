const path = require('path');
const webpackMerge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const webpackCommon = require('./common.config');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');

module.exports = webpackMerge(webpackCommon, {

  bail: true,

  devtool: 'source-map',

  entry: {
    'app': [
      './src/renderer/index.js'
    ],
    'vendor': './src/vendor.js'
  },

  output: {

    path: path.resolve(__dirname, '../dist'),

    filename: '[name]-[chunkhash].min.js',
    // filename: '[name].js',
    // sourceMapFilename: '[name]-[hash].map',

    // chunkFilename: '[id]-[chunkhash].js'
    chunkFilename: '[chunkhash].js'

  },

  module: {

    // TODO: use webpack old syntax to compatible with ExtractTextPlugin
    // https://github.com/webpack/extract-text-webpack-plugin/issues/275
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
    ]

  },

  plugins: [
    new CommonsChunkPlugin({
      name: 'manifest',
      // filename: 'manifest.js',
      minChunks: Infinity,
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../static/index.html'),
      // favicon: path.resolve(__dirname, '../static/favicon.ico'),
      // excludeChunks: ['vendors'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new InlineChunkWebpackPlugin({
       inlineChunks: ['manifest']
     }),
    // new DedupePlugin(),
    // new CleanWebpackPlugin(['dist'], {
    //   root: path.resolve(__dirname, '..'),
    //   exclude: '.gitignore'
    // }),
    // new DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: '"production"'
    //   }
    // }),
    new ExtractTextPlugin('[name].css'),
    new UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      },
      // sourceMap: true
    }),
    new LoaderOptionsPlugin({
      options: {
        context: '/',
        postcss: function () {
          return [autoprefixer];
        }
      }
    })
  ]

});
