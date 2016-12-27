// import { app, BrowserWindow } from 'electron';
// import { join } from 'path';
// import * as application from './services/application';
// import * as window from './services/window';
// import * as menu from './services/menu';
// import * as file from './services/file';

const { app, BrowserWindow } = require('electron')
const { join } = require('path')
const application = require('./services/application')
const window = require('./services/window')
const menu = require('./services/menu')
const file = require('./services/file')
// const project = require('./services/project')

console.log('(main/index) >>>>>>>>>>>>>>>>>>');
console.log('(main/index) app start');

// if (is.dev()) {
//   require('electron-debug')();
// }

app.on('ready', () => {
  console.log('(main/index) app ready');
  application.init();
  menu.init();

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (window.getCount() === 0) {
    application.init();
  }
});

app.on('quit', () => {
  console.log('(main/index) app quit');
  console.log('(main/index) <<<<<<<<<<<<<<<<<<<');

  if(process.platform == 'darwin'){
      const exec = require('child_process').exec;
      // exec()
      // spawn('npm run kill', ['--port', '3001'])
    }

  // if(process.platform == 'win32'){
  //   const exec = require('child_process').exec;
  //   exec('start stop.bat',{
  //     // cwd: files.pathDir
  //   }, (error, stdout, stderr) => {
  //       if (error) {
  //         console.error(`exec error: ${error}`);
  //         return;
  //       }
  //       console.log(stdout);
  //       console.log(stderr);
  //     });
  // }

});

// Register to global, so renderer can access these with remote.getGlobal
global.services = {
  application,
  window,
  file,
  // project
};
