const { app, BrowserWindow } = require('electron')

let count = 0;

module.exports = {
  getCount() {
   return count;
  },
  create(opts) {
   count += 1;
   let win = new BrowserWindow(opts);
   win.on('close', () => {
     count -= 1;
     win = null;
   });
   return win;
  }
}
