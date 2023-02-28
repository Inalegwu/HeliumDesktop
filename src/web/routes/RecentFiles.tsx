import { useAtom } from "jotai";
import { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { colorModeAtom, colorsAtom, recentDocumentsAtom } from "../atoms";
import {
  Background,
  CircleBox,
  FlexContainer,
  Heading,
  MenuButton,
  RecentDocsBox,
} from "../components/styled";

export default function RecentFiles() {
  const [colors] = useAtom(colorsAtom);
  const [colorMode] = useAtom(colorModeAtom);
  const [isReduced, setIsReduced] = useState<boolean>(false);

  const [recentDocuments] = useAtom(recentDocumentsAtom);

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
        <div
          style={{
            width: "100%",
            height: "5vh",
            padding: "3px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            alignContent: "center",
            position: "absolute",
            zIndex: 2,
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
        <RecentDocsBox
          background={colorMode === "light" ? "#ffffff65" : "#1b1b1b92"}
        >
          {/* navigation */}
          <div
            style={{
              height: "5vh",
              width: "100%",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Link
              to="/"
              title="Go back"
              style={{
                borderRadius: "2px",
                padding: "10px",
              }}
            >
              <HiArrowLeft
                color={colorMode === "light" ? "black" : "white"}
                size={16}
              />
            </Link>
          </div>
          <div
            style={{
              height: "80vh",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              overflowX: "hidden",
              overflowY: "scroll",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {recentDocuments.length === 0 ? (
              <Heading color={colorMode === "light" ? "#000000" : "#ffffff"}>
                No Recent Documents
              </Heading>
            ) : (
              <h1>docs</h1>
            )}
          </div>
        </RecentDocsBox>
      </FlexContainer>
    </Background>
  );
}
