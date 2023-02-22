import path from "path";
import {
  BrowserWindow,
  dialog,
  ipcMain,
  Menu,
  MenuItem,
  app,
  screen,
} from "electron";
import fs from "fs";
import process from "process";
import { atom } from "jotai";

export interface Settings {
  blurColor1: string;
  blurColor2: string;
  colorMode: string;
}

declare global {
  interface Window {
    electronAPI?: any;
  }
}

function handleSaveSettings(event: any, settings: any) {
  let fullPath;

  fs.writeFile(
    path.join(app.getPath("appData"), "helium/settings.json"),
    settings,
    (err) => {
      if (err) throw err;
    }
  );
}

function readSavedSettings(event: any) {
  const getPath = path.join(app.getPath("appData"), "helium/settings.json");
  const content = fs.readFileSync(getPath, "utf-8");

  const parsed = JSON.parse(content);
}

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  const mainWindow = new BrowserWindow({
    resizable: true,
    frame: false,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
    },
    height: 1000,
    width: 2024,
    maximizable: true,
  });

  mainWindow.loadFile("dist/index.html");
  mainWindow.setAutoHideMenuBar(true);
  mainWindow.setVibrancy("dark");
  // mainWindow.webContents.openDevTools({ mode: "right" });
}

app.whenReady().then(() => {
  ipcMain.on("save-settings", handleSaveSettings);
  ipcMain.on("read-settings", readSavedSettings);
  createWindow();
});

app.once("window-all-closed", () => app.quit());
