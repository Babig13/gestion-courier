import { useState } from "react";
import reactLogo from "./assets/react.svg";

import "./App.css";

// Import des composants nécessaires depuis React et react-router-dom
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import des pages et du composant Header depuis leurs emplacements respectifs
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import User from "./pages/User";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import Header from "./components/Header/Header";

// Définition du composant principal App
const App = () => {
  return (
    <>
      {/* Utilisation du BrowserRouter pour gérer la navigation */}
      <BrowserRouter>
        {/* Définition des différentes routes avec leurs composants associés */}
        <Routes>
          <Route path="/" element={<Login />} /> {/* Page de connexion */}
          <Route path="/admin" element={<Admin />} />
          {/* Page d'administration */}
          <Route path="/admin/createuser" element={<CreateUser />} />{" "}
          {/* Page de création d'utilisateur */}
          <Route path="/admin/:firm_name" element={<EditUser />} />
          {/* Page d'édition d'utilisateur */}
          <Route path={"/user/:firm_name"} element={<User />} />
          {/* Page d'utilisateur */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

// Export du composant App comme composant par défaut
export default App;
