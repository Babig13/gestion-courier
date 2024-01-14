import { useState } from "react";
import reactLogo from "./assets/react.svg";

import "./App.css";
import React from "react";
/*import { ThemeProvider, theme } from "./theme";*/
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import User from "./pages/User";
import CreateUser from "./pages/CreateUser";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path={"/createUser"} element={<CreateUser />} />
        <Route path={"/user/:firmname"} element={<User />}>
          <Route path={"/user/:firmname"} />
          <Route path={"/user/:firmname"} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  {
    /* <ThemeProvider theme={theme}></ThemeProvider>; */
  }
};

export default App;
