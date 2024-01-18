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
import EditUser from "./pages/EditUser";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/createuser" element={<CreateUser />} />
          <Route path="/admin/:firm_name" element={<EditUser />} />
          <Route path={"/user/:firm_name"} element={<User />} />
        </Routes>
      </BrowserRouter>

      {/* <CreateUser />
      <EditUser /> */}
    </>
  );
  {
    /* <ThemeProvider theme={theme}></ThemeProvider>; */
  }
};

export default App;
