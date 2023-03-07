import { contextBridge, ipcRenderer } from "electron";

console.log("Fuck Yeah I'm Mounted Up...");

// every single handler function is exposed to the renderer HERE ,
// N.B never expose the ipcRenderer and ipcMain through this means
// for security reasons. read the documentation for more on why...
contextBridge.exposeInMainWorld("electronAPI", {
  saveSettings: (settings: any) => ipcRenderer.send("save-settings", settings),
  readSettings: () => ipcRenderer.invoke("read-settings"),
  readPages: () => ipcRenderer.invoke("read-pages"),
  syncPages: () => ipcRenderer.invoke("sync-pages"),
  savePagesToDisk: (pages: Array<any>) =>
    ipcRenderer.send("save-pages-to-disk", pages),
  addToRecentPages: (page: any) =>
    ipcRenderer.send("add-to-recent-pages", page),
  createDocument: (document: any) =>
    ipcRenderer.send("create-document", document),
  readDocuments: () => ipcRenderer.invoke("read-documents"),
  readPagesByDocumentId: (id: any) =>
    ipcRenderer.invoke("read-pages-by-doc-id", id),
  createPage: (page: any) => ipcRenderer.send("create-page", page),
});
