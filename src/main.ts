import path from "path";
import { BrowserWindow, app, dialog, ipcMain, Menu, MenuItem } from "electron";

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    resizable: true,
    frame: false,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
    },
    height: 1000,
    width: 1024,
    maximizable: true,
  });

  mainWindow.loadFile("dist/index.html");
  mainWindow.setAutoHideMenuBar(true);
  mainWindow.setVibrancy("dark");
  // mainWindow.webContents.openDevTools({ mode: "right" });
});

app.once("window-all-closed", () => app.quit());
