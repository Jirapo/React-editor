// import defaultMenu from 'electron-default-menu';
// import { Menu, app, shell, BrowserWindow, dialog } from 'electron';
// import { openFile, openFolder} from './file';
const defaultMenu = require('electron-default-menu')
const { Menu, app, shell, BrowserWindow, dialog } = require('electron')
const { openFile, openFolder} = require('./file')

module.exports = {
  init () {
    const menu = defaultMenu(app, shell)

    menu.splice(1, 0, {
      label: 'File',
      submenu: [
        {
          label: 'New File',
          accelerator: 'CmdorCtrl+N',
          click: (item, focusedWindow) => {
          	focusedWindow.webContents.send('winNewFile')
            // dialog.showOpenDialog({ properties: ['openFile'] }, (files) => {
            	// console.log('file:', files)
              // focusedWindow.webContents.send('open-file', files[0])
            // })
          }
        },
        {
          label: 'Open File',
          accelerator: 'CmdorCtrl+O',
          click: (item, focusedWindow) => {
          	return openFile(focusedWindow);
            // dialog.showOpenDialog({ properties: ['openFile'] }, (files) => {
            	// console.log('file:', files)
              // focusedWindow.webContents.send('open-file', files[0])
            // })
          }
        },
        {
          label: 'Add React Project',
          // accelerator: 'CmdorCtrl+O',
          click: (item, focusedWindow) => {
          	return openFolder(focusedWindow);
            // dialog.showOpenDialog({ properties: ['openDirectory'] }, (files) => {
            	// console.log('forlder ' ,files)
              // focusedWindow.webContents.send('open-file', files[0])
            // })
          }
        },
        {
          label: 'Save File',
          accelerator: 'CmdorCtrl+S',
          click: (item, focusedWindow) => {
            focusedWindow.webContents.send('winSaveFile')
          }
        },
        {
          label: 'Close File',
          accelerator: 'CmdorCtrl+W',
          click: (item, focusedWindow) => {
            focusedWindow.webContents.send('winCloseFile')
          }
        }
      ]
    })

    Menu.setApplicationMenu(Menu.buildFromTemplate(menu))
  }
}
