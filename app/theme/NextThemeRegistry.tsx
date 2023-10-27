"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { NextAppDirEmotionCacheProvider } from "./NextEmotionCache";
import { color as ThemeColors } from "./index";
import { GlobalStyles } from "@mui/material";

export const ThemeContext = React.createContext({
  toggleColorMode: () => { },
  shuffleColorTheme: () => { },
});

type ThemeProviderProps = {
  children?: React.ReactNode;
};

export default function ThemeRegistry(props: ThemeProviderProps) {

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = React.useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );
  const [theme, setTheme] = React.useState<0 | 1 | 2 | 3>(0);

  React.useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      shuffleColorTheme: () => {
        setTheme((prevTheme) => ((prevTheme + 1) % 4) as 0 | 1 | 2 | 3);
      },
    }),
    []
  );

  const _theme = React.useMemo(
    () => createTheme(ThemeColors[theme][mode] as ThemeOptions),
    [mode, theme]
  );

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeContext.Provider value={colorMode}>
        <ThemeProvider theme={_theme}>
          <CssBaseline enableColorScheme />
          <GlobalStyles styles={{}} />
          {props.children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </NextAppDirEmotionCacheProvider>
  );
}
