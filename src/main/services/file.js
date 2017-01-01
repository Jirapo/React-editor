
const path = require('path')
const fs = require('fs')
const dir = require('node-dir')
const chokidar = require('chokidar')
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

      

      var watcher = chokidar.watch(fileNames[0], {
        // ignored: /[\/\\]\./,
        persistent: true
      });

      watcher
        .on('add', path => {
          // console.log(path)
          reading(fileNames[0])
        })
        .on('unlink', path => {
          // console.log(path)
          reading(fileNames[0])
        })


        function reading(filepath){
          dir.paths(filepath, 
            function(err, paths) {
              if (err) throw err;
              console.log('files:\n',paths.files);
              console.log('subdirs:\n', paths.dirs);
              
              return focusWindow
                .webContents
                .send(
                  'winOpenFolder' , {
                    sep: path.sep,
                    list: paths.files,
                    dirs: paths.dirs,
                    folder: filepath,
                  });
          });
        }

    }
  });
};



module.exports = {
  openFile,
  openFolder,
}

// Promise.all([System.import('chokidar')])
//             .then(([chokidar]) => {
//               var watcher = chokidar.watch(data.folder, {
//                   // ignored: /[\/\\]\./,
//                   persistent: true
//                 });

//               watcher
//                 .on('addDir', path => {
//                   // console.log(path)
//                   reading()
//                 })
//                 .on('unlinkDir', path => {
//                   // console.log(path)
//                   reading()
//                 })
//                 .on('add', path => {
//                   // console.log(path)
//                   reading()
//                 })
//                 .on('unlink', path => {
//                   // console.log(path)
//                   reading()
//                 })

//                 function reading(){
//                   dir.paths(data.folder, (err, paths) => {
//                     const d = {
//                       sep: data.sep,
//                       list: paths.files,
//                       dirs: paths.dirs,
//                       folder: data.folder,
//                     }
//                     // const newFd = {...formatFile(d), originTree};
//                     const newFd = formatFile(d);
//                     const newTree = addFileID(newFd, 0)
//                     originTree = newTree;

//                     // console.log(newTree)
                    
//                     dispatch({
//                       type: 'changeStatus',
//                       payload: {
//                         // pathDir: data.pathDir,
//                         // folder: data.folder,
//                         treeList: newTree
//                       }
//                     });
//                   })
//                 }
                
//             });

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

// const _p = paths.dirs.map( p => path.basename(p))
         
/*dir.subdirs(fileNames[0],
  function(err, subdirs) {
      if (err) throw err;
      console.log(subdirs);
      return () => {}
  });*/