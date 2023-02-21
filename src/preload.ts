import { contextBridge, ipcRenderer } from "electron";

console.log("preloaded!");

contextBridge.exposeInMainWorld("electronAPI", {
  openFile: () => {
    ipcRenderer.invoke("dialog:openFile");
  },
});
