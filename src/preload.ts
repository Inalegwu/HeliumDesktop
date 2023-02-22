import { contextBridge, ipcRenderer } from "electron";

console.log("preloaded!");

contextBridge.exposeInMainWorld("electronAPI", {
  saveSettings: (settings: any) => ipcRenderer.send("save-settings", settings),
  readSettings: () => ipcRenderer.send("read-settings"),
});
