// webpack plugins
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
// const HappyPack = require('happypack');
// const happyThreadPool = HappyPack.ThreadPool({ size: 4});
// console.log(process.env.HAPPY_CACHE)


module.exports = {
  target: "electron-renderer",

  resolve: {

    extensions: ['.js', '.jsx', '.scss', '.css'],

    modules: ['node_modules']

  },

  module: {

    rules: [

      {
        test: /\.js$/,
        // include: './src/',
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
        // use: ['babel-loader']
        // use: ['happypack/loader']
      },
      // {
      //   test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
      //   loader: 'file-loader',
      // },
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
    // new HappyPack({
    //   // cache: true,
    //   loaders: [
    //     {
    //       path: 'babel-loader',
    //       query: {
    //         plugins: [
    //           'react-hot-loader/babel',
    //         ],
    //         presets: ['es2015', 'stage-2', 'react'],
    //         cacheDirectory: true
    //       }
    //     }
    //   ],
    //   threads: 2
    // }),
    // new HappyPack({
    //     id: 'js',
    //     loaders: [ 'babel-loader' ],
    //     threadPool: happyThreadPool,
    // }),
    new CommonsChunkPlugin({
      name: ['app', 'vendor', 'manifest'],
      minChunks: Infinity
    })
  ]

};
