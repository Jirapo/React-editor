const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');


module.exports = {

  context: __dirname,

  devtool: 'source-map',

  resolve: {

    extensions: ['.js', '.jsx', '.scss', '.css'],

    modules: [ path.resolve(__dirname), path.resolve(__dirname, 'node_modules')]

  },

  resolveLoader:{

    // modules: [ path.resolve(__dirname), 'node_modules']
    modules: [ path.resolve(__dirname), path.resolve(__dirname, 'node_modules')]
  },

  entry: {
    'app': user_path_entry,
    'vendor': user_path_vendor
  },

  output: {

    path: user_path_output,

    filename: '[name]-[chunkhash].min.js',

    chunkFilename: '[chunkhash].js'

  },

  module: {

    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: [
          'babel-preset-es2015', 
          // 'babel-preset-es2015-webpack', 
          // 'babel-plugin-transform-es2015-template-literals',
          // 'transform-es2015-literals',
          // 'transform-es2015-function-name',
          // 'transform-es2015-arrow-functions',
          // 'transform-es2015-block-scoped-functions',
          // 'transform-es2015-classes',
          // 'transform-es2015-object-super',
          // 'transform-es2015-shorthand-properties',
          // 'transform-es2015-computed-properties',
          // 'transform-es2015-for-of',
          // 'transform-es2015-sticky-regex',
          // 'transform-es2015-unicode-regex',
          // 'check-es2015-constants',
          // 'transform-es2015-spread',
          // 'transform-es2015-parameters',
          // 'transform-es2015-destructuring',
          // 'transform-es2015-block-scoping',
          // 'transform-es2015-typeof-symbol',
          // ['transform-regenerator', { async: false, asyncGenerators: false }],
          'babel-preset-stage-2', 
          'babel-preset-react'].map(require.resolve),
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            'css-loader?modules&localIdentName=[name]__[local]&minimize&sourceMap&importLoaders=2',
            'postcss-loader',
          ]
        })
      },
      {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader?limit=10000'
      },
      { test: /\.woff2{0,1}$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(otf|eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'}

    ]

  },

  plugins: [

    new CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'static/index.html'),
      // favicon: path.resolve(__dirname, '../static/favicon.ico'),
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
};
