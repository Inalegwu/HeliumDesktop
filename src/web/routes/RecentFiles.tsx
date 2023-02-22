import { useAtom } from "jotai";
import { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { colorModeAtom, colorsAtom, recentDocumentsAtom } from "../atoms";
import {
  Background,
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

  console.log(recentDocuments);

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
