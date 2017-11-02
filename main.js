'use strict';

const path = require('path');
const hapi = require('hapi');

// Module to control application life.
// Module to create native browser window.
const { app, shell, BrowserWindow, Menu } = require('electron');
const defaultMenu = require('electron-default-menu');

const { initApiRoutes } = require('./sense-api-dist');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {

  setTimeout(function () {

    // Create the browser window.
    mainWindow = new BrowserWindow({
      width: 1280,
      height: 800,
      icon: path.resolve('./sense/icons/logo38.png')
    });

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/sense/index.html');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    });

  }, 0);

  const menu = defaultMenu(app, shell);
  menu.splice(3, 1, {
    label: 'About',
    role: 'about',
    submenu: [
      {
        label: 'Sense 2.0.0-beta2'
      }
    ]
  })
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
}

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();

    mainWindow.focus()
  }
})

if (isSecondInstance) {
  app.quit()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  app.quit();
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// api for loading appropriate version of autocomplete and for proxying requests to ES nodes
const server = new hapi.Server();
server.connection({ port: 3099, host: 'localhost' });
initApiRoutes(server);
server.register({ register: require('h2o2') }, function (err) {

  if (err) {
    console.log('Failed to load h2o2');
  }

  server.start(function (err) {
    if (err) {
      throw err;
    }
    console.log(`Sense API server running at: ${server.info.uri}`);
  });
});
