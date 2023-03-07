// all function related to handling the creation (saving)
// and reading of pages from the backend and handing them
// over to the renderer process in preload.js

import axios from "axios";

// !IMPORTANT => I'm not always a fan of object oriented programming
// !IMPORTANT => but it just seemed to make sense here just for structure
export default class PageFunctions {
  readPages(event: any) {
    console.log("Reading Pages...");
  }
  savePage(event: any, page: any) {
    console.log("Saving Page...");
  }
  syncPages(event: any) {
    console.log("Syncing pages...");
  }
  savePagesToDisk(event: any, pages: Array<any>) {
    console.log("Saving pages to disk...");
  }
  uploadFiletoPages(event: any, file: any) {
    console.log("Uploading file to pages...");
  }
  addToRecentPages(event: any, page: any) {
    console.log("Adding page to recent pages");
  }
  async createPage(event: any, page: any) {
    const response = await axios.post(
      "http://localhost:3000/file/create_file/",
      page
    );

    console.log(response.data);
  }
  async readPagesByDocumentId(event: any, id: any) {
    const response = await axios.get(
      `http://localhost:3000/file/get_file_by_document_id/${id}`
    );

    return response.data.files;
  }
}
