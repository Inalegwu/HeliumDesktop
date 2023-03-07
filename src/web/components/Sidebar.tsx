import React, { ReactNode, useState } from "react";
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
import { CiImport, CiFileOn, CiRepeat, CiSettings } from "react-icons/ci";
import { electron } from "process";
import { BrowserWindow } from "electron/main";
import { useAtom } from "jotai";
import { colorModeAtom } from "../atoms";
import { Link } from "react-router-dom";

interface SideBarProps {
  children?: ReactNode | ReactNode[];
}

function Sidebar({ children }: SideBarProps) {
  const [colorMode] = useAtom(colorModeAtom);
  return (
    <Container
      background={colorMode === "light" ? "#ffffff" : "#1b1b1b"}
      textColor={colorMode === "light" ? "#000000" : "#ffffff"}
    >
      {children}
    </Container>
  );
}

export default Sidebar;
