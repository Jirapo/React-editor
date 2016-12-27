import { remote } from 'electron'


export const saveNewFile = (contents) => {
  return new Promise((resolve, reject) => {
    remote.dialog.showSaveDialog(function (filepath) {
      if(filepath){
        remote.require('fs').writeFile(filepath, contents, 'utf-8');
        resolve(filepath)
      }else{
        reject()
      }
    });
  })
}

export const readFile = (path) => {
  return new Promise((resolve, reject) => {
    remote.require('fs').readFile(path, 'utf-8', function (err, data) {
      if (err) reject()
      resolve(data)

    });
  })
}