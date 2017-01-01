const { join } = require('path')
const exec = require('child_process').exec;
const http = require('http')

module.exports = {
  copy: function () {
    
  },
  stopProj:function (port){
    var options = {
      host: '127.0.0.1',
      port: port,
      path: '/stopProj'
    };
    // host: 'http://localhost:' + port,

    http.request(options, function(res) {
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    }).end();
    // http.request(options);
  }
}
