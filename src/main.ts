import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import fs from 'fs';
import path from 'path';
import url from 'url';
import contextMenu from 'electron-context-menu';

const fileUrl = require('file-url');

import React, { Component } from "react";
import { ReactReader } from "react-reader";



declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

let mainWindow;
let mainWindow2;

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#242424',
    show: false,
    webPreferences: {
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  mainWindow.webContents.openDevTools();
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Show window when its ready to
  mainWindow.on('ready-to-show', () => mainWindow.show());

};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


ipcMain.on("filepathUrl", (event, args) => {
  console.log("received a request from dropzone for filepathUrl");
  console.log("main.ts-ipcMain.on-args: ", args);
  const urlPath = fileUrl(args[0]);
  console.log("main.ts-ipcMain.on-urlPath: ", urlPath);
  //mainWindow.webContents.send("filepathUrl", "ohhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
  mainWindow.webContents.send("filepathUrl", urlPath);
});
