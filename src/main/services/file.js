// import  from 'electron';
// import fs from 'fs';
// import path from 'path';
// import dir from 'node-dir';
const path = require('path')
const fs = require('fs')
const dir = require('node-dir')
const {dialog, ipcMain} = require('electron')

// Opens the file.
const openFile = (focusWindow) => {
  dialog.showOpenDialog({ properties: ['openFile'] }, (fileNames) => {
    if (!fileNames) {
      return false;
    } else {
      const file = path.parse(fileNames[0])
      console.log(fileNames)
      fs.readFile(fileNames[0], 'utf-8',
        function (err, data) {
          if(err){
            return false;
          } else {
            return focusWindow
              .webContents
              .send(
                'winOpenFile' , {
                  // basename: file.base,
                  // sep: path.sep,
                  contents: data,
                  file: file,
                  path: fileNames[0]
                  // dir: file.dir,
                  // extension: file.ext
                });
          }
      });
    }
  });
};

// Opens a folder.
const openFolder = (focusWindow) => {
  dialog.showOpenDialog({ properties: ['openDirectory'] }, (fileNames) => {
    if (!fileNames) {
      return false;
    } else {
      console.log('preload', fileNames)

      /*dir.readFiles(fileNames[0],
        {
          excludeDir: ['node_modules', 'bin'],
          exclude:['.DS_Store']
        },
        function(err, content, filename, next) {
            if (err) throw err;
            // console.log(filename, path.basename(filename), path.parse(filename))
            console.log('cure',filename)
            // console.log('content:', content);
            next();
        },
        function(err, files){
            if (err) throw err;
            console.log('finished reading forlder:', files);
            return focusWindow
              .webContents
              .send(
                'folderOpened' , {
                  // basename: file.base,
                  sep: path.sep,
                  list: files,
                  path: fileNames[0]
                  // dir: file.dir,
                  // extension: file.ext
                });
            // return () => {}
        });*/

        dir.paths(fileNames[0], function(err, paths) {
            if (err) throw err;
            console.log('files:\n',paths.files);
            console.log('subdirs:\n', paths.dirs);
            // console.log('__dirname', __dirname)
            return focusWindow
              .webContents
              .send(
                'winOpenFolder' , {
                  // basename: file.base,
                  sep: path.sep,
                  list: paths.files,
                  dirs: paths.dirs,
                  folder: fileNames[0],
                  // pathDir: path.resolve(__dirname, '../../..')
                  // dir: file.dir,
                  // extension: file.ext
                });
            // const _p = paths.dirs.map( p => path.basename(p))
            // console.log(_p)
        });

      /*dir.subdirs(fileNames[0],
      function(err, subdirs) {
          if (err) throw err;
          console.log(subdirs);
          return () => {}
      });*/

      // return iterator(fileNames[0])
      //   .then((files) => {
      //     return focusWindow
      //       .webContents
      //       .send('folderOpened' , {
      //           project: path.basename(fileNames[0]),
      //           files
      //       });
      // });
    }
  });
};

// const newFile = (focusWindow) => {
//   return focusWindow.webContents.send('winNewFile');
// }

module.exports = {
  openFile,
  openFolder,
  // newFile,
}
