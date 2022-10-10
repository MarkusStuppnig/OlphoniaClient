const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  //load the index.html of the app.
  console.log(__dirname);
  win.loadURL(url.format({
    pathname : path.join(__dirname,'../index.html'),
    protocol:'file',
    slashes:true
  }))

}
//call the creation function when app is done loading
app.whenReady().then(createWindow)

//this event is invoked when user is quitting the application
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
//this event is used re-create window when user minimize the window and
//maximize again
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})