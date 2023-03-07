import axios from "axios";

export default class DocumentFunctions {
  async readDocuments(event: any) {
    const response = await axios.get(
      "http://localhost:3000/document/get_all_documents"
    );

    return response.data.documents;
  }
  async createDocument(event: any, document: any) {
    const response = await axios.post(
      "http://localhost:3000/document/create_document",
      document
    );

    console.log(response);
    return response.data;
  }
  savePageToDocument(event: any, page: any) {
    console.log("Saving Page To Document");
  }
}
