"use client"

// import { useTheme } from "@mui/material/styles";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ToggleButton from "@mui/material/ToggleButton";
import React from "react";
import { ThemeContext } from "../NextThemeRegistry";

const ThemeModeSwitch = () => {
  const colorMode = React.useContext(ThemeContext);
  return (
    <ToggleButton
      value={"check"}
      style={{ borderRadius: "50px", border: "none" }}
      onChange={colorMode.shuffleColorTheme}
    >
      change theme
      <ColorLensIcon color={"secondary"} />
    </ToggleButton>
  );
};

export default ThemeModeSwitch;
