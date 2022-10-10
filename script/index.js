const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path').join(__dirname,'../');
const url = require('url');

let package_file = require('../package.json');
let name = package_file.name_view;

function createWindow () {

  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: name,
    webPreferences: {
      nodeIntegration: true
    }
  });

  //Remove Menubar
  win.setMenu(null);

  //load the index.html of the app.
  win.loadURL(url.format({
    pathname : path + 'index.html',
    protocol:'file',
    slashes:true
  }));
}

//call the creation function when app is done loading
app.whenReady().then(createWindow)

//this event is invoked when user is quitting the application
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//this event is used re-create window when user minimize the window and
//maximize again
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});