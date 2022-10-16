
// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

const openloginWindow = () => {
  const loginWindow = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "script/preload.js")
    }
  })
  loginWindow.loadFile('screens/login.html')

}

app.whenReady().then(() => {
  openloginWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})