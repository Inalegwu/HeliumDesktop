import { useAtom } from "jotai";
import React from "react";
import { colorModeAtom } from "../atoms";

export interface DocumentItemProps {
  document: any;
  setActiveDocument: (document: any) => void;
  findActiveDocPages: (id: any) => void;
}

function DocumentItem({
  document,
  setActiveDocument,
  findActiveDocPages,
}: DocumentItemProps) {
  const [colorMode] = useAtom(colorModeAtom);
  return (
    <button
      key={document.id}
      onClick={() => {
        setActiveDocument(document);
        findActiveDocPages(document.id);
      }}
      className={`bg:${
        colorMode === "light" ? "#ececec" : "#292929a9"
      } padding:10px border:none w:full margin-top:3% border-radius:5px display:flex flex-direction:col justify-content:flex-start`}
    >
      <h4 className={`color:${colorMode === "light" ? "#000000" : "#ffffff"}`}>
        {document.document_name}
      </h4>
      <p
        className={`color:${
          colorMode === "light" ? "#1f1f1f" : "#858585"
        } font-weight:100 font:14 italic`}
      >
        {document.description}
      </p>
    </button>
  );
}

export default DocumentItem;
