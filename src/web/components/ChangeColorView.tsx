import { useAtom } from "jotai";
import { useState } from "react";
import { colorModeAtom, colorsAtom } from "../atoms";
import { ColorPicker } from "./styled";

export default function ChangeColorView() {
  const [colors] = useAtom(colorsAtom);
  const [colorMode, setColorMode] = useAtom(colorModeAtom);

  const saveSettings = () => {
    console.log("Saving...");
    const settings = {
      blurColor1: colors[0],
      blurColor2: colors[1],
      colorMode: colorMode,
    };

    const savedSettings = JSON.stringify(settings);
    window.electronAPI.saveSettings(savedSettings);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "100%", height: "93%" }}>
        <div
          style={{
            width: "98%",
            padding: "10px",
            height: "10vh",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <div style={{ width: "50%" }}>
            <h4>Color 1</h4>
            <ColorPicker
              type="color"
              defaultValue={`${colors[0]}`}
              onChange={(e) => {
                colors[0] = e.target.value;
              }}
            />
          </div>
          <div style={{ width: "50%" }}>
            <h4>Color 2</h4>
            <ColorPicker
              type="color"
              onChange={(e) => {
                colors[1] = e.target.value;
              }}
              defaultValue={`${colors[1]}`}
            />
          </div>
        </div>
        <div
          style={{
            width: "98%",
            padding: "10px",
            height: "10vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: "15px",
          }}
        >
          <h4>Color Mode</h4>
          {colorMode === "light" ? (
            <select
              style={{
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                marginTop: "10px",
              }}
              onChange={(e) => {
                setColorMode(e.target.value);
              }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          ) : (
            <select
              style={{
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                marginTop: "10px",
              }}
              onChange={(e) => {
                setColorMode(e.target.value);
              }}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          )}
        </div>
      </div>
      <div
        style={{
          height: "7%",
          width: "100%",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          padding: "10px",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={() => {
            saveSettings();
          }}
          style={{
            padding: "10px",
            border: "none",
            background: "#ecececab",
            borderRadius: "5px",
            color: "#000000",
            fontWeight: "bold",
            cursor: `pointer`,
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
