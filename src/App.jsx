import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";
import { ThemeProvider, theme } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return <ThemeProvider theme={theme}></ThemeProvider>;
};

export default App;
