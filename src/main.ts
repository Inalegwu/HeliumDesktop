import path from "path";
import { BrowserWindow, ipcMain, app, screen } from "electron";
import PageFunctions from "./actions/pages.functions";
import AppFunctions from "./actions/app.functions";
import DocumentFunctions from "./actions/document.functions";

// the exposes the electronAPI to the window object so it can
// be accessible in the renderer process
// TODO define functions relating to the electronAPI , so that they can
// TODO be acessible with documentation (parameters and all) in the renderer
// TODO process => UPDATE (done)
declare global {
  interface Window {
    electronAPI: {
      saveSettings: (settings: any) => void;
      readSettings: () => Promise<any>;
      readPages: () => Promise<any>;
      savePage: (page: any) => void;
      syncPages: (pages: Array<any>) => void;
      savePagesToDisk: (pages: Array<any>) => void;
      uploadFileToPages: (file: any) => void;
      addToRecentPages: (page: any) => void;
      readDocuments: () => Promise<any>;
      createDocument: (document: any) => void;
      readPagesByDocumentId: (id: any) => Promise<any>;
      createPage: (page: any) => void;
    };
  }
}

const pageFuncs = new PageFunctions();
const appFuncs = new AppFunctions();
const docFuncs = new DocumentFunctions();

// details that relate to the final rendered window
// do not change under any circumstances unless it's
// to show the dev tools or because of errors in the code
function createWindow() {
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

// everthing that happens between clicking the icon and the page
// fully loading...
app.whenReady().then(() => {
  // handlers and listeners
  ipcMain.on("save-settings", appFuncs.handleSaveSettings);
  ipcMain.handle("read-settings", appFuncs.readSavedSettings);
  ipcMain.handle("read-pages", pageFuncs.readPages);
  ipcMain.handle("sync-pages", pageFuncs.syncPages);
  ipcMain.handle("add-to-recent-pages", pageFuncs.addToRecentPages);
  ipcMain.on("save-pages-to-disk", pageFuncs.savePagesToDisk);
  ipcMain.handle("read-documents", docFuncs.readDocuments);
  ipcMain.on("create-document", docFuncs.createDocument);
  ipcMain.handle("read-pages-by-doc-id", pageFuncs.readPagesByDocumentId);
  ipcMain.on("create-page", pageFuncs.createPage);
  // spawns the main window
  createWindow();
});

app.once("window-all-closed", () => app.quit());
