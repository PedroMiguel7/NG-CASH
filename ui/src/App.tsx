import React from "react";
import "./App.css";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./app/styles/global";
import { darkTheme, lightTheme } from "./app/styles/theme";
import { Rout } from "./app/store/routes";
import useTema from "./app/components/Sidebar/Teminha";
import SideBar from "./app/components/Sidebar/sidebar";


export default function App() {
  const [thema, setThema] = useTema(
    "theme",
    window.matchMedia && window.matchMedia("(prefers-color-scheme:light)").matches
      ? lightTheme
      : darkTheme
  );
  
  const toogleTema = () => {
    setThema(thema.title === "light" ? darkTheme : lightTheme);
  };
  
  return (
    <ThemeProvider theme={thema}>
      <Rout SideBar={<SideBar toogleTema={toogleTema} />} />
      <GlobalStyles />
    </ThemeProvider>
  );
}
