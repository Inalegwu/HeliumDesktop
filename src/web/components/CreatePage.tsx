import { useAtom } from "jotai";
import React from "react";
import { colorModeAtom, colorsAtom } from "../atoms";

interface CreatePageProps {
  setCreatePageTitle: (text: string) => void;
  createNewPage: () => void;
}

function CreatePage({ setCreatePageTitle, createNewPage }: CreatePageProps) {
  const [colorMode] = useAtom(colorModeAtom);
  const [colors] = useAtom(colorsAtom);
  return (
    <div
      className={`w:full margin-top:2vh bg:${
        colorMode === "light" ? "#ececec" : "#292929a9"
      } height:fit-content padding:15px border-radius:5px display:flex flex-direction:column`}
    >
      <input
        type="text"
        className={`border:none bg:${
          colorMode === "light" ? "white" : "black"
        } padding:5px border-radius:5px color:${
          colorMode === "light" ? "black" : "white"
        }`}
        placeholder="Title"
        onChange={(e) => {
          setCreatePageTitle(e.target.value);
        }}
      />
      <button
        onClick={createNewPage}
        className={`margin-top:2% cursor:pointer border:none bg:${colors[1]} color:white padding:5px border-radius:5px`}
      >
        Create Page
      </button>
    </div>
  );
}

export default CreatePage;
