import { useAtom } from "jotai";
import React from "react";
import { colorModeAtom } from "../atoms";

export interface NoteItemProps {
  page: any;
  setActivePage: (page: any) => void;
}

function NoteItem({ page, setActivePage }: NoteItemProps) {
  const [colorMode] = useAtom(colorModeAtom);
  return (
    <button
      onClick={() => {
        setActivePage(page);
      }}
      className={`w:full border:none display:flex flex-direction:col align-items:flex-start align-content:flex-start justify-content:flex-start padding:5px border-radius:5px margin-top:2% bg:${
        colorMode === "light" ? "#ececec" : "#292929a9"
      }`}
    >
      <h3 className={`color:${colorMode === "light" ? "#a1a1a1" : "#e6e3e3"}`}>
        {page.file_name}
      </h3>
      <p className={`color:${colorMode === "light" ? "#a1a1a1" : "#e6e3e3"}`}>
        {page.file_content?.slice(0, 20) + "...."}
      </p>
    </button>
  );
}

export default NoteItem;
