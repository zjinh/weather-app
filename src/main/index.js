import { app, BrowserWindow,ipcMain,ipcRenderer } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
app.commandLine.appendSwitch('--args --disable-web-security');

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
      height: 600,
      useContentSize: true,
      width: 1100,
      frame:false,
      maximizable:false,
      resizable:false,
      backgroundColor:'#1f8cda',
      webPreferences:{
          webSecurity:true
    }
  });
  mainWindow.webContents.disableDeviceEmulation();
  mainWindow.setMenu(null);
  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
function BindIpc(){
    ipcMain.on('mini', function () {
        mainWindow.minimize();
    });
    ipcMain.on('close', function () {
        app.quit()
    });
}
app.on('ready', function (){
    BindIpc();
    createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
