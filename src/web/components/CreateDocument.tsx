import { useAtom } from "jotai";
import React from "react";
import { colorModeAtom, colorsAtom } from "../atoms";

interface CreateDocumentProps {
  setCreateDocumentTitle: (text: string) => void;
  setCreateDocumentDescription: (text: string) => void;
  createNewDocument: () => void;
}

function CreateDocument({
  setCreateDocumentTitle,
  setCreateDocumentDescription,
  createNewDocument,
}: CreateDocumentProps) {
  const [colorMode] = useAtom(colorModeAtom);
  const [colors] = useAtom(colorsAtom);
  return (
    <div
      className={`w:full margin-top:2vh bg:${
        colorMode === "light" ? "#ececec" : "#292929a9"
      } height:fit-content padding:15px border-radius:5px display:flex flex-direction:column `}
    >
      <input
        type="text"
        className={`border:none bg:${
          colorMode === "light" ? "white" : "black"
        } padding:5px border-radius:5px color:${
          colorMode === "light" ? "black" : "white"
        }`}
        placeholder="Document Title"
        onChange={(e) => {
          setCreateDocumentTitle(e.target.value);
        }}
      />
      <input
        type="text"
        className={`border:none margin-top:2% bg:${
          colorMode === "light" ? "white" : "black"
        } padding:5px border-radius:5px color:${
          colorMode === "light" ? "black" : "white"
        }`}
        placeholder="Document Description"
        onChange={(e) => {
          setCreateDocumentDescription(e.target.value);
        }}
      />
      <button
        onClick={createNewDocument}
        className={`margin-top:2% cursor:pointer border:none bg:${colors[1]} color:white padding:5px border-radius:5px`}
      >
        Create Document
      </button>
    </div>
  );
}

export default CreateDocument;
