import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { actionAtom, colorModeAtom, colorsAtom } from "../atoms";
import ChangeColorView from "../components/ChangeColorView";
import EditSyncView from "../components/EditSyncView";
import Sidebar from "../components/Sidebar";
import {
  AccountInfo,
  Avatar,
  Background,
  Body,
  CircleBox,
  FlexContainer,
  MenuButton,
  NavContent,
  SettingsItem,
  SideNav,
} from "../components/styled";
import { Action } from "../utils/types";

const actions = [
  {
    action_name: "Change colors",
    action_type: Action.CHANGE_COLOR,
  },
  {
    action_name: "Syncing",
    action_type: Action.SYNC,
  },
];

export default function Settings() {
  const [isReduced, setIsReduced] = useState<boolean>(false);
  const [action, setAction] = useAtom(actionAtom);
  const [colors] = useAtom(colorsAtom);
  const [colorMode, setColorMode] = useAtom(colorModeAtom);

  const saveSettings = () => {
    const settings = {
      blurColor1: colors[0],
      blurColor2: colors[1],
      colorMode: colorMode,
    };

    const savedSettings = JSON.stringify(settings);
    window.electronAPI?.saveSettings(savedSettings);
  };

  return (
    <Background>
      <CircleBox backgroundColor={colors[0]} />
      <CircleBox
        backgroundColor={colors[1]}
        style={{ left: "80%", top: "60%" }}
      />
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
                to="/"
                style={{
                  padding: "5px",
                  borderRadius: "2px",
                }}
              >
                <HiChevronLeft
                  color={colorMode === "light" ? "black" : "white"}
                  size={16}
                />
              </Link>
            </div>
          </SideNav>
          <div
            style={{
              width: "100%",
              height: "16vh",
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Avatar />
            <AccountInfo>
              <h2 style={{ color: "#9e9e9e" }}>Guest Guestingson</h2>
              <p style={{ color: "#9e9e9e" }}>
                You Are Currently Using a Guest Account (
                <i style={{ fontSize: "10px" }}>
                  don't worry , that doesn't mean anything
                </i>
                )
              </p>
            </AccountInfo>
          </div>
          <NavContent>
            {actions.map((action, index) => {
              return (
                <SettingsItem
                  key={index}
                  onClick={() => {
                    setAction(action.action_type);
                  }}
                >
                  <h5>{action.action_name}</h5>
                  <HiChevronRight />
                </SettingsItem>
              );
            })}
          </NavContent>
        </Sidebar>
        <Body>
          {action === Action.CHANGE_COLOR ? (
            <ChangeColorView />
          ) : (
            <EditSyncView />
          )}
        </Body>
      </FlexContainer>
    </Background>
  );
}
