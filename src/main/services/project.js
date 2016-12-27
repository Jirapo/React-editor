const { join } = require('path')
// const { create } = require('./window')
const exec = require('child_process').exec;
const http = require('http')

module.exports = {
  copy: function () {
    // const win = create({ width: 800, height: 600 });
    // if(isProd){
    //    win.loadURL(`file://${join(__dirname, '../../../dist')}/index.html`);
    // }else{
    //   win.loadURL('http://localhost:3000/index.html')
    // }
    // win.loadURL(`file://${join(__dirname, '../../..')}/index.html`);
    // win.loadURL(`file://${join(__dirname, '../../../dist')}/index.html`);
  },
  stopProj:function (port){
    var options = {
      // host: 'http://localhost',
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
