var express = require("express");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var path = require("path")
var http = require('http');

var app = express();
var port = process.argv[3]
// var configDir = path.resolve('./', process.argv[5])
// console.log(configDir)
// var webpackConfig = require(configDir)
var webpackConfig = require('./user.webpack.config');
var compiler = webpack(webpackConfig);

// var httpServer
var httpServer = http.createServer(app)
var webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
  // lazy: true,
   hot: true,
   stats: { colors: true, chunks: false },
  publicPath: "/"
})

app.use(webpackDevMiddlewareInstance);

app.use(require('webpack-hot-middleware')(compiler));

app.use(function (req, res, next) {
  // console.log('Time: %d', Date.now());
  // console.log(req.hostname)
  console.log(req.originalUrl)
  // console.log(req.params)
  console.log(req.method)

  if(req.originalUrl == '/stopProj'){
    console.log(222)
    // httpServer.close(function(){
    httpServer.close()
    process.exit();
    // });
  }else{
    next();
  }
});

httpServer.listen(port);
// httpServer = http.createServer(app).listen(port);
// var server = app.listen(port, function () {
//   console.log(`Listening on port ${port}!`);
// });
// const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');
// const webpackConfig = require('./webpack.config')
//
// var bundler = new WebpackDevServer(webpack(webpackConfig), {
//     publicPath: '/dist/',
//     inline: true,
//     hot: true,
//     quiet: false,
//     noInfo: true,
//     stats: {colors: true}
// });
//
// bundler.listen(3001, 'localhost');
