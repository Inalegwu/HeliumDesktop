import React, { useEffect, useState } from "react";
import {
  HiArrowUp,
  HiCloudDownload,
  HiCog,
  HiDocumentAdd,
  HiDownload,
  HiHashtag,
  HiRefresh,
  HiSave,
} from "react-icons/hi";
import Sidebar from "./components/Sidebar";
import { NoteType, States } from "./utils/types";
import { useAtom } from "jotai";
import { colorModeAtom, colorsAtom, noteAtom } from "./atoms";
import { Link } from "react-router-dom";
import {
  Indicator,
  State,
  NoteRight,
  Subtitle,
  Title,
  NoteLeft,
  Note,
  NavContent,
  ActionButton,
  Flex,
  Input,
  Box,
  SideNav,
  MenuButton,
  TagBox,
  TitleButton,
  FlexContainer,
  Editor,
  BodyTitle,
  BodyRight,
  BodyNav,
  Body,
  Background,
  ActionNav,
} from "./components/styled/index";

const NOTES: NoteType[] = [];

import "./App.css";

function App() {
  const [bold, SetBold] = useState<boolean>(false);
  const [tagViewVisible, setTagViewVisible] = useState<boolean>(false);
  const [noteText, setNoteText] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [isReduced, setIsReduced] = useState<boolean>(false);
  const [note, setNoteAtom] = useAtom(noteAtom);
  const [colors] = useAtom(colorsAtom);
  const [colorMode] = useAtom(colorModeAtom);
  const [isOnline, setIsOnline] = useState<States>(
    navigator.onLine ? States.ONLINE : States.OFFLINE
  );

  window.ononline = (e) => {
    setIsOnline(States.ONLINE);
    new Notification("Back Online 👍👍");
  };

  window.onoffline = (e) => {
    setIsOnline(States.OFFLINE);
    new Notification("Offline 😔");
  };

  const marked = (text: string) => {
    console.log(text);
  };

  window.electronAPI.readSettings();

  return (
    <Background>
      <div
        style={{
          backgroundColor: `${colors[0]}`,
          height: "500px",
          borderRadius: "50%",
          position: "absolute",
          zIndex: 0,
          aspectRatio: 1,
        }}
      ></div>
      <div
        style={{
          backgroundColor: `${colors[1]}`,
          height: "500px",
          borderRadius: "50%",
          position: "absolute",
          left: "70%",
          top: "40%",
          zIndex: 0,
          aspectRatio: 1,
        }}
      ></div>
      <FlexContainer
        background={colorMode === "light" ? "#ffffff0" : "#1b1b1b58"}
      >
        <Sidebar>
          <SideNav
            onDrag={(e) => {
              window.moveTo(e.nativeEvent.clientX, e.nativeEvent.clientY);
            }}
          >
            <div
              style={{
                width: "90%",
                height: "100%",
                padding: "1px",
              }}
            >
              <MenuButton
                title="Quit"
                onClick={() => {
                  window.close();
                }}
                color="#d63d45"
              ></MenuButton>
              <MenuButton
                title="Scale"
                onClick={() => {
                  isReduced === false
                    ? (window.resizeBy(-150, -150), setIsReduced(true))
                    : (window.resizeBy(150, 150), setIsReduced(false));
                }}
                color="#e6a862"
              ></MenuButton>
              <MenuButton
                title="Maximize"
                onClick={() => {}}
                color="#293f66"
              ></MenuButton>
            </div>
            <div>
              <Link
                to="/settings"
                style={{
                  padding: "5px",
                  borderRadius: "2px",
                }}
              >
                <HiCog
                  color={colorMode === "light" ? "black" : "white"}
                  size={16}
                />
              </Link>
            </div>
          </SideNav>
          <Box>
            <Input
              placeholderColor={colorMode === "light" ? "#000000" : "#ffffff"}
              type="text"
              placeholder="Search..."
            />
            <Flex>
              <div
                style={{
                  width: "80%",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <ActionButton title="Import">
                  <HiDownload
                    size={20}
                    color={colorMode === "light" ? "#000000" : "#ffffff"}
                  />
                </ActionButton>
                <ActionButton title="New File">
                  <HiDocumentAdd
                    size={20}
                    color={colorMode === "light" ? "#000000" : "#ffffff"}
                  />
                </ActionButton>
                <ActionButton title="Sync">
                  <HiRefresh
                    size={20}
                    color={colorMode === "light" ? "#000000" : "#ffffff"}
                  />
                </ActionButton>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "20%",
                  justifyContent: "flex-end",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  title="Save To Device"
                  style={{
                    border: "none",
                    background: "#ececec40",
                    width: "80%",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    borderRadius: "5px",
                  }}
                >
                  <HiCloudDownload
                    size={20}
                    color={colorMode === "light" ? "#000000" : "#ffffff"}
                  />
                </button>
              </div>
            </Flex>
          </Box>
          <NavContent>
            <h2>Pages</h2>
            {notes.length > 0 ? (
              notes.map((note) => {
                return (
                  <Note
                    key={note.id}
                    onClick={() => {
                      setNoteAtom(note);
                    }}
                  >
                    <NoteLeft>
                      <Title>{note.title}</Title>
                      <Subtitle style={{ color: "#ECECECEC" }}>
                        {note.content.slice(0, 13) + "..."}
                      </Subtitle>
                    </NoteLeft>
                    <NoteRight></NoteRight>
                  </Note>
                );
              })
            ) : (
              <p style={{ marginTop: "10px", color: "#d4d4d4" }}>
                Oops , No Pages
              </p>
            )}
          </NavContent>
          <State>
            {isOnline === States.ONLINE ? (
              <p style={{ fontSize: 13 }}>Online</p>
            ) : (
              <p style={{ fontSize: 13 }}>Offline</p>
            )}
            <Indicator
              color={isOnline === States.ONLINE ? "#3b8052" : "#d63d45"}
            />
          </State>
        </Sidebar>
        <Body>
          <BodyNav>
            <BodyTitle
              type="text"
              placeholder={note.title === undefined ? "Title..." : note.title}
              color={colorMode === "light" ? "#000000" : "#ffffff"}
            />

            <BodyRight>
              <TitleButton
                onClick={() => {
                  setTagViewVisible(!tagViewVisible);
                }}
              >
                <HiHashtag
                  color={colorMode === "light" ? "#000000" : "#ffffff"}
                  size={16}
                />
              </TitleButton>
              <TitleButton title="Save">
                <HiSave
                  color={colorMode === "light" ? "#000000" : "#ffffff"}
                  size={16}
                />
              </TitleButton>
              <TitleButton title="Export">
                <HiArrowUp
                  color={colorMode === "light" ? "#000000" : "#ffffff"}
                  size={16}
                />
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
            color={colorMode === "light" ? "#0000000" : "#ffffff"}
            placeholderColor={colorMode === "light" ? "#3d3d3d76" : "#ffffff"}
            onChange={(e) => {
              marked(e.target.value);
            }}
            style={{ fontWeight: bold === true ? "bold" : "normal" }}
            defaultValue={note.content === undefined ? "" : note.content}
          />
        </Body>
      </FlexContainer>
    </Background>
  );
}

export default App;
