/* global $dirname */
// import { join } from 'path';
// import { create } from './window';
const { join } = require('path')
const { create } = require('./window')



var isProd = process.env.NODE_ENV === 'production'
// console.log(process.env.NODE_ENV)

module.exports = {
  init: function () {
    const win = create({ width: 800, height: 600 });
    if(isProd){
       win.loadURL(`file://${join(__dirname, '../../../dist')}/index.html`);
    }else{
      win.loadURL('http://localhost:3000/index.html')
    }
    // win.loadURL(`file://${join(__dirname, '../../..')}/index.html`);
    // win.loadURL(`file://${join(__dirname, '../../../dist')}/index.html`);
  },
  // getPlatform(){
  //   return process.platform
  // },
  // getPWD(){
  //   return process.env.PWD
  // }
}
