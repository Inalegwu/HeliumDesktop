import React, { useState } from "react";
import { CiExport, CiHashtag, CiSaveDown2 } from "react-icons/ci";
import Sidebar from "./components/Sidebar";
import { ActionNav } from "./components/styled/ActionNav";
import { Background } from "./components/styled/Background";
import { Body } from "./components/styled/Body";
import { BodyNav } from "./components/styled/BodyNav";
import { BodyRight } from "./components/styled/BodyRight";
import { BodyTitle } from "./components/styled/BodyTitle";
import { Editor } from "./components/styled/Editor";
import { FlexContainer } from "./components/styled/FlexContainer";
import { TitleButton } from "./components/styled/TitleButton";
import { NoteType } from "./utils/types";

const NOTES: NoteType[] = [];

import "./App.css";
import { TagBox } from "./components/styled/TagBox";

function App() {
  const [bold, SetBold] = useState<boolean>(false);
  const [tagViewVisible, setTagViewVisible] = useState<boolean>(false);
  const [tag, setTag] = useState<string>("");

  console.log(tag);

  return (
    <Background>
      <div
        style={{
          backgroundColor: "#e77e28a4",
          height: "500px",
          borderRadius: "50%",
          position: "absolute",
          zIndex: 0,
          aspectRatio: 1,
        }}
      ></div>
      <div
        style={{
          backgroundColor: "#69076d83",
          height: "500px",
          borderRadius: "50%",
          position: "absolute",
          left: "70%",
          top: "40%",
          zIndex: 0,
          aspectRatio: 1,
        }}
      ></div>
      <FlexContainer>
        <Sidebar notes={NOTES} />
        <Body>
          <BodyNav>
            <BodyTitle color="#000000">Note Title</BodyTitle>
            <BodyRight>
              <TitleButton
                onClick={() => {
                  setTagViewVisible(!tagViewVisible);
                }}
              >
                <CiHashtag color="#69076d83" size={16} />
              </TitleButton>
              <TitleButton title="Save">
                <CiSaveDown2 color="#69076d83" size={16} />
              </TitleButton>
              <TitleButton title="Export">
                <CiExport color="#69076d83" size={16} />
              </TitleButton>
            </BodyRight>
          </BodyNav>
          <ActionNav>
            <TitleButton
              onClick={() => {
                SetBold(!bold);
              }}
            ></TitleButton>
            <TagBox
              type="text"
              onChange={(e) => {
                setTag(e.target.value);
              }}
              placeholder="Tag"
            />
          </ActionNav>
          <Editor
            placeholder="Start Typing..."
            style={{ fontWeight: bold === true ? "bold" : "normal" }}
          />
        </Body>
      </FlexContainer>
    </Background>
  );
}

export default App;
