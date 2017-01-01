/* global $dirname */
const { join } = require('path')
const { create } = require('./window')



var isProd = process.env.NODE_ENV === 'production'

module.exports = {
  init: function () {
    const win = create({ width: 800, height: 600 });
    if(isProd){
       win.loadURL(`file://${join(__dirname, '../../../dist')}/index.html`);
    }else{
      win.loadURL('http://localhost:3000/index.html')
    }
  },
  
}
