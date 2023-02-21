import React, { useState } from "react";
import { Body } from "./styled/Body";
import { MenuButton } from "./styled/MenuButton";
import { Container } from "./styled/Container";
import { SideNav } from "./styled/SideNav";
import { Heading } from "./styled/typography/Heading";
import { platform } from "os";
import { Box } from "./styled/Box";
import { Input } from "./styled/Input";
import { Flex } from "./styled/Flex";
import { ActionButton } from "./styled/ActionButton";
import { NavContent } from "./styled/NavContent";
import { Note } from "./styled/Note";
import { NoteLeft } from "./styled/NoteLeft";
import { Subtitle } from "./styled/typography/Subtitle";
import { Title } from "./styled/typography/Title";
import { NoteRight } from "./styled/NoteRight";
import { State } from "./styled/State";
import { Indicator } from "./styled/Indicator";
import { States, NoteType } from "../utils/types";
import { CiImport, CiFileOn, CiRepeat } from "react-icons/ci";
import { electron } from "process";
import { BrowserWindow } from "electron/main";

interface SideBarProps {
  notes: NoteType[];
}

function Sidebar({ notes }: SideBarProps) {
  const [isReduced, setIsReduced] = useState<boolean>(false);
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

  return (
    <Container>
      <SideNav
        onDrag={(e) => {
          window.moveTo(e.nativeEvent.clientX, e.nativeEvent.clientY);
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
              ? (window.resizeBy(-150, -150),
                setIsReduced(true),
                console.log("Clicked..."))
              : (window.resizeBy(150, 150),
                setIsReduced(false),
                console.log("Clicked Again"));
          }}
          color="#e6a862"
        ></MenuButton>
        <MenuButton
          title="Maximize"
          onClick={() => {}}
          color="#293f66"
        ></MenuButton>
      </SideNav>
      <Box>
        <Input type="text" placeholder="Search..." />
        <Flex>
          <ActionButton title="Import">
            <CiImport size={20} color="#69076d83" />
          </ActionButton>
          <ActionButton title="New File">
            <CiFileOn size={20} color="#69076d83" />
          </ActionButton>
          <ActionButton title="Sync">
            <CiRepeat size={20} color="#69076d83" />
          </ActionButton>
        </Flex>
      </Box>
      <NavContent>
        <h2>Pages</h2>
        {notes.length > 0 ? (
          notes.map((note) => {
            return (
              <Note key={note.id}>
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
          <p style={{ marginTop: "10px", color: "#d4d4d4" }}>Oops , No Pages</p>
        )}
      </NavContent>
      <State>
        {isOnline === States.ONLINE ? (
          <p style={{ fontSize: 13 }}>Online</p>
        ) : (
          <p style={{ fontSize: 13 }}>Offline</p>
        )}
        <Indicator color={isOnline === States.ONLINE ? "#3b8052" : "#d63d45"} />
      </State>
    </Container>
  );
}

export default Sidebar;
