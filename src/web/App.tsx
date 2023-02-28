import React, { useEffect, useState } from "react";
import {
  HiArrowUp,
  HiCloudDownload,
  HiCog,
  HiDocumentAdd,
  HiDownload,
  HiHashtag,
  HiOutlineDotsVertical,
  HiRefresh,
  HiSave,
} from "react-icons/hi";
import Sidebar from "./components/Sidebar";
import { NoteType, Settings, States } from "./utils/types";
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
  CircleBox,
} from "./components/styled/index";

import "./App.css";

function App() {
  const [bold, SetBold] = useState<boolean>(false);
  const [tagViewVisible, setTagViewVisible] = useState<boolean>(false);
  const [noteText, setNoteText] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [pages, setPages] = useState<NoteType[]>([]);
  // for checking the state of the window size (aids with scaling)
  const [isReduced, setIsReduced] = useState<boolean>(false);
  const [note, setNoteAtom] = useAtom(noteAtom);

  // handles the color of the background image splotches ( if the values from settings is undefined it
  // defaults to the application defined settings other wise it uses the users most recently saved values)
  const [colors, setColors] = useAtom(colorsAtom);
  // handles the color mode of the UI [light or dark] eventually , I will add support for
  // theme.json files that can be read into the application to affect the color schemes of the
  // color modes
  const [colorMode, setColorMode] = useAtom(colorModeAtom);
  // checks whether the user is online , so that syncing can occur
  const [isOnline, setIsOnline] = useState<States>(
    navigator.onLine ? States.ONLINE : States.OFFLINE
  );

  // sends a notification whenever the app comes online
  window.ononline = (e) => {
    setIsOnline(States.ONLINE);
    new Notification("Back Online 👍👍");
  };

  // sends a notification whenever the app goes offline
  window.onoffline = (e) => {
    setIsOnline(States.OFFLINE);
    new Notification("Offline 😔");
  };

  // parsing the users input and turning it to markdown
  // !IMPORTANT move this function into some form of utility functions
  // !folder
  const marked = (text: string) => {
    // TODO implement some sort of markdown parsing
    console.log(text);
  };

  // reads in the users settings from the settings.json file and sets the application
  // color mode and background colors approprietly
  useEffect(() => {
    window.electronAPI?.readSettings().then((res: Settings) => {
      if (res != undefined) {
        setColorMode(res?.colorMode);
        setColors([res.blurColor1.toString(), res.blurColor2.toString()]);
      }
    });
  }, [colorMode, setColorMode, colors, setColors]);

  // reads in the users pages from the backend
  useEffect(() => {
    window.electronAPI?.readPages().then((res: any) => {
      console.log(res);
    });
  }, [pages, setPages]);

  // ALL UI CODE FOR THE HOMEPAGE EXISTS HERE
  return (
    <Background>
      <CircleBox backgroundColor={colors[0]} />
      <CircleBox
        backgroundColor={colors[1]}
        style={{ left: "80%", top: "60%" }}
      />
      <FlexContainer
        background={colorMode === "light" ? "#ffffff0" : "#00000031"}
      >
        <Sidebar>
          {/* the navigation bar at the top of every page. this is a custom navigation bar hence */}
          {/* so I'm handling a lot of functionality on my own FML */}
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
                  // check if the window is reduced. if it isn't ?
                  // reduce the size by a factor of 150 (-150 from total window size) on both axis
                  // otherwise , increase by 150 (+150 from to total window size)
                  isReduced === false
                    ? (window.resizeBy(-150, -150), setIsReduced(true))
                    : (window.resizeBy(150, 150), setIsReduced(false));
                }}
                color="#e6a862"
              ></MenuButton>
              <MenuButton
                title="Maximize"
                onClick={
                  // still don't know what the maximize functionality
                  //will look like
                  () => {}
                }
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
                  width: "70%",
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
                <ActionButton
                  title="Sync"
                  onClick={() => {
                    if (isOnline === States.ONLINE) {
                      alert("Starting Sync...");
                    } else {
                      alert("Please Go Online To Sync...");
                    }
                  }}
                >
                  <HiRefresh
                    size={20}
                    color={colorMode === "light" ? "#000000" : "#ffffff"}
                  />
                </ActionButton>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "30%",
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
                    marginRight: "5px",
                  }}
                >
                  <HiCloudDownload
                    size={20}
                    color={colorMode === "light" ? "#000000" : "#ffffff"}
                  />
                </button>
                <Link
                  to="/recent_files"
                  title="Recent Files"
                  style={{
                    border: "none",
                    background: "#ececec40",
                    width: "30%",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  <HiOutlineDotsVertical
                    size={20}
                    color={colorMode === "light" ? "#000000" : "#ffffff"}
                  />
                </Link>
              </div>
            </Flex>
          </Box>
          <NavContent>
            <h2>Pages</h2>
            {pages.length > 0 ? (
              pages.map((page) => {
                return (
                  <Note
                    key={page.id}
                    onClick={() => {
                      setNoteAtom(note);
                    }}
                  >
                    <NoteLeft>
                      <Title>{page.title}</Title>
                      <Subtitle style={{ color: "#ECECECEC" }}>
                        {page.content.slice(0, 13) + "..."}
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
                title="tags"
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
