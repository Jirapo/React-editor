const webpack = require('webpack');
const path = require('path');

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

  context: __dirname,

  devtool: 'inline-source-map',

  resolve: {

    extensions: ['.js', '.jsx', '.scss', '.css'],

    modules: [ path.resolve(__dirname), path.resolve(__dirname, 'node_modules')]

  },

  resolveLoader:{

    // modules: [ path.resolve(__dirname), 'node_modules']
    modules: [ path.resolve(__dirname), path.resolve(__dirname, 'node_modules')]
  },

  entry: {
    'app': ['react-hot-loader/patch',
      user_path_entry
      // path.resolve(user_proj_dir, 'src/index.js')
      // path.resolve(user_proj_dir, user_proj_entry)
    ],
    vendor: user_path_vendor
    // 'vendor': path.resolve(user_proj_dir, 'src/vendor.js')
    // 'vendor': path.resolve(user_proj_dir, 'src/vendor.js')
  },

  output: {

    // path: path.resolve(user_proj_dir, 'dist'),
    path: user_path_output,

    filename: '[name].js',

    publicPath: '/'

  },

  module: {

    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['babel-preset-es2015', 'babel-preset-stage-2', 'babel-preset-react'].map(require.resolve),
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: '[name]__[local]'
            }
          },
          {
            loader: 'postcss-loader'
          },
        ]
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
      name: ['app', 'vendor', 'manifest'],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'static/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  // devServer: {
  //   host: 'localhost',
  //   port: 3001,
  //   open: true,
  //   hot: true,
  //   stats: { chunks: false },
  //   historyApiFallback: true,
  //   watchOptions: {
  //     aggregateTimeout: 300,
  //     poll: 1000
  //   },
  // }

};
